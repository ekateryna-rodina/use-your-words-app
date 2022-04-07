import React, { useEffect } from "react";
import { useAppSelector } from "./app/hooks";
import AppRouter from "./components/AppRouter";

function App() {
  const { isDark } = useAppSelector((state) => state.theme);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDark);
  }, [isDark]);
  return (
    <div className="h-full">
      <AppRouter />
    </div>
  );
}

export default App;
