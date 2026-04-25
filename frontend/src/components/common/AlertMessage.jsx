export default function AlertMessage({ message, variant = "info" }) {
  if (!message) return null;
  return <div className={`alert alert-${variant}`}>{message}</div>;
}
