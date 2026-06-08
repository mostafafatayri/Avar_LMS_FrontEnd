import {
  Users,
  UserPlus,
  UserCheck,
  UserX,
} from "lucide-react";

//import "./EmployeeStats.scss";

export default function EmployeeStats() {
  const stats = [
    {
      title: "Total Employees",
      value: "248",
      icon: Users,
      color: "blue",
    },
    {
      title: "New This Month",
      value: "18",
      icon: UserPlus,
      color: "green",
    },
    {
      title: "Active Employees",
      value: "230",
      icon: UserCheck,
      color: "yellow",
    },
    {
      title: "Inactive Employees",
      value: "18",
      icon: UserX,
      color: "purple",
    },
  ];

  return (
    <div className="employee-stats">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
