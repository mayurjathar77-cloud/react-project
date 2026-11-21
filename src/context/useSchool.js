import { useContext } from "react";
import { SchoolContext } from "./schoolContextValue";

export function useSchool() {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error("useSchool must be used inside SchoolProvider");
  }
  return context;
}

export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
