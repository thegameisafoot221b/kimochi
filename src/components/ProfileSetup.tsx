'use client';
import { useState } from 'react';
import type { Profile } from '@/lib/types';
import { parseRuby } from '@/lib/ruby';

function ageToGrade(age: number): string {
  if (age <= 0) return '';
  if (age <= 5) return '未就学《みしゅうがく》（幼児《ようじ》）';
  if (age === 6) return '小学《しょうがく》1年生《ねんせい》';
  if (age === 7) return '小学《しょうがく》2年生《ねんせい》';
  if (age === 8) return '小学《しょうがく》3年生《ねんせい》';
  if (age === 9) return '小学《しょうがく》4年生《ねんせい》';
  if (age === 10) return '小学《しょうがく》5年生《ねんせい》';
  if (age === 11) return '小学《しょうがく》6年生《ねんせい》';
  if (age === 12) return '中学《ちゅうがく》1年生《ねんせい》';
  if (age === 13) return '中学《ちゅうがく》2年生《ねんせい》';
  if (age === 14) return '中学《ちゅうがく》3年生《ねんせい》';
  if (age === 15) return '高校《こうこう》1年生《ねんせい》';
  if (age === 16) return '高校《こうこう》2年生《ねんせい》';
  if (age === 17) return '高校《こうこう》3年生《ねんせい》';
  return '18歳《さい》以上《いじょう》';
}

export default function ProfileSetup({ onComplete }: { onComplete: (p: Profile) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Profile['gender'] | ''>('');
  const [age, setAge] = useState('');
  const [envs, setEnvs] = useState<Profile['environments']>([]);
  const [style, setStyle] = useState<Profile['style']>([]);

  function toggle<T extends string>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
  }

  function finish() {
    onComplete({
      name: name.trim() || 'なまえなし',
      gender: (gender || 'other') as Profile['gender'],
      age: Math.max(1, parseInt(age) || 10),
      environments: envs.length ? envs : ['home'],
      style: style.length ? style : ['alone'],
      autoSave: true,
      showDelete: true,
      emotionMode: 'original',
    });
  }

  const canNext = [true, !!gender, !!age && parseInt(age) > 0, envs.length > 0, style.length > 0];
  const TOTAL = 5;

  return (
    <div className="page-wrapper">
      <div className="app-wrap">
        <div className="top-bar">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="10" stroke="#EEEDFE" strokeWidth="1.5" />
            <circle cx="8" cy="9" r="1.3" fill="#EEEDFE" />
            <circle cx="14" cy="9" r="1.3" fill="#EEEDFE" />
            <path d="M7 14c1 1.3 8 1.3 8 0" stroke="#EEEDFE" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="top-bar-title" dangerouslySetInnerHTML={{ __html: parseRuby('はじめての設定《せってい》') }} />
        </div>

        <div className="setup-body">
          <div className="setup-progress">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} className={`setup-dot ${i <= step ? 'on' : ''}`} />
            ))}
          </div>

          <div className="setup-step">
            {step === 0 && (
              <>
                <p className="setup-q" dangerouslySetInnerHTML={{ __html: parseRuby('名前《なまえ》を教《おし》えてね') }} />
                <p className="setup-sub">なくてもOKです</p>
                <input
                  className="setup-input"
                  placeholder="なまえをいれてね"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={20}
                />
              </>
            )}

            {step === 1 && (
              <>
                <p className="setup-q" dangerouslySetInnerHTML={{ __html: parseRuby('性別《せいべつ》を教《おし》えてね') }} />
                <div className="setup-choices">
                  {(['male', 'female', 'other'] as const).map((g, i) => (
                    <button
                      key={g}
                      className={`setup-choice ${gender === g ? 'on' : ''}`}
                      onClick={() => setGender(g)}
                      dangerouslySetInnerHTML={{ __html: parseRuby(['男《おとこ》', '女《おんな》', '決《き》めたくない'][i]) }}
                    />
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="setup-q" dangerouslySetInnerHTML={{ __html: parseRuby('年齢《ねんれい》を教《おし》えてね') }} />
                <div className="setup-age-row">
                  <input
                    className="setup-input setup-input-sm"
                    type="number"
                    min={1}
                    max={99}
                    placeholder="10"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                  />
                  <span className="setup-age-unit">さい</span>
                </div>
                {age && parseInt(age) > 0 && (
                  <p className="setup-grade" dangerouslySetInnerHTML={{ __html: parseRuby(ageToGrade(parseInt(age))) }} />
                )}
              </>
            )}

            {step === 3 && (
              <>
                <p className="setup-q" dangerouslySetInnerHTML={{ __html: parseRuby('どこで使《つか》いますか？') }} />
                <p className="setup-sub">いくつでも選べるよ</p>
                <div className="setup-choices">
                  {(['home', 'school', 'other'] as const).map((e, i) => (
                    <button
                      key={e}
                      className={`setup-choice ${envs.includes(e) ? 'on' : ''}`}
                      onClick={() => setEnvs(toggle(envs, e))}
                      dangerouslySetInnerHTML={{ __html: parseRuby(['家《いえ》', '学校《がっこう》・施設《しせつ》', 'その他《た》'][i]) }}
                    />
                  ))}
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <p className="setup-q" dangerouslySetInnerHTML={{ __html: parseRuby('どのように使《つか》いますか？') }} />
                <div className="setup-choices">
                  {(['alone', 'with_supporter'] as const).map((s, i) => (
                    <button
                      key={s}
                      className={`setup-choice ${style[0] === s ? 'on' : ''}`}
                      onClick={() => setStyle([s])}
                      dangerouslySetInnerHTML={{ __html: parseRuby(['自分《じぶん》ひとりで', '支援者《しえんしゃ》と一緒《いっしょ》に'][i]) }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="setup-nav-row">
            {step > 0 && (
              <button className="setup-back-btn" onClick={() => setStep(s => s - 1)}>← もどる</button>
            )}
            <button
              className="setup-next-btn"
              disabled={!canNext[step]}
              onClick={() => step < TOTAL - 1 ? setStep(s => s + 1) : finish()}
            >
              {step < TOTAL - 1 ? 'つぎへ →' : 'はじめる！'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
