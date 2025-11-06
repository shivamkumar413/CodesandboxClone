import usePing from "./hooks/apis/query/usePing.js"
import { Route, Routes } from 'react-router-dom'
import { CreateProject } from "./pages/CreateProject.jsx"

function App() {

  // const {isLoading,data} = usePing()

  // if(isLoading){
  //   return(
  //     <>Loading ....</>
  //   )
  // }

  return (
    <>
      {/* Hello {data.message} */}
      <Routes>  
        <Route path="/" element={<CreateProject />}/>
      </Routes>
    </>
  )
}

export default App
