import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    elevation: { control: 'radio', options: ['none', 'sm', 'md'] },
    padding: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elevation: 'sm',
    padding: 'md',
    children: 'Card content goes here.',
  },
};

export const Flat: Story = {
  args: {
    elevation: 'none',
    padding: 'md',
    children: 'No shadow, border only.',
  },
};

export const Elevated: Story = {
  args: {
    elevation: 'md',
    padding: 'lg',
    children: 'Higher elevation with larger padding.',
  },
};
