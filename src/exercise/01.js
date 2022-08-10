// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const Globe = React.lazy(() => import('../globe'));

const Loading = ({children, dots, cycleSpeed}) => {
  const [iteration, setIteration] = React.useState(0)
  const [suffix, setSuffix] = React.useState("")

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (iteration >= dots) {
        setIteration(0)
      } else {
        setIteration(iteration + 1)
      }
    } , cycleSpeed)
    return () => clearTimeout(timeout)
  } , [iteration, dots, cycleSpeed])

  React.useEffect(() => {
    let suffix = "";
    for (let i = 0; i < iteration; i++) {
      suffix += "."
    }
    setSuffix(suffix)
  } , [iteration])


  return (<>{children}{suffix}</>);

}

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  // 🐨 wrap the code below in a <React.Suspense /> component
  // with a fallback.
  // 💰 try putting it in a few different places and observe how that
  // impacts the user experience.
  return (
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          padding: '2rem',
        }}
      >
        <label style={{marginBottom: '1rem'}}>
          <input
            type="checkbox"
            checked={showGlobe}
            onChange={e => setShowGlobe(e.target.checked)}
          />
          {' show globe'}
        </label>
          <div style={{width: 400, height: 400}}>
            <React.Suspense fallback={<Loading dots={50} cycleSpeed={10}>Loading</Loading>}>
              {showGlobe ? <Globe /> : null}
            </React.Suspense>
          </div>
      </div>
    
  )
}

export default App
