import { Routes, Route } from 'react-router'
import IndexCard from './components/IndexCard/IndexCard'
import FullProfileCard from './components/FullProfileCard/FullProfileCard'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import CreateProfile from './components/CreateProfile/CreateProfile'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'
import NavMenu from './components/Nav/Nav'

function App() {

  return (
    <>
      <main>
        <NavMenu/>
        <Routes>
          <Route path="/profiles/index" element={<IndexCard />} />
          <Route path="/profiles/:id" element={<FullProfileCard />} />
          <Route path="/profiles/:id/update" element={<UpdateProfile />} />
          <Route path="/profiles/create" element={<CreateProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
