import { BookOpen } from "lucide-react";

export default function TrainingCatalogueTable() {
  const trainings = [];

  if (trainings.length === 0) {
    return (
      <div className="training-empty-card">
        <div className="training-empty-icon">
          <BookOpen size={34} />
        </div>

        <h3>No trainings found</h3>
        <p>Create your training catalogue by adding trainings</p>
      </div>
    );
  }

  return (
    <div className="training-table-wrapper">
      <table className="training-table">
        <thead>
          <tr>
            <th>Training</th>
            <th>Code</th>
            <th>Category</th>
            <th>Type</th>
            <th>Status</th>
            <th>Trainer</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody></tbody>
      </table>
    </div>
  );
}