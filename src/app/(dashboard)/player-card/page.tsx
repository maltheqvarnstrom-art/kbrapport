'use client';

import { useState } from 'react';
import ViewToggle from "@/components/ViewToggle";
import SearchInput from "@/components/SearchInput";
import AlertButton from "@/components/AlertButton";
import UserAvatar from "@/components/UserAvatar";
import TillidCard from "@/components/TillidCard";
import RatingCard from "@/components/RatingCard";
import RatingSelect from "@/components/RatingSelect";
import FootballPitch from "@/components/FootballPitch";
import RatingLineChart from "@/components/RatingLineChart";
import TripleToggle from "@/components/TripleToggle";
import { ChevronRight, Share2, Printer, MoreHorizontal, Tag, FileText } from "lucide-react";

export default function PlayerCardPage() {
  const [activeView, setActiveView] = useState<'noter' | 'predictions'>('noter');
  const [selectedNote, setSelectedNote] = useState<any>(null);

  const isNew = (dateStr: string) => {
    try {
      const [day, month, year] = dateStr.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const today = new Date(2026, 3, 23); // Reference date: April 23, 2026
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    } catch (e) {
      return false;
    }
  };

  const getRatingStyles = (score: number) => {
    if (score >= 4.0) return { bg: '#38B1DA', color: '#1A4D61' }; // A - Blue
    if (score >= 3.5) return { bg: '#B5D333', color: '#4A5C11' }; // B+ - Green
    if (score >= 3.0) return { bg: '#FFD733', color: '#735D00' }; // B - Yellow
    if (score >= 2.5) return { bg: '#FFB347', color: '#734A00' }; // C+ - Orange
    return { bg: '#FF8C69', color: '#732A1A' }; // C - Red
  };

  const getStylesForGrade = (grade: string) => {
    if (grade.startsWith('A')) return getRatingStyles(4.5);
    if (grade.startsWith('B+')) return getRatingStyles(3.7);
    if (grade.startsWith('B')) return getRatingStyles(3.2);
    if (grade.startsWith('C+')) return getRatingStyles(2.7);
    if (grade.startsWith('C')) return getRatingStyles(2.2);
    return getRatingStyles(1.0);
  };

  const averages = {
    noter: { grade: 'A', score: 4.8 },
    predictions: { grade: 'B+', score: 3.5 }
  };

  const [pitchStates, setPitchStates] = useState<number[]>(new Array(14).fill(0));

  const positionNames = [
    'ANG',
    'VM', 'COM', 'HM',
    'CM', 'CM', 'CM',
    'VB', 'DM', 'HB',
    'CB', 'CB', 'CB',
    'MM'
  ];

  const getExtendedPositions = () => {
    const selected = pitchStates
      .map((state, i) => (state > 0 ? { name: positionNames[i], state } : null))
      .filter((item): item is { name: string, state: number } => item !== null);
    
    if (selected.length === 0) return 'Ingen valgt';

    // Sort by state (1 = Green, 2 = Yellow, etc.)
    selected.sort((a, b) => a.state - b.state);

    const opacityMap: Record<number, number> = {
      1: 1,      // Green: 100% (0% transparent)
      2: 0.8,    // Yellow: 80%
      3: 0.6,    // Orange: 60%
      4: 0.4     // Red: 40%
    };

    return (
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {selected.map((pos, i) => (
          <span key={i} style={{ 
            opacity: opacityMap[pos.state] || 1,
            transition: 'opacity 0.2s ease'
          }}>
            {pos.name}{i < selected.length - 1 ? ',' : ''}
          </span>
        ))}
      </div>
    );
  };

  const handlePositionClick = (i: number) => {
    setPitchStates(prev => prev.map((s, idx) => idx === i ? (s + 1) % 5 : s));
  };

  const noterData = [
    { 
      date: '20-04-2026', 
      player: 'William Clem', 
      scout: 'Malthe Qvarnstrøm', 
      rating: 'A',
      characteristics: 'Sort hår, lille osv.',
      fullNote: 'Helt ny observation fra træningen i dag. Han virker utrolig skarp og har fundet et nyt gear i sit antrit. Hans evne til at skifte retning i høj fart er imponerende og skaber store problemer for forsvaret.'
    },
    { 
      date: '30-01-2024', 
      player: 'William Clem', 
      scout: 'Emil Lazrak', 
      rating: 'B',
      characteristics: 'Fysisk stærk, god teknik',
      fullNote: 'William spillede en solid kamp mod A27. Han viste rigtig gode takter i sit presspil og formåede at vinde mange af sine dueller centralt i banen. Hans evne til at orientere sig før modtagelse er i topklasse for hans alder.'
    },
    { 
      date: '31-10-2023', 
      player: 'William Clem', 
      scout: 'Rasmus Hahnemann', 
      rating: 'B+',
      characteristics: 'Hurtig, direkte spillestil',
      fullNote: 'Enestående præstation på den offensive midtbane. Skabte flere store chancer og var meget direkte i sit spil. Han mangler stadig lidt i den defensive positionering, men hans offensive bidrag opvejede det i dag.'
    },
    { 
      date: '12-05-2025', 
      player: 'William Clem', 
      scout: 'Emil Lazrak', 
      rating: 'B',
      characteristics: 'Rolig på bolden, overblik',
      fullNote: 'Stabil indsats. William er utrolig rolig på bolden, selv under hårdt pres. Han fandt gode løsninger i opspillet og var arkitekten bag flere gode angreb. Skal arbejde på sin hurtighed i de første meter.'
    },
    { 
      date: '12-09-2023', 
      player: 'William Clem', 
      scout: 'Ingen Scout', 
      rating: 'B',
      characteristics: 'Taktisk klog, stabil',
      fullNote: 'Generelt god indsats gennem hele kampen. Han holder et stabilt niveau og falder aldrig igennem. Hans taktiske forståelse hjælper ham til at stå rigtigt det meste af tiden.'
    },
    { 
      date: '03-10-2023', 
      player: 'William Clem', 
      scout: 'Ingen Scout', 
      rating: 'A',
      characteristics: 'Teknisk overlegen, målfarlig',
      fullNote: 'Kampens spiller! Han dominerede midtbanen fuldstændigt og scorede desuden et fantastisk mål fra distancen. Hans tekniske overskud var tydeligt for enhver, og han styrede tempoet i kampen fra start til slut.'
    },
  ];

  const predictionsData = [
    { date: '21-04-2026', opponent: 'FC København', scout: 'MQ', fysik: 4, mentalt: 5, taktisk: 4, teknisk: 5, score: 4.5 },
    { date: '06-10-2024', opponent: 'A27', scout: 'Emil Lazrak', fysik: 2, mentalt: 4, taktisk: 3, teknisk: 4, score: 3.25 },
    { date: '01-02-2025', opponent: 'Albertslund IF', scout: 'Cornelius Scheel Hjeds', fysik: 4, mentalt: 3, taktisk: 4, teknisk: 3, score: 3.5 },
    { date: '03-05-2025', opponent: 'B93', scout: 'Malthe Qvarnstrøm', fysik: 4, mentalt: 3, taktisk: 3, teknisk: 3, score: 3.25 },
    { date: '07-09-2025', opponent: 'Dragør BK', scout: 'Rasmus Hahnemann', fysik: 3, mentalt: 2, taktisk: 2, teknisk: 3, score: 2.5 },
    { date: '13-04-2025', opponent: 'FA2000', scout: 'Malthe Qvarnstrøm', fysik: 4, mentalt: 4, taktisk: 3, teknisk: 4, score: 3.75 },
  ];

  const activeData = activeView === 'noter' ? noterData : predictionsData;

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

      {/* Breadcrumbs - Moved above the grid */}
      <div style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#94A3B8', fontWeight: 400, flexShrink: 0 }}>
        <span>Spillere</span>
        <span style={{ color: '#CBD5E1' }}>&gt;</span>
        <span>KB Talent</span>
        <span style={{ color: '#CBD5E1' }}>&gt;</span>
        <span style={{ color: '#1a1a1a', fontWeight: 500 }}>William Clem</span>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '24px', alignItems: 'stretch', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Column: Profile Details & Pitch */}
        <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0, marginTop: '20px' }}>
          
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            border: '1px solid #E2E8F0', 
            borderRadius: '8px', 
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Alder', value: '2004' },
                { label: 'Fysik', value: '-1' },
                { label: 'Foretrukne ben', value: 'Venstre' },
                { label: 'Position', value: 'Central' },
                { label: 'Udvidet position', value: getExtendedPositions() },
              ].map((stat) => (
                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: '8px', borderBottom: '1px solid #F8FAFC' }}>
                  <span style={{ color: '#64748B' }}>{stat.label}</span>
                  <span style={{ fontWeight: 600, color: '#022440' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'auto', marginBottom: '8px' }}>
            <div style={{ width: '340px', height: '430px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <FootballPitch 
                states={pitchStates} 
                onPositionClick={handlePositionClick} 
              />
            </div>
          </div>
        </div>

        {/* Right Column: Player Data & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', height: '100%', overflow: 'hidden' }}>
          
          {/* Detailed Player Header based on image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
            
            {/* Name and Team + TillidCard & Actions */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '48px', marginTop: '12px', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#022440', margin: 0, letterSpacing: '-0.02em' }}>William Clem</h1>
                  <RatingCard 
                    grade="A" 
                    score={4.8} 
                  />
                </div>
                <span style={{ fontSize: '24px', fontWeight: 400, color: '#022440', opacity: 0.8 }}>KB Talent</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flex: 1, minWidth: 0 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <RatingLineChart 
                    data={[...activeData]
                      .sort((a, b) => {
                        const dateA = a.date.split('-').reverse().join('-');
                        const dateB = b.date.split('-').reverse().join('-');
                        return dateA.localeCompare(dateB);
                      })
                      .map(row => {
                        if (activeView === 'noter') {
                          if (row.rating.startsWith('A')) return 5;
                          if (row.rating.startsWith('B+')) return 4;
                          if (row.rating.startsWith('B')) return 3;
                          if (row.rating.startsWith('C+')) return 2;
                          return 1;
                        } else {
                          return row.score;
                        }
                      })
                    } 
                    labels={[...activeData]
                      .sort((a, b) => {
                        const dateA = a.date.split('-').reverse().join('-');
                        const dateB = b.date.split('-').reverse().join('-');
                        return dateA.localeCompare(dateB);
                      })
                      .map(row => row.date.substring(0, 5))
                    }
                  />
                </div>
                <TillidCard />
              </div>
            </div>
          </div>

          {/* Observations List Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflow: 'hidden' }}>
            
            {/* Unified Description Box - Expanded for long scouting reports */}
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '8px', 
              padding: '20px',
              fontSize: '14px',
              color: '#022440',
              lineHeight: '1.6',
              flexShrink: 0,
              minHeight: '120px'
            }}>
              <div style={{ color: '#94A3B8', fontWeight: 400, marginBottom: '12px' }}>Lyshåret, mindre</div>
              <div style={{ textAlign: 'justify', fontWeight: 400, lineHeight: '1.7' }}>
                Teksten er en detaljeret scouting-beskrivelse af en ung fodboldspiller ved navn William. Generelt fremhæves han som ekstremt fokuseret, hårdt arbejdende og mentalt moden for sin alder, med stort spilforståelse og lederevner på banen. Fysiske kvaliteter som høj skridtfrekvens, stor acceleration, eksplosivitet og stærk core gør ham kraftfuld i 1v1-situationer og i dueller. Teknisk er han solid med god boldkontrol, stærke pasninger og afslutninger, primært med højre fod, og han har en tydelig spidskompetence i boldtræf og set i høj fart samt bruge forskellige finter og cuts. Han kan spille i flere rum og rotere mellem positionsspil og støtteaktioner, og han har et væsentligt behov for at træne venstrebenet, da hans spil nogle gange bliver begrænset og tvunget ud i mindre gunstige positioner. Han viser stærk taktisk forståelse og evne til at finde åbne rum, samt en tydelig rolle som boldbærer og hjælper for holdet. Nuværende niveau synes højere end holdets gennemsnit, og potentialet vurderes til at være stort, især hvis hans venstreben og løbestil optimeres. Samlet set beskrives han som en yderst alsidig og lovende spiller med potentiale til at gå meget langt ved højere niveauer.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <ViewToggle 
                leftLabel="Noter" 
                rightLabel="Predictions" 
                onToggle={(side) => setActiveView(side === 'left' ? 'noter' : 'predictions')}
                initial="left"
              />
              <span style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)', fontWeight: 600, marginRight: '12px' }}>
                Gennemsnit: {averages[activeView].score}
              </span>
            </div>
            
            <div style={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E2E8F0', 
              borderRadius: '8px', 
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', paddingBottom: '8px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead style={{ 
                    backgroundColor: '#FFFFFF', 
                    borderBottom: '1px solid #F1F5F9',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                  }}>
                    {activeView === 'noter' ? (
                      <tr>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a' }}>Dato</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a' }}>Spiller</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a' }}>Scout</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a' }}>Vurdering</th>
                      </tr>
                    ) : (
                      <tr>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a' }}>Dato</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a' }}>Modstander</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a' }}>Scout</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>Fysik</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>Mentalt</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>Taktisk</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>Teknisk</th>
                        <th style={{ padding: '6px 20px', fontWeight: 600, color: '#1a1a1a', textAlign: 'center' }}>Score</th>
                      </tr>
                    )}
                  </thead>
                   <tbody>
                    {activeData.map((row: any, i: number) => (
                      <tr 
                        key={i} 
                        onClick={() => activeView === 'noter' && setSelectedNote(row)}
                        style={{ 
                          borderBottom: i === activeData.length - 1 ? 'none' : '1px solid #F1F5F9',
                          cursor: activeView === 'noter' ? 'pointer' : 'default',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (activeView === 'noter') e.currentTarget.style.backgroundColor = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <td style={{ padding: '6px 20px', color: '#64748B' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {row.date}
                            {isNew(row.date) && (
                              <span style={{ 
                                backgroundColor: '#FEF2F2', 
                                color: '#EF4444', 
                                padding: '2px 6px', 
                                borderRadius: '4px', 
                                fontSize: '10px', 
                                fontWeight: 700,
                                textTransform: 'uppercase'
                              }}>
                                Ny
                              </span>
                            )}
                          </div>
                        </td>
                        
                        {activeView === 'noter' ? (
                          <>
                             <td style={{ padding: '6px 20px', color: '#1a1a1a', fontWeight: 400 }}>{row.player}</td>
                             <td style={{ padding: '6px 20px' }}>
                               <span style={{ color: '#64748B' }}>{row.scout}</span>
                             </td>
                             <td style={{ padding: '6px 20px' }}>
                                <div style={{ 
                                  backgroundColor: getStylesForGrade(row.rating).bg, 
                                  color: getStylesForGrade(row.rating).color, 
                                  padding: '4px 0', 
                                  borderRadius: '4px', 
                                  fontSize: '12px', 
                                  fontWeight: 700, 
                                  display: 'inline-block',
                                  width: '44px',
                                  textAlign: 'center'
                                }}>
                                  {row.rating}
                                </div>
                             </td>
                          </>
                        ) : (
                          <>
                            <td style={{ padding: '6px 20px', color: '#1a1a1a', fontWeight: 400 }}>{row.opponent}</td>
                            <td style={{ padding: '6px 20px' }}>
                              <span style={{ color: '#64748B' }}>{row.scout}</span>
                            </td>
                            <td style={{ padding: '6px 20px', textAlign: 'center', fontWeight: 400, color: '#022440' }}>{row.fysik}</td>
                            <td style={{ padding: '6px 20px', textAlign: 'center', fontWeight: 400, color: '#022440' }}>{row.mentalt}</td>
                            <td style={{ padding: '6px 20px', textAlign: 'center', fontWeight: 400, color: '#022440' }}>{row.taktisk}</td>
                            <td style={{ padding: '6px 20px', textAlign: 'center', fontWeight: 400, color: '#022440' }}>{row.teknisk}</td>
                             <td style={{ padding: '6px 20px', textAlign: 'center' }}>
                                <div style={{ 
                                  backgroundColor: getRatingStyles(row.score).bg, 
                                  color: getRatingStyles(row.score).color, 
                                  padding: '4px 12px', 
                                  borderRadius: '4px', 
                                  fontSize: '12px', 
                                  fontWeight: 700, 
                                  display: 'inline-block',
                                  minWidth: '40px'
                                }}>
                                  {row.score.toFixed(2)}
                                </div>
                             </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Note Detail Modal - Redesigned based on new spec */}
      {selectedNote && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            backdropFilter: 'blur(10px)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            zIndex: 1000,
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setSelectedNote(null)}
        >
          <div 
            style={{ 
              width: '100%', 
              maxWidth: '450px', 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              padding: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Player Name */}
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#000000', margin: '0 0 8px 0' }}>{selectedNote.player}</h2>
            
            {/* Metadata Line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#666666', marginBottom: '24px' }}>
              <span>KB Talent</span>
              <span style={{ color: '#CCCCCC' }}>•</span>
              <span>2004</span>
              <span style={{ color: '#CCCCCC' }}>•</span>
              <span style={{ opacity: 0.4 }}>{selectedNote.date}</span>
            </div>
            
            {/* Dotted Separator */}
            <div style={{ width: '100%', borderTop: '1px dashed #CCCCCC', marginBottom: '24px' }}></div>
            
            {/* Rating Box */}
            <div style={{ 
              backgroundColor: getStylesForGrade(selectedNote.rating).bg, 
              color: getStylesForGrade(selectedNote.rating).color, 
              width: '80px',
              height: '48px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 800,
              marginBottom: '32px'
            }}>
              {selectedNote.rating}
            </div>
            
            {/* Content Boxes with Icons */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {/* Characteristics Box */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', color: '#94A3B8' }}>
                  <Tag size={20} />
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '16px', flex: 1, minHeight: '60px' }}>
                  <p style={{ margin: 0, fontSize: '15px', color: '#333333', fontWeight: 500 }}>{selectedNote.characteristics}</p>
                </div>
              </div>
              
              {/* Full Description Box */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ padding: '8px', backgroundColor: '#F8FAFC', borderRadius: '8px', color: '#94A3B8' }}>
                  <FileText size={20} />
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '16px', flex: 1, minHeight: '300px' }}>
                  <p style={{ margin: 0, fontSize: '15px', color: '#333333', lineHeight: '1.6', textAlign: 'justify' }}>{selectedNote.fullNote}</p>
                </div>
              </div>
            </div>
            
            {/* Scout Name */}
            <p style={{ fontSize: '14px', color: '#666666', margin: 0 }}>{selectedNote.scout}</p>
            
            {/* Close instruction (optional but helpful) */}
            <p style={{ fontSize: '11px', color: '#CCCCCC', marginTop: '16px' }}>Tryk udenfor for at lukke</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
