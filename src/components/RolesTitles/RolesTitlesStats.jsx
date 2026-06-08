import { UserCog, BriefcaseBusiness, UsersRound, Tag } from "lucide-react";

export default function RolesTitlesStats() {
  const stats = [
    { title: "Total Roles", value: "32", subtitle: "System roles", icon: UserCog, color: "blue" },
    { title: "Total Titles", value: "78", subtitle: "Job titles", icon: BriefcaseBusiness, color: "green" },
    { title: "Active", value: "96%", subtitle: "105 active", icon: UsersRound, color: "purple" },
    { title: "Inactive", value: "4%", subtitle: "5 inactive", icon: Tag, color: "orange" },
  ];

  return (
    <div className="roles-titles-stats">
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