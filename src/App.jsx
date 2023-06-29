import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import Profile from "./pages/profile/Profile";
import NotFoundPage from "./pages/404/NotFoundPage";
import HomePage from "./pages/home/HomePage";


function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <HomePage /> } />
        <Route path="*" element={ <NotFoundPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/profile" element={ <Profile /> } />
      </Routes>
    </Router>
  )
}

export default App
