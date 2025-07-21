import Editor from './Components/Editor'
import EditorFormat from './Components/Editor-Format.tsx'

function App() {
  return (
    <div className="bg-[var(--background-color)] min-h-screen p-6 text-white funnel-sans">
      <Editor/>
      {/* <EditorFormat/> */}
    </div>
  )
}

export default App