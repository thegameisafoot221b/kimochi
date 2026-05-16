'use client';

import { useState } from 'react';
import { CATEGORIES, INTENSITY_WORDS, Category, Feeling } from '@/lib/feelings';
import { buildFaceSVG } from '@/lib/faceSvg';
import { buildSceneSVG } from '@/lib/sceneSvg';

export default function KimochiApp() {
  const [phase, setPhase] = useState<'select' | 'result'>('select');
  const [catIdx, setCatIdx] = useState(0);
  const [selIdx, setSelIdx] = useState<number | null>(null);
  const [selSceneIdx, setSelSceneIdx] = useState<number | null>(null);
  const [intensity, setIntensity] = useState(3);

  const cat: Category = CATEGORIES[catIdx];
  const feeling: Feeling | null = selIdx !== null ? cat.feelings[selIdx] : null;
  const selScene = selSceneIdx !== null && feeling ? feeling.scenes[selSceneIdx] : null;

  function selectCat(i: number) {
    setCatIdx(i);
    setSelIdx(null);
    setSelSceneIdx(null);
  }

  function selectFeeling(i: number) {
    setSelIdx(i);
    setSelSceneIdx(null);
  }

  function selectScene(i: number) {
    setSelSceneIdx(prev => prev === i ? null : i);
  }

  function handleTell() {
    if (!feeling) return;
    setPhase('result');
  }

  function handleReset() {
    setPhase('select');
    setSelIdx(null);
    setSelSceneIdx(null);
    setIntensity(3);
  }

  const intensityHeights = [9, 14, 21, 28, 36];

  // Result screen visual parameters — face and blob scale with intensity
  const faceSize = 80 + (intensity - 1) * 10;
  const blobSize = 130 + (intensity - 1) * 28;
  const blobOpacity = 0.18 + (intensity - 1) * 0.05;

  return (
    <div className="app-wrap">
      {/* Header */}
      <div className="top-bar">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="10" stroke="#EEEDFE" strokeWidth="1.5" />
          <circle cx="8" cy="9" r="1.3" fill="#EEEDFE" />
          <circle cx="14" cy="9" r="1.3" fill="#EEEDFE" />
          <path d="M7 14c1 1.3 8 1.3 8 0" stroke="#EEEDFE" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span className="top-bar-title">きもちをえらぼう</span>
      </div>

      {phase === 'select' ? (
        <div className="app-body">
          {/* Category tabs */}
          <div className="cat-tabs">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.id}
                className={`cat-tab ${i === catIdx ? 'active' : ''}`}
                style={i === catIdx ? { background: c.color, borderColor: 'transparent', color: '#fff' } : {}}
                onClick={() => selectCat(i)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <p className="q-label">
            {cat.feelings.length}つのきもちから えらんでね
          </p>

          {/* Feeling grid */}
          <div
            className="feelings-grid"
            style={{ gridTemplateColumns: `repeat(${Math.min(cat.feelings.length, 4)}, 1fr)` }}
          >
            {cat.feelings.map((f, i) => (
              <button
                key={f.id + i}
                className={`fcard ${selIdx === i ? 'sel' : ''}`}
                onClick={() => selectFeeling(i)}
              >
                <div dangerouslySetInnerHTML={{ __html: buildFaceSVG(f.id, 50) }} />
                <span className="fname">{f.name}</span>
              </button>
            ))}
          </div>

          <div className="divider" />

          {/* Detail panel */}
          {feeling && (
            <div className="detail">
              <div className="detail-header">
                <div dangerouslySetInnerHTML={{ __html: buildFaceSVG(feeling.id, 70) }} />
                <div className="detail-info">
                  <h3>{feeling.name}</h3>
                  <p>{feeling.desc}</p>
                </div>
              </div>

              <p className="scenes-label">こんなとき、このきもちになることがあるよ</p>
              <div className="scenes-grid">
                {feeling.scenes.map((s, i) => (
                  <button
                    key={i}
                    className={`scene-card ${selSceneIdx === i ? 'sel' : ''}`}
                    onClick={() => selectScene(i)}
                  >
                    <div className="scene-icon" dangerouslySetInnerHTML={{ __html: buildSceneSVG(s.key) }} />
                    <span className="scene-text">{s.text}</span>
                  </button>
                ))}
              </div>

              {/* Intensity */}
              <p className="int-label">どのくらいの きもち？</p>
              <div className="int-bars">
                {intensityHeights.map((h, i) => (
                  <button
                    key={i}
                    className={`ibar ${i + 1 === intensity ? 'active' : ''}`}
                    style={{ height: h, background: cat.color, opacity: 0.33 + i * 0.16 }}
                    onClick={() => setIntensity(i + 1)}
                    aria-label={INTENSITY_WORDS[i]}
                  />
                ))}
              </div>
              <div className="int-words">
                <span>ちょっと</span>
                <span>すごく</span>
              </div>

              <button className="tell-btn" onClick={handleTell}>
                つたえる！
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ── Result screen ── */
        <div className="result-body">
          <p className="result-title">きもちをつたえました！</p>

          {/* Hero: face + glow blob, both scale with intensity */}
          <div className="result-hero">
            <div
              className="result-blob"
              style={{
                width: blobSize,
                height: blobSize,
                background: cat.color,
                opacity: blobOpacity,
              }}
            />
            <div
              className="result-face"
              dangerouslySetInnerHTML={{ __html: buildFaceSVG(feeling!.id, faceSize) }}
            />
          </div>

          {/* Feeling name + intensity word */}
          <div className="result-feeling-row">
            <span className="result-iword" style={{ color: cat.color }}>
              {INTENSITY_WORDS[intensity - 1]}
            </span>
            <span className="result-fname">{feeling!.name}</span>
          </div>

          {/* Scene / cause */}
          {selScene ? (
            <div className="result-scene">
              <p className="result-scene-label">なぜかというと</p>
              <div className="result-scene-card" style={{ borderColor: cat.color }}>
                <div dangerouslySetInnerHTML={{ __html: buildSceneSVG(selScene.key) }} />
                <span className="result-scene-text">{selScene.text}</span>
              </div>
            </div>
          ) : (
            <div className="result-scene-gap" />
          )}

          {/* Intensity bar (read-only) */}
          <div className="result-intensity">
            <p className="result-int-label">きもちの大きさ</p>
            <div className="result-int-bars">
              {intensityHeights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: h,
                    flex: 1,
                    borderRadius: 4,
                    background: i < intensity ? cat.color : '#e5e4e0',
                    opacity: i < intensity ? 0.45 + i * 0.14 : 1,
                  }}
                />
              ))}
            </div>
            <div className="result-int-words">
              <span>ちょっと</span>
              <span>すごく</span>
            </div>
          </div>

          <button className="retry-btn" onClick={handleReset}>
            もう一度気持ちを伝え直す
          </button>
        </div>
      )}
    </div>
  );
}
