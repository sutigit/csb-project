import './styles.css'

import { Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<CreateAccount />} />
      </Routes>
    </>
  )
}

export default App
