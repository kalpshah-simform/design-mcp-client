import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    dismissible: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} title="Confirm Action">
          <p className="text-secondary">Are you sure you want to proceed?</p>
          <div className="mt-md flex justify-end gap-sm">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  },
  args: { size: 'md', dismissible: true },
};

export const Small: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open Small Modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} title="Notice">
          <p className="text-secondary">This is a small modal.</p>
        </Modal>
      </>
    );
  },
  args: { size: 'sm', dismissible: true },
};

export const NonDismissible: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Open Non-Dismissible</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} title="Required Action">
          <p className="text-secondary">You must complete this action before continuing.</p>
          <div className="mt-md flex justify-end">
            <Button variant="primary" onClick={() => setOpen(false)}>Acknowledge</Button>
          </div>
        </Modal>
      </>
    );
  },
  args: { size: 'md', dismissible: false },
};
