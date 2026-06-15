import { Card } from "../../../components/ui";
import type { KPI } from "../../../data/analytics";

interface KPICardsProps {
  kpis: KPI[];
}

function TrendIndicator({ trend }: { trend: number }) {
  const isPositive = trend >= 0;
  const color = isPositive ? "text-green-600" : "text-red-600";
  const symbol = isPositive ? "+" : "";

  return (
    <span
      className={`text-sm font-medium ${color}`}
      role="img"
      aria-label={`${isPositive ? "increase" : "decrease"} of ${Math.abs(trend)}%`}
    >
      {symbol}
      {trend}%
    </span>
  );
}

export default function KPICards({ kpis }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.id} elevation="sm" padding="md">
          <div className="flex flex-col gap-xs">
            <h3 className="text-sm font-medium text-gray-600">{kpi.label}</h3>
            <p className="text-xl font-bold text-secondary">{kpi.value}</p>
            <TrendIndicator trend={kpi.trend} />
          </div>
        </Card>
      ))}
    </div>
  );
}
