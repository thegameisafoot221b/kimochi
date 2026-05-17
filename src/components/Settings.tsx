'use client';
import { useState } from 'react';
import type { Profile, ShareRecipient } from '@/lib/types';
import { saveProfile, getRecipients, saveRecipients } from '@/lib/storage';
import { parseRuby } from '@/lib/ruby';

interface Props {
  profile: Profile;
  onProfileUpdate: (p: Profile) => void;
  onClose: () => void;
}

export default function Settings({ profile, onProfileUpdate, onClose }: Props) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(String(profile.age));
  const [recipients, setRecipients] = useState<ShareRecipient[]>(() => getRecipients());
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<'email' | 'line'>('email');
  const [newValue, setNewValue] = useState('');
  const [saved, setSaved] = useState(false);

  const [autoSave, setAutoSave] = useState(profile.autoSave !== false);
  const [ntfyTopic, setNtfyTopic] = useState(profile.ntfyTopic ?? '');

  function handleSaveProfile() {
    const p = { ...profile, name: name.trim() || profile.name, age: parseInt(age) || profile.age, autoSave, ntfyTopic: ntfyTopic.trim() || undefined };
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
      <button
        className="settings-close-btn"
        onClick={() => { handleSaveProfile(); onClose(); }}
        dangerouslySetInnerHTML={{ __html: parseRuby('← 設定《せってい》を終《お》わる') }}
      />

      <section className="settings-sec">
        <h2 className="settings-h2" dangerouslySetInnerHTML={{ __html: parseRuby('プロフィール編集《へんしゅう》') }} />

        <label className="settings-label" dangerouslySetInnerHTML={{ __html: parseRuby('名前《なまえ》') }} />
        <input className="settings-input" value={name} onChange={e => setName(e.target.value)} maxLength={20} />

        <label className="settings-label" dangerouslySetInnerHTML={{ __html: parseRuby('年齢《ねんれい》（さい）') }} />
        <input className="settings-input" type="number" value={age} onChange={e => setAge(e.target.value)} min={1} max={99} />

        <div className="settings-toggle-row">
          <div className="settings-toggle-info">
            <span className="settings-toggle-label" dangerouslySetInnerHTML={{ __html: parseRuby('「伝《つた》える」で自動《じどう》記録《きろく》・通知《つうち》') }} />
            <span className="settings-toggle-desc" dangerouslySetInnerHTML={{ __html: parseRuby('OFFにすると「記録《きろく》する」「記録《きろく》しない」を選《えら》べます。ひとことメモを自分《じぶん》で書《か》きたいときはOFFにしてください') }} />
          </div>
          <button
            className={`settings-toggle ${autoSave ? 'on' : ''}`}
            onClick={() => setAutoSave(v => !v)}
            aria-label="自動記録の切り替え"
          >
            <span className="settings-toggle-knob" />
          </button>
        </div>

        <button
          className={`settings-save-btn ${saved ? 'done' : ''}`}
          onClick={handleSaveProfile}
          dangerouslySetInnerHTML={{ __html: parseRuby(saved ? '設定《せってい》を保存《ほぞん》しました ✓' : '設定《せってい》を保存《ほぞん》する') }}
        />
      </section>

      <section className="settings-sec">
        <h2 className="settings-h2" dangerouslySetInnerHTML={{ __html: parseRuby('送信先《そうしんさき》の管理《かんり》') }} />
        <p className="settings-hint" dangerouslySetInnerHTML={{ __html: parseRuby('LINEを登録《とうろく》すると、記録《きろく》時に自動《じどう》でLINEが開きます。保護者《ほごしゃ》や支援者《しえんしゃ》が入《はい》っているグループへの送信《そうしん》がおすすめです。') }} />
        <p className="settings-warn" dangerouslySetInnerHTML={{ __html: parseRuby('注意《ちゅうい》　気持《きも》ちを記録《きろく》した後《あと》に、再度《さいど》メールやLINEの送信《そうしん》ボタンを押《お》す必要《ひつよう》があります。') }} />

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

      <section className="settings-sec">
        <h2 className="settings-h2" dangerouslySetInnerHTML={{ __html: parseRuby('プッシュ通知《つうち》（ntfy）') }} />
        <p className="settings-hint" dangerouslySetInnerHTML={{ __html: parseRuby('スマホに無料《むりょう》で通知《つうち》を送《おく》れます。スマホに「ntfy」アプリをインストールし、好《す》きなトピック名《めい》を決《き》めて登録《とうろく》してください。') }} />
        <p className="settings-hint ntfy-hint-sub" dangerouslySetInnerHTML={{ __html: parseRuby('トピック名《めい》は他《ほか》の人《ひと》に知《し》られにくいランダムな文字列《もじれつ》（例：kimochi-abc123）にすることをおすすめします。') }} />
        <label className="settings-label">ntfy トピック名</label>
        <input
          className="settings-input"
          placeholder="例: kimochi-abc123"
          value={ntfyTopic}
          onChange={e => setNtfyTopic(e.target.value)}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
        />
        <button
          className={`settings-save-btn ${saved ? 'done' : ''}`}
          onClick={handleSaveProfile}
          dangerouslySetInnerHTML={{ __html: parseRuby(saved ? '設定《せってい》を保存《ほぞん》しました ✓' : '設定《せってい》を保存《ほぞん》する') }}
        />
      </section>
    </div>
  );
}
