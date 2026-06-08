import { Pencil, Trash2, Eye } from "lucide-react";
import "./TableActions.scss";

export default function TableActions({
  onView,
  onEdit,
  onDelete,
  showView = false,
  showEdit = true,
  showDelete = true,
}) {
  return (
    <div className="table-actions">
      {showView && (
        <button className="table-action-btn view" onClick={onView} title="View">
          <Eye size={16} />
        </button>
      )}

      {showEdit && (
        <button className="table-action-btn edit" onClick={onEdit} title="Edit">
          <Pencil size={16} />
        </button>
      )}

      {showDelete && (
        <button className="table-action-btn delete" onClick={onDelete} title="Delete">
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}