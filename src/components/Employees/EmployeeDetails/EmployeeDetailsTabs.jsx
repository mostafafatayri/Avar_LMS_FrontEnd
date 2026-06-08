const tabs = [
  { key: "employee", label: "Employee Information" },
  { key: "company", label: "Company Information" },
  { key: "bank", label: "Bank Details" },
  { key: "documents", label: "Documents" },
  { key: "emergency", label: "Emergency Contact" },
  { key: "skills", label: "Skills" },
  { key: "additional", label: "Additional Information" },
];

export default function EmployeeDetailsTabs({ activeTab, onChange }) {
  return (
    <div className="employee-details-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={activeTab === tab.key ? "active" : ""}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}