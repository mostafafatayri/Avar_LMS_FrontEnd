import { BookOpen, CheckCircle, Clock, UserCheck } from "lucide-react";

export default function MyTrainingsStats() {
  const stats = [
    {
      title: "TOTAL ASSIGNED",
      value: "0",
      icon: BookOpen,
    },
    {
      title: "COMPLETED",
      value: "0",
      icon: CheckCircle,
    },
    {
      title: "IN PROGRESS",
      value: "0",
      icon: Clock,
    },
    {
      title: "COMPLETION RATE",
      value: "0%",
      icon: UserCheck,
    },
  ];

  return (
    <div className="my-training-stats">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="my-training-stat-card" key={stat.title}>
            <div>
              <h4>{stat.title}</h4>
              <h2>{stat.value}</h2>
            </div>

            <div className="my-training-stat-icon">
              <Icon size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}