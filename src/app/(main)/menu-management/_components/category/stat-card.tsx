type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: React.ReactNode;
};

function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-900">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{title}</p>
          {trend}
        </div>

        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-xl font-semibold">{value}</h3>
        </div>

        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
export default StatCard;
