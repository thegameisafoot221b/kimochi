'use client';
import { useState } from 'react';
import type { Profile, ShareRecipient } from '@/lib/types';
import { saveProfile, getRecipients, saveRecipients } from '@/lib/storage';
import { parseRuby } from '@/lib/ruby';

interface Props {
  profile: Profile;
  onProfileUpdate: (p: Profile) => void;
}

export default function Settings({ profile, onProfileUpdate }: Props) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(String(profile.age));
  const [recipients, setRecipients] = useState<ShareRecipient[]>(() => getRecipients());
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'email' | 'line'>('email');
  const [newValue, setNewValue] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSaveProfile() {
    const p = { ...profile, name: name.trim() || profile.name, age: parseInt(age) || profile.age };
    saveProfile(p);
    onProfileUpdate(p);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function addRecipient() {
    if (!newName.trim() || !newValue.trim()) return;
    const r: ShareRecipient = {
      id: Date.now().toString(),
      name: newName.trim(),
      type: newType,
      value: newValue.trim(),
    };
    const updated = [...recipients, r];
    setRecipients(updated);
    saveRecipients(updated);
    setNewName('');
    setNewValue('');
  }

  function removeRecipient(id: string) {
    const updated = recipients.filter(r => r.id !== id);
    setRecipients(updated);
    saveRecipients(updated);
  }

  return (
    <div className="settings-screen">
      <section className="settings-sec">
        <h2 className="settings-h2" dangerouslySetInnerHTML={{ __html: parseRuby('プロフィール編集《へんしゅう》') }} />

        <label className="settings-label" dangerouslySetInnerHTML={{ __html: parseRuby('名前《なまえ》') }} />
        <input className="settings-input" value={name} onChange={e => setName(e.target.value)} maxLength={20} />

        <label className="settings-label" dangerouslySetInnerHTML={{ __html: parseRuby('年齢《ねんれい》（さい）') }} />
        <input className="settings-input" type="number" value={age} onChange={e => setAge(e.target.value)} min={1} max={99} />

        <button
          className={`settings-save-btn ${saved ? 'done' : ''}`}
          onClick={handleSaveProfile}
          dangerouslySetInnerHTML={{ __html: parseRuby(saved ? '保存《ほぞん》しました ✓' : '保存《ほぞん》する') }}
        />
      </section>

      <section className="settings-sec">
        <h2 className="settings-h2" dangerouslySetInnerHTML={{ __html: parseRuby('送信先《そうしんさき》の管理《かんり》') }} />
        <p className="settings-hint" dangerouslySetInnerHTML={{ __html: parseRuby('記録《きろく》後に LINE やメールで送れます') }} />

        {recipients.length === 0 && (
          <p className="settings-empty" dangerouslySetInnerHTML={{ __html: parseRuby('まだ登録《とうろく》されていません') }} />
        )}

        {recipients.map(r => (
          <div key={r.id} className="settings-rec">
            <span className="settings-rec-badge">{r.type === 'email' ? '✉' : 'LINE'}</span>
            <span className="settings-rec-name">{r.name}</span>
            <span className="settings-rec-val">{r.value}</span>
            <button
              className="settings-del-btn"
              onClick={() => removeRecipient(r.id)}
              dangerouslySetInnerHTML={{ __html: parseRuby('削除《さくじょ》') }}
            />
          </div>
        ))}

        <div className="settings-add-box">
          <h3 className="settings-h3" dangerouslySetInnerHTML={{ __html: parseRuby('送信先《そうしんさき》を追加《ついか》する') }} />
          <input
            className="settings-input"
            placeholder="名前（例：お母さん）"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <div className="settings-type-row">
            {(['email', 'line'] as const).map(t => (
              <button
                key={t}
                className={`settings-type-btn ${newType === t ? 'on' : ''}`}
                onClick={() => setNewType(t)}
              >
                {t === 'email' ? 'メール' : 'LINE'}
              </button>
            ))}
          </div>
          <input
            className="settings-input"
            placeholder={newType === 'email' ? 'メールアドレス' : 'LINE ID'}
            value={newValue}
            onChange={e => setNewValue(e.target.value)}
          />
          <button
            className="settings-add-btn"
            onClick={addRecipient}
            disabled={!newName.trim() || !newValue.trim()}
            dangerouslySetInnerHTML={{ __html: parseRuby('追加《ついか》する') }}
          />
        </div>
      </section>
    </div>
  );
}
