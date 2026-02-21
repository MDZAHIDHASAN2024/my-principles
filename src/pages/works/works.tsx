import { useState, useEffect } from 'react';

interface WorkItem {
  start: string;
  end: string;
  task: string;
  hours: number;
  category: 'spiritual' | 'health' | 'work' | 'personal' | 'rest';
  startMinutes: number;
  endMinutes: number;
}

// "4:00 AM" → minutes from midnight
const parseTime = (t: string): number => {
  const [time, meridiem] = t.split(' ');
  const parts = time.split(':').map(Number);
  let h = parts[0];
  const m = parts[1];
  if (meridiem === 'PM' && h !== 12) h += 12;
  if (meridiem === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

const rawPlans = [
  {
    start: '4:00 AM',
    end: '5:00 AM',
    task: 'Salat, Quran, Water',
    hours: 1,
    category: 'spiritual',
  },
  {
    start: '5:00 AM',
    end: '6:00 AM',
    task: 'Exercise, English',
    hours: 1,
    category: 'health',
  },
  {
    start: '6:00 AM',
    end: '7:00 AM',
    task: 'Web Development Practice',
    hours: 1,
    category: 'work',
  },
  {
    start: '7:00 AM',
    end: '8:00 AM',
    task: 'Breakfast & Office Preparation',
    hours: 1,
    category: 'personal',
  },
  {
    start: '8:00 AM',
    end: '8:00 PM',
    task: 'Office Work · Salat · Power Nap · English Listening · Typing Practice',
    hours: 12,
    category: 'work',
  },
  {
    start: '8:00 PM',
    end: '9:00 PM',
    task: 'Salat & Dinner',
    hours: 1,
    category: 'spiritual',
  },
  {
    start: '9:00 PM',
    end: '10:00 PM',
    task: 'Family Time & Review',
    hours: 1,
    category: 'personal',
  },
  {
    start: '10:00 PM',
    end: '4:00 AM',
    task: 'Sleep',
    hours: 6,
    category: 'rest',
  },
] as const;

const workPlans: WorkItem[] = rawPlans.map((p) => ({
  ...p,
  category: p.category as WorkItem['category'],
  startMinutes: parseTime(p.start),
  endMinutes: parseTime(p.end),
}));

const extraGoals = [
  { icon: '🗣️', label: 'English', detail: '5 New Words' },
  { icon: '🐧', label: 'Linux', detail: '1 Command Practice' },
  { icon: '💡', label: 'Learn', detail: 'Something New' },
  { icon: '🧘', label: 'Meditation', detail: 'Mindful Reset' },
];

const categoryConfig: Record<
  WorkItem['category'],
  { color: string; glow: string; dot: string; bg: string }
> = {
  spiritual: {
    color: '#c084fc',
    glow: 'rgba(192,132,252,0.25)',
    dot: '#a855f7',
    bg: 'rgba(168,85,247,0.07)',
  },
  health: {
    color: '#34d399',
    glow: 'rgba(52,211,153,0.25)',
    dot: '#10b981',
    bg: 'rgba(16,185,129,0.07)',
  },
  work: {
    color: '#60a5fa',
    glow: 'rgba(96,165,250,0.25)',
    dot: '#3b82f6',
    bg: 'rgba(59,130,246,0.07)',
  },
  personal: {
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.25)',
    dot: '#f59e0b',
    bg: 'rgba(245,158,11,0.07)',
  },
  rest: {
    color: '#94a3b8',
    glow: 'rgba(148,163,184,0.15)',
    dot: '#64748b',
    bg: 'rgba(100,116,139,0.07)',
  },
};

const getNowMinutes = () => {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
};

const getActiveIndex = (nowMins: number) =>
  workPlans.findIndex((w) => {
    if (w.endMinutes > w.startMinutes)
      return nowMins >= w.startMinutes && nowMins < w.endMinutes;
    return nowMins >= w.startMinutes || nowMins < w.endMinutes; // overnight
  });

const getBlockProgress = (nowMins: number, w: WorkItem) => {
  let elapsed = nowMins - w.startMinutes;
  let total = w.endMinutes - w.startMinutes;
  if (total <= 0) total += 1440;
  if (elapsed < 0) elapsed += 1440;
  return Math.min(Math.max(elapsed / total, 0), 1);
};

// Returns 0-1 progress for any row based on current time
const getRowProgress = (
  nowMins: number,
  w: WorkItem,
  idx: number,
  activeIdx: number,
): number => {
  if (idx < activeIdx) return 1; // past blocks = 100%
  if (idx === activeIdx) return getBlockProgress(nowMins, w); // current = live %
  return 0; // future blocks = 0%
};

const totalHours = workPlans.reduce((a, w) => a + w.hours, 0);

export default function Works() {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [nowMins, setNowMins] = useState(getNowMinutes);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    workPlans.forEach((_, i) =>
      setTimeout(() => setVisibleRows((prev) => [...prev, i]), i * 80),
    );
  }, []);

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setNowMins(n.getHours() * 60 + n.getMinutes());
      setTimeStr(
        n.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const activeIdx = getActiveIndex(nowMins);
  const activeWork = activeIdx >= 0 ? workPlans[activeIdx] : null;
  const progress = activeWork ? getBlockProgress(nowMins, activeWork) : 0;
  const activeCfg = activeWork ? categoryConfig[activeWork.category] : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .wr { min-height:100vh; background:#050810;
          background-image:
            radial-gradient(ellipse 60% 40% at 20% 10%, rgba(96,165,250,.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 80%, rgba(192,132,252,.06) 0%, transparent 60%);
          font-family:'Syne',sans-serif; padding:2rem 1rem 3rem; color:#e2e8f0; }

        /* header */
        .hdr { display:flex; align-items:flex-start; justify-content:space-between;
          margin-bottom:2rem; gap:1rem; flex-wrap:wrap; }
        .ttl { font-size:clamp(2rem,5vw,3.2rem); font-weight:800; letter-spacing:-.03em; line-height:1;
          background:linear-gradient(135deg,#e2e8f0 0%,#60a5fa 50%,#c084fc 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .sub { font-family:'Space Mono',monospace; font-size:.72rem; color:#475569;
          letter-spacing:.15em; text-transform:uppercase; margin-top:.4rem; }
        .clk { font-family:'Space Mono',monospace; font-size:1rem; color:#60a5fa;
          background:rgba(96,165,250,.07); border:1px solid rgba(96,165,250,.2);
          border-radius:8px; padding:.5rem 1rem; letter-spacing:.06em; white-space:nowrap;
          display:flex; align-items:center; gap:.5rem; }
        .clk-dot { width:7px; height:7px; border-radius:50%; background:#60a5fa;
          animation:pdot 1s ease-in-out infinite; }
        @keyframes pdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }

        /* now banner */
        .now-banner { display:flex; align-items:center; gap:1rem; flex-wrap:wrap;
          background:rgba(15,20,35,.75); border:1px solid rgba(255,255,255,.06);
          border-radius:12px; padding:.85rem 1.25rem; margin-bottom:1.2rem;
          backdrop-filter:blur(12px); }
        .now-tag { font-family:'Space Mono',monospace; font-size:.6rem; font-weight:700;
          letter-spacing:.18em; text-transform:uppercase; padding:.22rem .6rem;
          border-radius:20px; border:1px solid; white-space:nowrap; }
        .now-task { font-weight:600; font-size:.88rem; color:#cbd5e1; flex:1; min-width:100px; }
        .now-prow { flex:1; min-width:130px; display:flex; align-items:center; gap:.55rem; }
        .now-track { flex:1; height:3px; background:rgba(255,255,255,.06); border-radius:2px; overflow:hidden; }
        .now-fill { height:100%; border-radius:2px; transition:width 1s linear; }
        .now-pct { font-family:'Space Mono',monospace; font-size:.63rem; color:#475569; white-space:nowrap; }

        /* panel */
        .panel { background:rgba(15,20,35,.8); border:1px solid rgba(255,255,255,.06);
          border-radius:16px; overflow:hidden; backdrop-filter:blur(12px);
          box-shadow:0 0 80px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.05);
          margin-bottom:1.5rem; }
        table { width:100%; border-collapse:collapse; }
        thead tr { background:rgba(255,255,255,.02); border-bottom:1px solid rgba(255,255,255,.06); }
        th { font-family:'Space Mono',monospace; font-size:.63rem; letter-spacing:.2em;
          text-transform:uppercase; color:#475569; padding:1rem 1.25rem;
          text-align:left; font-weight:400; }
        th:last-child { text-align:center; }

        /* rows */
        .row { border-bottom:1px solid rgba(255,255,255,.03); cursor:default;
          position:relative; opacity:0; transform:translateX(-12px);
          transition:background .25s ease; }
        .row.vis { animation:sli .4s ease forwards; }
        @keyframes sli { to { opacity:1; transform:translateX(0); } }
        .row:hover { background:rgba(255,255,255,.025); }

        .row.active {
          background: var(--abg) !important;
          border-left: 3px solid var(--ac);
          box-shadow: inset 4px 0 24px var(--ag), inset 0 0 40px rgba(0,0,0,.1);
        }
        .row.active .tc { color: var(--ac) !important; }

        td { padding:.85rem 1.25rem; vertical-align:middle; }
        .tc { font-family:'Space Mono',monospace; font-size:.76rem; color:#64748b;
          white-space:nowrap; width:88px; transition:color .3s; }

        .tsk { font-size:.88rem; font-weight:600; display:flex; align-items:center; gap:.7rem; }
        .dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }
        .row.active .dot { animation:pring 1.8s ease-in-out infinite; }
        @keyframes pring {
          0%   { box-shadow:0 0 0 0 var(--ag); }
          70%  { box-shadow:0 0 0 6px transparent; }
          100% { box-shadow:0 0 0 0 transparent; }
        }

        .nbadge { font-family:'Space Mono',monospace; font-size:.55rem; font-weight:700;
          letter-spacing:.16em; padding:.18rem .52rem; border-radius:20px; border:1px solid;
          text-transform:uppercase; flex-shrink:0;
          animation:bpulse 2s ease-in-out infinite; }
        @keyframes bpulse { 0%,100%{opacity:1} 50%{opacity:.45} }

        /* bottom progress strip — all rows */
        .strip { position:absolute; bottom:0; left:0; height:2px;
          transition:width 1s linear; border-radius:0 2px 0 0; pointer-events:none; }

        /* per-row progress bar inside task cell */
        .row-pbar-wrap { margin-top:.45rem; height:3px; background:rgba(255,255,255,.05);
          border-radius:2px; overflow:hidden; width:100%; }
        .row-pbar-fill { height:100%; border-radius:2px; transition:width 1s linear; }
        .row-pbar-pct { font-family:'Space Mono',monospace; font-size:.52rem;
          margin-top:.25rem; letter-spacing:.08em; opacity:.7; }

        .hcell { text-align:center; width:80px; }
        .hbadge { font-family:'Space Mono',monospace; font-size:.75rem; font-weight:700;
          padding:.3rem .7rem; border-radius:20px; letter-spacing:.05em;
          display:inline-block; border:1px solid; transition:box-shadow .2s; }
        .row:hover .hbadge, .row.active .hbadge { box-shadow:0 0 12px var(--bg); }

        /* legend */
        .legend { display:flex; flex-wrap:wrap; gap:1rem; padding:.9rem 1.25rem;
          border-top:1px solid rgba(255,255,255,.04); background:rgba(255,255,255,.01); }
        .leg-item { display:flex; align-items:center; gap:.4rem; font-size:.67rem;
          font-family:'Space Mono',monospace; color:#475569;
          text-transform:uppercase; letter-spacing:.1em; }
        .leg-dot { width:6px; height:6px; border-radius:50%; }

        /* goals */
        .gtitle { font-family:'Space Mono',monospace; font-size:.65rem; letter-spacing:.2em;
          text-transform:uppercase; color:#334155; margin-bottom:.75rem; }
        .ggrid { display:grid; grid-template-columns:repeat(auto-fit,minmax(155px,1fr));
          gap:1rem; margin-bottom:1.5rem; }
        .gcard { background:rgba(15,20,35,.6); border:1px solid rgba(255,255,255,.06);
          border-radius:12px; padding:1.1rem 1.25rem;
          display:flex; align-items:center; gap:.75rem;
          transition:border-color .2s,transform .2s; }
        .gcard:hover { border-color:rgba(96,165,250,.3); transform:translateY(-2px); }
        .gicon { font-size:1.4rem; line-height:1; }
        .glabel { font-size:.85rem; font-weight:600; color:#cbd5e1; }
        .gdetail { font-family:'Space Mono',monospace; font-size:.63rem;
          color:#475569; margin-top:.15rem; letter-spacing:.05em; }

        /* footer */
        .fbar { display:flex; align-items:center; justify-content:space-between;
          flex-wrap:wrap; gap:1rem; }
        .ftlabel { font-family:'Space Mono',monospace; font-size:.7rem; color:#475569;
          letter-spacing:.15em; text-transform:uppercase; }
        .ftval { font-size:2rem; font-weight:800;
          background:linear-gradient(90deg,#60a5fa,#c084fc);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text; line-height:1; }
        .pbar-wrap { flex:1; min-width:200px; height:4px;
          background:rgba(255,255,255,.06); border-radius:2px; overflow:hidden; }
        .pbar-fill { height:100%; border-radius:2px;
          background:linear-gradient(90deg,#3b82f6,#a855f7);
          width:0; animation:fb 1.5s .6s ease forwards; }
        @keyframes fb { to { width:${Math.round((totalHours / 24) * 100)}%; } }

        @media(max-width:560px){ .tc{display:none} }
      `}</style>

      <div className="wr">
        {/* ── Header ── */}
        <div className="hdr">
          <div>
            <div className="ttl">Daily Blueprint</div>
            <div className="sub">// Structured Day Plan — 24h Cycle</div>
          </div>
          <div className="clk">
            <span className="clk-dot" />
            {timeStr}
          </div>
        </div>

        {/* ── Active task banner ── */}
        {activeWork && activeCfg && (
          <div className="now-banner">
            <span
              className="now-tag"
              style={{
                color: activeCfg.color,
                borderColor: activeCfg.color + '50',
                background: activeCfg.bg,
              }}
            >
              ▶ NOW
            </span>
            <span className="now-task">{activeWork.task}</span>
            <div className="now-prow">
              <div className="now-track">
                <div
                  className="now-fill"
                  style={{
                    width: `${Math.round(progress * 100)}%`,
                    background: activeCfg.color,
                  }}
                />
              </div>
              <span className="now-pct">{Math.round(progress * 100)}%</span>
            </div>
          </div>
        )}

        {/* ── Table ── */}
        <div className="panel">
          <table>
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Task</th>
                <th>Hrs</th>
              </tr>
            </thead>
            <tbody>
              {workPlans.map((w, i) => {
                const cfg = categoryConfig[w.category];
                const isActive = i === activeIdx;
                const isHovered = hoveredRow === i;
                const rowProgress = getRowProgress(nowMins, w, i, activeIdx);
                const isDone = i < activeIdx;
                const isFuture = i > activeIdx;

                return (
                  <tr
                    key={i}
                    className={[
                      'row',
                      visibleRows.includes(i) ? 'vis' : '',
                      isActive ? 'active' : '',
                    ].join(' ')}
                    style={
                      {
                        animationDelay: `${i * 80}ms`,
                        ...(isActive
                          ? {
                              ['--ac' as string]: cfg.color,
                              ['--ag' as string]: cfg.glow,
                              ['--abg' as string]: cfg.bg,
                            }
                          : {}),
                      } as React.CSSProperties
                    }
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="tc">{w.start}</td>
                    <td className="tc">{w.end}</td>
                    <td>
                      <div className="tsk">
                        <span
                          className="dot"
                          style={
                            {
                              background: cfg.dot,
                              ...(isActive
                                ? { ['--ag' as string]: cfg.glow }
                                : {}),
                            } as React.CSSProperties
                          }
                        />
                        <span
                          style={{
                            color:
                              isActive || isHovered
                                ? cfg.color
                                : isDone
                                  ? cfg.color + 'aa'
                                  : '#cbd5e1',
                            transition: 'color .2s',
                          }}
                        >
                          {w.task}
                        </span>
                        {isActive && (
                          <span
                            className="nbadge"
                            style={{
                              color: cfg.color,
                              borderColor: cfg.color + '55',
                              background: cfg.bg,
                            }}
                          >
                            Now
                          </span>
                        )}
                        {isDone && (
                          <span
                            style={{
                              fontFamily: "'Space Mono',monospace",
                              fontSize: '.52rem',
                              color: cfg.color + 'aa',
                              letterSpacing: '.1em',
                              flexShrink: 0,
                            }}
                          >
                            ✓ DONE
                          </span>
                        )}
                      </div>
                      {/* Per-row progress bar */}
                      <div className="row-pbar-wrap">
                        <div
                          className="row-pbar-fill"
                          style={{
                            width: `${Math.round(rowProgress * 100)}%`,
                            background: isFuture
                              ? 'transparent'
                              : isDone
                                ? cfg.color + '55'
                                : cfg.color,
                            boxShadow: isActive
                              ? `0 0 6px ${cfg.color}88`
                              : 'none',
                          }}
                        />
                      </div>
                      {!isFuture && (
                        <div
                          className="row-pbar-pct"
                          style={{ color: cfg.color }}
                        >
                          {Math.round(rowProgress * 100)}%
                          {isDone
                            ? ' · complete'
                            : isActive
                              ? ' · in progress'
                              : ''}
                        </div>
                      )}
                    </td>
                    <td className="hcell">
                      <span
                        className="hbadge"
                        style={
                          {
                            color: cfg.color,
                            borderColor: cfg.color + '40',
                            background: cfg.glow,
                            ['--bg' as string]: cfg.glow,
                          } as React.CSSProperties
                        }
                      >
                        {w.hours}h
                      </span>
                    </td>

                    {/* Time-progress strip at bottom of active row */}
                    {isActive && (
                      <span
                        className="strip"
                        style={{
                          width: `${Math.round(rowProgress * 100)}%`,
                          background: cfg.color,
                          opacity: 0.55,
                        }}
                      />
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="legend">
            {(Object.keys(categoryConfig) as WorkItem['category'][]).map(
              (k) => (
                <div className="leg-item" key={k}>
                  <span
                    className="leg-dot"
                    style={{ background: categoryConfig[k].dot }}
                  />
                  {k}
                </div>
              ),
            )}
          </div>
        </div>

        {/* ── Extra Goals ── */}
        <div className="gtitle">// Daily Extra Goals</div>
        <div className="ggrid">
          {extraGoals.map((g, i) => (
            <div className="gcard" key={i}>
              <span className="gicon">{g.icon}</span>
              <div>
                <div className="glabel">{g.label}</div>
                <div className="gdetail">{g.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="fbar">
          <div>
            <div className="ftlabel">Total Productive Hours</div>
            <div className="ftval">{totalHours}h</div>
          </div>
          <div className="pbar-wrap">
            <div className="pbar-fill" />
          </div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: '.7rem',
              color: '#334155',
            }}
          >
            {totalHours}/24 hrs
          </div>
        </div>
      </div>
    </>
  );
}
