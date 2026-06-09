import { GitBranch } from "lucide-react";

export default function LearningPathsEmptyState() {
  return (
    <div className="learning-empty-card">
      <div className="learning-empty-icon">
        <GitBranch size={34} />
      </div>

      <h3>No learning paths</h3>
      <p>Create learning paths to define structured training journeys</p>
    </div>
  );
}