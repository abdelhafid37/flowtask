export function normalizeStatus(status = "") {
  return status.replace("-", " ");
}

export function statusStyle(status = "pending") {
  let className = "";
  switch (status) {
    case "pending":
      className = "bg-gray-500";
      break;
    case "in-progress":
      className = "bg-yellow-500";
      break;
    case "completed":
      className = "bg-green-500";
      break;
    default:
      className = "";
      break;
  }
  return className;
}
