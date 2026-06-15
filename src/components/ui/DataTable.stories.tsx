import type { Meta, StoryObj } from '@storybook/react-vite';
import DataTable, { type Column } from './DataTable';

interface Row {
  id: string;
  name: string;
  status: string;
  owner: string;
}

const COLUMNS: Column<Row>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
  { key: 'owner', header: 'Owner' },
];

const ROWS: Row[] = [
  { id: '1', name: 'Alpha', status: 'Active', owner: 'Alice' },
  { id: '2', name: 'Beta', status: 'Inactive', owner: 'Bob' },
  { id: '3', name: 'Gamma', status: 'Active', owner: 'Carol' },
  { id: '4', name: 'Delta', status: 'Pending', owner: 'Dave' },
  { id: '5', name: 'Epsilon', status: 'Active', owner: 'Eve' },
  { id: '6', name: 'Zeta', status: 'Inactive', owner: 'Frank' },
];

const meta = {
  title: 'UI/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    density: { control: 'radio', options: ['compact', 'comfortable'] },
    pagination: { control: 'boolean' },
    pageSize: { control: 'number' },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutPagination: Story = {
  args: {
    columns: COLUMNS as Column<Record<string, unknown>>[],
    rows: ROWS as Record<string, unknown>[],
    caption: 'Sample table',
    density: 'comfortable',
    pagination: false,
  },
};

export const WithPagination: Story = {
  args: {
    columns: COLUMNS as Column<Record<string, unknown>>[],
    rows: ROWS as Record<string, unknown>[],
    caption: 'Paginated table',
    density: 'comfortable',
    pagination: true,
    pageSize: 3,
  },
};

export const Compact: Story = {
  args: {
    columns: COLUMNS as Column<Record<string, unknown>>[],
    rows: ROWS as Record<string, unknown>[],
    caption: 'Compact table',
    density: 'compact',
    pagination: true,
    pageSize: 4,
  },
};
