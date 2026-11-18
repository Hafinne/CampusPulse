import { CheckInEntry, MOOD_CONFIGS } from './types';

const STORAGE_KEY = 'campuspulse_demo_checkins_v1';

// Fictional demo seed data for initial interactive prototype experience
export const INITIAL_DEMO_ENTRIES: CheckInEntry[] = [
  {
    id: 'demo-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString().split('T')[0],
    displayDate: '3 days ago',
    time: '14:15',
    mood: 3,
    moodLabel: MOOD_CONFIGS[3].label,
    moodEmoji: MOOD_CONFIGS[3].emoji,
    campusFeeling: 'yes',
    peerObservation: 'no',
    reflection: 'Finished my group project draft in the campus library. Feeling calm and steady.',
  },
  {
    id: 'demo-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString().split('T')[0],
    displayDate: '2 days ago',
    time: '18:40',
    mood: 4,
    moodLabel: MOOD_CONFIGS[4].label,
    moodEmoji: MOOD_CONFIGS[4].emoji,
    campusFeeling: 'yes',
    peerObservation: 'no',
    reflection: 'Had a fun discussion during GLB300 workshop. Campus lawn was lively today!',
  },
  {
    id: 'demo-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString().split('T')[0],
    displayDate: 'Yesterday',
    time: '11:05',
    mood: 2,
    moodLabel: MOOD_CONFIGS[2].label,
    moodEmoji: MOOD_CONFIGS[2].emoji,
    campusFeeling: 'partially',
    peerObservation: 'yes',
    reflection: 'A little overwhelmed with upcoming midterm deadlines. Need to schedule breaks.',
  },
];

// Fictional entries simulating 4 consecutive low mood days for the Tier 1 demonstration
export const FOUR_LOW_MOOD_ENTRIES: CheckInEntry[] = [
  {
    id: 'tier1-today',
    timestamp: new Date().toISOString(),
    date: new Date().toISOString().split('T')[0],
    displayDate: 'Today',
    time: '10:30',
    mood: 2,
    moodLabel: MOOD_CONFIGS[2].label,
    moodEmoji: MOOD_CONFIGS[2].emoji,
    campusFeeling: 'partially',
    peerObservation: 'no',
    reflection: 'Struggling to keep up with lab reports. Feeling drained.',
  },
  {
    id: 'tier1-yest',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString().split('T')[0],
    displayDate: 'Yesterday',
    time: '15:20',
    mood: 1,
    moodLabel: MOOD_CONFIGS[1].label,
    moodEmoji: MOOD_CONFIGS[1].emoji,
    campusFeeling: 'no',
    peerObservation: 'prefer-not-to-say',
    reflection: 'Very exhausted and stressed about midterms.',
  },
  {
    id: 'tier1-2days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString().split('T')[0],
    displayDate: '2 days ago',
    time: '16:45',
    mood: 2,
    moodLabel: MOOD_CONFIGS[2].label,
    moodEmoji: MOOD_CONFIGS[2].emoji,
    campusFeeling: 'partially',
    peerObservation: 'no',
    reflection: 'Could not sleep well, hard to focus during lectures.',
  },
  {
    id: 'tier1-3days',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString().split('T')[0],
    displayDate: '3 days ago',
    time: '13:10',
    mood: 2,
    moodLabel: MOOD_CONFIGS[2].label,
    moodEmoji: MOOD_CONFIGS[2].emoji,
    campusFeeling: 'no',
    peerObservation: 'no',
    reflection: 'Felt isolated in the study hall today.',
  },
];

export function getCheckIns(): CheckInEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ENTRIES));
      return INITIAL_DEMO_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return INITIAL_DEMO_ENTRIES;
  }
}

export function saveCheckIn(entry: Omit<CheckInEntry, 'id' | 'timestamp' | 'date' | 'displayDate' | 'time'>): CheckInEntry {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is only available in the browser.');
  }

  const now = new Date();
  const newEntry: CheckInEntry = {
    ...entry,
    id: `checkin-${Date.now()}`,
    timestamp: now.toISOString(),
    date: now.toISOString().split('T')[0],
    displayDate: 'Today',
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };

  try {
    const existing = getCheckIns();
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (error) {
    console.error('Error saving check-in to localStorage:', error);
    return newEntry;
  }
}

export function deleteCheckIn(id: string): CheckInEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getCheckIns();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (error) {
    console.error('Error deleting check-in:', error);
    return [];
  }
}

export function resetDemoData(): CheckInEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ENTRIES));
    return INITIAL_DEMO_ENTRIES;
  } catch (error) {
    console.error('Error resetting demo data:', error);
    return INITIAL_DEMO_ENTRIES;
  }
}

export function simulateFourLowMoodDays(): CheckInEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(FOUR_LOW_MOOD_ENTRIES));
    return FOUR_LOW_MOOD_ENTRIES;
  } catch (error) {
    console.error('Error setting simulation data:', error);
    return FOUR_LOW_MOOD_ENTRIES;
  }
}

export function clearAllCheckIns(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

/**
 * Tier 1 Rule Detector:
 * Provisionally flags if the latest 4 recorded check-in entries all have low mood (mood <= 2).
 * Fictional demonstration rule pending psychology-team review. Non-diagnostic.
 */
export function checkTier1LowMood(entries: CheckInEntry[]): boolean {
  if (!entries || entries.length < 4) return false;
  // Check the most recent 4 entries
  const recentFour = entries.slice(0, 4);
  return recentFour.every((e) => typeof e.mood === 'number' && e.mood <= 2);
}
