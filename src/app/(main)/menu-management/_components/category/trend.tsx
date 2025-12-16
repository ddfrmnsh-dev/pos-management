type TrendProps = {
  value: string;
  icon: React.ReactNode;
  color: string;
};

function Trend({ value, icon, color }: TrendProps) {
  return (
    <div className={`flex items-center gap-1 text-sm font-semibold ${color}`}>
      {icon}
      {value}
    </div>
  );
}

export default Trend;
