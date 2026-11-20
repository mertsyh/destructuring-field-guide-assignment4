// Mehmet Mert Seyhan, 23000007247
// TypeScript destructuring topics — T1

const lesson = {
  title: 'Destructuring',
  minutes: 45
}

// This creates a variable named "string"; it is not a type annotation.
const { minutes: string } = lesson

console.log('T1 renamed value:', string)
console.log('T1 renamed type:', typeof string)

// The type annotation belongs after the entire pattern.
const {
  title: typedTopic,
  minutes: typedDuration
}: {
  title: string
  minutes: number
} = lesson

console.log('T1 typed:', typedTopic, typedDuration)

// T2: inferred arrays, explicit tuples and as const.

// Without an annotation, this returns (string | number)[].
function getLooseSession() {
  return [50, 'React props']
}

const [looseMinutes, looseTopic] = getLooseSession()

console.log('T2 array:', looseMinutes, looseTopic)

// A tuple specifies the type at each position.
function getTupleSession(): [number, string] {
  return [50, 'React props']
}

const [tupleMinutes, tupleTopic] = getTupleSession()

console.log('T2 tuple:', tupleMinutes, tupleTopic)
console.log('T2 formatted:', tupleMinutes.toFixed(1), tupleTopic.toUpperCase())

// as const preserves literal values and creates a readonly tuple.
const fixedSession = [40, 'TypeScript'] as const

const [fixedMinutes, fixedTopic] = fixedSession

console.log('T2 as const:', fixedMinutes, fixedTopic)

// T3: an array item may be undefined.
const studyQueue: string[] = ['Review tuples', 'Practice props']
const emptyQueue: string[] = []

const [firstQueuedTask] = studyQueue
const [firstEmptyTask] = emptyQueue

console.log('T3 first:', firstQueuedTask)
console.log('T3 empty:', firstEmptyTask)

// Solution 1: check before using a string method.
if (firstQueuedTask !== undefined) {
  console.log('T3 checked:', firstQueuedTask.toUpperCase())
}

// Solution 2: provide a default in the pattern.
const [fallbackTask = 'No study task'] = emptyQueue

console.log('T3 default:', fallbackTask)
console.log('T3 default uppercase:', fallbackTask.toUpperCase())


// T4: optional properties and defaults.
type SessionPreferences = {
  minutes?: number
  note?: string | null
}

const sessionPreferences: SessionPreferences = {}

const { minutes: optionalMinutes } = sessionPreferences
const { minutes: defaultMinutes = 30 } = sessionPreferences

console.log('T4 optional:', optionalMinutes)
console.log('T4 default:', defaultMinutes)
console.log('T4 formatted:', defaultMinutes.toFixed(1))

const nullablePreferences: SessionPreferences = {
  note: null
}

const { note: defaultNote = 'No note' } = nullablePreferences

console.log('T4 null:', defaultNote)

const normalizedNote = defaultNote ?? 'No note'

console.log('T4 normalized:', normalizedNote)

// T5: a string tuple cannot be assigned to a number tuple.
const incomingSession: [string] = ['45']
// @ts-expect-error: incomingSession contains a string, not a number.
const [invalidMinutes]: [number] = incomingSession
// Correctly extract the string, then explicitly convert it.
const [rawMinutes] = incomingSession
const correctedMinutes = Number(rawMinutes)

console.log('T5 after fix:', correctedMinutes, typeof correctedMinutes)
console.log('T5 before fix:', invalidMinutes, typeof invalidMinutes)