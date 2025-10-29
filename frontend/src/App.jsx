import usePing from "./hooks/apis/query/usePing.js"

function App() {

  const {isLoading,data} = usePing()

  if(isLoading){
    return(
      <>Loading ....</>
    )
  }

  return (
    <>
      Hello {data.message}
      
    </>
  )
}

export default App
