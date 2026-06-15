import { useEffect, useState } from "react";
import AnalyticsHeader from "./components/AnalyticsHeader";
import ChartsRow from "./components/ChartsRow";
import ErrorState from "./components/ErrorState";
import KPICards from "./components/KPICards";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";
import RecentActivityTable from "./components/RecentActivityTable";
import {
  fetchAnalyticsData,
  type AnalyticsData,
  type DateRange,
} from "../../data/analytics";

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>("7d");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAnalyticsData(dateRange)
      .then((result) => {
        if (!cancelled) {
          if (result.success) {
            setData(result.data);
          } else {
            setError(result.error);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch analytics",
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dateRange]);

  const handleExport = () => {
    if (data) {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics-${dateRange}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnalyticsHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onExport={handleExport}
        disabled={loading || error !== null}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-lg px-lg py-lg">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => {
              setError(null);
              setLoading(true);
            }}
          />
        ) : !data || data.activities.length === 0 ? (
          <EmptyState dateRange={dateRange} />
        ) : (
          <>
            <KPICards kpis={data.kpis} />
            <ChartsRow charts={data.charts} />
            <RecentActivityTable activities={data.activities} />
          </>
        )}
      </main>
    </div>
  );
}
