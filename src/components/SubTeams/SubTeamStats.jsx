import { UsersRound, Users, Building2, Activity } from "lucide-react";

export default function SubTeamStats() {
  const stats = [
    {
      title: "Total Sub Teams",
      value: "25",
      subtitle: "Across all departments",
      icon: UsersRound,
      color: "blue",
    },
    {
      title: "Total Members",
      value: "142",
      subtitle: "Across all sub teams",
      icon: Users,
      color: "green",
    },
    {
      title: "Departments",
      value: "12",
      subtitle: "Have sub teams",
      icon: Building2,
      color: "purple",
    },
    {
      title: "Active Sub Teams",
      value: "23",
      subtitle: "92% are active",
      icon: Activity,
      color: "orange",
    },
  ];

  return (
    <div className="subteam-stats">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="stat-card" key={stat.title}>
            <div className={`icon-box ${stat.color}`}>
              <Icon size={22} />
            </div>

            <div>
              <h4>{stat.title}</h4>
              <h2>{stat.value}</h2>
              <p>{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}