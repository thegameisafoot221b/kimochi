import type { Profile, KimochiRecord, ShareRecipient } from './types';

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const d = localStorage.getItem(key);
    return d ? (JSON.parse(d) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const getProfile = () => read<Profile | null>('kimochi_profile', null);
export const saveProfile = (p: Profile) => write('kimochi_profile', p);

export const getRecords = () => read<KimochiRecord[]>('kimochi_records', []);
export function addRecord(r: KimochiRecord) {
  write('kimochi_records', [...getRecords(), r]);
}
export function deleteRecord(id: string) {
  write('kimochi_records', getRecords().filter(r => r.id !== id));
}

export const getRecipients = () => read<ShareRecipient[]>('kimochi_recipients', []);
export const saveRecipients = (rs: ShareRecipient[]) => write('kimochi_recipients', rs);
