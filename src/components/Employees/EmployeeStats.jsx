import { Users, UserPlus, UserCheck, UserX } from "lucide-react";

export default function EmployeeStats({ employees = [] }) {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "ACTIVE").length;
  const inactiveEmployees = employees.filter((e) => e.status === "INACTIVE").length;

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "blue",
    },
    {
      title: "New This Month",
      value: 0,
      icon: UserPlus,
      color: "green",
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      icon: UserCheck,
      color: "yellow",
    },
    {
      title: "Inactive Employees",
      value: inactiveEmployees,
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