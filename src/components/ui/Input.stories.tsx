import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'date'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { type: 'text', placeholder: 'Enter text…', size: 'md' },
};

export const Email: Story = {
  args: { type: 'email', placeholder: 'name@example.com', size: 'md' },
};

export const Password: Story = {
  args: { type: 'password', placeholder: '••••••••', size: 'md' },
};

export const Disabled: Story = {
  args: { type: 'text', placeholder: 'Not editable', size: 'md', disabled: true },
};
