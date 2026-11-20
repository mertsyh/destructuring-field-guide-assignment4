// Mehmet Mert Seyhan, 23000007247
// P1: a component receives one props object.
import { renderToStaticMarkup } from 'react-dom/server'

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
// A: <section><h2>Hi</h2>text</section>
// B: <section><h2>Hi</h2>text</section>

// TODO: the rest of the props and children section of the handout (P1 to P7).
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