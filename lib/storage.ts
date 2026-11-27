import { CheckInEntry, CounselorRequest, MOOD_CONFIGS, MoodLevel, RequestStatus } from './types';

const STORAGE_KEY = 'campuspulse_demo_checkins_v1';
const PSEUDONYM_KEY = 'campuspulse_student_pseudonym_v1';
const COUNSELOR_REQUESTS_KEY = 'campuspulse_counselor_requests_v1';

// Default fictional requests for Counselor Demo
export const INITIAL_COUNSELOR_REQUESTS: CounselorRequest[] = [
  {
    id: 'req-1',
    pseudonym: 'Student #4092',
    topic: 'Midterm Burnout & Sleep Anxiety',
    preference: 'Confidential 1-on-1 (Online)',
    timeAgo: '2 hours ago',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    moodLevel: 2,
    moodEmoji: '🙁',
    status: 'Pending Review',
    studentNote:
      'Overwhelmed with engineering deadlines and finding it hard to sleep before lab exams. Looking for study-break strategies.',
  },
  {
    id: 'req-2',
    pseudonym: 'Student #3815',
    topic: 'First-Year Social Adjustment',
    preference: 'In-Person (Student Center Rm 204)',
    timeAgo: 'Yesterday',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    moodLevel: 2,
    moodEmoji: '🙁',
    status: 'Scheduled',
    scheduledSlot: 'Thu, 14:30 • Student Center Rm 204',
    studentNote:
      'Moved from out-of-town, feeling disconnected from dorm peers. Want to learn about campus social groups.',
  },
  {
    id: 'req-3',
    pseudonym: 'Student #3104',
    topic: 'Time Management Workshop Inquiry',
    preference: 'Small Group Workshop',
    timeAgo: '3 days ago',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    moodLevel: 3,
    moodEmoji: '😐',
    status: 'Completed',
    studentNote:
      'Attended the stress-reduction group session in library pod B. Follow-up materials delivered.',
  },
];

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

/**
 * Generates or retrieves a persistent, privacy-preserving salted pseudonym for the browser session
 * e.g., "Student #7F4A"
 */
export function getOrCreateStudentPseudonym(): string {
  if (typeof window === 'undefined') return 'Student #ANON';
  try {
    const existing = localStorage.getItem(PSEUDONYM_KEY);
    if (existing) return existing;

    const hexChars = '0123456789ABCDEF';
    let token = '';
    if (typeof window.crypto !== 'undefined' && window.crypto.getRandomValues) {
      const array = new Uint8Array(2);
      window.crypto.getRandomValues(array);
      token = Array.from(array)
        .map((b) => b.toString(16).toUpperCase().padStart(2, '0'))
        .join('');
    } else {
      for (let i = 0; i < 4; i++) {
        token += hexChars[Math.floor(Math.random() * hexChars.length)];
      }
    }

    const pseudonym = `Student #${token}`;
    localStorage.setItem(PSEUDONYM_KEY, pseudonym);
    return pseudonym;
  } catch (error) {
    console.error('Error generating student pseudonym:', error);
    return 'Student #4821';
  }
}

export function getCounselorRequests(): CounselorRequest[] {
  if (typeof window === 'undefined') return INITIAL_COUNSELOR_REQUESTS;
  try {
    const raw = localStorage.getItem(COUNSELOR_REQUESTS_KEY);
    if (!raw) {
      localStorage.setItem(COUNSELOR_REQUESTS_KEY, JSON.stringify(INITIAL_COUNSELOR_REQUESTS));
      return INITIAL_COUNSELOR_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_COUNSELOR_REQUESTS;
  } catch (error) {
    console.error('Error reading counselor requests:', error);
    return INITIAL_COUNSELOR_REQUESTS;
  }
}

export function createCounselorRequest(input: {
  topic: string;
  preference: string;
  studentNote: string;
  moodLevel: MoodLevel;
}): CounselorRequest {
  const pseudonym = getOrCreateStudentPseudonym();
  const moodConfig = MOOD_CONFIGS[input.moodLevel] || MOOD_CONFIGS[2];
  const now = new Date();

  const newReq: CounselorRequest = {
    id: `req-${Date.now()}`,
    pseudonym,
    topic: input.topic,
    preference: input.preference,
    timeAgo: `Just now (${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
    createdAt: now.toISOString(),
    moodLevel: input.moodLevel,
    moodEmoji: moodConfig.emoji,
    status: 'Pending Review',
    studentNote:
      input.studentNote.trim() ||
      'Tier 1 Soft-Nudge referral initiated after 4 consecutive low-mood check-ins.',
    isLiveUserRequest: true,
  };

  try {
    const existing = getCounselorRequests();
    const updated = [newReq, ...existing];
    localStorage.setItem(COUNSELOR_REQUESTS_KEY, JSON.stringify(updated));
    return newReq;
  } catch (error) {
    console.error('Error saving counselor request:', error);
    return newReq;
  }
}

export function updateCounselorRequestStatus(
  id: string,
  status: RequestStatus,
  scheduledSlot?: string
): CounselorRequest[] {
  if (typeof window === 'undefined') return INITIAL_COUNSELOR_REQUESTS;
  try {
    const existing = getCounselorRequests();
    const updated = existing.map((req) =>
      req.id === id
        ? {
            ...req,
            status,
            scheduledSlot: scheduledSlot !== undefined ? scheduledSlot : req.scheduledSlot,
          }
        : req
    );
    localStorage.setItem(COUNSELOR_REQUESTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error updating counselor request:', error);
    return INITIAL_COUNSELOR_REQUESTS;
  }
}

export function resetCounselorRequests(): CounselorRequest[] {
  if (typeof window === 'undefined') return INITIAL_COUNSELOR_REQUESTS;
  try {
    localStorage.setItem(COUNSELOR_REQUESTS_KEY, JSON.stringify(INITIAL_COUNSELOR_REQUESTS));
    return INITIAL_COUNSELOR_REQUESTS;
  } catch (error) {
    console.error('Error resetting counselor requests:', error);
    return INITIAL_COUNSELOR_REQUESTS;
  }
}
