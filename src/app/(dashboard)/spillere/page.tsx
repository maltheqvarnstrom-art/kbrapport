'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import SearchInput from '@/components/SearchInput';
import AlertButton from '@/components/AlertButton';
import UserAvatar from '@/components/UserAvatar';

const players = [
  { id: 22736, oprettet: '2026-01-17', navn: 'Agge',                klub: 'Næstved IF',              aargang: 2016, kvartal: '',   position: 'Side',      ben: 'V', fysik: 0,    grade: 'C+', avgVurdering: 2.0, avgPrediction: 3.3 },
  { id: 22743, oprettet: '2025-11-04', navn: 'Schmidt',             klub: 'Herfølge Boldklub',       aargang: 2015, kvartal: '',   position: 'Side',      ben: 'V', fysik: 0,    grade: 'C',  avgVurdering: 2.5, avgPrediction: 0   },
  { id: 22751, oprettet: '2025-06-04', navn: 'Abdel Toure',         klub: 'Fløng-Hedehusende (FHF)', aargang: 2011, kvartal: 'Q1', position: 'Side',      ben: 'H', fysik: 0,    grade: 'C',  avgVurdering: 2.3, avgPrediction: 3.3 },
  { id: 22752, oprettet: '2022-05-12', navn: 'Abdel-Kareem (AK)',   klub: 'GFA',                     aargang: 2015, kvartal: '',   position: 'Central',   ben: 'H', fysik: 0,    grade: 'B+', avgVurdering: 4.0, avgPrediction: 3.9 },
  { id: 22753, oprettet: '2022-05-12', navn: 'Abde-Sammad Jaw',     klub: 'Farum BK (FCN)',          aargang: 2013, kvartal: 'Q4', position: 'Defensiv',  ben: 'Begge', fysik: 0, grade: 'A',  avgVurdering: 4.7, avgPrediction: 4.6 },
  { id: 22754, oprettet: '2022-09-20', navn: 'Abdi',                klub: 'St. Heddinge Boldklub',   aargang: 2014, kvartal: '',   position: 'Offensiv',  ben: 'H', fysik: 0,    grade: 'B',  avgVurdering: 4.6, avgPrediction: 4.2 },
  { id: 22755, oprettet: '2023-01-16', navn: 'Abdou Jagne',         klub: 'GFA',                     aargang: 2016, kvartal: '',   position: 'Central',   ben: 'H', fysik: 0.5,  grade: 'A',  avgVurdering: 5.0, avgPrediction: 4.6 },
  { id: 22756, oprettet: '2024-03-18', navn: 'Abdoulaye Mamadou',   klub: 'B93',                     aargang: 2017, kvartal: '',   position: 'Offensiv',  ben: 'H', fysik: 0.5,  grade: 'C',  avgVurdering: 2.0, avgPrediction: 3.8 },
  { id: 22757, oprettet: '2024-07-22', navn: 'Adam Nielsen',        klub: 'KB Talent',               aargang: 2008, kvartal: 'Q2', position: 'Midtbane',  ben: 'H', fysik: 1,    grade: 'B',  avgVurdering: 3.5, avgPrediction: 3.6 },
  { id: 22758, oprettet: '2023-09-11', navn: 'Ahmad Khalil',        klub: 'Brøndby IF',              aargang: 2010, kvartal: 'Q3', position: 'Angreb',    ben: 'V', fysik: -1,   grade: 'B+', avgVurdering: 3.8, avgPrediction: 4.1 },
  { id: 22759, oprettet: '2025-02-28', navn: 'Alexander Toft',      klub: 'OB',                      aargang: 2009, kvartal: '',   position: 'Forsvar',   ben: 'H', fysik: 0,    grade: 'B',  avgVurdering: 3.2, avgPrediction: 3.0 },
  { id: 22760, oprettet: '2024-11-05', navn: 'Ali Hassan',          klub: 'FC Nordsjælland',         aargang: 2012, kvartal: 'Q1', position: 'Central',   ben: 'H', fysik: 0.5,  grade: 'A',  avgVurdering: 4.8, avgPrediction: 4.9 },
  { id: 1,     oprettet: '2026-01-15', navn: 'William Clem',        klub: 'KB Talent',               aargang: 2004, kvartal: 'Q2', position: 'Central',   ben: 'V', fysik: -1,   grade: 'A',  avgVurdering: 4.8, avgPrediction: 4.7 },
];

