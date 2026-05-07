"use client";
import React, { useState } from "react";

const RENKLER: Record<string, string> = {
  implant: "#534AB7", kaplama: "#1D9E75", kanal: "#D85A30",
  cekim: "#E24B4A", dolgu: "#378ADD", default: "#e0ddf0"
};
const ISIMLER: Record<string, string> = {
  implant: "İmplant", kaplama: "Kaplama", kanal: "Kanal", cekim: "Çekim", dolgu: "Dolgu"
};
const TIPLER: Record<number, string> = {
  18:"Y",17:"B",16:"B",15:"K2",14:"K2",13:"C",12:"K",11:"K",
  21:"K",22:"K",23:"C",24:"K2",25:"K2",26:"B",27:"B",28:"Y",
  48:"Y",47:"B",46:"B",45:"K2",44:"K2",43:"C",42:"K",41:"K",
  31:"K",32:"K",33:"C",34:"K2",35:"K2",36:"B",37:"B",38:"Y"
};
const TIP_ISIM: Record<string, string> = {
  K:"Kesici", C:"Köpek dişi", K2:"Küçük azı", B:"Büyük azı", Y:"Yirmilik"
};

interface DisSemasiProps {
  onDegistir?: (tedaviPlan: Record<number, string>) => void;
}

export default function DisSemasi({ onDegistir }: DisSemasiProps) {
  const [tedaviler, setTedaviler] = useState<Record<number, string>>({});
  const [seciliDis, setSeciliDis] = useState<number | null>(null);

  const ustSira = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
  const altSira = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

  function tedaviSec(tip: string) {
    if (!seciliDis) return;
    const yeni = { ...tedaviler, [seciliDis]: tip };
    setTedaviler(yeni);
    onDegistir?.(yeni);
  }

  function tedaviKaldir() {
    if (!seciliDis) return;
    const yeni = { ...tedaviler };
    delete yeni[seciliDis];
    setTedaviler(yeni);
    setSeciliDis(null);
    onDegistir?.(yeni);
  }

  function hepsiniTemizle() {
    setTedaviler({});
    setSeciliDis(null);
    onDegistir?.({});
  }

  function DisSekli({ no, alt }: { no: number; alt: boolean }) {
    const tip = TIPLER[no];
    const renk = tedaviler[no] ? RENKLER[tedaviler[no]] : RENKLER.default;
    const secili = seciliDis === no;

    function getPath() {
      if (tip === "K") return alt
        ? `M7,4 Q6,16 8,26 Q14,34 20,26 Q22,16 21,4 Q14,0 7,4Z`
        : `M7,34 Q6,22 8,12 Q14,4 20,12 Q22,22 21,34 Q14,38 7,34Z`;
      if (tip === "C") return alt
        ? `M6,5 Q5,14 8,26 Q14,36 20,26 Q23,14 22,5 Q14,0 6,5Z`
        : `M6,33 Q5,24 8,12 Q14,2 20,12 Q23,24 22,33 Q14,38 6,33Z`;
      if (tip === "K2") return alt
        ? `M4,5 Q3,18 6,28 Q10,36 14,34 Q18,36 22,28 Q25,18 24,5 Q16,0 4,5Z`
        : `M4,33 Q3,20 6,10 Q10,2 14,4 Q18,2 22,10 Q25,20 24,33 Q16,38 4,33Z`;
      if (tip === "B") return alt
        ? `M3,6 Q2,20 5,29 Q9,36 14,35 Q19,36 23,29 Q26,20 25,6 Q16,1 3,6Z`
        : `M3,32 Q2,18 5,9 Q9,2 14,3 Q19,2 23,9 Q26,18 25,32 Q16,37 3,32Z`;
      return alt
        ? `M4,6 Q3,19 6,28 Q10,35 14,34 Q18,35 22,28 Q25,19 24,6 Q16,1 4,6Z`
        : `M4,32 Q3,19 6,10 Q10,3 14,4 Q18,3 22,10 Q25,19 24,32 Q16,37 4,32Z`;
    }

    const tumpaths: React.ReactElement[] = [];
    if (tip === "K2") {
      const y = alt ? 28 : 10;
      tumpaths.push(
        <ellipse key="1" cx={10} cy={y} rx={2.5} ry={3} fill="rgba(255,255,255,0.18)" />,
        <ellipse key="2" cx={18} cy={y} rx={2.5} ry={3} fill="rgba(255,255,255,0.18)" />
      );
    }
    if (tip === "B" || tip === "Y") {
      const y1 = alt ? 28 : 10; const y2 = alt ? 19 : 19;
      tumpaths.push(
        <ellipse key="1" cx={9} cy={y1} rx={3} ry={3.5} fill="rgba(255,255,255,0.2)" />,
        <ellipse key="2" cx={19} cy={y1} rx={3} ry={3.5} fill="rgba(255,255,255,0.2)" />,
        <ellipse key="3" cx={9} cy={y2} rx={2.5} ry={3} fill="rgba(255,255,255,0.12)" />,
        <ellipse key="4" cx={19} cy={y2} rx={2.5} ry={3} fill="rgba(255,255,255,0.12)" />
      );
    }

    return (
      <div
        onClick={() => setSeciliDis(seciliDis === no ? null : no)}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1px", cursor: "pointer" }}
      >
        {!alt && <span style={{ fontSize: "8px", color: secili ? "#534AB7" : "#94a3b8", fontWeight: secili ? 700 : 400 }}>{no}</span>}
        <svg
          width="26" height="36" viewBox="0 0 28 38"
          style={{ filter: secili ? "drop-shadow(0 0 3px rgba(83,74,183,0.8))" : "none", transition: "all 0.15s" }}
        >
          <path d={getPath()} fill={renk} stroke={secili ? "#534AB7" : "rgba(0,0,0,0.12)"} strokeWidth={secili ? 2 : 0.8} />
          {tumpaths}
          {tedaviler[no] === "cekim" && (
            <>
              <line x1={6} y1={8} x2={22} y2={30} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
              <line x1={22} y1={8} x2={6} y2={30} stroke="white" strokeWidth={2.5} strokeLinecap="round" />
            </>
          )}
        </svg>
        {alt && <span style={{ fontSize: "8px", color: secili ? "#534AB7" : "#94a3b8", fontWeight: secili ? 700 : 400 }}>{no}</span>}
      </div>
    );
  }

  // Özet
  const gruplar: Record<string, number[]> = {};
  for (const [no, tip] of Object.entries(tedaviler)) {
    if (!gruplar[tip]) gruplar[tip] = [];
    gruplar[tip].push(Number(no));
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* Legent */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginBottom: "12px" }}>
        {Object.entries(ISIMLER).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#64748b" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: RENKLER[k] }} />
            {v}
          </div>
        ))}
      </div>

      {/* Üst çene */}
      <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: "0 0 4px", letterSpacing: "0.5px" }}>ÜST ÇENE</p>
      <div style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
        {ustSira.map(no => <DisSekli key={no} no={no} alt={false} />)}
      </div>

      {/* Orta çizgi */}
      <div style={{ height: "3px", background: "#e5e7eb", margin: "6px 16px", borderRadius: "2px" }} />

      {/* Alt çene */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
        {altSira.map(no => <DisSekli key={no} no={no} alt={true} />)}
      </div>
      <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: "4px 0 0", letterSpacing: "0.5px" }}>ALT ÇENE</p>

      {/* Tedavi seçim paneli */}
      {seciliDis && (
        <div style={{ background: "#f8f9ff", borderRadius: "12px", border: "1px solid #EEEDFE", padding: "14px", marginTop: "14px" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f0d2e", marginBottom: "10px" }}>
            Diş {seciliDis} — {TIP_ISIM[TIPLER[seciliDis]]}
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {Object.entries(ISIMLER).map(([k, v]) => (
              <button
                key={k}
                onClick={() => tedaviSec(k)}
                style={{
                  padding: "6px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", fontWeight: 600,
                  background: tedaviler[seciliDis] === k ? RENKLER[k] : "#fff",
                  color: tedaviler[seciliDis] === k ? "#fff" : "#374151",
                  border: `1px solid ${tedaviler[seciliDis] === k ? RENKLER[k] : "#e5e7eb"}`,
                }}
              >{v}</button>
            ))}
            <button
              onClick={tedaviKaldir}
              style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "12px", cursor: "pointer", background: "#fff0f0", color: "#c00", border: "1px solid #fcc", fontWeight: 600 }}
            >Temizle</button>
          </div>
        </div>
      )}

      {/* Özet */}
      {Object.keys(gruplar).length > 0 && (
        <div style={{ background: "#f8f9ff", borderRadius: "12px", border: "1px solid #EEEDFE", padding: "14px", marginTop: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f0d2e" }}>Tedavi Planı Özeti</div>
            <button onClick={hepsiniTemizle} style={{ fontSize: "11px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}>Tümünü temizle</button>
          </div>
          {Object.entries(gruplar).map(([tip, disler]) => (
            <div key={tip} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 12px", borderRadius: "8px", background: "#fff", border: "1px solid #EEEDFE", marginBottom: "6px", fontSize: "12px" }}>
              <span style={{ fontWeight: 600, color: "#0f0d2e" }}>{ISIMLER[tip]}</span>
              <div>
                {disler.sort((a,b)=>a-b).map(d => (
                  <span key={d} style={{ padding: "2px 7px", borderRadius: "20px", fontSize: "10px", fontWeight: 500, marginLeft: "3px", background: RENKLER[tip] + "22", color: RENKLER[tip] }}>{d}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
