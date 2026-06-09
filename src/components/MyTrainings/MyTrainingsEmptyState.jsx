import { BookOpen } from "lucide-react";

export default function MyTrainingsEmptyState() {
  return (
    <div className="my-training-empty-card">
      <div className="my-training-empty-icon">
        <BookOpen size={32} />
      </div>

      <h3>No trainings assigned</h3>
      <p>Your assigned trainings will appear here</p>
    </div>
  );
}