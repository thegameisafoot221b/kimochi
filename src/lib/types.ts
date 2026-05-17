import type { FaceType, SceneKey } from './feelings';

export type Gender = 'male' | 'female' | 'other';
export type Environment = 'home' | 'school' | 'other';
export type UsageStyle = 'alone' | 'with_supporter';

export interface Profile {
  name: string;
  gender: Gender;
  age: number;
  environments: Environment[];
  style: UsageStyle[];
  autoSave: boolean;
  ntfyTopic?: string;
}

export interface ShareRecipient {
  id: string;
  name: string;
  type: 'line' | 'email';
  value: string;
}

export interface KimochiRecord {
  id: string;
  timestamp: string;
  feelingId: FaceType;
  feelingName: string;
  categoryId: string;
  categoryLabel: string;
  categoryColor: string;
  sceneKey?: SceneKey;
  sceneText?: string;
  intensity: number;
  intensityWord: string;
  memo: string;
}
