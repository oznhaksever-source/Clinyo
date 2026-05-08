"use client";
import React, { useState } from "react";

const CONDS = [
  { id:'eksik',   l:'Eksik',   c:'#bbb',    dash:true },
  { id:'cekim',   l:'Çekim',   c:'#E24B4A' },
  { id:'implant', l:'İmplant', c:'#534AB7' },
  { id:'kopru',   l:'Köprü',   c:'#7F77DD' },
  { id:'kaplama', l:'Kaplama', c:'#1D9E75' },
  { id:'kanal',   l:'Kanal',   c:'#D85A30' },
  { id:'dolgu',   l:'Dolgu',   c:'#378ADD' },
  { id:'lezyon',  l:'Lezyon',  c:'#BA7517' },
  { id:'kirik',   l:'Kırık',   c:'#993C1D' },
  { id:'cokmus',  l:'Çökmüş',  c:'#5F5E5A' },
];

const TYPES: Record<number,string> = {
  18:'Y',17:'M',16:'M',15:'P',14:'P',13:'C',12:'LI',11:'CI',
  21:'CI',22:'LI',23:'C',24:'P',25:'P',26:'M',27:'M',28:'Y',
  48:'Y',47:'M',46:'M',45:'P',44:'P',43:'C',42:'LI',41:'CI',
  31:'CI',32:'LI',33:'C',34:'P',35:'P',36:'M',37:'M',38:'Y'
};
const UST = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const ALT = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

interface Props { onDegistir?: (plan: Record<number,string[]>) => void; }

interface ToothProps {
  no: number; upper: boolean;
  conds: string[]; selected: boolean;
  onClick: () => void;
}

