import { Eye, Pencil, PauseCircle, PlayCircle } from "lucide-react";
import PositionStatusBadge from "./PositionStatusBadge";
import {
  useSetPositionActive,
  useSetPositionInactive,
} from "../../hooks/usePositions";

export default function PositionsTable({ positions, onView, onEdit }) {
  const inactiveMutation = useSetPositionInactive();
  const activeMutation = useSetPositionActive();

  return (
    <div className="positions-table-card">
      <table className="positions-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Position Code</th>
            <th>Position Name</th>
            <th>Department</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {positions.map((position, index) => {
            const isActive = position.active !== false;

            return (
              <tr key={position.id}>
                <td>{index + 1}</td>

                <td>
                  <span className="position-code">
                    {position.code || position.positionCode || "-"}
                  </span>
                </td>

                <td>
                  <strong>{position.name}</strong>
                </td>

                <td>{position.departmentName || position.department?.name || "-"}</td>
                <td>{position.description || "-"}</td>

                <td>
                  <PositionStatusBadge active={isActive} />
                </td>

                <td>{position.assignedCount || position.assignedTo || 0}</td>

                <td>
                  <div className="position-actions">
                    <button
                      className="view-btn"
                      title="View position"
                      onClick={() => onView?.(position)}
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className="edit-btn"
                      title="Edit position"
                      onClick={() => onEdit?.(position)}
                    >
                      <Pencil size={16} />
                    </button>

                    {isActive ? (
                      <button
                        className="deactivate-btn"
                        title="Deactivate position"
                        disabled={inactiveMutation.isPending}
                        onClick={() => inactiveMutation.mutate(position.id)}
                      >
                        <PauseCircle size={16} />
                      </button>
                    ) : (
                      <button
                        className="reactivate-btn"
                        title="Activate position"
                        disabled={activeMutation.isPending}
                        onClick={() => activeMutation.mutate(position.id)}
                      >
                        <PlayCircle size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}

          {positions.length === 0 && (
            <tr>
              <td colSpan="8" className="empty-row">
                No positions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}