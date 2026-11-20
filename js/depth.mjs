// Mehmet Mert Seyhan, 23000007247
// Bonus 2: Depth — destructuring iterable values.

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