function ToothSVG({ no, upper, conds }: { no: number; upper: boolean; conds: string[] }) {
  const t = TYPES[no];
  const rk = conds.includes('kanal') ? '#C8501A' : '#c8b882';
  const rs = '#a89860';
  const ck = conds.includes('kaplama') ? '#1D9E75' : conds.includes('kopru') ? '#7F77DD' : '#e8e0f0';
  const ch = conds.includes('kaplama') ? '#4DDFAA' : conds.includes('kopru') ? '#B0A8F0' : '#f8f5ff';
  const cshadow = conds.includes('kaplama') ? '#0A5C3A' : conds.includes('kopru') ? '#4840A0' : '#b8aad8';
  const impl = conds.includes('implant');
  const eksik = conds.includes('eksik') && !impl;
  const cekim = conds.includes('cekim');
  const lez = conds.includes('lezyon');
  const dolgu = conds.includes('dolgu');
  const kirik = conds.includes('kirik');
  const cok = conds.includes('cokmus');
  const multi = conds.length > 1;

  let inner = '';

  if (eksik) {
    const ey = upper ? 2 : 36;
    inner = `<rect x="2" y="${ey}" width="22" height="26" rx="7" fill="none" stroke="#c0c0c0" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="13" y1="${upper ? ey+26 : ey}" x2="13" y2="${upper ? ey+40 : ey-14}" stroke="#c0c0c0" stroke-width="1" stroke-dasharray="3,3"/>`;
  } else if (impl) {
    const vy = upper ? 2 : 28;
    const cy = upper ? 32 : 6;
    inner = `<rect x="10" y="${vy}" width="6" height="24" rx="3" fill="#5858a8"/>
      ${[1,2,3,4].map(i => `<line x1="9" y1="${vy+i*5}" x2="17" y2="${vy+i*5}" stroke="#7878b8" stroke-width=".8"/>`).join('')}
      <path d="M3,${cy+4} Q3,${cy} 13,${cy-2} Q23,${cy} 23,${cy+4} Q23,${cy+20} 13,${cy+22} Q3,${cy+20} 3,${cy+16}Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
      <path d="M4,${cy+6} Q13,${cy+3} 22,${cy+6}" stroke="${ch}" stroke-width="1.2" fill="none" opacity=".8"/>
      ${dolgu ? `<ellipse cx="13" cy="${cy+14}" rx="5" ry="3" fill="#378ADD" opacity=".75"/>` : ''}`;
  } else if (t === 'CI') {
    if (upper) {
      inner = `<path d="M10,30 C9,18 10,8 13,2 C16,8 17,18 16,30Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="13" cy="5" rx="5" ry="4" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M3,30 C2,30 2,34 3,36 L5,46 C5,48 8,50 13,50 C18,50 21,48 21,46 L23,36 C24,34 24,30 23,30Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M4,32 Q13,29 22,32" stroke="${ch}" stroke-width="1.2" fill="none"/>
        <path d="M5,38 Q13,35 21,38" stroke="${ch}" stroke-width=".7" fill="none" opacity=".5"/>
        ${dolgu ? `<rect x="7" y="36" width="12" height="8" rx="2" fill="#378ADD" opacity=".7"/>` : ''}
        ${kirik ? `<path d="M10,31 L16,44" stroke="#993C1D" stroke-width="1.5" stroke-linecap="round"/>` : ''}`;
    } else {
      inner = `<path d="M10,34 C9,46 10,56 13,62 C16,56 17,46 16,34Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="13" cy="59" rx="5" ry="4" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M3,34 C2,34 2,30 3,28 L5,18 C5,16 8,14 13,14 C18,14 21,16 21,18 L23,28 C24,30 24,34 23,34Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M4,32 Q13,35 22,32" stroke="${ch}" stroke-width="1.2" fill="none"/>
        <path d="M5,26 Q13,29 21,26" stroke="${ch}" stroke-width=".7" fill="none" opacity=".5"/>
        ${dolgu ? `<rect x="7" y="20" width="12" height="8" rx="2" fill="#378ADD" opacity=".7"/>` : ''}`;
    }
  } else if (t === 'LI') {
    if (upper) {
      inner = `<path d="M11,30 C10,20 11,10 13,3 C15,10 15,20 15,30Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="13" cy="6" rx="4" ry="3.5" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M5,30 C4,30 4,33 5,35 L7,44 C7,46 9,48 13,48 C17,48 19,46 19,44 L21,35 C22,33 22,30 21,30Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M6,32 Q13,29 20,32" stroke="${ch}" stroke-width="1.1" fill="none"/>
        ${dolgu ? `<rect x="8" y="36" width="10" height="7" rx="2" fill="#378ADD" opacity=".7"/>` : ''}`;
    } else {
      inner = `<path d="M11,34 C10,44 11,54 13,61 C15,54 15,44 15,34Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="13" cy="58" rx="4" ry="3.5" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M5,34 C4,34 4,31 5,29 L7,20 C7,18 9,16 13,16 C17,16 19,18 19,20 L21,29 C22,31 22,34 21,34Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M6,32 Q13,35 20,32" stroke="${ch}" stroke-width="1.1" fill="none"/>
        ${dolgu ? `<rect x="8" y="21" width="10" height="7" rx="2" fill="#378ADD" opacity=".7"/>` : ''}`;
    }
  } else if (t === 'C') {
    if (upper) {
      inner = `<path d="M11,28 C10,16 11,6 13,1 C15,6 15,16 15,28Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="13" cy="4" rx="5" ry="4" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M4,28 C3,28 3,32 5,34 L9,48 Q11,52 13,52 Q15,52 17,48 L21,34 C23,32 23,28 22,28Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M5,30 Q13,27 21,30" stroke="${ch}" stroke-width="1.1" fill="none"/>
        <path d="M8,38 Q13,35 18,38" stroke="${ch}" stroke-width=".7" fill="none" opacity=".5"/>
        ${dolgu ? `<ellipse cx="13" cy="40" rx="5" ry="4" fill="#378ADD" opacity=".7"/>` : ''}`;
    } else {
      inner = `<path d="M11,36 C10,48 11,58 13,63 C15,58 15,48 15,36Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="13" cy="60" rx="5" ry="4" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M4,36 C3,36 3,32 5,30 L9,16 Q11,12 13,12 Q15,12 17,16 L21,30 C23,32 23,36 22,36Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M5,34 Q13,37 21,34" stroke="${ch}" stroke-width="1.1" fill="none"/>
        <path d="M8,26 Q13,29 18,26" stroke="${ch}" stroke-width=".7" fill="none" opacity=".5"/>
        ${dolgu ? `<ellipse cx="13" cy="24" rx="5" ry="4" fill="#378ADD" opacity=".7"/>` : ''}`;
    }
  } else if (t === 'P') {
    if (upper) {
      inner = `<path d="M9,28 C8,16 9,6 11,2 C12,0 13,0 14,2 C15,6 16,16 17,28Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        <line x1="13" y1="28" x2="13" y2="4" stroke="${rs}" stroke-width=".6"/>
        ${lez ? `<ellipse cx="10" cy="5" rx="4" ry="3" fill="#BA7517" opacity=".5"/><ellipse cx="16" cy="5" rx="4" ry="3" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M3,28 C2,28 2,32 3,34 Q3,46 13,48 Q23,46 23,34 C24,32 24,28 23,28Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M4,30 Q13,27 22,30" stroke="${ch}" stroke-width="1" fill="none"/>
        <path d="M5,34 Q8,30 13,32 Q18,30 21,34" stroke="${cshadow}" stroke-width=".8" fill="none"/>
        <circle cx="8" cy="36" r="4" fill="${ch}" opacity=".55"/>
        <circle cx="18" cy="36" r="4" fill="${ch}" opacity=".55"/>
        ${dolgu ? `<ellipse cx="13" cy="38" rx="8" ry="5" fill="#378ADD" opacity=".65"/>` : ''}`;
    } else {
      inner = `<path d="M9,36 C8,48 9,58 11,62 C12,64 13,64 14,62 C15,58 16,48 17,36Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        <line x1="13" y1="36" x2="13" y2="60" stroke="${rs}" stroke-width=".6"/>
        ${lez ? `<ellipse cx="10" cy="59" rx="4" ry="3" fill="#BA7517" opacity=".5"/><ellipse cx="16" cy="59" rx="4" ry="3" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M3,36 C2,36 2,32 3,30 Q3,18 13,16 Q23,18 23,30 C24,32 24,36 23,36Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M4,34 Q13,37 22,34" stroke="${ch}" stroke-width="1" fill="none"/>
        <path d="M5,30 Q8,34 13,32 Q18,34 21,30" stroke="${cshadow}" stroke-width=".8" fill="none"/>
        <circle cx="8" cy="28" r="4" fill="${ch}" opacity=".55"/>
        <circle cx="18" cy="28" r="4" fill="${ch}" opacity=".55"/>
        ${dolgu ? `<ellipse cx="13" cy="26" rx="8" ry="5" fill="#378ADD" opacity=".65"/>` : ''}`;
    }
  } else {
    const isW = t === 'Y';
    const h = isW ? 14 : 16;
    if (upper) {
      inner = `<path d="M5,26 C4,14 5,4 7,1 C8,0 9,2 9,2 C9,14 10,24 11,26Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        <path d="M11,25 C11,12 12,3 13,1 C14,3 15,12 15,25Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        <path d="M15,26 C16,24 17,14 17,2 C17,2 18,0 19,1 C21,4 22,14 21,26Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="8" cy="4" rx="4" ry="3.5" fill="#BA7517" opacity=".5"/><ellipse cx="13" cy="3" rx="3" ry="3" fill="#BA7517" opacity=".5"/><ellipse cx="18" cy="4" rx="4" ry="3.5" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M1,26 C1,24 2,30 2,30 Q2,${26+h+2} 13,${26+h+4} Q24,${26+h+2} 24,30 C24,30 25,24 25,26Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M2,28 Q13,25 24,28" stroke="${ch}" stroke-width="1" fill="none"/>
        <circle cx="7" cy="${26+h/2}" r="${isW?3:3.5}" fill="${ch}" opacity=".6"/>
        <circle cx="19" cy="${26+h/2}" r="${isW?3:3.5}" fill="${ch}" opacity=".6"/>
        <circle cx="7" cy="${26+h-2}" r="${isW?2.5:3}" fill="${ch}" opacity=".4"/>
        <circle cx="19" cy="${26+h-2}" r="${isW?2.5:3}" fill="${ch}" opacity=".4"/>
        ${dolgu ? `<ellipse cx="13" cy="${26+h/2}" rx="10" ry="5.5" fill="#378ADD" opacity=".6"/>` : ''}
        ${cok ? `<ellipse cx="13" cy="${26+h/2}" rx="11" ry="6" fill="#5F5E5A" opacity=".3"/>` : ''}
        ${kirik ? `<path d="M8,28 L19,${26+h}" stroke="#993C1D" stroke-width="1.5" stroke-linecap="round"/>` : ''}`;
    } else {
      inner = `<path d="M5,38 C4,50 5,60 7,63 C8,64 9,62 9,62 C9,50 10,40 11,38Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        <path d="M11,39 C11,52 12,61 13,63 C14,61 15,52 15,39Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        <path d="M15,38 C16,40 17,50 17,62 C17,62 18,64 19,63 C21,60 22,50 21,38Z" fill="${rk}" stroke="${rs}" stroke-width=".7"/>
        ${lez ? `<ellipse cx="8" cy="60" rx="4" ry="3.5" fill="#BA7517" opacity=".5"/><ellipse cx="13" cy="61" rx="3" ry="3" fill="#BA7517" opacity=".5"/><ellipse cx="18" cy="60" rx="4" ry="3.5" fill="#BA7517" opacity=".5"/>` : ''}
        <path d="M1,38 C1,40 2,34 2,34 Q2,${38-h-2} 13,${38-h-4} Q24,${38-h-2} 24,34 C24,34 25,40 25,38Z" fill="${ck}" stroke="${cshadow}" stroke-width=".8"/>
        <path d="M2,36 Q13,39 24,36" stroke="${ch}" stroke-width="1" fill="none"/>
        <circle cx="7" cy="${38-h/2}" r="${isW?3:3.5}" fill="${ch}" opacity=".6"/>
        <circle cx="19" cy="${38-h/2}" r="${isW?3:3.5}" fill="${ch}" opacity=".6"/>
        <circle cx="7" cy="${38-h+2}" r="${isW?2.5:3}" fill="${ch}" opacity=".4"/>
        <circle cx="19" cy="${38-h+2}" r="${isW?2.5:3}" fill="${ch}" opacity=".4"/>
        ${dolgu ? `<ellipse cx="13" cy="${38-h/2}" rx="10" ry="5.5" fill="#378ADD" opacity=".6"/>` : ''}
        ${cok ? `<ellipse cx="13" cy="${38-h/2}" rx="11" ry="6" fill="#5F5E5A" opacity=".3"/>` : ''}
        ${kirik ? `<path d="M8,36 L19,${38-h}" stroke="#993C1D" stroke-width="1.5" stroke-linecap="round"/>` : ''}`;
    }
  }

  if (cekim && !impl) {
    // Çekim: diş boşluğu göster, çarpı değil
    inner = `<rect x="2" y="2" width="22" height="60" rx="4" fill="none" stroke="#E24B4A" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="8" y1="20" x2="18" y2="44" stroke="#E24B4A" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
      <line x1="18" y1="20" x2="8" y2="44" stroke="#E24B4A" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>`;
  }
  if (multi) {
    inner += `<circle cx="22" cy="5" r="5" fill="#1a1840"/>
      <text x="22" y="8.5" text-anchor="middle" font-size="6.5" fill="white" font-weight="bold">${conds.length}</text>`;
  }

  return (
    <svg width="26" height="64" viewBox="0 0 26 64" dangerouslySetInnerHTML={{ __html: inner }} />
  );
}

function Tooth({ no, upper, conds, selected, onClick }: ToothProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer', padding: '1px', borderRadius: '3px',
        background: selected ? 'rgba(83,74,183,.18)' : 'transparent',
        outline: selected ? '2px solid #534AB7' : 'none',
        transition: 'all .12s',
      }}
    >
      {upper && <span style={{ fontSize: '7px', color: '#94a3b8', lineHeight: '12px', height: '12px' }}>{no}</span>}
      <ToothSVG no={no} upper={upper} conds={conds} />
      {!upper && <span style={{ fontSize: '7px', color: '#94a3b8', lineHeight: '12px', height: '12px' }}>{no}</span>}
    </div>
  );
}

