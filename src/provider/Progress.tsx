"use client";
import {
  createContext,
  useContext,
  useCallback,
  ReactNode,
  useEffect,
  useLayoutEffect,
} from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { usePathname } from "next/navigation";
type NProgressContextType = {
  startProgress: () => void;
  stopProgress: (path: string) => void;
};
const NProgressContext = createContext<NProgressContextType | undefined>(
  undefined
);
interface NProgressProviderProps {
  children: ReactNode;
}
export const NProgressProvider = ({ children }: NProgressProviderProps) => {
  const pathName = usePathname();
  NProgress.configure({ showSpinner: false });
  const startProgress = useCallback(() => {
    NProgress.start();
  }, []);
  const stopProgress = useCallback(
    (path: string) => {
      if (pathName === path) {
        NProgress.done();
      }
    },
    [pathName]
  );
  useEffect(() => {
    stopProgress(pathName);
  }, [pathName]);
  return (
    <NProgressContext.Provider value={{ startProgress, stopProgress }}>
      {children}
    </NProgressContext.Provider>
  );
};
export const useNProgress = () => {
  const context = useContext(NProgressContext);
  if (!context) {
    throw new Error("useNProgress must be used within a NProgressProvider");
  }
  return context;
};
