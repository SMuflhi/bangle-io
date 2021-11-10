import { Placement } from '@popperjs/core';
import { useToggleButton } from '@react-aria/button';
import { FocusScope } from '@react-aria/focus';
import { useFocus, useHover } from '@react-aria/interactions';
import { useMenu, useMenuItem, useMenuSection } from '@react-aria/menu';
import { useSeparator } from '@react-aria/separator';
import { mergeProps } from '@react-aria/utils';
import { useToggleState } from '@react-stately/toggle';
import { TreeState, useTreeState } from '@react-stately/tree';
import type { Node } from '@react-types/shared';
import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

import { cx, useKeybindings, useWatchClickOutside } from '@bangle.io/utils';

import { BaseButton, StylingProps } from './BaseButton';
import { useTooltipPositioner } from './use-positioner';

export {
  Item as MenuItem,
  Section as MenuSection,
} from '@react-stately/collections';

export function DropdownMenu({
  ariaLabel,
  buttonAriaLabel,
  className = '',
  isDisabled,
  buttonChildren,
  children,
  buttonClassName = '',
  menuXOffset = 5,
  menuYOffset = 5,
  menuPlacement = 'bottom',
  style = {},
  buttonStyling = {},
  onAction,
}: {
  ariaLabel: string;
  buttonAriaLabel: string;
  buttonChildren: ReactNode;
  className?: string;
  isDisabled?: boolean;
  children?: JSX.Element[] | JSX.Element;
  menuXOffset?: number;
  menuYOffset?: number;
  menuPlacement?: Placement;
  style?: React.CSSProperties;
  buttonStyling?: StylingProps;
  onAction: (key: React.Key) => void;
  buttonClassName?: string;
}) {
  const buttonRef = useRef<any>(null);

  let state = useToggleState({});
  let { buttonProps, isPressed } = useToggleButton(
    { 'aria-label': buttonAriaLabel },
    state,
    buttonRef,
  );

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const mergedProps = mergeProps(buttonProps, hoverProps);

  const {
    isTooltipVisible,
    tooltipProps,
    setTooltipElement,
    setTriggerElement,
    triggerElement,
  } = useTooltipPositioner({
    isActive: state.isSelected,
    placement: menuPlacement,
    xOffset: menuXOffset,
    yOffset: menuYOffset,
  });

  useEffect(() => {
    buttonRef.current = triggerElement;
  }, [triggerElement]);

  const onClose = useCallback(() => {
    state.setSelected(false);
  }, [state]);

  return (
    <>
      <BaseButton
        {...mergedProps}
        className={buttonClassName}
        styling={buttonStyling}
        isActive={state.isSelected}
        isDisabled={isDisabled}
        isHovered={isHovered}
        isPressed={isPressed}
        onElementReady={setTriggerElement}
        style={{ ...style, ...((mergedProps as any).style || {}) }}
      >
        {buttonChildren}
      </BaseButton>
      {children && isTooltipVisible && (
        <div
          ref={setTooltipElement}
          style={tooltipProps.style}
          {...tooltipProps.attributes}
        >
          <FocusScope autoFocus>
            <InternalDropdownMenu
              ariaLabel={ariaLabel}
              onAction={onAction}
              onClose={onClose}
              className={className}
            >
              {children}
            </InternalDropdownMenu>
          </FocusScope>
        </div>
      )}
    </>
  );
}

function InternalDropdownMenu({
  ariaLabel,
  onAction,
  children,
  onClose,
  className,
}: {
  ariaLabel: string;
  className?: string;
  onAction: (key: React.Key) => void;
  onClose: () => void;
  children: JSX.Element[] | JSX.Element;
}) {
  useKeybindings(() => {
    return {
      Escape: () => {
        onClose();
        return true;
      },
    };
  }, [onClose]);

  // Create menu state based on the incoming props
  let state = useTreeState({ children, selectionMode: 'none' });

  // Get props for the menu element
  let ref = React.useRef<HTMLUListElement>(null);

  useWatchClickOutside(
    ref,
    useCallback(() => {
      onClose();
    }, [onClose]),
    useCallback(() => {}, []),
  );

  let { menuProps } = useMenu(
    { children, 'aria-label': ariaLabel },
    state,
    ref,
  );

  return (
    <ul
      {...menuProps}
      ref={ref}
      className={cx(
        'flex flex-col ui-bangle-button_dropdown-menu p-1 py-2 shadow-lg rounded-md',
        className,
      )}
    >
      {[...state.collection].map((section) => (
        <MenuItemSection
          key={section.key}
          section={section}
          state={state}
          onAction={onAction}
          onClose={onClose}
        />
      ))}
    </ul>
  );
}

function MenuItemSection({
  section,
  state,
  onAction,
  onClose,
}: {
  onAction: (key: React.Key) => void;
  state: TreeState<object>;
  section: Node<object>;
  onClose: () => void;
}) {
  let { itemProps, headingProps, groupProps } = useMenuSection({
    'heading': section.rendered,
    'aria-label': section['aria-label'],
  });

  let { separatorProps } = useSeparator({
    elementType: 'li',
  });

  // If the section is not the first, add a separator element.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() && (
        <li
          {...separatorProps}
          className="mx-1 my-2"
          style={{
            borderTop: '1px solid var(--window-border-color)',
          }}
        />
      )}
      <li {...itemProps}>
        {section.rendered && (
          <span {...headingProps} className="font-bold">
            {section.rendered}
          </span>
        )}
        <ul {...groupProps} className="p-0 list-outside">
          {[...section.childNodes].map((node) => (
            <MenuItemWrapper
              key={node.key}
              item={node}
              state={state}
              onAction={onAction}
              onClose={onClose}
            />
          ))}
        </ul>
      </li>
    </>
  );
}

function MenuItemWrapper({
  item,
  state,
  onAction,
  onClose,
}: {
  onAction: (key: React.Key) => void;
  state: TreeState<object>;
  item: Node<object>;
  onClose: () => void;
}) {
  // Get props for the menu item element
  let ref = React.useRef<HTMLLIElement>(null);
  let isDisabled = state.disabledKeys.has(item.key);

  let { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      onAction,
      onClose,
    },
    state,
    ref,
  );

  // Handle focus events so we can apply highlighted
  // style to the focused menu item
  let [isFocused, setFocused] = React.useState(false);
  let { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={cx(
        'ui-bangle-button_dropdown-menu-item outline-none cursor-pointer text-sm rounded-md px-2 py-1',
        isFocused && 'is-focused',
      )}
    >
      {item.rendered}
    </li>
  );
}