import './styles.css'

import { Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'

// My components
import Nav from './components/Nav'

function App() {

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<CreateAccount />} />
      </Routes>
    </>
  )
}

export default App
