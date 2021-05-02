import React, { useRef, useState, useEffect } from 'react';

import {
  NullIcon,
  PaletteInfo,
  PaletteInfoItem,
  PaletteInput,
  PaletteItemsContainer,
  SidebarRow,
  usePaletteProps,
} from 'ui-components/index';
import { cx } from 'utils/utility';
import { PathValidationError } from 'workspace';
import { INPUT_PALETTE, PaletteTypeBase } from '../paletteTypes';

export class InputPalette extends PaletteTypeBase {
  static type = INPUT_PALETTE;
  static identifierPrefix = null;
  static description = 'Input';
  static UIComponent = InputPaletteUIComponent;
  static placeholder = '';
  static keybinding = null;
  // Donot parse any raw query
  static parseRawQuery(rawQuery) {
    return null;
  }
  static helpComponent = (
    <>
      <span className="font-semibold text-xs">
        <kbd>Enter</kbd> Confirm
      </span>
      <span className="font-semibold text-xs">
        <kbd>Escape</kbd> Cancel
      </span>
    </>
  );
}

function InputPaletteUIComponent({
  query,
  dismissPalette,
  updateQuery,
  rawInputValue,
  paletteInitialQuery,
  paletteMetadata,
  updatePalette,
}) {
  const [error, updateError] = useState();
  useEffect(() => {
    updateError(undefined);
  }, [query]);

  const resolvedItems = [
    !error && {
      uid: 'input-confirm',
      title: 'Confirm',
      onExecute: (item, itemIndex, event) => {
        event.preventDefault();
        return Promise.resolve(paletteMetadata.onInputConfirm(query))
          .then(() => {
            dismissPalette();
          })
          .catch((err) => {
            updateError(err);
            if (!(err instanceof PathValidationError)) {
              throw err;
            }
          });
      },
    },
    error && {
      uid: 'input-clear',
      title: 'Clear input and retry',
      onExecute: (item, itemIndex, event) => {
        event.preventDefault();
        updateQuery(paletteInitialQuery || '');
      },
    },
    {
      uid: 'input-cancel',
      title: 'Cancel',
      onExecute: (item, itemIndex, event) => {
        event.preventDefault();

        return Promise.resolve(paletteMetadata.onInputCancel?.(query))
          .then(() => {
            dismissPalette();
          })
          .catch((err) => {
            dismissPalette();
            throw err;
          });
      },
    },
  ].filter(Boolean);

  const { getItemProps, inputProps } = usePaletteProps({
    onDismiss: dismissPalette,
    resolvedItems,
    value: rawInputValue,
    updateValue: (rawQuery) => {
      updateQuery(rawQuery);
    },
  });

  return (
    <>
      <PaletteInput
        placeholder={paletteMetadata?.placeholder}
        ref={useRef()}
        className={cx(
          error && 'focus:outline-none focus:ring  focus:ring-red-600',
        )}
        paletteIcon={
          <span className="pr-2 flex items-center">
            <NullIcon className="h-5 w-5" />
          </span>
        }
        {...inputProps}
      />
      {error && (
        <SidebarRow
          style={{ backgroundColor: 'var(--error-bg-color)' }}
          title={
            <div className="flex flex-col">
              <span>🤦‍♀️ there was en error</span>
              <span className="ml-3 text-sm">
                {error.displayMessage || error.message}
              </span>
            </div>
          }
        />
      )}
      <PaletteItemsContainer>
        {resolvedItems.map((item, i) => {
          return (
            <SidebarRow
              dataId={item.uid}
              className="palette-row"
              key={item.uid}
              title={item.title}
              rightHoverIcon={item.rightHoverIcon}
              rightIcon={
                <kbd className="whitespace-nowrap">{item.rightIcon}</kbd>
              }
              {...getItemProps(item, i)}
            />
          );
        })}
      </PaletteItemsContainer>
      <PaletteInfo>
        {paletteMetadata?.paletteInfo && (
          <PaletteInfoItem>{paletteMetadata?.paletteInfo}</PaletteInfoItem>
        )}
        <PaletteInfoItem>use:</PaletteInfoItem>
        <PaletteInfoItem>
          <kbd className="font-normal">↑↓</kbd> to navigate
        </PaletteInfoItem>
        <PaletteInfoItem>
          <kbd className="font-normal">Esc</kbd> to cancel
        </PaletteInfoItem>
      </PaletteInfo>
    </>
  );
}