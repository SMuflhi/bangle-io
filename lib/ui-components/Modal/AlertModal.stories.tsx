import '../style';

import { OverlayProvider } from '@react-aria/overlays';
import type { Story } from '@storybook/react';
import React, { useCallback } from 'react';

import { ActionButton, ButtonContent } from '@bangle.io/ui-bangle-button';

import { AlertModal } from './AlertModal';

export default {
  title: 'ui-components/AlertModal',
  component: AlertModal,

  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story<Parameters<typeof AlertModal>[0]> = (args) => {
  const [show, setShow] = React.useState(false);

  args.onClose = useCallback(() => setShow(false), []);

  return (
    <div>
      <ActionButton
        ariaLabel="open"
        onPress={() => {
          setShow(true);
        }}
      >
        <ButtonContent text="Open modal" />
      </ActionButton>
      <OverlayProvider>
        {show && <AlertModal {...args}></AlertModal>}
      </OverlayProvider>
    </div>
  );
};

export const SimpleSubmit = Template.bind({});

SimpleSubmit.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Lorem ipsum`,
  isDismissable: true,
  headingTitle: 'This is a heading',
  primaryButtonConfig: {
    onPress: () => {},
    text: 'Submit',
  },
  heroImageUrl: 'https://i.imgur.com/Z7AzH2c.png',
};

export const Destructive = Template.bind({});

Destructive.args = {
  children: `You want to delete this?`,
  isDismissable: true,
  headingTitle: 'Oh no',
  primaryButtonConfig: {
    onPress: () => {},
    isDestructive: true,
    text: 'Delete',
  },
};

export const ScrollableParent: Story<Parameters<typeof AlertModal>[0]> = () => {
  const [show, setShow] = React.useState(false);

  const onClose = useCallback(() => setShow(false), []);

  return (
    <div style={{ maxWidth: 300 }}>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corporis
        libero? Consequuntur veniam perferendis soluta odit rem esse earum
        repellat officiis cum recusandae, quas facilis eos ad rerum quibusdam
        eligendi.
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corporis
        libero? Consequuntur veniam perferendis soluta odit rem esse earum
        repellat officiis cum recusandae, quas facilis eos ad rerum quibusdam
        eligendi.
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corporis
        libero? Consequuntur veniam perferendis soluta odit rem esse earum
        repellat officiis cum recusandae, quas facilis eos ad rerum quibusdam
        eligendi.
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corporis
        libero? Consequuntur veniam perferendis soluta odit rem esse earum
        repellat officiis cum recusandae, quas facilis eos ad rerum quibusdam
        eligendi.
      </div>
      <ActionButton
        ariaLabel="open"
        onPress={() => {
          setShow(true);
        }}
      >
        <ButtonContent text="Open modal" />
      </ActionButton>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corporis
        libero? Consequuntur veniam perferendis soluta odit rem esse earum
        repellat officiis cum recusandae, quas facilis eos ad rerum quibusdam
        eligendi.
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corporis
        libero? Consequuntur veniam perferendis soluta odit rem esse earum
        repellat officiis cum recusandae, quas facilis eos ad rerum quibusdam
        eligendi.
      </div>
      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, corporis
        libero? Consequuntur veniam perferendis soluta odit rem esse earum
        repellat officiis cum recusandae, quas facilis eos ad rerum quibusdam
        eligendi.
      </div>
      <OverlayProvider
        style={{
          zIndex: 'var(--BV-window-modal-z-index)',
        }}
      >
        {show && (
          <AlertModal onClose={onClose} isDismissable={true} headingTitle="Wow">
            I am the modal content
          </AlertModal>
        )}
      </OverlayProvider>
    </div>
  );
};