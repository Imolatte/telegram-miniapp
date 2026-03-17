export function Spinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className="w-8 h-8 border-3 rounded-full animate-spin"
        style={{
          borderColor: "var(--tg-theme-section-separator-color)",
          borderTopColor: "var(--tg-theme-button-color)",
        }}
      />
    </div>
  );
}
