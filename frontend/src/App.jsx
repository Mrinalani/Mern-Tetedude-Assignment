import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>

  )
}

export default App
