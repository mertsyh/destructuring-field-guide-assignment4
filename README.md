# Destructuring Field Guide

Name: Mehmet Mert Seyhan  
Student number: 23000007247

This guide explains JavaScript destructuring, its TypeScript types, and its use in React props and children. The examples use study sessions and tasks. They were developed step by step with AI assistance, entered into the starter project, and run locally. Output blocks come from the recorded runs. The log distinguishes deliberate error experiments from problems encountered during the work.

## Run

Use Node.js 20.19 or newer. This project was run with Node.js 24.14.0 and npm 11.9.0; .nvmrc records the Node.js version.

Run from the folder containing package.json, which is D:\Webprogramming\Assigment4\starter in this workspace:

```powershell
npm install
npm run all
npm run check
```

npm run all executes the JavaScript, TypeScript and React examples. npm run check checks types without executing the examples or emitting JavaScript. The compiler enables strict and noUncheckedIndexedAccess.

On Windows PowerShell, output.txt was captured with:

```powershell
cmd /d /c "npm run all > output.txt 2>&1"
```

This captures standard output and the intentional React warning on standard error without PowerShell's extra native-error formatting. The warning in P3 is an intentional experiment. Runtime error examples catch their exceptions. T5 contains the single intentional @ts-expect-error directive. The invalid P7 test lines were removed after their diagnostics were recorded.

## Bonus 1: LaTeX

The complete guide is also provided as `latex/destructuring-guide.tex` and `latex/destructuring-guide.pdf`. The LaTeX document includes all form entries, pitfalls, TypeScript topics, React topics, comparison tables, depth experiments, real-code cases and the work log. It uses listings for code, longtable for tables and hyperref for the linked contents page and source links.

The source is generated directly from the full README by `latex/build_guide.py`, which uses only the Python standard library. Regenerate both the source and PDF after changing this guide, so their content stays synchronized.

