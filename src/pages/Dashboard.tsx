import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { useTelegram } from "@/hooks/useTelegram";
import { fetchTodos, type Todo } from "@/lib/api";

export function Dashboard() {
  const { user, isTelegram } = useTelegram();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos(10).then(setTodos).catch(console.error);
  }, []);

  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  return (
    <>
      <PageHeader
        title={`Hi, ${user.first_name}`}
        subtitle={
          isTelegram
            ? "Welcome back to your dashboard"
            : "Running in browser preview mode"
        }
      />

      <div className="px-4 grid grid-cols-2 gap-3 mt-2">
        <StatCard
          icon="📊"
          label="Total Tasks"
          value={todos.length}
          trend={{ value: "+12%", positive: true }}
        />
        <StatCard
          icon="✅"
          label="Completed"
          value={completed}
          trend={{ value: `${todos.length ? Math.round((completed / todos.length) * 100) : 0}%`, positive: true }}
        />
        <StatCard icon="⏳" label="Pending" value={pending} />
        <StatCard
          icon="🔥"
          label="Streak"
          value="7 days"
          trend={{ value: "+2", positive: true }}
        />
      </div>

      {/* Recent activity */}
      <div className="mt-6">
        <div className="tg-section-header">Recent Activity</div>
        <div className="tg-section">
          {todos.slice(0, 5).map((todo) => (
            <div key={todo.id} className="tg-list-item">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 shrink-0"
                style={{
                  backgroundColor: todo.completed
                    ? "rgba(52, 199, 89, 0.12)"
                    : "rgba(255, 149, 0, 0.12)",
                  color: todo.completed ? "#34c759" : "#ff9500",
                }}
              >
                {todo.completed ? "✓" : "•"}
              </span>
              <span
                className="text-[15px] leading-tight line-clamp-1"
                style={{ color: "var(--tg-theme-text-color)" }}
              >
                {todo.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
