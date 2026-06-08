import {
  Building2,
  Users,
  FolderTree,
  PieChart,
} from "lucide-react";

export default function DepartmentStats() {
  const stats = [
    {
      title: "Total Departments",
      value: "12",
      icon: Building2,
      color: "blue",
    },
    {
      title: "Total Employees",
      value: "248",
      icon: Users,
      color: "green",
    },
    {
      title: "Sub Teams",
      value: "25",
      icon: FolderTree,
      color: "purple",
    },
    {
      title: "Active Departments",
      value: "11",
      icon: PieChart,
      color: "orange",
    },
  ];

  return (
    <div className="department-stats">
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