The build used Python 3.12 and Tectonic 0.17.0. Tectonic was obtained from its [official release](https://github.com/tectonic-typesetting/tectonic/releases/tag/tectonic%400.17.0). Its first build downloads the TeX packages it needs. The Unicode book symbol uses Segoe UI Symbol on Windows, or Noto Sans Symbols 2 when that font is installed instead. The remaining fonts come from the TeX distribution.

Commands used from the project root in this workspace:

```powershell
python latex/build_guide.py --tectonic ..\.tools\tectonic.exe
```

With Tectonic on PATH, the portable build command is:

```powershell
python latex/build_guide.py
```

To regenerate only the editable LaTeX source, without compiling:

```powershell
python latex/build_guide.py --generate-only
```

The checked-in source can also be compiled directly from the latex folder:

```powershell
tectonic destructuring-guide.tex
```

The generated PDF is part of the submission. The compiler executable and its package cache are build tools and are not included in the project. Auxiliary build files are ignored under `latex/.build/`.

## Field guide

Array patterns take values by position from an iterable; object patterns read named properties. The assignment alternatives below describe the arrays and simple objects in this project. They are separate alternatives, not additional declarations to paste into the same scope.

### Form 1: Take values by position

**Syntax:** `const [topic, duration] = getStudySession()`

**Example** (from `js/arrays.mjs`):

```js
function getStudySession() {
  return ['Destructuring', 45]
}

const [topic, duration] = getStudySession()

console.log('form 1:', topic, duration)
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 1: Destructuring 45
```

**Use it when:** A function returns a small group of values in a known order. Here the first value is the topic and the second is its duration.

**Watch out:** Variable names do not choose array elements; positions do. A missing position yields undefined unless a default applies.

For this data, without destructuring:

```js
const session = getStudySession()
const topic = session[0]
const duration = session[1]
```

**TypeScript:** The return type [string, number] declares a tuple. The extracted topic is string and duration is number.

### Form 2: Skip an item and collect the rest

**Syntax:** `const [, secondTopic, ...remainingTopics] = studyTopics`

**Example** (from `js/arrays.mjs`):

```js
// Form 2: skip the first item and collect the remaining items.
const studyTopics = [
  'Arrays',
  'Objects',
  'Parameters',
  'React props'
]

const [, secondTopic, ...remainingTopics] = studyTopics

console.log('form 2 second:', secondTopic)
console.log('form 2 rest:', JSON.stringify(remainingTopics))
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 2 second: Objects
form 2 rest: ["Parameters","React props"]
```

**Use it when:** An earlier item is unnecessary and the later items should be collected together. The comma skips Arrays, and rest collects the items after Objects.

**Watch out:** Rest must be last and cannot have a trailing comma. It creates a new array, which can be empty.

For this data, without destructuring:

```js
const secondTopic = studyTopics[1]
const remainingTopics = studyTopics.slice(2)
```

**TypeScript:** For string[] with noUncheckedIndexedAccess, secondTopic is string | undefined; remainingTopics is string[].

**Rest versus spread:** Rest in a pattern collects values: const [first, ...remaining] = items. Spread in an expression expands values: [...items]. The same distinction applies to object rest and object spread.

### Form 3: Swap two existing variables

**Syntax:** `[currentTopic, nextTopic] = [nextTopic, currentTopic]`

**Example** (from `js/arrays.mjs`):

```js
// Form 3: swap two variables.
let currentTopic = 'TypeScript'
let nextTopic = 'React'

console.log('form 3 before:', currentTopic, nextTopic)

;[currentTopic, nextTopic] = [nextTopic, currentTopic]

console.log('form 3 after:', currentTopic, nextTopic)
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 3 before: TypeScript React
form 3 after: React TypeScript
```

**Use it when:** Existing variables need to exchange values. The right-hand array is evaluated from the original values before the assignments occur.

**Watch out:** The variables must allow reassignment. The leading semicolon separates the line starting with [ from the preceding statement.

For this data, without destructuring:

```js
const previousTopic = currentTopic
currentTopic = nextTopic
nextTopic = previousTopic
```

**TypeScript:** Both variables are strings, so each can receive the other value.

### Form 4: Provide array defaults

**Syntax:** `const [studyMinutes = 45, breakMinutes = 10] = []`

**Example** (from `js/arrays.mjs`):

```js
// Form 4: defaults for missing or undefined items.
const [studyMinutes = 45, breakMinutes = 10] = []

console.log('form 4 empty:', studyMinutes, breakMinutes)

const [undefinedMinutes = 45] = [undefined]
const [nullMinutes = 45] = [null]
const [zeroMinutes = 45] = [0]

console.log('form 4 undefined:', undefinedMinutes)
console.log('form 4 null:', nullMinutes)
console.log('form 4 zero:', zeroMinutes)
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 4 empty: 45 10
form 4 undefined: 45
form 4 null: null
form 4 zero: 0
```

**Use it when:** An array position may be missing and a fallback makes sense. The empty session receives a 45-minute study period and a 10-minute break.

**Watch out:** Defaults replace only undefined, including values read from missing positions. They preserve null and zero. Default expressions run only when needed. These defaults do not rescue an entire input that is null or undefined.

For this data, without destructuring:

```js
const session = []
const studyMinutes = session[0] === undefined ? 45 : session[0]
const breakMinutes = session[1] === undefined ? 10 : session[1]
```

**TypeScript:** The type [number?, number?] permits missing tuple positions. Defaults make the study and break variables numbers. A default does not remove null from a number | null type.

### Form 5: Read properties by name

**Syntax:** `let { title, status } = studyTask`

**Example** (from `js/objects.mjs`):

```js
const studyTask = {
  title: 'Practice destructuring',
  status: 'in-progress',
  minutes: 45
}

let { title, status } = studyTask

console.log('form 5:', title, status)
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 5: Practice destructuring in-progress
```

**Use it when:** Several named properties are needed locally. Other properties, such as minutes, remain on the source.

**Watch out:** Property order does not control matching. An absent property gives undefined. Reassigning a local variable does not update its source property.

For this data, without destructuring:

```js
let title = studyTask.title
let status = studyTask.status
```

**TypeScript:** StudyTask describes the object. Title is string, and status is the union of todo, in-progress and done.

### Form 6: Rename while reading

**Syntax:** `const { title: taskTitle, minutes: plannedMinutes } = studyTask`

**Example** (from `js/objects.mjs`):

```js
// Form 6: rename a property while destructuring.
const { title: taskTitle, minutes: plannedMinutes } = studyTask

console.log('form 6:', taskTitle, plannedMinutes)
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 6: Practice destructuring 45
```

**Use it when:** A property name is already used or a clearer local name helps.

**Watch out:** The left of the colon is the source property; the right is the new variable name. This does not rename the property on the source object. In TypeScript this colon is still a rename.

For this data, without destructuring:

```js
const taskTitle = studyTask.title
const plannedMinutes = studyTask.minutes
```

**TypeScript:** The renamed variables retain the property types: taskTitle is string and plannedMinutes is number.

### Form 7: Provide object defaults

**Syntax:** `const { breakMinutes = 10, reminderMinutes = 15, note = 'No note' } = taskSettings`

**Example** (from `js/objects.mjs`):

```js
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
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 7: 10 15 null
```

**Use it when:** Optional settings should receive local fallback values. Missing breakMinutes and undefined reminderMinutes use defaults.

**Watch out:** Null is preserved, so note remains null. Defaults do not insert missing properties into taskSettings.

For this data, without destructuring:

```js
const breakMinutes = taskSettings.breakMinutes === undefined
  ? 10 : taskSettings.breakMinutes
const reminderMinutes = taskSettings.reminderMinutes === undefined
  ? 15 : taskSettings.reminderMinutes
const note = taskSettings.note === undefined
  ? 'No note' : taskSettings.note
```

**TypeScript:** TaskSettings marks the numeric properties optional. Their defaults produce number variables. Note remains string | null.

### Form 8: Collect remaining properties

**Syntax:** `const { title: selectedTitle, ...taskDetails } = studyTask`

**Example** (from `js/objects.mjs`):

```js
// Form 8: collect the remaining object properties.
const { title: selectedTitle, ...taskDetails } = studyTask

console.log('form 8 title:', selectedTitle)
console.log('form 8 rest:', JSON.stringify(taskDetails))
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 8 title: Practice destructuring
form 8 rest: {"status":"in-progress","minutes":45}
```

**Use it when:** Some properties need separate handling while the remaining own enumerable properties should be collected into a new object.

**Watch out:** Rest must be last. The source is unchanged, but the copy is shallow, so nested objects would share references. Inherited and non-enumerable properties are not copied.

For this data, without destructuring:

```js
const selectedTitle = studyTask.title
// Equivalent for this three-property object:
const taskDetails = {
  status: studyTask.status,
  minutes: studyTask.minutes
}
```

**TypeScript:** TypeScript infers taskDetails with status and minutes, excluding title and preserving the remaining property types.

### Form 9: Use nested object and array patterns

**Syntax:** `const { session: { topic: sessionTopic }, resources: [firstResource] } = studyPlan`

**Example** (from `js/objects.mjs`):

```js
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
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 9: React props Course slides
```

**Use it when:** Values are a few levels inside a known structure. This enters session for its topic and resources for its first item.

**Watch out:** Only sessionTopic and firstResource become variables. Session and resources are navigation properties here. A null or undefined session throws; an empty resources array yields undefined for its first item.

For this data, without destructuring:

```js
const sessionTopic = studyPlan.session.topic
const firstResource = studyPlan.resources[0]
```

**TypeScript:** StudyPlan describes the nested structure. SessionTopic is string; firstResource is string | undefined because resources is an ordinary array.

### Form 10: Compute the property name

**Syntax:** `const { [selectedKey]: selectedValue } = studyTask`

**Example** (from `js/objects.mjs`):

```js
// Form 10: select a property using a computed key.
const selectedKey = 'minutes'

const { [selectedKey]: selectedValue } = studyTask

console.log('form 10:', selectedKey, selectedValue)
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 10: minutes 45
```

**Use it when:** The property name is selected through a variable or expression. SelectedKey contains minutes in this example.

**Watch out:** Brackets evaluate the key expression. Without brackets, { selectedKey: selectedValue } would look for a property literally named selectedKey.

For this data, without destructuring:

```js
const selectedValue = studyTask[selectedKey]
```

**TypeScript:** keyof StudyTask restricts the allowed keys to title, status and minutes. At this declaration the key is known to be minutes, so the extracted value is a number.

### Form 11: Destructure an object parameter

**Syntax:** `function createStudyTask({ title = 'Review destructuring', minutes = 30 } = {})`

**Example** (from `js/params.mjs`):

```js
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
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 11 default: {"title":"Review destructuring","minutes":30}
form 11 custom: {"title":"Practice props","minutes":45}
form 11 partial: {"title":"Read course slides","minutes":30}
```

**Use it when:** A function takes named options, especially when some options can be omitted.

**Watch out:** The outer = {} handles an undefined argument; defaults inside the pattern handle undefined properties. Null still fails. For the typed default {}, fields must be optional.

For this data, without destructuring:

```js
function createStudyTask(options = {}) {
  const title = options.title === undefined
    ? 'Review destructuring' : options.title
  const minutes = options.minutes === undefined ? 30 : options.minutes
  return { title, minutes }
}
```

**TypeScript:** StudyOptions has title?: string and minutes?: number. Its annotation follows the complete parameter pattern: }: StudyOptions = {}).

#### Form 11b: Destructure an array parameter