const gradeStyles: Record<string, { bg: string; color: string }> = {
  'A':  { bg: '#38B1DA', color: '#1A4D61' },
  'B+': { bg: '#B5D333', color: '#4A5C11' },
  'B':  { bg: '#F5D020', color: '#7A6200' },
  'C+': { bg: '#F5A623', color: '#7A4A00' },
  'C':  { bg: '#F0665A', color: '#6B1A15' },
};

type SortKey = 'id' | 'oprettet' | 'navn' | 'klub' | 'aargang' | 'kvartal' | 'position' | 'ben' | 'fysik' | 'grade' | 'avgVurdering' | 'avgPrediction';

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function InlineDropdown({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [innerSearch, setInnerSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setInnerSearch('');
  }, [open]);

  const active = selected.length > 0;
  const filteredOpts = options.filter(o => o.toLowerCase().includes(innerSearch.toLowerCase()));
  const toggle = (opt: string) => {
    if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
    else onChange([...selected, opt]);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          padding: '7px 14px',
          fontSize: '13px',
          borderRadius: '999px',
          border: '1px solid #E2E8F0',
          backgroundColor: active ? '#EEF2F7' : '#F5F7FA',
          color: active ? '#022440' : '#64748B',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          fontWeight: active ? 600 : 400,
          minWidth: '90px',
          transition: 'all 0.15s',
        }}
      >
        <span>
          {active && selected.length === 1 ? selected[0] : label}
          {active && selected.length > 1 && (
            <span style={{ backgroundColor: '#022440', color: '#fff', borderRadius: '10px', fontSize: '10px', fontWeight: 700, padding: '1px 6px', marginLeft: '6px' }}>
              {selected.length}
            </span>
          )}
        </span>
        <span style={{ color: '#94A3B8', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <ChevronDown size={14} />
        </span>
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', boxShadow: '0 8px 28px rgba(0,0,0,0.10)', zIndex: 300, minWidth: '200px', overflow: 'hidden' }}>
          <div style={{ padding: '10px 12px', borderBottom: '1px solid #F1F5F9' }}>
            <input ref={inputRef} type="text" placeholder="Søg..." value={innerSearch} onChange={e => setInnerSearch(e.target.value)}
              style={{ width: '100%', padding: '6px 10px', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '6px', outline: 'none', color: '#022440', backgroundColor: '#F8FAFC', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
            {filteredOpts.length === 0 ? (
              <div style={{ padding: '12px 14px', fontSize: '13px', color: '#94A3B8' }}>Ingen resultater</div>
            ) : filteredOpts.map(opt => {
              const checked = selected.includes(opt);
              return (
                <div key={opt} onClick={() => toggle(opt)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 14px', fontSize: '13px', color: '#022440', cursor: 'pointer', backgroundColor: checked ? '#F0F9FF' : 'transparent', transition: 'background 0.1s' }}
                  onMouseEnter={e => { if (!checked) (e.currentTarget as HTMLElement).style.backgroundColor = '#F8FAFC'; }}
                  onMouseLeave={e => { if (!checked) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                >
                  <div style={{ width: '15px', height: '15px', borderRadius: '4px', border: `1.5px solid ${checked ? '#022440' : '#CBD5E1'}`, backgroundColor: checked ? '#022440' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                    {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  {opt}
                </div>
              );
            })}
          </div>
          {selected.length > 0 && (
            <div onClick={() => { onChange([]); setOpen(false); }} style={{ padding: '9px 14px', fontSize: '12px', color: '#EF4444', cursor: 'pointer', borderTop: '1px solid #F1F5F9', fontWeight: 500 }}>
              Nulstil
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SpillerePage() {
  const [search, setSearch]                   = useState('');
  const [filterKlub, setFilterKlub]           = useState<string[]>([]);
  const [filterPosition, setFilterPosition]   = useState<string[]>([]);
  const [filterBen, setFilterBen]             = useState<string[]>([]);
  const [filterAargang, setFilterAargang]     = useState<string[]>([]);
  const [filterGrade, setFilterGrade]         = useState<string[]>([]);
  const [filterKvartal, setFilterKvartal]     = useState<string[]>([]);
  const [filterFysik, setFilterFysik]         = useState<string[]>([]);
  const [sortKey, setSortKey]                 = useState<SortKey>('id');
  const [sortAsc, setSortAsc]                 = useState(true);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const anyFilter = filterKlub.length || filterPosition.length || filterBen.length || filterAargang.length || filterGrade.length || filterKvartal.length || filterFysik.length;

  const filtered = players
    .filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        p.navn.toLowerCase().includes(q) ||
        p.klub.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q) ||
        p.ben.toLowerCase().includes(q) ||
        String(p.aargang).includes(q) ||
        p.grade.toLowerCase().includes(q) ||
        String(p.id).includes(q);

      return (
        matchSearch &&
        (!filterKlub.length     || filterKlub.includes(p.klub)) &&
        (!filterPosition.length || filterPosition.includes(p.position)) &&
        (!filterBen.length      || filterBen.includes(p.ben)) &&
        (!filterAargang.length  || filterAargang.includes(String(p.aargang))) &&
        (!filterGrade.length    || filterGrade.includes(p.grade)) &&
        (!filterKvartal.length  || filterKvartal.includes(p.kvartal)) &&
        (!filterFysik.length    || filterFysik.includes(String(p.fysik)))
      );
    })
    .sort((a, b) => {
      const va = a[sortKey as keyof typeof a];
      const vb = b[sortKey as keyof typeof b];
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span style={{ marginLeft: '3px', opacity: sortKey === col ? 1 : 0.25, fontSize: '9px' }}>
      {sortKey === col ? (sortAsc ? '↑' : '↓') : '↕'}
    </span>
  );

  const columns: { label: string; key: SortKey | null }[] = [
    { label: 'ID',              key: 'id'             },
    { label: 'Oprettet den',    key: 'oprettet'       },
    { label: 'Navn',            key: 'navn'           },
    { label: 'Klub',            key: 'klub'           },
    { label: 'Årgang',          key: 'aargang'        },
    { label: 'Kvartal',         key: 'kvartal'        },
    { label: 'Position',        key: 'position'       },
    { label: 'Ben',             key: 'ben'            },
    { label: 'Fysik',           key: 'fysik'          },
    { label: 'Vurdering',       key: 'grade'          },
    { label: 'Avg. Vurdering',  key: 'avgVurdering'   },
    { label: 'Avg. Prediction', key: 'avgPrediction'  },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflow: 'hidden' }}>

      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <SearchInput />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <AlertButton initialHasAlert={true} />
            <UserAvatar initials="MQ" size={42} />
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '0', flexShrink: 0 }} />

      {/* Page Title */}
      <div style={{ flexShrink: 0 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#022440', margin: 0, letterSpacing: '-0.02em' }}>Spillere</h1>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Søg spillere..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '7px 14px', fontSize: '13px', borderRadius: '999px', border: '1px solid #E2E8F0', outline: 'none', width: '180px', color: '#022440', backgroundColor: '#F5F7FA' }}
        />

        <div style={{ width: '1px', height: '24px', backgroundColor: '#E2E8F0', margin: '0 2px' }} />

        <InlineDropdown label="Klub"      options={unique(players.map(p => p.klub)).sort()}                        selected={filterKlub}     onChange={setFilterKlub}     />
        <InlineDropdown label="Position"  options={unique(players.map(p => p.position)).sort()}                   selected={filterPosition} onChange={setFilterPosition} />
        <InlineDropdown label="Ben"       options={unique(players.map(p => p.ben)).sort()}                         selected={filterBen}      onChange={setFilterBen}      />
        <InlineDropdown label="Årgang"    options={unique(players.map(p => String(p.aargang))).sort()}              selected={filterAargang}  onChange={setFilterAargang}  />
        <InlineDropdown label="Kvartal"   options={unique(players.filter(p => p.kvartal).map(p => p.kvartal)).sort()} selected={filterKvartal} onChange={setFilterKvartal} />
        <InlineDropdown label="Fysik"     options={unique(players.map(p => String(p.fysik))).sort()}                selected={filterFysik}    onChange={setFilterFysik}    />
        <InlineDropdown label="Vurdering" options={['A', 'B+', 'B', 'C+', 'C']}                                    selected={filterGrade}    onChange={setFilterGrade}    />

        {!!anyFilter && (
          <button
            onClick={() => { setFilterKlub([]); setFilterPosition([]); setFilterBen([]); setFilterAargang([]); setFilterGrade([]); setFilterKvartal([]); setFilterFysik([]); }}
            style={{ padding: '6px 10px', fontSize: '12px', borderRadius: '6px', border: 'none', backgroundColor: 'transparent', color: '#EF4444', cursor: 'pointer', fontWeight: 500 }}
          >
            Nulstil alle ✕
          </button>
        )}

        <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#94A3B8', fontWeight: 500 }}>
          {filtered.length} spillere
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '1100px' }}>
            <thead style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #F1F5F9', position: 'sticky', top: 0, zIndex: 10 }}>
              <tr>
                {columns.map(col => (
                  <th
                    key={col.label}
                    onClick={() => col.key && handleSort(col.key)}
                    style={{ padding: '10px 16px', fontWeight: 600, color: '#64748B', fontSize: '12px', cursor: col.key ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap', borderBottom: '1px solid #F1F5F9' }}
                  >
                    {col.label}
                    {col.key && <SortIcon col={col.key} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr
                  key={p.id}
                  style={{ borderBottom: i === filtered.length - 1 ? 'none' : '1px solid #F8FAFC', transition: 'background-color 0.12s', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '8px 16px', color: '#1a1a1a', fontWeight: 400 }}>{p.id}</td>
                  <td style={{ padding: '8px 16px', color: '#64748B' }}>{p.oprettet}</td>
                  <td style={{ padding: '8px 16px' }}>
                    <Link href="/player-card" style={{ fontWeight: 400, color: '#1a1a1a', textDecoration: 'none' }}>{p.navn}</Link>
                  </td>
                  <td style={{ padding: '8px 16px', color: '#1a1a1a' }}>{p.klub}</td>
                  <td style={{ padding: '8px 16px', color: '#022440' }}>{p.aargang}</td>
                  <td style={{ padding: '8px 16px', color: '#64748B' }}>{p.kvartal}</td>
                  <td style={{ padding: '8px 16px', color: '#022440' }}>{p.position}</td>
                  <td style={{ padding: '8px 16px', color: '#64748B' }}>{p.ben}</td>
                  <td style={{ padding: '8px 16px', color: '#022440' }}>{p.fysik}</td>
                  <td style={{ padding: '8px 16px' }}>
                    <div style={{ backgroundColor: (gradeStyles[p.grade] || gradeStyles['B']).bg, color: (gradeStyles[p.grade] || gradeStyles['B']).color, padding: '3px 0', borderRadius: '4px', fontSize: '11px', fontWeight: 700, display: 'inline-block', width: '40px', textAlign: 'center' }}>
                      {p.grade}
                    </div>
                  </td>
                  <td style={{ padding: '8px 16px', color: '#022440', fontWeight: 500 }}>{p.avgVurdering.toFixed(1)}</td>
                  <td style={{ padding: '8px 16px', color: '#022440', fontWeight: 500 }}>{p.avgPrediction > 0 ? p.avgPrediction.toFixed(1) : ''}</td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={12} style={{ padding: '40px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '14px' }}>
                    Ingen spillere matcher søgningen
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
