// Mehmet Mert Seyhan, 23000007247
// Array destructuring — Form 1

function getStudySession(): [string, number] {
  return ['Destructuring', 45]
}

const [topic, duration] = getStudySession()

console.log('form 1:', topic, duration)

// Form 2, 3, 4: TODO

// Form 2: skip the first item and collect the remaining items.
const studyTopics: string[] = [
  'Arrays',
  'Objects',
  'Parameters',
  'React props'
]

const [, secondTopic, ...remainingTopics] = studyTopics

console.log('form 2 second:', secondTopic)
console.log('form 2 rest:', JSON.stringify(remainingTopics))

// Form 3: swap two variables.
let currentTopic: string = 'TypeScript'
let nextTopic: string = 'React'

console.log('form 3 before:', currentTopic, nextTopic)

;[currentTopic, nextTopic] = [nextTopic, currentTopic]

console.log('form 3 after:', currentTopic, nextTopic)

// Form 4: defaults for missing or undefined items.
const emptySession: [number?, number?] = []
const [studyMinutes = 45, breakMinutes = 10] = emptySession

console.log('form 4 empty:', studyMinutes, breakMinutes)

const undefinedSession: [number | undefined] = [undefined]
const nullSession: [number | null] = [null]
const zeroSession: [number] = [0]

const [undefinedMinutes = 45] = undefinedSession
const [nullMinutes = 45] = nullSession
const [zeroMinutes = 45] = zeroSession

console.log('form 4 undefined:', undefinedMinutes)
console.log('form 4 null:', nullMinutes)
console.log('form 4 zero:', zeroMinutes)