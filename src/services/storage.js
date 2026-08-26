// Local storage helpers with fallback handling

const getStoredItem = (key, fallback) => {
  try {
    const data = localStorage.getItem(`prepwise_${key}`)
    return data ? JSON.parse(data) : fallback
  } catch (error) {
    console.warn(`Error reading from localStorage (${key}):`, error)
    return fallback
  }
}

const setStoredItem = (key, value) => {
  try {
    localStorage.setItem(`prepwise_${key}`, JSON.stringify(value))
  } catch (error) {
    console.warn(`Error saving to localStorage (${key}):`, error)
  }
}

export const storage = {
  get: getStoredItem,
  set: setStoredItem,
  
  // High-level accessors
  getProfile: (fallback) => getStoredItem('profile', fallback || {
    name: 'Arjun Kumar',
    major: 'Computer Science',
    year: '3rd Year',
    targetRole: 'Software Engineer',
    targetCompany: 'Google / Atlassian',
    streak: 4
  }),
  setProfile: (profile) => setStoredItem('profile', profile),

  getSavedCompanies: () => getStoredItem('saved_companies', ['google', 'atlassian']),
  setSavedCompanies: (companies) => setStoredItem('saved_companies', companies),

  getCompletedTopics: () => getStoredItem('completed_topics', {
    'quant-percentages': true,
    'quant-time-work': true,
    'logical-syllogisms': true,
    'verbal-reading': true,
    'dsa-arrays-167': true,
    'dsa-arrays-15': true,
    'dsa-arrays-11': true,
    'dsa-trees-98': true,
    'dsa-trees-102': true,
    'dsa-dp-322': true,
    'dsa-graphs-200': true,
    'dsa-graphs-207': true,
    'phase-1': true,
    'phase-2': true,
    'phase-3': true
  }),
  setCompletedTopics: (topics) => setStoredItem('completed_topics', topics),

  getApplications: (fallback) => getStoredItem('applications', fallback),
  setApplications: (apps) => setStoredItem('applications', apps),

  getMockSessions: () => getStoredItem('mock_sessions', [
    {
      id: 'session-1',
      date: 'Yesterday',
      category: 'Technical (DSA)',
      topic: 'Arrays & Two Pointers',
      score: 8.5,
      feedback: 'Great explanation of sliding window. Handled edge cases nicely.'
    },
    {
      id: 'session-2',
      date: '3 days ago',
      category: 'HR & Behavioral',
      topic: 'Introduction & Pitch',
      score: 7.4,
      feedback: 'Good structure. Try to quantify project metrics more clearly using STAR format.'
    }
  ]),
  setMockSessions: (sessions) => setStoredItem('mock_sessions', sessions)
}
