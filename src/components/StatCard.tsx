interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-2"
      style={{ backgroundColor: "var(--tg-theme-section-bg-color)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: trend.positive
                ? "rgba(52, 199, 89, 0.12)"
                : "rgba(255, 59, 48, 0.12)",
              color: trend.positive ? "#34c759" : "#ff3b30",
            }}
          >
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <div
          className="text-2xl font-bold"
          style={{ color: "var(--tg-theme-text-color)" }}
        >
          {value}
        </div>
        <div
          className="text-[13px] mt-0.5"
          style={{ color: "var(--tg-theme-hint-color)" }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
