import { useContext } from "react";
import { UIContext } from "./UIContextDef";

export const useUI = () => useContext(UIContext);
