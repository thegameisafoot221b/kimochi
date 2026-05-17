'use client';

import { useState } from 'react';
import { CATEGORIES, INTENSITY_WORDS, Category, Feeling } from '@/lib/feelings';
import { buildFaceSVG } from '@/lib/faceSvg';
import { buildSceneSVG } from '@/lib/sceneSvg';
import { parseRuby } from '@/lib/ruby';
import { addRecord, getRecipients } from '@/lib/storage';
import type { Profile, ShareRecipient, KimochiRecord } from '@/lib/types';

function R({ t, className }: { t: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: parseRuby(t) }} />;
}

function sendNtfy(profile: Profile, feeling: Feeling, intensityWord: string) {
  console.log('[ntfy] topic:', profile.ntfyTopic);
  if (!profile.ntfyTopic) { console.log('[ntfy] トピックなし、スキップ'); return; }
  const cleanName = feeling.name.replace(/《[^》]+》/g, '');
  console.log('[ntfy] 送信開始:', `https://ntfy.sh/${profile.ntfyTopic}`);
  fetch(`https://ntfy.sh/${profile.ntfyTopic}`, {
    method: 'POST',
    body: `${intensityWord}${cleanName}`,
    headers: {
      'Title': `${profile.name}の気持ちの記録`,
      'Tags': 'heart',
    },
  }).then(r => console.log('[ntfy] 成功:', r.status))
    .catch(e => console.log('[ntfy] エラー:', e));
}

