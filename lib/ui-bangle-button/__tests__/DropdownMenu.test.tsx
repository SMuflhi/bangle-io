import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';

import { sleep } from '@bangle.io/utils';

import { DropdownMenu, MenuItem, MenuSection } from '../DropdownMenu';

let result, onAction;
beforeEach(() => {
  onAction = jest.fn();
  result = render(
    <div>
      <DropdownMenu
        menuPlacement="right-start"
        ariaLabel="test-label"
        buttonAriaLabel=""
        buttonStyling={{
          activeColor: 'test-active-color',
        }}
        buttonClassName="test-button-class"
        buttonChildren={<span>button child</span>}
        onAction={onAction}
      >
        <MenuSection aria-label="misc-test">
          <MenuItem aria-label="new note" key="test-k-1">
            New note
          </MenuItem>
          <MenuItem key="c">New workspace</MenuItem>
          <MenuItem key="test-k-3">Switch workspace</MenuItem>
        </MenuSection>
      </DropdownMenu>
    </div>,
  );
});
test('renders correctly', () => {
  expect(result.container).toMatchInlineSnapshot(`
    <div>
      <div>
        <button
          aria-label=""
          aria-pressed="false"
          class="test-button-class ui-bangle-button_button p-1  transition-all duration-100"
          type="button"
        >
          <span>
            button child
          </span>
        </button>
      </div>
    </div>
  `);
});

test('button clicks', async () => {
  act(() => {
    fireEvent.click(screen.getByRole('button'));
  });

  let element = await waitFor(() => screen.getByLabelText('test-label'));

  expect(element).toMatchInlineSnapshot(`
    <ul
      aria-label="test-label"
      class="flex flex-col ui-bangle-button_dropdown-menu p-1 py-2 shadow-lg rounded-md"
      role="menu"
      tabindex="0"
    >
      <li
        role="presentation"
      >
        <ul
          aria-label="misc-test"
          class="p-0 list-outside"
          role="group"
        >
          <li
            aria-disabled="false"
            class="ui-bangle-button_dropdown-menu-item outline-none cursor-pointer text-sm rounded-md px-2 py-1"
            data-key="test-k-1"
            role="menuitem"
            tabindex="-1"
          >
            New note
          </li>
          <li
            aria-disabled="false"
            class="ui-bangle-button_dropdown-menu-item outline-none cursor-pointer text-sm rounded-md px-2 py-1"
            data-key="c"
            role="menuitem"
            tabindex="-1"
          >
            New workspace
          </li>
          <li
            aria-disabled="false"
            class="ui-bangle-button_dropdown-menu-item outline-none cursor-pointer text-sm rounded-md px-2 py-1"
            data-key="test-k-3"
            role="menuitem"
            tabindex="-1"
          >
            Switch workspace
          </li>
        </ul>
      </li>
    </ul>
  `);
});