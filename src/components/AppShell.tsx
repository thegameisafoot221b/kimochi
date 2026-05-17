'use client';
import { useState, useEffect } from 'react';
import { getProfile, saveProfile } from '@/lib/storage';
import type { Profile } from '@/lib/types';
import ProfileSetup from './ProfileSetup';
import KimochiApp from './KimochiApp';
import CalendarView from './CalendarView';
import Settings from './Settings';
import { parseRuby } from '@/lib/ruby';

type Screen = 'home' | 'calendar' | 'settings';

const TITLES: Record<Screen, string> = {
  home: '気持《きも》ちを選《えら》ぼう',
  calendar: 'カレンダー',
  settings: '設定《せってい》',
};

function NavBar({ current, onChange }: { current: Screen; onChange: (s: Screen) => void }) {
  return (
    <nav className="nav-bar">
      <button className={`nav-btn ${current === 'home' ? 'active' : ''}`} onClick={() => onChange('home')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="10" r="1.2" fill="currentColor" />
          <circle cx="14" cy="10" r="1.2" fill="currentColor" />
          <path d="M7.5 14c1 1.2 7 1.2 7 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span>気持ち</span>
      </button>
      <button className={`nav-btn ${current === 'calendar' ? 'active' : ''}`} onClick={() => onChange('calendar')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="3" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 9h16" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 3v4M15 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="6" y="12" width="3" height="2.5" rx="0.5" fill="currentColor" opacity="0.6" />
          <rect x="10" y="12" width="3" height="2.5" rx="0.5" fill="currentColor" opacity="0.6" />
          <rect x="13" y="12" width="3" height="2.5" rx="0.5" fill="currentColor" opacity="0.4" />
        </svg>
        <span>カレンダー</span>
      </button>
      <button className={`nav-btn ${current === 'settings' ? 'active' : ''}`} onClick={() => onChange('settings')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M11 2v2M11 18v2M2 11h2M18 11h2M4.93 4.93l1.41 1.41M15.66 15.66l1.41 1.41M4.93 17.07l1.41-1.41M15.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <span dangerouslySetInnerHTML={{ __html: parseRuby('設定《せってい》') }} />
      </button>
    </nav>
  );
}

export default function AppShell() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [screen, setScreen] = useState<Screen>('home');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!profile) {
    return <ProfileSetup onComplete={(p) => { saveProfile(p); setProfile(p); }} />;
  }

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
          <span className="top-bar-title" dangerouslySetInnerHTML={{ __html: parseRuby(TITLES[screen]) }} />
          <span className="top-bar-name">{profile.name}</span>
        </div>

        {screen === 'home' && <KimochiApp profile={profile} />}
        {screen === 'calendar' && <CalendarView />}
        {screen === 'settings' && (
          <Settings
            profile={profile}
            onProfileUpdate={(p) => { saveProfile(p); setProfile(p); }}
            onClose={() => setScreen('home')}
          />
        )}

        <NavBar current={screen} onChange={setScreen} />
      </div>
    </div>
  );
}
