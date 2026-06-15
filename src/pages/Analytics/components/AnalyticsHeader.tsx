import { Button } from "../../../components/ui";
import type { DateRange } from "../../../data/analytics";

interface AnalyticsHeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onExport: () => void;
  disabled?: boolean;
}

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export default function AnalyticsHeader({
  dateRange,
  onDateRangeChange,
  onExport,
  disabled = false,
}: AnalyticsHeaderProps) {
  return (
    <header className="border-b border-gray-100 bg-surface shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-lg py-md">
        <h1 className="text-xl font-bold text-secondary">Analytics</h1>

        <div className="flex items-center gap-md">
          <div className="flex gap-sm">
            {DATE_RANGES.map((range) => (
              <Button
                key={range.value}
                variant={dateRange === range.value ? "primary" : "secondary"}
                size="sm"
                onClick={() => onDateRangeChange(range.value)}
                disabled={disabled}
                aria-pressed={dateRange === range.value}
              >
                {range.label}
              </Button>
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={onExport}
            disabled={disabled}
            aria-label="Export analytics data"
          >
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
