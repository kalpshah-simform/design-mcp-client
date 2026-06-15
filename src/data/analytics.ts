export type DateRange = "7d" | "30d" | "90d";

export interface KPI {
  id: string;
  label: string;
  value: string;
  trend: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface Chart {
  id: string;
  title: string;
  type: "line" | "bar";
  data: ChartDataPoint[];
}

export interface Activity {
  id: string;
  date: string;
  event: string;
  user: string;
  status: "active" | "inactive" | "pending";
  amount: number;
}

export interface AnalyticsData {
  kpis: KPI[];
  charts: Chart[];
  activities: Activity[];
}

const MOCK_DATA: Record<DateRange, AnalyticsData> = {
  "7d": {
    kpis: [
      { id: "revenue", label: "Total Revenue", value: "$45,231.89", trend: 12 },
      { id: "users", label: "Active Users", value: "2,847", trend: -3 },
      { id: "conversion", label: "Conversion Rate", value: "3.24%", trend: 8 },
      {
        id: "duration",
        label: "Avg. Session Duration",
        value: "4m 32s",
        trend: 2,
      },
    ],
    charts: [
      {
        id: "revenue-chart",
        title: "Revenue Over Time",
        type: "line",
        data: [
          { label: "Mon", value: 5200 },
          { label: "Tue", value: 6800 },
          { label: "Wed", value: 5100 },
          { label: "Thu", value: 7200 },
          { label: "Fri", value: 8100 },
          { label: "Sat", value: 6500 },
          { label: "Sun", value: 5800 },
        ],
      },
      {
        id: "traffic-chart",
        title: "Traffic by Channel",
        type: "bar",
        data: [
          { label: "Organic", value: 1240 },
          { label: "Direct", value: 890 },
          { label: "Referral", value: 420 },
          { label: "Social", value: 297 },
        ],
      },
    ],
    activities: [
      {
        id: "act-1",
        date: "2024-06-15",
        event: "User signup",
        user: "alice@example.com",
        status: "active",
        amount: 0,
      },
      {
        id: "act-2",
        date: "2024-06-14",
        event: "Purchase",
        user: "bob@example.com",
        status: "active",
        amount: 249.99,
      },
      {
        id: "act-3",
        date: "2024-06-13",
        event: "Support ticket",
        user: "charlie@example.com",
        status: "pending",
        amount: 0,
      },
      {
        id: "act-4",
        date: "2024-06-12",
        event: "Account upgrade",
        user: "diana@example.com",
        status: "active",
        amount: 99.99,
      },
      {
        id: "act-5",
        date: "2024-06-11",
        event: "Export request",
        user: "eve@example.com",
        status: "inactive",
        amount: 0,
      },
    ],
  },
  "30d": {
    kpis: [
      { id: "revenue", label: "Total Revenue", value: "$182,456.34", trend: 24 },
      { id: "users", label: "Active Users", value: "8,234", trend: 18 },
      { id: "conversion", label: "Conversion Rate", value: "2.98%", trend: -2 },
      {
        id: "duration",
        label: "Avg. Session Duration",
        value: "5m 12s",
        trend: 7,
      },
    ],
    charts: [
      {
        id: "revenue-chart",
        title: "Revenue Over Time",
        type: "line",
        data: [
          { label: "Week 1", value: 38200 },
          { label: "Week 2", value: 42100 },
          { label: "Week 3", value: 51800 },
          { label: "Week 4", value: 50356 },
        ],
      },
      {
        id: "traffic-chart",
        title: "Traffic by Channel",
        type: "bar",
        data: [
          { label: "Organic", value: 4240 },
          { label: "Direct", value: 2890 },
          { label: "Referral", value: 1420 },
          { label: "Social", value: 684 },
        ],
      },
    ],
    activities: [
      {
        id: "act-1",
        date: "2024-06-15",
        event: "User signup",
        user: "alice@example.com",
        status: "active",
        amount: 0,
      },
      {
        id: "act-2",
        date: "2024-06-14",
        event: "Purchase",
        user: "bob@example.com",
        status: "active",
        amount: 249.99,
      },
      {
        id: "act-3",
        date: "2024-06-13",
        event: "Support ticket",
        user: "charlie@example.com",
        status: "pending",
        amount: 0,
      },
    ],
  },
  "90d": {
    kpis: [
      { id: "revenue", label: "Total Revenue", value: "$542,123.78", trend: 38 },
      { id: "users", label: "Active Users", value: "24,857", trend: 42 },
      { id: "conversion", label: "Conversion Rate", value: "3.12%", trend: 5 },
      {
        id: "duration",
        label: "Avg. Session Duration",
        value: "5m 48s",
        trend: 14,
      },
    ],
    charts: [
      {
        id: "revenue-chart",
        title: "Revenue Over Time",
        type: "line",
        data: [
          { label: "Mar", value: 128200 },
          { label: "Apr", value: 156400 },
          { label: "May", value: 178300 },
          { label: "Jun", value: 179223 },
        ],
      },
      {
        id: "traffic-chart",
        title: "Traffic by Channel",
        type: "bar",
        data: [
          { label: "Organic", value: 12400 },
          { label: "Direct", value: 8200 },
          { label: "Referral", value: 4800 },
          { label: "Social", value: 2100 },
        ],
      },
    ],
    activities: [
      {
        id: "act-1",
        date: "2024-06-15",
        event: "User signup",
        user: "alice@example.com",
        status: "active",
        amount: 0,
      },
      {
        id: "act-2",
        date: "2024-06-14",
        event: "Purchase",
        user: "bob@example.com",
        status: "active",
        amount: 249.99,
      },
      {
        id: "act-3",
        date: "2024-06-13",
        event: "Support ticket",
        user: "charlie@example.com",
        status: "pending",
        amount: 0,
      },
    ],
  },
};

export async function fetchAnalyticsData(
  dateRange: DateRange
): Promise<
  | { success: true; data: AnalyticsData }
  | { success: false; error: string }
> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = MOCK_DATA[dateRange];
      if (data) {
        resolve({ success: true, data });
      } else {
        resolve({ success: false, error: "Invalid date range" });
      }
    }, 800);
  });
}