export default function DisSemasi({ onDegistir }: Props) {
  const [state, setState] = useState<Record<number,string[]>>({});
  const [sel, setSel] = useState<number|null>(null);

  function toggle(id: string) {
    if (sel === null) return;
    const cur = state[sel] || [];
    const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
    const ns = { ...state };
    if (next.length === 0) delete ns[sel]; else ns[sel] = next;
    setState(ns);
    onDegistir?.(ns);
  }

  function remove(id: string) {
    if (sel === null) return;
    const next = (state[sel] || []).filter(x => x !== id);
    const ns = { ...state };
    if (next.length === 0) delete ns[sel]; else ns[sel] = next;
    setState(ns);
    onDegistir?.(ns);
  }

  function clearTooth() {
    if (sel === null) return;
    const ns = { ...state };
    delete ns[sel];
    setState(ns);
    onDegistir?.(ns);
  }

  function clearAll() {
    setState({});
    setSel(null);
    onDegistir?.({});
  }

  const selConds = sel !== null ? (state[sel] || []) : [];
  const gruplar: Record<string,number[]> = {};
  Object.entries(state).forEach(([no, ds]) => ds.forEach(d => {
    if (!gruplar[d]) gruplar[d] = [];
    gruplar[d].push(Number(no));
  }));

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', justifyContent: 'center', marginBottom: '10px' }}>
        {CONDS.map(c => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10px', color: '#64748b' }}>
            <div style={{ width: '9px', height: '9px', borderRadius: '2px', background: c.c, border: c.dash ? '1.5px dashed #aaa' : 'none' }} />
            {c.l}
          </div>
        ))}
      </div>

      <p style={{ fontSize: '9px', color: '#94a3b8', textAlign: 'center', margin: '0 0 3px', letterSpacing: '.6px', textTransform: 'uppercase' }}>Üst çene</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0px' }}>
        {UST.map(no => <Tooth key={no} no={no} upper={true} conds={state[no]||[]} selected={sel===no} onClick={() => setSel(sel===no?null:no)} />)}
      </div>
      <div style={{ height: '4px', background: '#e5e7eb', margin: '2px 10px', borderRadius: '2px' }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0px' }}>
        {ALT.map(no => <Tooth key={no} no={no} upper={false} conds={state[no]||[]} selected={sel===no} onClick={() => setSel(sel===no?null:no)} />)}
      </div>
      <p style={{ fontSize: '9px', color: '#94a3b8', textAlign: 'center', margin: '3px 0 0', letterSpacing: '.6px', textTransform: 'uppercase' }}>Alt çene</p>

      {sel !== null && (
        <div style={{ background: '#f8f9ff', borderRadius: '12px', border: '1px solid #EEEDFE', padding: '12px', marginTop: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f0d2e', marginBottom: '8px' }}>Diş {sel}</div>
          {selConds.length > 0 && (
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {selConds.map(id => {
                const c = CONDS.find(x => x.id === id)!;
                return (
                  <span key={id} onClick={() => remove(id)} style={{ padding: '2px 8px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', background: c.c + '18', color: c.c, border: `1px solid ${c.c}40`, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {c.l} <span style={{ opacity: .6 }}>×</span>
                  </span>
                );
              })}
            </div>
          )}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {CONDS.map(c => {
              const on = selConds.includes(c.id);
              return (
                <button key={c.id} onClick={() => toggle(c.id)} style={{
                  padding: '4px 10px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer',
                  background: on ? c.c + '20' : '#fff', color: on ? c.c : '#374151',
                  border: `${on?'1.5px':'0.5px'} solid ${on?c.c:'#e5e7eb'}`,
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: c.c, border: c.dash ? '1.5px dashed #bbb' : 'none', flexShrink: 0 }} />
                  {c.l}
                </button>
              );
            })}
            <button onClick={clearTooth} style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer', background: '#fff0f0', color: '#c00', border: '1px solid #fcc' }}>Temizle</button>
          </div>
        </div>
      )}

      {Object.keys(gruplar).length > 0 && (
        <div style={{ background: '#f8f9ff', borderRadius: '12px', border: '1px solid #EEEDFE', padding: '12px', marginTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f0d2e' }}>Tedavi planı özeti</div>
            <button onClick={clearAll} style={{ fontSize: '11px', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer' }}>Tümünü temizle</button>
          </div>
          {Object.entries(gruplar).map(([id, nos]) => {
            const c = CONDS.find(x => x.id === id)!;
            return (
              <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: '8px', background: '#fff', border: '1px solid #EEEDFE', marginBottom: '5px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600, color: '#0f0d2e' }}>{c.l}</span>
                <div>{nos.sort((a,b)=>a-b).map(n => <span key={n} style={{ padding: '1px 6px', borderRadius: '20px', fontSize: '10px', marginLeft: '2px', background: c.c+'18', color: c.c }}>{n}</span>)}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
