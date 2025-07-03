import "./App.css"
import { Footer } from "./components/Footer"
import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
