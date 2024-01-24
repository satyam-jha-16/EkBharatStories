import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import About from './pages/About'
import Header from './components/Header'
import Newsletter from './pages/Newsletter'

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