The starter also includes this array-parameter variation:

```js
const totalSessionMinutes = ([studyMinutes, breakMinutes]) => {
  return studyMinutes + breakMinutes
}

console.log('form 11b:', totalSessionMinutes([45, 10]))
```

**Real output:**

```text
form 11b: 55
```

The parameter pattern extracts the two durations. Without destructuring, the function would read session[0] and session[1]. The TypeScript parameter is [number, number] and the return type is number.

### Form 12: Destructure entries in loops

**Syntax:** `for (const [subject, minutes] of Object.entries(weeklyMinutes))`

**Example** (from `js/params.mjs`):

```js
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
```

**Output** (from output.txt; the JS and TS versions agree):

```text
form 12 object: JavaScript 90
form 12 object: TypeScript 120
form 12 map: Monday Library
form 12 map: Wednesday Home
```

**Use it when:** Each iteration provides a key-value pair. Object.entries supplies own enumerable string-keyed entries. Map iteration supplies its entries directly.

**Watch out:** for...in iterates property names rather than entry pairs and cannot replace for...of here. Object.entries does not include symbol keys.

For this data, without destructuring:

```js
for (const entry of Object.entries(weeklyMinutes)) {
  const subject = entry[0]
  const minutes = entry[1]
  console.log('form 12 object:', subject, minutes)
}

for (const entry of studyLocations) {
  const day = entry[0]
  const location = entry[1]
  console.log('form 12 map:', day, location)
}
```

**TypeScript:** Record<string, number> describes the numeric object values; Map<string, string> describes string keys and values. Each entry is a two-position tuple.

## Pitfalls

All five experiments are in js/pitfalls.mjs. Deliberate runtime failures are caught so the remaining examples continue.

### Pitfall 1: Destructuring null or undefined

**Example:**

```js
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
```

**Real output:**

```text
pitfall 1 input: undefined
pitfall 1 error: TypeError
pitfall 1 message: Cannot destructure property 'title' of 'task' as it is undefined.
pitfall 1 safe: Untitled task
pitfall 1 input: null
pitfall 1 message: Cannot destructure property 'title' of 'task' as it is null.
```

**Why it happens:** An object pattern accesses properties on its input. Neither null nor undefined can supply them, so both throw TypeError. The expression task ?? {} replaces either input with an empty object, then the property default supplies a title.

### Pitfall 2: Defaults do not replace null

**Example:**

```js
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
```

**Real output:**

```text
pitfall 2 missing: 30
pitfall 2 undefined: 30
pitfall 2 null: null
pitfall 2 zero: 0
pitfall 2 normalized: 30
```

**Why it happens:** A destructuring default applies only to undefined, including a missing property. Null and zero are existing values. The separate ?? expression handles null and undefined while preserving zero.

### Pitfall 3: Assignment needs parentheses

**Example:**

```js
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
```

**Real output:**

```text
pitfall 3 error: SyntaxError
pitfall 3 message: Unexpected token '='
pitfall 3 fixed: Review React props
```

