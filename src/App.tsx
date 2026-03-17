import { Routes, Route } from "react-router-dom";
import { TabBar } from "@/components/TabBar";
import { Dashboard } from "@/pages/Dashboard";
import { Feed } from "@/pages/Feed";
import { Create } from "@/pages/Create";
import { Settings } from "@/pages/Settings";

export function App() {
  return (
    <div
      className="h-full flex flex-col"
      style={{ backgroundColor: "var(--tg-theme-secondary-bg-color)" }}
    >
      <main className="flex-1 scroll-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/create" element={<Create />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <TabBar />
    </div>
  );
}
