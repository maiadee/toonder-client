import { Routes, Route } from 'react-router'
import IndexCard from './components/IndexCard/IndexCard'
// import FullProfileCard from './components/FullProfileCard/FullProfileCard'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import CreateProfile from './components/CreateProfile/CreateProfile'
import UpdateProfile from './components/UpdateProfile/UpdateProfile'

function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<IndexCard />} />
          {/* <Route path="/posts/:postId" element={<FullProfileCard />} /> */}
          <Route path="/posts/:postId/edit" element={<UpdateProfile />} />
          <Route path="/posts/new" element={<CreateProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="signin" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
