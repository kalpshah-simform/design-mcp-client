import { Card } from "../../../components/ui";
import type { Chart, ChartDataPoint } from "../../../data/analytics";

interface ChartsRowProps {
  charts: Chart[];
}

const CHART_HEIGHT_PX = 144;

function SimpleLineChart({ data }: { data: ChartDataPoint[] }) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="flex flex-col gap-md">
      <div
        className="flex items-end gap-xs"
        style={{ height: `${CHART_HEIGHT_PX}px` }}
      >
        {data.map((point, i) => {
          const heightPx = Math.max(
            ((point.value - minValue) / range) * CHART_HEIGHT_PX,
            6,
          );
          return (
            <div
              key={i}
              className="flex flex-1 items-end"
              style={{ height: `${CHART_HEIGHT_PX}px` }}
              title={`${point.label}: ${point.value.toLocaleString()}`}
            >
              <div
                className="w-full rounded-t bg-primary transition-all"
                style={{ height: `${heightPx}px` }}
                role="img"
                aria-label={`${point.label}: ${point.value}`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex gap-xs">
        {data.map((point, i) => (
          <div key={i} className="flex-1 text-center text-xs text-gray-600">
            {point.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleBarChart({ data }: { data: ChartDataPoint[] }) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex flex-col justify-between gap-sm py-xs">
      {data.map((point, i) => {
        const widthPercent = (point.value / maxValue) * 100;
        return (
          <div key={i} className="flex flex-col gap-xs">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>{point.label}</span>
              <span className="font-medium text-secondary">
                {point.value.toLocaleString()}
              </span>
            </div>
            <div className="w-full rounded-full bg-gray-100" style={{ height: '8px' }}>
              <div
                className="rounded-full bg-primary transition-all"
                style={{ width: `${widthPercent}%`, height: '8px' }}
                role="img"
                aria-label={`${point.label}: ${point.value}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ChartsRow({ charts }: ChartsRowProps) {
  return (
    <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
      {charts.map((chart) => (
        <Card key={chart.id} elevation="sm" padding="md">
          <h3 className="mb-md font-semibold text-secondary">{chart.title}</h3>
          {chart.type === "line" ? (
            <SimpleLineChart data={chart.data} />
          ) : (
            <SimpleBarChart data={chart.data} />
          )}
        </Card>
      ))}
    </div>
  );
}