function formatShareMessage(profile: Profile, feeling: Feeling, cat: Category, intensityWord: string, sceneText: string | undefined, memo: string): string {
  const now = new Date();
  const dt = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}時${String(now.getMinutes()).padStart(2, '0')}分`;
  const cleanName = feeling.name.replace(/《[^》]+》/g, '');
  const cleanScene = sceneText?.replace(/《[^》]+》/g, '');
  let msg = `【${profile.name}の気持ちの記録】\n${dt}\n\n`;
  msg += `気持ち：${intensityWord}${cleanName}（${cat.label}）\n`;
  if (cleanScene) msg += `きっかけ：${cleanScene}\n`;
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

function buildRecord(feeling: Feeling, cat: Category, intensity: number, selScene: Feeling['scenes'][0] | null, memo: string): KimochiRecord {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    timestamp: new Date().toISOString(),
    feelingId: feeling.id,
    feelingName: feeling.name,
    categoryId: cat.id,
    categoryLabel: cat.label,
    categoryColor: cat.color,
    sceneKey: selScene?.key,
    sceneText: selScene?.text,
    intensity,
    intensityWord: INTENSITY_WORDS[intensity - 1],
    memo,
  };
}

export default function KimochiApp({ profile }: { profile: Profile }) {
  const autoSave = profile.autoSave !== false;

  const [phase, setPhase] = useState<'select' | 'result'>('select');
  const [catIdx, setCatIdx] = useState(0);
  const [selIdx, setSelIdx] = useState<number | null>(null);
  const [selSceneIdx, setSelSceneIdx] = useState<number | null>(null);
  const [intensity, setIntensity] = useState(3);
  const [memo, setMemo] = useState('');
  const [saved, setSaved] = useState(false);

  const cat: Category = CATEGORIES[catIdx];
  const feeling: Feeling | null = selIdx !== null ? cat.feelings[selIdx] : null;
  const selScene = selSceneIdx !== null && feeling ? feeling.scenes[selSceneIdx] : null;

  function selectCat(i: number) { setCatIdx(i); setSelIdx(null); setSelSceneIdx(null); }
  function selectFeeling(i: number) { setSelIdx(i); setSelSceneIdx(null); }
  function selectScene(i: number) { setSelSceneIdx(prev => prev === i ? null : i); }

  function handleTell() {
    if (!feeling) return;
    if (autoSave) {
      addRecord(buildRecord(feeling, cat, intensity, selScene, ''));
      setSaved(true);
      sendNtfy(profile, feeling, INTENSITY_WORDS[intensity - 1]);
      const lineRecipients = recipients.filter(r => r.type === 'line');
      if (lineRecipients.length > 0) {
        const msg = formatShareMessage(profile, feeling, cat, INTENSITY_WORDS[intensity - 1], selScene?.text, '');
        setTimeout(() => openShare(lineRecipients[0], msg), 400);
      }
    }
    setPhase('result');
  }

  function handleSave() {
    if (!feeling || saved) return;
    addRecord(buildRecord(feeling, cat, intensity, selScene, memo));
    sendNtfy(profile, feeling, INTENSITY_WORDS[intensity - 1]);
    setSaved(true);
  }

  function handleShare(r: ShareRecipient) {
    if (!feeling) return;
    const msg = formatShareMessage(profile, feeling, cat, INTENSITY_WORDS[intensity - 1], selScene?.text, memo);
    openShare(r, msg);
  }

  function handleReset() {
    setPhase('select');
    setSelIdx(null);
    setSelSceneIdx(null);
    setIntensity(3);
    setMemo('');
    setSaved(false);
  }

  const intensityHeights = [9, 14, 21, 28, 36];
  const faceSize = 80 + (intensity - 1) * 10;
  const blobSize = 130 + (intensity - 1) * 28;
  const blobOpacity = 0.18 + (intensity - 1) * 0.05;
  const recipients = getRecipients();

  // ── Result screen shared parts ──
  const ResultHero = () => (
    <>
      <div className="result-hero">
        <div className="result-blob" style={{ width: blobSize, height: blobSize, background: cat.color, opacity: blobOpacity }} />
        <div className="result-face" dangerouslySetInnerHTML={{ __html: buildFaceSVG(feeling!.id, faceSize) }} />
      </div>
      <div className="result-feeling-row">
        <span className="result-iword" style={{ color: cat.color }}>{INTENSITY_WORDS[intensity - 1]}</span>
        <R t={feeling!.name} className="result-fname" />
      </div>
      {selScene ? (
        <div className="result-scene">
          <p className="result-scene-label">なぜかというと</p>
          <div className="result-scene-card" style={{ borderColor: cat.color }}>
            <div dangerouslySetInnerHTML={{ __html: buildSceneSVG(selScene.key) }} />
            <R t={selScene.text} className="result-scene-text" />
          </div>
        </div>
      ) : <div className="result-scene-gap" />}
      <div className="result-intensity">
        <R t="気持《きも》ちの大《おお》きさ" className="result-int-label" />
        <div className="result-int-bars">
          {intensityHeights.map((h, i) => (
            <div key={i} style={{ height: h, flex: 1, borderRadius: 4, background: i < intensity ? cat.color : '#e5e4e0', opacity: i < intensity ? 0.45 + i * 0.14 : 1 }} />
          ))}
        </div>
        <div className="result-int-words"><span>ちょっと</span><span>すごく</span></div>
      </div>
    </>
  );

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

  return (
    <>
      {phase === 'select' ? (
        <div className="app-body">
          <div className="cat-tabs">
            {CATEGORIES.map((c, i) => (
              <button key={c.id} className={`cat-tab ${i === catIdx ? 'active' : ''}`}
                style={i === catIdx ? { background: c.color, borderColor: 'transparent', color: '#fff' } : {}}
                onClick={() => selectCat(i)}>
                {c.label}
              </button>
            ))}
          </div>

          <R t={`${cat.feelings.length}つの気持《きも》ちから選《えら》んでね`} className="q-label" />

          <div className="feelings-grid" style={{ gridTemplateColumns: `repeat(${Math.min(cat.feelings.length, 4)}, 1fr)` }}>
            {cat.feelings.map((f, i) => (
              <button key={f.id + i} className={`fcard ${selIdx === i ? 'sel' : ''}`} onClick={() => selectFeeling(i)}>
                <div dangerouslySetInnerHTML={{ __html: buildFaceSVG(f.id, 50) }} />
                <R t={f.name} className="fname" />
              </button>
            ))}
          </div>

          <div className="divider" />

          {feeling && (
            <div className="detail">
              <div className="detail-header">
                <div dangerouslySetInnerHTML={{ __html: buildFaceSVG(feeling.id, 70) }} />
                <div className="detail-info">
                  <h3 dangerouslySetInnerHTML={{ __html: parseRuby(feeling.name) }} />
                  <p dangerouslySetInnerHTML={{ __html: parseRuby(feeling.desc) }} />
                </div>
              </div>
              <R t="こんな時《とき》、この気持《きも》ちになることがあるよ" className="scenes-label" />
              <div className="scenes-grid">
                {feeling.scenes.map((s, i) => (
                  <button key={i} className={`scene-card ${selSceneIdx === i ? 'sel' : ''}`} onClick={() => selectScene(i)}>
                    <div className="scene-icon" dangerouslySetInnerHTML={{ __html: buildSceneSVG(s.key) }} />
                    <R t={s.text} className="scene-text" />
                  </button>
                ))}
              </div>
              <R t="どのくらいの気持《きも》ち？" className="int-label" />
              <div className="int-bars">
                {intensityHeights.map((h, i) => (
                  <button key={i} className={`ibar ${i + 1 === intensity ? 'active' : ''}`}
                    style={{ height: h, background: cat.color, opacity: 0.33 + i * 0.16 }}
                    onClick={() => setIntensity(i + 1)} aria-label={INTENSITY_WORDS[i]} />
                ))}
              </div>
              <div className="int-words"><span>ちょっと</span><span>すごく</span></div>
              <button className="tell-btn" onClick={handleTell}
                dangerouslySetInnerHTML={{ __html: parseRuby('気持《きも》ちを伝《つた》える！') }} />
            </div>
          )}
        </div>

      ) : autoSave ? (
        /* ── 自動保存モード：完了画面 ── */
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
        /* ── 手動モード：結果画面 ── */
        <div className="result-body">
          <R t="気持《きも》ちを伝《つた》えました！" className="result-title" />
          <ResultHero />

          {/* メモ */}
          <div className="memo-section">
            <label className="memo-label" dangerouslySetInnerHTML={{ __html: parseRuby('メモ（任意《にんい》）') }} />
            <textarea className="memo-textarea" placeholder="ひとことメモを書けるよ"
              value={memo} onChange={e => setMemo(e.target.value)} rows={2} disabled={saved} />
          </div>

          {/* 保存後 */}
          {saved && (
            <>
              <div className="saved-banner" dangerouslySetInnerHTML={{ __html: parseRuby('記録《きろく》しました ✓') }} />
              <ShareButtons />
            </>
          )}

          {/* ボタン群 */}
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
