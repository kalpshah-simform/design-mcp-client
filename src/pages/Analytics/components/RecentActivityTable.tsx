import { Card, DataTable, type Column } from "../../../components/ui";
import type { Activity } from "../../../data/analytics";

interface RecentActivityTableProps {
  activities: Activity[];
}

function StatusBadge({ status }: { status: Activity["status"] }) {
  const styles: Record<Activity["status"], string> = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700",
  };

  const labels: Record<Activity["status"], string> = {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
  };

  return (
    <span
      className={`inline-block rounded-md px-sm py-xs text-sm font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

const COLUMNS: Column<Activity>[] = [
  {
    key: "date",
    header: "Date",
    sortable: true,
  },
  {
    key: "event",
    header: "Event",
    sortable: true,
  },
  {
    key: "user",
    header: "User",
    sortable: false,
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "amount",
    header: "Amount",
    sortable: true,
    render: (row) => `$${row.amount.toFixed(2)}`,
  },
];

export default function RecentActivityTable({
  activities,
}: RecentActivityTableProps) {
  return (
    <Card elevation="none" padding="md">
      <h3 className="mb-md font-semibold text-secondary">Recent Activity</h3>
      <div className="overflow-x-auto">
        <DataTable<Activity>
          columns={COLUMNS}
          rows={activities}
          rowKey="id"
          density="comfortable"
          caption="Recent activity table with date, event, user, status, and amount columns"
        />
      </div>
    </Card>
  );
}
