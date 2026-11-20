// Mehmet Mert Seyhan, 23000007247
// Common destructuring pitfalls.

// Pitfall 1: undefined and null cannot be destructured as objects.
for (const task of [undefined, null]) {
  console.log('pitfall 1 input:', task)

  try {
    const { title } = task
    console.log(title)
  } catch (error) {
    console.log('pitfall 1 error:', error.name)
    console.log('pitfall 1 message:', error.message)
  }

  const { title: safeTitle = 'Untitled task' } = task ?? {}

  console.log('pitfall 1 safe:', safeTitle)
}

// Pitfall 2: defaults apply to undefined, not null.
const { minutes: missingMinutes = 30 } = {}
const { minutes: undefinedMinutes = 30 } = { minutes: undefined }
const { minutes: nullMinutes = 30 } = { minutes: null }
const { minutes: zeroMinutes = 30 } = { minutes: 0 }

console.log('pitfall 2 missing:', missingMinutes)
console.log('pitfall 2 undefined:', undefinedMinutes)
console.log('pitfall 2 null:', nullMinutes)
console.log('pitfall 2 zero:', zeroMinutes)

// Use ?? when both undefined and null should use the fallback.
const nullableSettings = { minutes: null }
const normalizedMinutes = nullableSettings.minutes ?? 30

console.log('pitfall 2 normalized:', normalizedMinutes)

// Pitfall 3: object destructuring assignment needs parentheses.
try {
  new Function(`
    let title;
    { title } = { title: 'Review React props' };
  `)
} catch (error) {
  console.log('pitfall 3 error:', error.name)
  console.log('pitfall 3 message:', error.message)
}

let title
const assignmentTask = { title: 'Review React props' }

;({ title } = assignmentTask)

console.log('pitfall 3 fixed:', title)

// Pitfall 4: nested objects are shared, not deeply copied.
const originalTask = {
  title: 'Practice TypeScript',
  schedule: {
    minutes: 45
  }
}

const { schedule } = originalTask

console.log('pitfall 4 before:', originalTask.schedule.minutes)
console.log('pitfall 4 shared:', schedule === originalTask.schedule)

schedule.minutes = 60

console.log('pitfall 4 after:', originalTask.schedule.minutes)

// Copy this nested object before changing its numeric property.
const copiedSchedule = { ...schedule }

copiedSchedule.minutes = 90

console.log('pitfall 4 copy:', copiedSchedule.minutes)
console.log('pitfall 4 original:', originalTask.schedule.minutes)

// Pitfall 5: objects match names; arrays match positions.
const sessionObject = {
  minutes: 45,
  topic: 'Destructuring'
}

const { topic: objectTopic, minutes: objectMinutes } = sessionObject

console.log('pitfall 5 object:', objectTopic, objectMinutes)

const sessionArray = ['Destructuring', 45]

const [arrayTopic, arrayMinutes] = sessionArray

console.log('pitfall 5 array:', arrayTopic, arrayMinutes)

// Changing variable names does not change positional matching.
const [wrongMinutes, wrongTopic] = sessionArray

console.log('pitfall 5 reversed:', wrongMinutes, wrongTopic)
console.log('pitfall 5 types:', typeof wrongMinutes, typeof wrongTopic)