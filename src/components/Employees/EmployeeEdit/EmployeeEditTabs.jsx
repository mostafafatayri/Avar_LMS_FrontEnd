const tabs = [
  { key: "basic", label: "Basic Information" },
  { key: "company", label: "Company Information" },
  { key: "account", label: "Account Mapping" },
];

export default function EmployeeEditTabs({ activeTab, onChange }) {
  return (
    <div className="employee-edit-tabs">
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