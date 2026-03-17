interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="px-4 pt-4 pb-2">
      <h1
        className="text-[28px] font-bold leading-tight"
        style={{ color: "var(--tg-theme-text-color)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="text-[15px] mt-1"
          style={{ color: "var(--tg-theme-hint-color)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
