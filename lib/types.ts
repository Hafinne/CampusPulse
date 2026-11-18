export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export type CampusFeeling = 'yes' | 'partially' | 'no';

export type PeerObservation = 'yes' | 'no' | 'prefer-not-to-say';

export interface CheckInEntry {
  id: string;
  timestamp: string; // ISO string
  date: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Today, Nov 10" or "Mon, Nov 9"
  time: string; // e.g. "14:30"
  mood: MoodLevel;
  moodLabel: string;
  moodEmoji: string;
  campusFeeling: CampusFeeling;
  peerObservation: PeerObservation;
  reflection?: string;
}

export interface MoodConfig {
  level: MoodLevel;
  label: string;
  emoji: string;
  subtitle: string;
  bgLight: string;
  textColor: string;
  borderColor: string;
  gradient: string;
  ringColor: string;
}

export const MOOD_CONFIGS: Record<MoodLevel, MoodConfig> = {
  1: {
    level: 1,
    label: 'Very Low',
    emoji: '😫',
    subtitle: 'Drained or overwhelmed',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    gradient: 'from-rose-400 to-pink-500',
    ringColor: 'ring-rose-400',
  },
  2: {
    level: 2,
    label: 'Low',
    emoji: '🙁',
    subtitle: 'A bit down or tired',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
    gradient: 'from-amber-400 to-orange-400',
    ringColor: 'ring-amber-400',
  },
  3: {
    level: 3,
    label: 'Okay',
    emoji: '😐',
    subtitle: 'Neutral and steady',
    bgLight: 'bg-sky-50',
    textColor: 'text-sky-800',
    borderColor: 'border-sky-200',
    gradient: 'from-sky-400 to-blue-500',
    ringColor: 'ring-sky-400',
  },
  4: {
    level: 4,
    label: 'Good',
    emoji: '🙂',
    subtitle: 'Positive & energetic',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    gradient: 'from-emerald-400 to-teal-500',
    ringColor: 'ring-emerald-400',
  },
  5: {
    level: 5,
    label: 'Amazing',
    emoji: '🤩',
    subtitle: 'Thriving & inspired',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-800',
    borderColor: 'border-violet-200',
    gradient: 'from-violet-500 to-purple-600',
    ringColor: 'ring-violet-400',
  },
};

