import React from "react"
import Router from "./Router"
import {Header} from "./components/Header"
import {Footer} from "./templates/index"

const App = () => {
  return(
    <>
    <Header/>
    <main>
      <Router />
    </main>
    <Footer/>
    </>
  )
}

export default App;