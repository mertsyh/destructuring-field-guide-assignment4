// Mehmet Mert Seyhan, 23000007247
// Object destructuring — Form 5

const studyTask = {
  title: 'Practice destructuring',
  status: 'in-progress',
  minutes: 45
}

let { title, status } = studyTask

console.log('form 5:', title, status)

// Form 6: rename a property while destructuring.
const { title: taskTitle, minutes: plannedMinutes } = studyTask

console.log('form 6:', taskTitle, plannedMinutes)


// Form 7: defaults for object properties.
const taskSettings = {
  reminderMinutes: undefined,
  note: null
}

const {
  breakMinutes = 10,
  reminderMinutes = 15,
  note = 'No note'
} = taskSettings

console.log('form 7:', breakMinutes, reminderMinutes, note)

// Form 8: collect the remaining object properties.
const { title: selectedTitle, ...taskDetails } = studyTask

console.log('form 8 title:', selectedTitle)
console.log('form 8 rest:', JSON.stringify(taskDetails))

// Form 9: nested objects and an array inside an object.
const studyPlan = {
  session: {
    topic: 'React props',
    duration: 50
  },
  resources: ['Course slides', 'Task Manager code']
}

const {
  session: { topic: sessionTopic },
  resources: [firstResource]
} = studyPlan

console.log('form 9:', sessionTopic, firstResource)

// Form 10: select a property using a computed key.
const selectedKey = 'minutes'

const { [selectedKey]: selectedValue } = studyTask

console.log('form 10:', selectedKey, selectedValue)
