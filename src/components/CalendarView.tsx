'use client';
import { useState, useEffect, useMemo } from 'react';
import { getRecords, deleteRecord } from '@/lib/storage';
import { buildFaceSVG } from '@/lib/faceSvg';
import type { KimochiRecord } from '@/lib/types';
import { parseRuby } from '@/lib/ruby';

type ViewMode = 'month' | 'week' | 'day';
const WD = ['月', '火', '水', '木', '金', '土', '日'];

function dateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function monthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Date[] = [];
  for (let i = startPad - 1; i >= 0; i--) cells.push(new Date(year, month, -i));
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  const tail = cells.length % 7;
  if (tail > 0) {
    for (let d = 1; d <= 7 - tail; d++) cells.push(new Date(year, month + 1, d));
  }
  return cells;
}

function weekDays(base: Date): Date[] {
  const monday = new Date(base);
  monday.setDate(base.getDate() - (base.getDay() + 6) % 7);
  return Array.from({ length: 7 }, (_, i) =>
    new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i)
  );
}

export default function CalendarView({ showDelete }: { showDelete: boolean }) {
  const [mode, setMode] = useState<ViewMode>('month');
  const [cur, setCur] = useState(new Date());
  const [records, setRecords] = useState<KimochiRecord[]>([]);

  useEffect(() => { setRecords(getRecords()); }, []);

  const byDate = useMemo(() => {
    const map = new Map<string, KimochiRecord[]>();
    records.forEach(r => {
      const k = r.timestamp.slice(0, 10);
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(r);
    });
    return map;
  }, [records]);

  const today = dateStr(new Date());

  function navigate(dir: -1 | 1) {
    const d = new Date(cur);
    if (mode === 'month') d.setMonth(d.getMonth() + dir);
    else if (mode === 'week') d.setDate(d.getDate() + dir * 7);
    else d.setDate(d.getDate() + dir);
    setCur(d);
  }

  function navTitle() {
    if (mode === 'month') return `${cur.getFullYear()}年${cur.getMonth() + 1}月`;
    if (mode === 'week') {
      const days = weekDays(cur);
      return `${days[0].getMonth() + 1}/${days[0].getDate()} 〜 ${days[6].getMonth() + 1}/${days[6].getDate()}`;
    }
    return `${cur.getMonth() + 1}月${cur.getDate()}日（${WD[(cur.getDay() + 6) % 7]}）`;
  }

  function goDay(d: Date) {
    setCur(d);
    setMode('day');
  }

  function handleDelete(id: string) {
    deleteRecord(id);
    setRecords(getRecords());
  }

  const monthCells = mode === 'month' ? monthGrid(cur.getFullYear(), cur.getMonth()) : [];
  const weekCells = mode === 'week' ? weekDays(cur) : [];
  const dayRecs = mode === 'day'
    ? (byDate.get(dateStr(cur)) || []).sort((a, b) => a.timestamp.localeCompare(b.timestamp))
    : [];

  return (
    <div className="cal-screen">
      {/* View tabs */}
      <div className="cal-tabs">
        {(['month', 'week', 'day'] as const).map(m => (
          <button key={m} className={`cal-tab ${mode === m ? 'on' : ''}`} onClick={() => setMode(m)}>
            {m === 'month' ? '月' : m === 'week' ? '週' : '日'}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={() => navigate(-1)}>‹</button>
        <span className="cal-nav-title">{navTitle()}</span>
        <button className="cal-nav-btn" onClick={() => navigate(1)}>›</button>
      </div>

      {/* Month view */}
      {mode === 'month' && (
        <div className="cal-month">
          <div className="cal-wd-row">
            {WD.map(w => <div key={w} className="cal-wd">{w}</div>)}
          </div>
          <div className="cal-grid">
            {monthCells.map((d, i) => {
              const ds = dateStr(d);
              const recs = byDate.get(ds) || [];
              const inMonth = d.getMonth() === cur.getMonth();
              return (
                <div
                  key={i}
                  className={`cal-cell ${!inMonth ? 'dim' : ''} ${ds === today ? 'today' : ''}`}
                  onClick={() => goDay(d)}
                >
                  <span className="cal-dn">{d.getDate()}</span>
                  <div className="cal-dots">
                    {recs.slice(0, 4).map((r, j) => (
                      <span key={j} className="cal-dot" style={{ background: r.categoryColor }} />
                    ))}
                    {recs.length > 4 && <span className="cal-dot-more">+</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week view */}
      {mode === 'week' && (
        <div className="cal-week">
          {weekCells.map((d, i) => {
            const ds = dateStr(d);
            const recs = byDate.get(ds) || [];
            return (
              <div key={i} className={`cal-week-col ${ds === today ? 'today' : ''}`}>
                <div className="cal-wk-head" onClick={() => goDay(d)}>
                  <span className="cal-wk-wd">{WD[i]}</span>
                  <span className="cal-wk-date">{d.getDate()}</span>
                </div>
                <div className="cal-wk-recs">
                  {recs.map((r, j) => (
                    <div key={j} className="cal-wk-rec" style={{ borderLeft: `3px solid ${r.categoryColor}` }}>
                      <div dangerouslySetInnerHTML={{ __html: buildFaceSVG(r.feelingId, 22) }} />
                      <span className="cal-wk-name" dangerouslySetInnerHTML={{ __html: parseRuby(r.feelingName) }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Day view */}
      {mode === 'day' && (
        <div className="cal-day">
          {dayRecs.length === 0 ? (
            <p className="cal-day-empty" dangerouslySetInnerHTML={{ __html: parseRuby('この日の記録《きろく》はありません') }} />
          ) : (
            dayRecs.map(r => (
              <div key={r.id} className="cal-day-rec" style={{ borderLeft: `4px solid ${r.categoryColor}` }}>
                <div className="cal-day-rec-main">
                  <div dangerouslySetInnerHTML={{ __html: buildFaceSVG(r.feelingId, 44) }} />
                  <div className="cal-day-rec-info">
                    <div className="cal-day-feeling">
                      <span className="cal-day-iword" style={{ color: r.categoryColor }}>{r.intensityWord}</span>
                      <span className="cal-day-fname" dangerouslySetInnerHTML={{ __html: parseRuby(r.feelingName) }} />
                    </div>
                    {r.sceneText && (
                      <p className="cal-day-scene" dangerouslySetInnerHTML={{ __html: parseRuby(r.sceneText) }} />
                    )}
                    <p className="cal-day-time">
                      {new Date(r.timestamp).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                {r.memo && <p className="cal-day-memo">{r.memo}</p>}
                {showDelete && (
                  <button
                    className="cal-day-del"
                    onClick={() => handleDelete(r.id)}
                    dangerouslySetInnerHTML={{ __html: parseRuby('削除《さくじょ》') }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
