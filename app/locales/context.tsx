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

// Ülke kodu → dil eşleştirmesi
const ULKE_DIL: Record<string, Dil> = {
  // Türkçe
  TR: "tr",
  // Almanca
  DE: "de", AT: "de", CH: "de",
  // Arapça
  SA: "ar", AE: "ar", KW: "ar", QA: "ar", BH: "ar", OM: "ar",
  EG: "ar", JO: "ar", LB: "ar", IQ: "ar", SY: "ar", YE: "ar",
  LY: "ar", TN: "ar", DZ: "ar", MA: "ar", SD: "ar",
  // Rusça
  RU: "ru", UA: "ru", BY: "ru", KZ: "ru", UZ: "ru",
  AZ: "ru", GE: "ru", AM: "ru", TM: "ru", KG: "ru",
  // Fransızca
  FR: "fr", BE: "fr", LU: "fr", SN: "fr", CI: "fr",
  CM: "fr", CD: "fr", MG: "fr", ML: "fr", BF: "fr",
  // Diğer her şey → İngilizce
};

interface DilContext {
  dil: Dil;
  t: Translations;
  dilDegistir: (dil: Dil) => void;
  rtl: boolean;
}

const DilContext = createContext<DilContext>({
  dil: "en",
  t: en,
  dilDegistir: () => {},
  rtl: false,
});

export function DilProvider({ children }: { children: ReactNode }) {
  const [dil, setDil] = useState<Dil>("en");

  useEffect(() => {
    async function dilBelirle() {
      // 1. Önce localStorage'a bak — kullanıcı daha önce seçmiş mi?
      const kayitliDil = localStorage.getItem("dil") as Dil;
      if (kayitliDil && ["tr", "en", "de", "ar", "ru", "fr"].includes(kayitliDil)) {
        setDil(kayitliDil);
        return;
      }

      // 2. Tarayıcı dil tercihine bak
      const tarayiciDil = navigator.language?.slice(0, 2).toLowerCase();
      const tarayiciDilMap: Record<string, Dil> = {
        tr: "tr", de: "de", ar: "ar", ru: "ru", fr: "fr",
      };
      if (tarayiciDil && tarayiciDilMap[tarayiciDil]) {
        setDil(tarayiciDilMap[tarayiciDil]);
        return;
      }

      // 3. IP'den ülke tespiti
      try {
        const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
        const data = await res.json();
        const ulkeDil = ULKE_DIL[data.country_code as string];
        if (ulkeDil) {
          setDil(ulkeDil);
          return;
        }
      } catch {
        // IP tespiti başarısız — sessizce geç
      }

      // 4. Hiçbiri yoksa İngilizce
      setDil("en");
    }

    dilBelirle();
  }, []);

  useEffect(() => {
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
