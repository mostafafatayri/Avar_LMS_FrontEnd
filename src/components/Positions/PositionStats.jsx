import { BriefcaseBusiness, CheckCircle2, PauseCircle, UsersRound } from "lucide-react";

export default function PositionStats({ positions }) {
  const total = positions.length;
  const active = positions.filter((p) => p.active !== false).length;
  const inactive = positions.filter((p) => p.active === false).length;
  const assigned = positions.reduce(
    (sum, p) => sum + Number(p.assignedCount || p.assignedTo || 0),
    0
  );

  return (
    <div className="position-stats">
      <div className="position-stat-card">
        <div className="stat-icon purple"><BriefcaseBusiness size={26} /></div>
        <div><span>Total Positions</span><strong>{total}</strong><p>All positions</p></div>
      </div>

      <div className="position-stat-card">
        <div className="stat-icon green"><CheckCircle2 size={26} /></div>
        <div><span>Active Positions</span><strong>{active}</strong><p>Currently active</p></div>
      </div>

      <div className="position-stat-card">
        <div className="stat-icon orange"><PauseCircle size={26} /></div>
        <div><span>Inactive Positions</span><strong>{inactive}</strong><p>Currently inactive</p></div>
      </div>

      <div className="position-stat-card">
        <div className="stat-icon blue"><UsersRound size={26} /></div>
        <div><span>Assigned Positions</span><strong>{assigned}</strong><p>Assigned to employees</p></div>
      </div>
    </div>
  );
}