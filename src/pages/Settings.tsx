import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useTelegram } from "@/hooks/useTelegram";

interface ToggleProps {
  value: boolean;
  onChange: (val: boolean) => void;
}

function Toggle({ value, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="relative w-[51px] h-[31px] rounded-full border-none cursor-pointer transition-colors duration-200 shrink-0"
      style={{
        backgroundColor: value ? "var(--tg-theme-button-color)" : "var(--tg-theme-section-separator-color)",
      }}
    >
      <span
        className="absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ left: value ? "22px" : "2px" }}
      />
    </button>
  );
}

export function Settings() {
  const { user, isTelegram, colorScheme, haptic, showAlert } = useTelegram();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");
  const [sounds, setSounds] = useState(true);

  function handleToggle(setter: (v: boolean) => void, current: boolean) {
    haptic("light");
    setter(!current);
  }

  return (
    <>
      <PageHeader title="Settings" />

      {/* Profile card */}
      <div className="mx-4 mt-2 rounded-2xl p-4 flex items-center gap-4" style={{ backgroundColor: "var(--tg-theme-section-bg-color)" }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0"
          style={{
            backgroundColor: "var(--tg-theme-button-color)",
            color: "var(--tg-theme-button-text-color)",
          }}
        >
          {user.first_name[0]}
          {user.last_name?.[0] ?? ""}
        </div>
        <div className="min-w-0">
          <div
            className="text-[17px] font-semibold truncate"
            style={{ color: "var(--tg-theme-text-color)" }}
          >
            {user.first_name} {user.last_name ?? ""}
          </div>
          {user.username && (
            <div
              className="text-[15px] truncate"
              style={{ color: "var(--tg-theme-accent-text-color)" }}
            >
              @{user.username}
            </div>
          )}
          <div
            className="text-[13px] mt-0.5"
            style={{ color: "var(--tg-theme-hint-color)" }}
          >
            {isTelegram ? "Telegram User" : "Browser Preview"}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="tg-section-header mt-6">Preferences</div>
      <div className="tg-section">
        <div className="tg-list-item justify-between">
          <span className="text-[15px]" style={{ color: "var(--tg-theme-text-color)" }}>
            Notifications
          </span>
          <Toggle value={notifications} onChange={() => handleToggle(setNotifications, notifications)} />
        </div>
        <div className="tg-list-item justify-between">
          <span className="text-[15px]" style={{ color: "var(--tg-theme-text-color)" }}>
            Dark Mode
          </span>
          <Toggle value={darkMode} onChange={() => handleToggle(setDarkMode, darkMode)} />
        </div>
        <div className="tg-list-item justify-between">
          <span className="text-[15px]" style={{ color: "var(--tg-theme-text-color)" }}>
            Sound Effects
          </span>
          <Toggle value={sounds} onChange={() => handleToggle(setSounds, sounds)} />
        </div>
      </div>

      {/* About */}
      <div className="tg-section-header mt-6">About</div>
      <div className="tg-section">
        <div className="tg-list-item justify-between">
          <span className="text-[15px]" style={{ color: "var(--tg-theme-text-color)" }}>
            Version
          </span>
          <span className="text-[15px]" style={{ color: "var(--tg-theme-hint-color)" }}>
            1.0.0
          </span>
        </div>
        <div className="tg-list-item justify-between">
          <span className="text-[15px]" style={{ color: "var(--tg-theme-text-color)" }}>
            Platform
          </span>
          <span className="text-[15px]" style={{ color: "var(--tg-theme-hint-color)" }}>
            {isTelegram ? "Telegram" : "Web Browser"}
          </span>
        </div>
        <div className="tg-list-item justify-between">
          <span className="text-[15px]" style={{ color: "var(--tg-theme-text-color)" }}>
            Color Scheme
          </span>
          <span className="text-[15px]" style={{ color: "var(--tg-theme-hint-color)" }}>
            {colorScheme}
          </span>
        </div>
      </div>

      {/* Danger zone */}
      <div className="tg-section-header mt-6">Account</div>
      <div className="tg-section">
        <button
          className="tg-list-item w-full border-none cursor-pointer bg-transparent text-left"
          onClick={() => showAlert("Cache cleared!")}
        >
          <span className="text-[15px]" style={{ color: "var(--tg-theme-accent-text-color)" }}>
            Clear Cache
          </span>
        </button>
        <button
          className="tg-list-item w-full border-none cursor-pointer bg-transparent text-left"
          onClick={() => showAlert("This is a demo app — no data to delete.")}
        >
          <span className="text-[15px]" style={{ color: "var(--tg-theme-destructive-text-color)" }}>
            Delete Account
          </span>
        </button>
      </div>

      <div className="h-6" />
    </>
  );
}
