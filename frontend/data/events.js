export const events = [
  { id: 1, name: 'CODEFURY', category: 'technical', description: 'Competitive programming challenge.', date: '07 October 2026', time: '10:00 AM' },
  { id: 2, name: 'AI ARENA', category: 'technical', description: 'Build, solve, and outthink the impossible.', date: '07 October 2026', time: '11:30 AM' },
  { id: 3, name: 'BUG HUNT', category: 'technical', description: 'Find the flaw. Claim the crown.', date: '07 October 2026', time: '01:00 PM' },
  { id: 4, name: 'TECH TITANS', category: 'technical', description: 'A battle of ideas and engineering.', date: '07 October 2026', time: '02:30 PM' },
  { id: 5, name: 'INNOVATE X', category: 'technical', description: 'Turn a spark into a working future.', date: '07 October 2026', time: '03:30 PM' },
  { id: 6, name: 'MIND MASH', category: 'non-technical', description: 'The quickest minds meet the wildest questions.', date: '07 October 2026', time: '10:00 AM' },
  { id: 7, name: 'CINEMA CLASH', category: 'non-technical', description: 'Lights, camera, creative chaos.', date: '07 October 2026', time: '11:30 AM' },
  { id: 8, name: 'TREASURE CODE', category: 'non-technical', description: 'Follow the clues. Find the flame.', date: '07 October 2026', time: '01:30 PM' },
  { id: 9, name: 'MEME WAR', category: 'non-technical', description: 'Bring the wit. Leave the filters.', date: '07 October 2026', time: '02:30 PM' },
  { id: 10, name: 'PHOENIX RUSH', category: 'non-technical', description: 'One final sprint into the unknown.', date: '07 October 2026', time: '04:00 PM' },
]

export const schedule = [
  ['09:00 AM', 'Embers gather', 'Registration & welcome'],
  ['10:00 AM', 'The awakening', 'Technical and non-technical events begin'],
  ['01:00 PM', 'Forge hour', 'Special workshop: From ideas to intelligent systems'],
  ['03:30 PM', 'The final flight', 'Grand finale, prizes & championship trophy'],
]

export const team = ['Chief Patron', 'Patron', 'Convener', 'Head of Department', 'Faculty Coordinators', 'Student Coordinators']

export const technicalEvents = events.filter((event) => event.category === 'technical')
export const nonTechnicalEvents = events.filter((event) => event.category === 'non-technical')

export default events