**Why it happens:** At the start of a statement, { is parsed as a block rather than an object assignment pattern. Parentheses resolve the ambiguity. The invalid text is parsed with new Function so the SyntaxError can be caught; the same invalid syntax directly in the file would prevent all execution.

### Pitfall 4: Nested objects remain shared

**Example:**

```js
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
```

**Real output:**

```text
pitfall 4 before: 45
pitfall 4 shared: true
pitfall 4 after: 60
pitfall 4 copy: 90
pitfall 4 original: 60
```

**Why it happens:** Destructuring schedule copies its reference, not the nested object. Both references point to the same schedule, so changing minutes through one is visible through the other. Spread creates a separate schedule object here but is still a shallow copy. Const prevents rebinding, not changing object properties.

### Pitfall 5: Names versus positions

**Example:**

```js
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
```

**Real output:**

```text
pitfall 5 object: Destructuring 45
pitfall 5 array: Destructuring 45
pitfall 5 reversed: Destructuring 45
pitfall 5 types: string number
```

**Why it happens:** Object patterns select properties by name regardless of their written order. Array patterns select positions regardless of variable names. Naming the first variable wrongMinutes does not turn the first string element into a number.

## TypeScript topics

These examples are in ts/types.ts. Running with tsx executes TypeScript without performing the strict type check; use npm run check separately.

### T1: A colon inside a pattern is a rename

```ts
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
```

**Real output:**

```text
T1 renamed value: 45
T1 renamed type: number
T1 typed: Destructuring 45
```

The first pattern creates a variable named string containing the number 45. Its name neither annotates nor converts it. In the second pattern, the object type goes after the complete pattern. The inner colons rename title and minutes to typedTopic and typedDuration.

### T2: Tuples and as const

```ts
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
```

**Real output:**

```text
T2 array: 50 React props
T2 tuple: 50 React props
T2 formatted: 50.0 REACT PROPS
T2 as const: 40 TypeScript
```

getLooseSession returns (string | number)[], so either extracted item can be string, number or undefined with the current settings. The explicit [number, string] tuple guarantees each position and its type, allowing toFixed and toUpperCase. The as const expression infers readonly [40, "TypeScript"], preserving literal types and preventing writes through that typed reference. It does not freeze the array at runtime.

### T3: noUncheckedIndexedAccess

```ts
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
```

**Real output:**

```text
T3 first: Review tuples
T3 empty: undefined
T3 checked: REVIEW TUPLES
T3 default: No study task
T3 default uppercase: NO STUDY TASK
```

firstQueuedTask and firstEmptyTask both have type string | undefined because string[] does not promise a nonempty array. The undefined check narrows the first value to string. Providing a string default also gives a string variable. Neither solution needs a non-null assertion.

### T4: Optional properties and defaults

```ts
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
```

**Real output:**

```text
T4 optional: undefined
T4 default: 30
T4 formatted: 30.0
T4 null: null
T4 normalized: No note
```

Without a default, optionalMinutes is number | undefined. With the numeric default, defaultMinutes is number. Optional note initially allows string | null | undefined; its default removes undefined but preserves null. The final ?? expression handles that null and yields string.

### T5: A tuple assignment error and its fix

```ts
// T5: a string tuple cannot be assigned to a number tuple.
const incomingSession: [string] = ['45']
// @ts-expect-error: incomingSession contains a string, not a number.
const [invalidMinutes]: [number] = incomingSession
// Correctly extract the string, then explicitly convert it.
const [rawMinutes] = incomingSession
const correctedMinutes = Number(rawMinutes)

console.log('T5 after fix:', correctedMinutes, typeof correctedMinutes)
console.log('T5 before fix:', invalidMinutes, typeof invalidMinutes)
```

**Real output:**

```text
T5 after fix: 45 number
T5 before fix: 45 string
```

The intentional assignment requests [number] while incomingSession is [string]. The annotation cannot convert the string. The fix extracts rawMinutes as a string and explicitly calls Number. The single @ts-expect-error documents the expected compiler error; it does not change runtime values. If the line stopped causing an error, the directive would itself be reported as unused.

Before adding the directive, npm run check reported the following at ts/types.ts:106:7 in the recorded run:

```text
error TS2322: Type '[string]' is not assignable to type '[number]'.
  Type 'string' is not assignable to type 'number'.
```

The output order follows the current source file: it logs the corrected value before the intentionally invalid assignment.

## Props and children

A component receives a props object. JSX attributes become its properties, and content between the component tags is provided under children. Children is part of props, not a second argument. The examples use renderToStaticMarkup to produce HTML strings without mounting a browser application or exercising browser click events.

JavaScript examples are in js/props.jsx; typed counterparts are in ts/props.tsx. Recorded outputs are shared by both versions unless marked JavaScript-only.

### P1: One props object, two ways to read it

**Runnable JavaScript example:**

```jsx
function CardA(props) {
  return (
    <section>
      <h2>{props.title}</h2>
      {props.children}
    </section>
  )
}

function CardB({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

const markupA = renderToStaticMarkup(
  <CardA title="Study session">Practice destructuring</CardA>
)

const markupB = renderToStaticMarkup(
  <CardB title="Study session">Practice destructuring</CardB>
)

console.log('P1 A:', markupA)
console.log('P1 B:', markupB)
console.log('P1 equal:', markupA === markupB)
```

**Real output:**

```text
P1 A: <section><h2>Study session</h2>Practice destructuring</section>
P1 B: <section><h2>Study session</h2>Practice destructuring</section>
P1 equal: true
```

CardA reads props.title and props.children in its body. CardB unpacks the same object in its parameter. Their identical output shows that parameter destructuring changes access syntax rather than what React passes. CardB combines the object pattern in Form 5 with the parameter pattern in Form 11.

**TypeScript declaration** (from ts/props.tsx):

```tsx
type CardProps = {
  title: string
  children?: ReactNode
}

function CardB({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
```

### P2: Children is a prop

**Runnable JavaScript example:**

```jsx
// P2: nested content and an explicit children prop.
const p2NestedMarkup = renderToStaticMarkup(
  <CardB title="Study session">Practice destructuring</CardB>
)

const p2PropMarkup = renderToStaticMarkup(
  <CardB
    title="Study session"
    children="Practice destructuring"
  />
)

console.log('P2 nested:', p2NestedMarkup)
console.log('P2 prop:', p2PropMarkup)
console.log('P2 equal:', p2NestedMarkup === p2PropMarkup)
```

**Real output:**

```text
P2 nested: <section><h2>Study session</h2>Practice destructuring</section>
P2 prop: <section><h2>Study session</h2>Practice destructuring</section>
P2 equal: true
```

Nested text and the explicit children attribute provide the same value and therefore the same output. Nested JSX is convenient for structured content. These examples compare separate calls; they do not supply both explicit children and nested content in one call.

### P3: What children can contain

**Runnable JavaScript example:**

```jsx
// P3: different kinds of children.
function ChildBox({ children }) {
  return <div>{children}</div>
}

const p3Cases = {
  text: 'Study time',
  number: 45,
  element: <strong>React props</strong>,
  elements: [
    <span key="read">Read</span>,
    <span key="practice">Practice</span>
  ],
  undefined: undefined,
  null: null,
  false: false
}

for (const [label, content] of Object.entries(p3Cases)) {
  console.log(
    `P3 ${label}:`,
    renderToStaticMarkup(<ChildBox>{content}</ChildBox>)
  )
}

// A function is not rendered as ordinary React content.
console.log(
  'P3 function direct:',
  renderToStaticMarkup(
    <ChildBox>{() => 'Study time'}</ChildBox>
  )
)

function StudyHint({ children }) {
  return <div>{children('React props')}</div>
}

console.log(
  'P3 function called:',
  renderToStaticMarkup(
    <StudyHint>{topic => `Practice ${topic}`}</StudyHint>
  )
)
```

**Real output:**

```text
P3 text: <div>Study time</div>
P3 number: <div>45</div>
P3 element: <div><strong>React props</strong></div>
P3 elements: <div><span>Read</span><span>Practice</span></div>
P3 undefined: <div></div>
P3 null: <div></div>
P3 false: <div></div>
P3 function direct: <div></div>
P3 function called: <div>Practice React props</div>
```

Strings and numbers produce text. An element produces its markup, while an array of keyed elements produces siblings without an extra wrapper. Undefined, null and false produce no visible content, but the surrounding div remains. Zero would render just like other numbers. React does not call a function supplied as ordinary child content. StudyHint explicitly accepts a callable child and calls it; the resulting string is rendered.

**TypeScript declaration** (from ts/props.tsx):

```tsx
type StudyHintProps = {
  children: (topic: string) => ReactNode
}
```

The direct-function call is JavaScript-only; the TypeScript file instead uses the explicitly callable StudyHintProps. The JavaScript call produced this actual warning:

```text
Functions are not valid as a React child. This may happen if you return children instead of <children /> from render. Or maybe you meant to call this function rather than return it.
```

### P4: Separate children and forward the rest

**Runnable JavaScript example:**

```jsx
// P4: separate title and children, then forward the remaining props.
function SpreadLastCard({ title, children, ...rest }) {
  return (
    <section className="default-card" {...rest}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function ExplicitLastCard({ title, children, ...rest }) {
  return (
    <section {...rest} className="default-card">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

console.log(
  'P4 spread last:',
  renderToStaticMarkup(
    <SpreadLastCard
      title="Study session"
      className="custom-card"
      id="study-card"
    >
      Practice props
    </SpreadLastCard>
  )
)

console.log(
  'P4 explicit last:',
  renderToStaticMarkup(
    <ExplicitLastCard
      title="Study session"
      className="custom-card"
      id="study-card"
    >
      Practice props
    </ExplicitLastCard>
  )
)
```

**Real output:**

```text
P4 spread last: <section class="custom-card" id="study-card"><h2>Study session</h2>Practice props</section>
P4 explicit last: <section class="default-card" id="study-card"><h2>Study session</h2>Practice props</section>
```

The pattern removes title and children from rest. JSX spread forwards the remaining className and id to section. Title is used in the heading rather than forwarded as a title attribute. The last assignment wins when a prop appears twice: spread overrides default-card in SpreadLastCard; the explicit className overrides spread in ExplicitLastCard. JSX className becomes HTML class.

**TypeScript declaration** (from ts/props.tsx):

```tsx
type ForwardCardProps = ComponentProps<'section'> & {
  title: string
}
```

### P5: Named slots or children-only composition

**Runnable JavaScript example:**

```jsx
// P5: named content slots versus children-only composition.
function SlotsPanel({ header, footer, children }) {
  return (
    <section>
      <header>{header}</header>
      <div>{children}</div>
      <footer>{footer}</footer>
    </section>
  )
}

function ChildrenPanel({ children }) {
  return <section>{children}</section>
}

const p5SlotsMarkup = renderToStaticMarkup(
  <SlotsPanel
    header={<h2>Weekly plan</h2>}
    footer={<small>2 topics remaining</small>}
  >
    <p>Practice TypeScript</p>
  </SlotsPanel>
)

const p5ChildrenMarkup = renderToStaticMarkup(
  <ChildrenPanel>
    <header><h2>Weekly plan</h2></header>
    <div><p>Practice TypeScript</p></div>
    <footer><small>2 topics remaining</small></footer>
  </ChildrenPanel>
)

console.log('P5 slots:', p5SlotsMarkup)
console.log('P5 children:', p5ChildrenMarkup)
console.log('P5 equal:', p5SlotsMarkup === p5ChildrenMarkup)
```

**Real output:**

```text
P5 slots: <section><header><h2>Weekly plan</h2></header><div><p>Practice TypeScript</p></div><footer><small>2 topics remaining</small></footer></section>
P5 children: <section><header><h2>Weekly plan</h2></header><div><p>Practice TypeScript</p></div><footer><small>2 topics remaining</small></footer></section>
P5 equal: true
```

SlotsPanel receives header and footer as named props and the paragraph as children. It controls the region wrappers and their order. ChildrenPanel receives the complete inner structure through children, leaving its caller to choose the structure and order. Named slots suit a stable layout with defined regions; children-only composition suits a flexible wrapper. These two calls deliberately produce identical HTML.

**TypeScript declaration** (from ts/props.tsx):

```tsx
type SlotsPanelProps = {
  header: ReactNode
  footer: ReactNode
  children?: ReactNode
}
```

### P6: Defaults for props

**Runnable JavaScript example:**

```jsx
// P6: a default applies to undefined, but not null.
function DefaultTitleCard({
  title = 'Untitled session',
  children
}) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

console.log(
  'P6 missing:',
  renderToStaticMarkup(
    <DefaultTitleCard>Study notes</DefaultTitleCard>
  )
)

console.log(
  'P6 undefined:',
  renderToStaticMarkup(
    <DefaultTitleCard title={undefined}>Study notes</DefaultTitleCard>
  )
)

console.log(
  'P6 null:',
  renderToStaticMarkup(
    <DefaultTitleCard title={null}>Study notes</DefaultTitleCard>
  )
)
```

**Real output:**

```text
P6 missing: <section><h2>Untitled session</h2>Study notes</section>
P6 undefined: <section><h2>Untitled session</h2>Study notes</section>
P6 null: <section><h2></h2>Study notes</section>
```

The title default is Form 7 inside a parameter pattern. A missing title and an undefined title select Untitled session. Null does not select the default: React leaves the h2 content empty while retaining the element. The TypeScript props type explicitly includes null to allow this experiment.

**TypeScript declaration** (from ts/props.tsx):

```tsx
type DefaultTitleCardProps = {
  title?: string | null
  children?: ReactNode
}
```

### P7: ReactNode, PropsWithChildren and native button props

**Runnable JavaScript example:**

```jsx
// P7: runtime counterparts of the typed components.
function NodePanel({ title, children }) {
  return <aside><h3>{title}</h3>{children}</aside>
}

function WithChildrenPanel({ title, children }) {
  return <aside><h3>{title}</h3>{children}</aside>
}

function StudyButton({ tone = 'primary', children, ...rest }) {
  return <button {...rest} data-tone={tone}>{children}</button>
}

console.log(
  'P7 ReactNode:',
  renderToStaticMarkup(
    <NodePanel title="Study">Review types</NodePanel>
  )
)

console.log(
  'P7 PropsWithChildren:',
  renderToStaticMarkup(
    <WithChildrenPanel title="Study">Review types</WithChildrenPanel>
  )
)

console.log(
  'P7 missing children:',
  renderToStaticMarkup(
    <WithChildrenPanel title="Study" />
  )
)

console.log(
  'P7 button:',
  renderToStaticMarkup(
    <StudyButton type="button" disabled>
      Start study
    </StudyButton>
  )
)
```

**Real output:**

```text
P7 ReactNode: <aside><h3>Study</h3>Review types</aside>
P7 PropsWithChildren: <aside><h3>Study</h3>Review types</aside>
P7 missing children: <aside><h3>Study</h3></aside>
P7 button: <button type="button" disabled="" data-tone="primary">Start study</button>
```

NodePanel explicitly declares children?: ReactNode. PropsWithChildren adds optional ReactNode children to the title props; it does not make children required. ReactNode covers the text, numbers, elements, arrays and empty values used in P3, but not a plain function. A render-function API needs its own callable type. ComponentProps<'button'> reuses native type, disabled, onClick and children props. StudyButton adds tone, separates it from rest, and renders it as data-tone while forwarding the native props.

**TypeScript declaration** (from ts/props.tsx):

```tsx
type NodePanelProps = {
  title: string
  children?: ReactNode
}

type WithChildrenPanelProps = PropsWithChildren<{
  title: string
}>

type StudyButtonProps = ComponentProps<'button'> & {
  tone?: 'primary' | 'quiet'
}
```

**Compiler rejection experiments:** The following temporary lines were added to ts/props.tsx, checked with npm run check, and removed after recording the errors. They are documentation, not part of the final runnable source.

```tsx
const invalidNode = <NodePanel title="Study">{() => 'Text'}</NodePanel>
const invalidTitle = <WithChildrenPanel title={45} />
const invalidButton = <StudyButton type="link">Start</StudyButton>
```

Actual diagnostics from that run:

```text
ts/props.tsx:313:47 - error TS2322: Type '() => string' is not assignable to type 'ReactNode'.
Did you mean to call this expression?

ts/props.tsx:314:41 - error TS2322: Type 'number' is not assignable to type 'string'.

ts/props.tsx:315:36 - error TS2322: Type '"link"' is not assignable to type '"button" | "submit" | "reset" | undefined'.
```

Fixes: pass a renderable value or call the function first, supply a string title, and choose a valid button type such as button. The final P7 source needs no suppression comments.

## JavaScript vs TypeScript

Runtime destructuring rules stay the same. TypeScript adds static constraints; annotations do not convert values. T5 and P7 errors below were actually recorded. Other rejected cases describe the type rules, rather than claim additional compiler experiments.

| Form or topic | What stays the same | What TypeScript adds | Rejected case or type error |
| --- | --- | --- | --- |
| 1: returned values | Positions select the values. | A tuple return type such as [string, number]. | A string tuple cannot satisfy a number tuple; T5 recorded TS2322. |
| 2: skip and rest | Skip a position and collect a new array. | An ordinary indexed item may be undefined. | Calling a string method without narrowing a possibly undefined item is rejected. |
| 3: swap | Evaluate the original values before assigning. | Destination types must allow both assignments. | Swapping a string variable with a number variable is rejected. |
| 4: array defaults | Only undefined selects a default. | Optional tuple slots describe missing positions. | A possibly null result cannot be used as a definite number without a check. |
| 5: object properties | Match property names. | StudyTask describes the available fields. | Reading a field absent from the declared object type is rejected. |
| 6 and T1: rename | A colon inside the pattern renames. | Put the type after the whole pattern. | minutes: string is a legal rename; assigning its numeric value to a string-typed variable is rejected. |
| 7: object defaults | Undefined fields use fallbacks. | Optional fields can be omitted; defaults remove undefined here. | A missing required field is rejected. |
| 8: object rest | Exclude selected properties from rest. | Infer the remaining property shape. | Reading title from taskDetails is rejected because title was excluded. |
| 9: nesting | Enter nested objects and arrays. | Describe the structure; handle missing array items. | firstResource cannot be used as a definite string without a check or default. |
| 10: computed key | Evaluate the key expression. | keyof StudyTask restricts valid names. | An unknown property name cannot be assigned to that key type. |
| 11: options parameter | Unpack options when called. | StudyOptions annotates the complete pattern. | A numeric title or null argument is rejected by the current options type. |
| 11b: array parameter | Extract the two positions. | [number, number] fixes the parameter shape. | A string element cannot satisfy a numeric tuple slot. |
| 12: entry loops | Unpack a pair on each iteration. | Record and Map types describe keys and values. | Treating a numeric entry value as a string without conversion is rejected. |
| P7: children | Children remains a prop. | ReactNode or PropsWithChildren describes content. | A function child produced the recorded ReactNode TS2322 error. |
| P7: button | Forward props with spread. | ComponentProps<'button'> preserves native constraints. | type="link" produced the recorded button-type TS2322 error. |

## Bonus 2: Depth

The experiments in `js/depth.mjs` investigate the iterator protocol behind array patterns and the order in which defaults are evaluated. They run as part of `npm run all`; the output below is copied from `output.txt`. The explanations connect the observed results to the ECMAScript specification.

### D1: Strings, Set, generators and an array-like object

An array pattern does not require an Array instance. This experiment compares three iterable values with a plain object that has numeric properties and a length. The string includes a supplementary Unicode character so that iteration can also be compared with string length.

```js
// Experiment 1A: a string containing an emoji.
const unicodeLabel = '📚TS'

const [firstSymbol, nextLetter, ...remainingLetters] = unicodeLabel

console.log(
  'depth 1 string:',
  firstSymbol,
  nextLetter,
  JSON.stringify(remainingLetters)
)

console.log('depth 1 string length:', unicodeLabel.length)

// Experiment 1B: a Set removes duplicates.
const uniqueTopics = new Set([
  'TypeScript',
  'React',
  'TypeScript',
  'Testing'
])

const [firstUniqueTopic, ...otherUniqueTopics] = uniqueTopics

console.log(
  'depth 1 set:',
  firstUniqueTopic,
  JSON.stringify(otherUniqueTopics)
)

// Experiment 1C: a generator supplies values on demand.
function* studyBlocks() {
  yield 25
  yield 5
  yield 30
}

const [firstBlock, ...laterBlocks] = studyBlocks()

console.log(
  'depth 1 generator:',
  firstBlock,
  JSON.stringify(laterBlocks)
)

// Experiment 1D: numeric properties do not make an object iterable.
const arrayLike = {
  0: 'TypeScript',
  1: 'React',
  length: 2
}

try {
  const [firstTopic] = arrayLike
  console.log(firstTopic)
} catch (error) {
  console.log('depth 1 error:', error.name)
  console.log('depth 1 message:', error.message)
}
```

**Real output:**

```text
depth 1 string: 📚 T ["S"]
depth 1 string length: 4
depth 1 set: TypeScript ["React","Testing"]
depth 1 generator: 25 [5,30]
depth 1 error: TypeError
depth 1 message: arrayLike is not iterable
```

**What the results show:** The string supplies the book emoji as one value, followed by T and S. Its length is four because JavaScript string length counts UTF-16 code units, while this emoji occupies two. String iteration operates on code points, so the emoji is not split into its two code units. This does not mean that every visually combined character must be one iterator value. [ECMAScript: String iterator](https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype-%symbol.iterator%)

The Set contains TypeScript once despite its repeated insertion. Its first value is extracted separately, and the remaining React and Testing values are collected into a new array. The generator produces 25, 5 and 30 on demand; rest collects the final two values.

The array-like object fails with TypeError even though it has properties 0 and 1 and a length of 2. Those properties do not implement iteration. The binding algorithm obtains a synchronous iterator for an array pattern; in the ordinary protocol this uses the value's `Symbol.iterator` method. This explains why the iterable values work and this plain object does not. [ECMAScript: BindingInitialization](https://tc39.es/ecma262/multipage/syntax-directed-operations.html#sec-runtime-semantics-bindinginitialization)

**Practical consequence:** An index-based explanation of array destructuring is convenient for arrays, but it is incomplete as a general definition. The pattern consumes iterator values, and rest creates an array even when the input is a Set or generator.

### D2: Early generator closing versus complete consumption

This experiment places a log after the first yield and another in a finally block. It compares a one-element pattern with a pattern containing rest, then asks each generator for another result.

```js
// Experiment 2: early closing versus consuming all remaining values.
function* trackedStudyBlocks(label) {
  try {
    console.log('depth 2 started:', label)

    yield 25

    console.log('depth 2 resumed:', label)

    yield 5
    yield 30
  } finally {
    console.log('depth 2 finally:', label)
  }
}

// Take only the first value.
const earlyIterator = trackedStudyBlocks('early')
const [onlyFirstBlock] = earlyIterator

console.log('depth 2 first:', onlyFirstBlock)
console.log('depth 2 early done:', earlyIterator.next().done)

// Take the first value and collect all remaining values.
const completeIterator = trackedStudyBlocks('complete')
const [firstCompleteBlock, ...remainingBlocks] = completeIterator

console.log(
  'depth 2 complete:',
  firstCompleteBlock,
  JSON.stringify(remainingBlocks)
)

console.log('depth 2 complete done:', completeIterator.next().done)
```

**Real output:**

```text
depth 2 started: early
depth 2 finally: early
depth 2 first: 25
depth 2 early done: true
depth 2 started: complete
depth 2 resumed: complete
depth 2 finally: complete
depth 2 complete: 25 [5,30]
depth 2 complete done: true
```

**What the results show:** The early case logs started and finally, but never resumed. Its finally block runs before the extracted first value is printed. A subsequent next call reports done: true. Taking one value through this pattern therefore does not leave this generator suspended for later reuse.

The array binding algorithm performs IteratorClose when the pattern finishes while its iterator is not marked done. A generator supports closing through its return method, which enters the finally block here. This describes this generator's behavior; it does not imply that every custom iterator has a return method or the same cleanup behavior. [ECMAScript: BindingInitialization](https://tc39.es/ecma262/multipage/syntax-directed-operations.html#sec-runtime-semantics-bindinginitialization)

The complete case logs resumed, collects 5 and 30, and then runs finally on normal completion. Its next call also reports done: true. The finally message alone cannot distinguish early closing from exhaustion; the resumed log and collected values provide the distinction.

**Practical consequence:** Destructuring one value from a generator is not equivalent to calling next once and keeping it available. Also, rest consumes all remaining values in these finite generators; using rest on an endless iterator would not finish.

### D3: Lazy defaults, side effects and earlier bindings

The default helper counts calls and logs its label. This makes evaluation visible: if every default were evaluated eagerly, both focus and pause would call it. A third default uses earlier bindings, and a separate deliberate failure attempts the reverse dependency.

```js
// Experiment 3: lazy defaults, earlier bindings and evaluation order.
let defaultCalls = 0

function provideDefault(label, value) {
  defaultCalls += 1
  console.log('depth 3 default called:', label)
  return value
}

const [
  focus = provideDefault('focus', 25),
  pause = provideDefault('pause', 5),
  total = focus + pause
] = [undefined, 0]

console.log('depth 3 values:', focus, pause, total)
console.log('depth 3 calls:', defaultCalls)

const [
  preservedNull = provideDefault('null fallback', 99)
] = [null]

console.log('depth 3 null:', preservedNull)
console.log('depth 3 calls after null:', defaultCalls)

// A default cannot read a later binding before it is initialized.
try {
  const [earlier = later, later = 10] = []

  console.log(earlier, later)
} catch (error) {
  console.log('depth 3 error:', error.name)
  console.log('depth 3 message:', error.message)
}
```

**Real output:**

```text
depth 3 default called: focus
depth 3 values: 25 0 25
depth 3 calls: 1
depth 3 null: null
depth 3 calls after null: 1
depth 3 error: ReferenceError
depth 3 message: Cannot access 'later' before initialization
```

**What the results show:** Only focus calls the helper because its input is undefined. Pause receives zero, so its default expression is not evaluated. The third input position is absent, making total use its default expression. Focus and pause are already initialized, so the result is 25 + 0 = 25. The call counter remains one after the null example because null does not activate a default.

The binding rules evaluate a default initializer when the extracted value is undefined, rather than evaluating every initializer in advance. [ECMAScript: IteratorBindingInitialization](https://tc39.es/ecma262/multipage/syntax-directed-operations.html#sec-runtime-semantics-iteratorbindinginitialization)

In the failing pattern, earlier tries to read later before later has been initialized. The result is the recorded ReferenceError, even though later has its own default of 10. Binding elements are processed in order; a previous initialized binding can be used, while this forward dependency encounters the temporal dead zone. [ECMAScript: IteratorBindingInitialization](https://tc39.es/ecma262/multipage/syntax-directed-operations.html#sec-runtime-semantics-iteratorbindinginitialization)

**Practical consequence:** A default may be a function call or calculation, not just a constant. Side effects occur only when that default is needed. Defaults can safely depend on earlier initialized bindings, but a forward dependency can fail.

## Bonus 3: Real code

These five cases come from the Task Manager sample in the Assignment 3 workspace, installed dependencies, and the Node.js open-source project. Local line numbers below were checked against the actual files. Dependency versions are included because generated distribution files can move between releases. The code blocks are source excerpts and alternative rewrites, not additional runnable files in this assignment.

| Case | Source | Verified line | Forms |
| --- | --- | --- | --- |
| C1 | Assignment 3 sample, src/App.tsx | 84 | 1 |
| C2 | Assignment 3 sample, src/TaskRow.tsx | 5 | 5 and 11 |
| C3 | esbuild 0.28.2, node_modules/esbuild/lib/main.js | 193 | 5 |
| C4 | TypeScript 5.8.3, node_modules/typescript/lib/typescript.js | 7802 | 9, combining 5 and 1 |
| C5 | Node.js v24.14.0, lib/internal/util/parse_args/parse_args.js | 301 | 5, 6 and 11 |

The Assignment 3 source files were read from `D:\Webprogramming\assigment3\starter\starter\src`. They are workspace copies of the sample used for the earlier assignment; the excerpts below make the analysis readable without requiring that folder in the submitted zip.

### C1: The useReducer return value

**Source:** Assignment 3 sample, `src/App.tsx:84`.

**Original:**

```tsx
const [state, dispatch] = useReducer(taskReducer, initialState)
```

**Forms:** Form 1, extracting a function's returned values by position.

**Without destructuring:**

```tsx
const reducerResult = useReducer(taskReducer, initialState)
const state = reducerResult[0]
const dispatch = reducerResult[1]
```

**Analysis:** The first position is the current state; the second is the dispatch function. Destructuring gives meaningful names to the pair. The rewrite calls useReducer once and reads its two returned positions; it must not call the Hook separately for each variable. This is a good use of a short positional pattern because the API defines a stable pair.

### C2: TaskRow receives props, not separate arguments

**Source:** Assignment 3 sample, `src/TaskRow.tsx:5`.

**Original:**

```tsx
export default function TaskRow({ task, onNext, onDelete }: TaskRowProps) {
  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ flex: 1 }}>{task.title}</span>
      <em>{task.status}</em>
      <button onClick={onNext}>Next</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}
```

**Forms:** Form 5's named-property pattern inside the parameter position of Form 11.

**Without destructuring:**

```tsx
export default function TaskRow(props: TaskRowProps) {
  const task = props.task
  const onNext = props.onNext
  const onDelete = props.onDelete
  return (
    <li style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span style={{ flex: 1 }}>{task.title}</span>
      <em>{task.status}</em>
      <button onClick={onNext}>Next</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  )
}
```

**Props and children:** TaskRow receives one object with task, onNext and onDelete. Task is the data prop; onNext and onDelete are callback props. Its TaskRowProps type does not declare children, and TaskList calls it with a self-closing tag, supplying no nested content. The span, status and buttons are JSX created inside TaskRow, not caller-supplied children. A component's own returned markup should not be confused with its props.children.

**Analysis:** The short pattern makes the three dependencies visible at the function boundary. The props-based rewrite makes every property access explicit but introduces extra lines without simplifying this small component. Destructuring does not copy the task object or call the callbacks.

### C3: A typed-array view in esbuild

**Source:** esbuild 0.28.2, `node_modules/esbuild/lib/main.js:193`, inside the Buffer-based decodeUTF8 fallback.

**Original:**

```js
let { buffer, byteOffset, byteLength } = bytes;
return Buffer.from(buffer, byteOffset, byteLength).toString();
```

**Forms:** Form 5, reading several properties by name.

**Without destructuring:**

```js
let buffer = bytes.buffer;
let byteOffset = bytes.byteOffset;
let byteLength = bytes.byteLength;
return Buffer.from(buffer, byteOffset, byteLength).toString();
```

**Analysis:** Buffer, byteOffset and byteLength describe the view's backing memory and boundaries. Passing all three preserves the selected byte region rather than assuming the view occupies its entire backing buffer. The pattern groups three related values clearly. It reads properties without cloning their backing memory. This is a distribution-file excerpt, not a claim that this fallback was selected in the assignment's runtime.

### C4: A nested TypeScript compiler pattern that is harder to read

**Source:** TypeScript 5.8.3, `node_modules/typescript/lib/typescript.js:7802`, in onTimerToUpdateChildWatches.

**Original:**

```js
const { value: [dirPath, { dirName, options, fileNames }] } = result;
```

**Forms:** Form 9 combines an object property, a two-position entry array and another object pattern.

**Without destructuring:**

```js
const entry = result.value;
const dirPath = entry[0];
const pendingWatch = entry[1];
const dirName = pendingWatch.dirName;
const options = pendingWatch.options;
const fileNames = pendingWatch.fileNames;
```

**Analysis and readability judgment:** The surrounding code gets a Map entry through entries().next() and asserts that the iterator result is not done. The pattern then enters result.value, takes the entry key as dirPath, and reads three fields from the entry value. Neither value nor the inner object receives a local variable in the original.

For a reader unfamiliar with this structure, I find the three nested levels harder to follow than the explicit entry and pendingWatch steps. The shorter original hides two intermediate shapes in punctuation. The rewrite names those shapes and makes debugging individual accesses easier, at the cost of extra lines. For the ordinary iterator-result objects and Map entries used here, it expresses the same reads. It is not a general claim that property indexing replaces iterator-based destructuring for every custom iterable.

A compromise would keep shallow destructuring but split the navigation into stages:

```js
const [dirPath, pendingWatch] = result.value;
const { dirName, options, fileNames } = pendingWatch;
```

### C5: Numeric property names in Node.js

**Source:** Node.js v24.14.0, `lib/internal/util/parse_args/parse_args.js:301`. [Versioned source](https://github.com/nodejs/node/blob/v24.14.0/lib/internal/util/parse_args/parse_args.js#L301), [raw source](https://raw.githubusercontent.com/nodejs/node/v24.14.0/lib/internal/util/parse_args/parse_args.js).

**Original callback parameter:**

```js
({ 0: longOption, 1: optionConfig }) => {
```

**Forms:** Forms 5 and 6 in the parameter position of Form 11. This is an object pattern with numeric property names, not an array pattern.

**Without destructuring:** Replace the parameter and add these reads before the unchanged callback body:

```js
(entry) => {
  const longOption = entry[0];
  const optionConfig = entry[1];
  // Existing callback body continues here.
```

**Analysis:** The callback processes pairs from ObjectEntries(options), naming their two properties longOption and optionConfig. The pattern accesses properties 0 and 1; it does not obtain an iterator from each pair. An array pattern would look more familiar here, but that changes the general mechanism to iteration. The explicit rewrite preserves these property reads. This unusual case shows why bracket and brace patterns should not be treated as interchangeable syntax.

## My own log

These entries describe the commands and experiments recorded during this work. The tuple and React type failures were deliberate tests, not unexpected application crashes.

### 1. Running from the wrong folder

I ran node js/params.mjs from D:\Webprogramming\Assigment4, one level above the npm project. Node reported:

```text
Error: Cannot find module 'D:\Webprogramming\Assigment4\js\params.mjs'
code: 'MODULE_NOT_FOUND'
```

I changed into D:\Webprogramming\Assigment4\starter and ran the command there. Relative paths are resolved from the current working directory.

### 2. Seeing only Form 1

An early run printed only:

```text
form 1: Destructuring 45
```

The accompanying npm run check printed its tsc command without errors. After the Form 2 code was present in the saved file, the next run also printed the second-topic and rest-array lines. Type checking does not execute console.log; execution must be checked separately.

### 3. Testing a string tuple against a number tuple

Before adding the permitted T5 directive, the assignment produced:

```text
error TS2322: Type '[string]' is not assignable to type '[number]'.
  Type 'string' is not assignable to type 'number'.
```

The correction extracts the string and calls Number. Runtime logs distinguish the string from the converted number. A type annotation and an error-suppression directive do not convert a value.

### 4. Passing a function as ordinary React content

The JavaScript P3 experiment emitted:

```text
Functions are not valid as a React child. This may happen if you return children instead of <children /> from render. Or maybe you meant to call this function rather than return it.
```

The direct-function call rendered an empty div. StudyHint instead called its function child and rendered the returned text. A callable children API must be implemented explicitly.

### 5. Checking that ReactNode rejects a function

The temporary P7 function-child experiment produced:

```text
error TS2322: Type '() => string' is not assignable to type 'ReactNode'.
Did you mean to call this expression?
```

This is the compile-time counterpart of the JavaScript warning. I removed the invalid test line after recording it. Callable children use the separate StudyHintProps function type.

### 6. Giving a numeric title to a typed component

The temporary WithChildrenPanel title={45} test produced:

```text
error TS2322: Type 'number' is not assignable to type 'string'.
```

PropsWithChildren adds the children field while preserving the existing title constraint. I removed the invalid line; working calls use string titles.

### 7. Giving a button an invalid type

The temporary StudyButton type="link" test produced:

```text
error TS2322: Type '"link"' is not assignable to type '"button" | "submit" | "reset" | undefined'.
```

ComponentProps<'button'> preserved the native button restriction through the wrapper. I removed the invalid line; the working example uses type="button". The three P7 failures remain documented here without additional suppression comments in the project.

### 8. Reading the UTF-8 output with PowerShell's default encoding

The bonus string initially printed as a book emoji when running Node directly. Reading output.txt with Get-Content without an encoding displayed corrupted characters instead. Reading the same file explicitly as UTF-8 showed the emoji correctly:

```powershell
Get-Content -Encoding UTF8 output.txt | Select-String '^depth '
```

The file contained the correct UTF-8 bytes; the problem was how it was decoded for display. No JavaScript change was required. String encoding during file reading is separate from the code-point iteration tested in D1.
