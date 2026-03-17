import { useCallback, useEffect, useMemo, useState } from "react";
import type { TelegramUser, ThemeParams, WebApp } from "@/types/telegram";

const FALLBACK_USER: TelegramUser = {
  id: 0,
  first_name: "Demo",
  last_name: "User",
  username: "demo_user",
  language_code: "en",
};

function getWebApp(): WebApp | null {
  return window.Telegram?.WebApp ?? null;
}

export function useTelegram() {
  const webApp = useMemo(() => getWebApp(), []);
  const [colorScheme, setColorScheme] = useState<"light" | "dark">(
    webApp?.colorScheme ?? "light",
  );

  const user: TelegramUser = webApp?.initDataUnsafe?.user ?? FALLBACK_USER;
  const isTelegram = webApp !== null && webApp.initData !== "";

  const themeParams: ThemeParams = useMemo(
    () => webApp?.themeParams ?? {},
    [webApp],
  );

  useEffect(() => {
    if (!webApp) return;
    webApp.ready();
    webApp.expand();
  }, [webApp]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const wa = getWebApp();
      if (wa) setColorScheme(wa.colorScheme);
    };

    window.addEventListener("themeChanged", handleThemeChange);
    return () => window.removeEventListener("themeChanged", handleThemeChange);
  }, []);

  const haptic = useCallback(
    (type: "light" | "medium" | "heavy" = "light") => {
      webApp?.HapticFeedback?.impactOccurred(type);
    },
    [webApp],
  );

  const showAlert = useCallback(
    (message: string) => {
      if (webApp) {
        webApp.showAlert(message);
      } else {
        alert(message);
      }
    },
    [webApp],
  );

  return {
    webApp,
    user,
    isTelegram,
    colorScheme,
    themeParams,
    haptic,
    showAlert,
  };
}
