// Mehmet Mert Seyhan, 23000007247
// Parameter destructuring — Form 11

function createStudyTask({
  title = 'Review destructuring',
  minutes = 30
} = {}) {
  return { title, minutes }
}

console.log('form 11 default:', JSON.stringify(createStudyTask()))

console.log(
  'form 11 custom:',
  JSON.stringify(createStudyTask({
    title: 'Practice props',
    minutes: 45
  }))
)

console.log(
  'form 11 partial:',
  JSON.stringify(createStudyTask({
    title: 'Read course slides'
  }))
) 

//form 11b
const totalSessionMinutes = ([studyMinutes, breakMinutes]) => {
  return studyMinutes + breakMinutes
}

console.log('form 11b:', totalSessionMinutes([45, 10]))


// Form 12: destructuring entries in loops.
const weeklyMinutes = {
  JavaScript: 90,
  TypeScript: 120
}

for (const [subject, minutes] of Object.entries(weeklyMinutes)) {
  console.log('form 12 object:', subject, minutes)
}

const studyLocations = new Map([
  ['Monday', 'Library'],
  ['Wednesday', 'Home']
])

for (const [day, location] of studyLocations) {
  console.log('form 12 map:', day, location)
}