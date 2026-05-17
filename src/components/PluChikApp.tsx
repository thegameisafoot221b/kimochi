'use client';
import { useState } from 'react';
import { PLU_EMOTIONS, PluEmotion, PluLevel } from '@/lib/plutchik';
import { parseRuby } from '@/lib/ruby';
import { addRecord, getRecipients } from '@/lib/storage';
import type { Profile, ShareRecipient, KimochiRecord } from '@/lib/types';
import { INTENSITY_WORDS } from '@/lib/feelings';

function R({ t, className }: { t: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: parseRuby(t) }} />;
}

function PluFaceImage({ imagePath, size }: { imagePath: string; size: number }) {
  return (
    <img
      src={imagePath}
      alt=""
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

function formatMessage(profile: Profile, emo: PluEmotion, level: PluLevel, scene: string, memo: string): string {
  const now = new Date();
  const dt = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}時${String(now.getMinutes()).padStart(2, '0')}分`;
  const baseName = level.name;
  let msg = `【${profile.name}の気持ちの記録】\n${dt}\n\n`;
  msg += `気持ち：${baseName}（${emo.baseLabel.replace(/《[^》]+》/g, '')}）\n`;
  if (scene) msg += `きっかけ：${scene}\n`;
  if (memo.trim()) msg += `メモ：${memo.trim()}\n`;
  return msg;
}

function openShare(r: ShareRecipient, message: string) {
  if (r.type === 'email') {
    window.open(`mailto:${r.value}?subject=${encodeURIComponent('気持ちの記録')}&body=${encodeURIComponent(message)}`);
  } else {
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(message)}`);
  }
}

function buildRecord(profile: Profile, emo: PluEmotion, level: PluLevel, scene: string, memo: string): KimochiRecord {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    feelingId: `${emo.id}` as any,
    feelingName: level.name,
    categoryId: emo.id,
    categoryLabel: emo.baseLabel.replace(/《[^》]+》/g, ''),
    categoryColor: emo.color,
    intensity: level.level,
    intensityWord: level.level === 1 ? 'ちょっと' : level.level === 2 ? 'まあまあ' : 'すごく',
    memo,
  };
}

function sendNtfy(profile: Profile, emo: PluEmotion, level: PluLevel) {
  if (!profile.ntfyTopic) return;
  fetch(`https://ntfy.sh/${profile.ntfyTopic}`, {
    method: 'POST',
    body: `${profile.name}: ${level.name}（${emo.baseLabel.replace(/《[^》]+》/g, '')}）`,
  }).catch(() => {});
}

const LEVEL_LABELS = ['よわい', 'ふつう', 'つよい'] as const;

