export const ROLE_USER = [
  { label: "Admin", value: "ADMIN" },
  { label: "Manager", value: "MANAGER" },
  { label: "User", value: "USER" },
];

export const STATUS_TASK = [
  { label: "Todo", value: "TODO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Done", value: "DONE" },
];

export const PRIORITY_TASK = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
];

export const DEFAULT_CREATE_TASK_FORM_FIELDS_SYNCH = {
  title: "",
  description: "",
  status: STATUS_TASK[0].value,
  priority: PRIORITY_TASK[0].value,
  deadline: "",
  // assignedTo: assignedToOptions[0]?.value || "",
};
