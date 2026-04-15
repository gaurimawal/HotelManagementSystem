import { useMemo, useState } from "react";
import { UIContext } from "./UIContextDef";

export function UIProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);

  const showAlert = (message, variant = "success") => {
    setAlert({ message, variant });
    setTimeout(() => setAlert(null), 2600);
  };

  const value = useMemo(() => ({ alert, globalLoading, setGlobalLoading, showAlert }), [alert, globalLoading]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
