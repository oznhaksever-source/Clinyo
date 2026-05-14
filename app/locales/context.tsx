"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import tr from "./tr";
import en from "./en";
import de from "./de";
import ar from "./ar";
import ru from "./ru";
import fr from "./fr";
import type { Translations } from "./tr";

type Dil = "tr" | "en" | "de" | "ar" | "ru" | "fr";

const çeviriler: Record<Dil, Translations> = { tr, en, de, ar, ru, fr };

interface DilContext {
  dil: Dil;
  t: Translations;
  dilDegistir: (dil: Dil) => void;
  rtl: boolean;
}

const DilContext = createContext<DilContext>({
  dil: "tr",
  t: tr,
  dilDegistir: () => {},
  rtl: false,
});

export function DilProvider({ children }: { children: ReactNode }) {
  const [dil, setDil] = useState<Dil>("tr");

  useEffect(() => {
    const kayitliDil = localStorage.getItem("dil") as Dil;
    if (kayitliDil && ["tr", "en", "de", "ar", "ru", "fr"].includes(kayitliDil)) {
      setDil(kayitliDil);
    }
  }, []);

  useEffect(() => {
    // RTL desteği — Arapça için
    document.documentElement.dir = dil === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = dil;
  }, [dil]);

  function dilDegistir(yeniDil: Dil) {
    setDil(yeniDil);
    localStorage.setItem("dil", yeniDil);
  }

  const rtl = dil === "ar";

  return (
    <DilContext.Provider value={{ dil, t: çeviriler[dil], dilDegistir, rtl }}>
      {children}
    </DilContext.Provider>
  );
}

export function useDil() {
  return useContext(DilContext);
}