export default function PluChikApp({ profile }: { profile: Profile }) {
  const autoSave = profile.autoSave !== false;

  const [phase, setPhase] = useState<'select' | 'result'>('select');
  const [baseIdx, setBaseIdx] = useState(0);
  const [selLevel, setSelLevel] = useState<PluLevel | null>(null);
  const [selScene, setSelScene] = useState<string>('');
  const [memo, setMemo] = useState('');
  const [saved, setSaved] = useState(false);

  const emo = PLU_EMOTIONS[baseIdx];
  const recipients = getRecipients();

  function selectBase(i: number) { setBaseIdx(i); setSelLevel(null); setSelScene(''); }
  function selectLevel(lv: PluLevel) { setSelLevel(lv); setSelScene(''); }
  function toggleScene(text: string) { setSelScene(prev => prev === text ? '' : text); }

  function handleTell() {
    if (!selLevel) return;
    if (autoSave) {
      addRecord(buildRecord(profile, emo, selLevel, selScene, ''));
      setSaved(true);
      sendNtfy(profile, emo, selLevel);
      const lineRecs = recipients.filter(r => r.type === 'line');
      if (lineRecs.length > 0) {
        const msg = formatMessage(profile, emo, selLevel, selScene, '');
        setTimeout(() => openShare(lineRecs[0], msg), 400);
      }
    }
    setPhase('result');
  }

  function handleSave() {
    if (!selLevel || saved) return;
    addRecord(buildRecord(profile, emo, selLevel, selScene, memo));
    sendNtfy(profile, emo, selLevel);
    setSaved(true);
  }

  function handleShare(r: ShareRecipient) {
    if (!selLevel) return;
    openShare(r, formatMessage(profile, emo, selLevel, selScene, memo));
  }

  function handleReset() {
    setPhase('select');
    setSelLevel(null);
    setSelScene('');
    setMemo('');
    setSaved(false);
  }

  const ShareButtons = () => (
    <>
      {recipients.length > 0 && (
        <div className="share-section">
          <p className="share-label" dangerouslySetInnerHTML={{ __html: parseRuby('送信《そうしん》する') }} />
          {recipients.map(r => (
            <button key={r.id} className="share-btn" onClick={() => handleShare(r)}>
              {r.type === 'email' ? '✉' : 'LINE'} {r.name}に送る
            </button>
          ))}
        </div>
      )}
    </>
  );

  const ResultHero = () => (
    <>
      <div className="result-hero">
        <div className="result-blob" style={{ width: 158, height: 158, background: emo.color, opacity: 0.22 }} />
        {selLevel && (
          <div className="plu-result-img">
            <PluFaceImage imagePath={selLevel.imagePath} size={100} />
          </div>
        )}
      </div>
      <div className="result-feeling-row">
        <span className="result-iword" style={{ color: emo.color }}>
          {selLevel?.level === 1 ? 'ちょっと' : selLevel?.level === 2 ? 'まあまあ' : 'すごく'}
        </span>
        <span className="result-fname">{selLevel?.name}</span>
      </div>
      {selScene && (
        <div className="result-scene">
          <p className="result-scene-label">なぜかというと</p>
          <div className="result-scene-card" style={{ borderColor: emo.color }}>
            <R t={selScene} className="result-scene-text" />
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {phase === 'select' ? (
        <div className="app-body">
          {/* 感情カテゴリタブ */}
          <div className="cat-tabs plu-tabs">
            {PLU_EMOTIONS.map((e, i) => (
              <button
                key={e.id}
                className={`cat-tab ${i === baseIdx ? 'active' : ''}`}
                style={i === baseIdx ? { background: e.color, borderColor: 'transparent', color: '#fff' } : {}}
                onClick={() => selectBase(i)}
              >
                <R t={e.baseLabel} />
              </button>
            ))}
          </div>

          <R t="どのくらいの気持《きも》ちか選《えら》んでね" className="q-label" />

          {/* 3段階カード */}
          <div className="plu-level-grid">
            {emo.levels.map((lv) => (
              <button
                key={lv.id}
                className={`plu-level-card ${selLevel?.id === lv.id ? 'sel' : ''}`}
                style={selLevel?.id === lv.id ? { borderColor: emo.color, background: `${emo.color}18` } : {}}
                onClick={() => selectLevel(lv)}
              >
                <div className="plu-level-img">
                  <PluFaceImage imagePath={lv.imagePath} size={64} />
                </div>
                <span className="plu-level-label" style={{ color: '#aaa' }}>{LEVEL_LABELS[lv.level - 1]}</span>
                <R t={lv.name} className="plu-level-name" />
              </button>
            ))}
          </div>

          <div className="divider" />

          {selLevel && (
            <div className="detail">
              <div className="detail-header">
                <div className="plu-detail-img">
                  <PluFaceImage imagePath={selLevel.imagePath} size={70} />
                </div>
                <div className="detail-info">
                  <h3 dangerouslySetInnerHTML={{ __html: parseRuby(selLevel.name) }} />
                  <p dangerouslySetInnerHTML={{ __html: parseRuby(selLevel.desc) }} />
                </div>
              </div>

              <R t="こんな時《とき》、この気持《きも》ちになることがあるよ" className="scenes-label" />
              <R t="当《あ》てはまるものがあったら選《えら》んでみよう" className="scenes-sublabel" />

              <div className="scenes-grid">
                {selLevel.scenes.map((s, i) => (
                  <button
                    key={i}
                    className={`scene-card ${selScene === s.text ? 'sel' : ''}`}
                    onClick={() => toggleScene(s.text)}
                  >
                    <R t={s.text} className="scene-text" />
                  </button>
                ))}
              </div>

              <button
                className="tell-btn"
                onClick={handleTell}
                dangerouslySetInnerHTML={{ __html: parseRuby('気持《きも》ちを伝《つた》える！') }}
              />
            </div>
          )}
        </div>

      ) : autoSave ? (
        <div className="result-body">
          <div className="saved-banner" dangerouslySetInnerHTML={{ __html: parseRuby('記録《きろく》しました ✓') }} />
          {recipients.filter(r => r.type === 'line').length > 0 && (
            <div className="line-auto-notice">
              <span className="line-auto-icon">💬</span>
              <span dangerouslySetInnerHTML={{ __html: parseRuby('LINEが開くので、送信《そうしん》ボタンを押《お》してね') }} />
            </div>
          )}
          <ResultHero />
          <ShareButtons />
          <button className="retry-btn" onClick={handleReset}
            dangerouslySetInnerHTML={{ __html: parseRuby('もう一度《いちど》気持《きも》ちを伝《つた》える') }} />
        </div>

      ) : (
        <div className="result-body">
          <R t="気持《きも》ちを伝《つた》えました！" className="result-title" />
          <ResultHero />

          <div className="memo-section">
            <label className="memo-label" dangerouslySetInnerHTML={{ __html: parseRuby('メモ（任意《にんい》）') }} />
            <textarea className="memo-textarea" placeholder="ひとことメモを書けるよ"
              value={memo} onChange={e => setMemo(e.target.value)} rows={2} disabled={saved} />
          </div>

          {saved && (
            <>
              <div className="saved-banner" dangerouslySetInnerHTML={{ __html: parseRuby('記録《きろく》しました ✓') }} />
              <ShareButtons />
            </>
          )}

          {!saved ? (
            <div className="result-action-btns">
              <button className="save-btn" onClick={handleSave}
                dangerouslySetInnerHTML={{ __html: parseRuby('記録《きろく》する') }} />
              <button className="no-save-btn" onClick={handleReset}
                dangerouslySetInnerHTML={{ __html: parseRuby('記録《きろく》しない') }} />
              <button className="retry-btn" onClick={handleReset}
                dangerouslySetInnerHTML={{ __html: parseRuby('もう一度《いちど》気持《きも》ちを伝《つた》え直《なお》す') }} />
            </div>
          ) : (
            <button className="retry-btn" onClick={handleReset}
              dangerouslySetInnerHTML={{ __html: parseRuby('もう一度《いちど》気持《きも》ちを伝《つた》え直《なお》す') }} />
          )}
        </div>
      )}
    </>
  );
}
