"use client";

import { createContext, useContext, useEffect, useState } from "react";
type Theme = "dark" | "light";
const ThemeContext = createContext<{theme: Theme; toggleTheme: () => void}>({ theme: "light", toggleTheme: () => {} });
export function useTheme(){ return useContext(ThemeContext); }
const STORAGE_KEY = "portfolio-theme";
export default function ThemeProvider({children}:{children:React.ReactNode}){
  const [theme,setTheme]=useState<Theme>(()=>{
    if(typeof window==="undefined") return "light";
    const current=document.documentElement.dataset.theme as Theme|undefined;
    if(current==="light"||current==="dark") return current;
    return window.innerWidth<768?"dark":"light";
  });
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem(STORAGE_KEY,theme)}catch{}},[theme]);
  return <ThemeContext.Provider value={{theme,toggleTheme:()=>setTheme(t=>t==="dark"?"light":"dark")}}>{children}</ThemeContext.Provider>;
}
