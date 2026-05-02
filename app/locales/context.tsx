"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import tr from "./tr";
import en from "./en";
import de from "./de";
import type { Translations } from "./tr";

type Dil = "tr" | "en" | "de";

const çeviriler: Record<Dil, Translations> = { tr, en, de };

interface DilContext {
  dil: Dil;
  t: Translations;
  dilDegistir: (dil: Dil) => void;
}

const DilContext = createContext<DilContext>({
  dil: "tr",
  t: tr,
  dilDegistir: () => {},
});

export function DilProvider({ children }: { children: ReactNode }) {
  const [dil, setDil] = useState<Dil>("tr");

  useEffect(() => {
    const kayitliDil = localStorage.getItem("dil") as Dil;
    if (kayitliDil && ["tr", "en", "de"].includes(kayitliDil)) {
      setDil(kayitliDil);
    }
  }, []);

  function dilDegistir(yeniDil: Dil) {
    setDil(yeniDil);
    localStorage.setItem("dil", yeniDil);
  }

  return (
    <DilContext.Provider value={{ dil, t: çeviriler[dil], dilDegistir }}>
      {children}
    </DilContext.Provider>
  );
}

export function useDil() {
  return useContext(DilContext);
}
