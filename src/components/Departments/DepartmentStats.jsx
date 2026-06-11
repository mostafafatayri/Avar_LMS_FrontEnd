import { Building2, Users, FolderTree, PieChart } from "lucide-react";

export default function DepartmentStats({ departments = [] }) {
  const totalDepartments = departments.length;

  const activeDepartments = departments.filter((dept) => dept.active).length;

  const totalEmployees = departments.reduce(
    (sum, dept) => sum + (dept.employeeCount || 0),
    0
  );

  const totalSubTeams = departments.reduce(
    (sum, dept) => sum + (dept.subTeamCount || 0),
    0
  );

  const stats = [
    {
      title: "Total Departments",
      value: totalDepartments,
      icon: Building2,
      color: "blue",
    },
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: Users,
      color: "green",
    },
    {
      title: "Sub Teams",
      value: totalSubTeams,
      icon: FolderTree,
      color: "purple",
    },
    {
      title: "Active Departments",
      value: activeDepartments,
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