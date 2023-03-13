import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import Signin from './features/auth/Signin'
import Signup from './features/auth/Signup'
import UsersList from './features/users/UsersList'
import BooksList from './features/books/BooksList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
          <Route path="dash" element={<Homepage />} />
            <Route path="/dash/userslist">
              <Route index element={<UsersList />} />
            </Route>
            <Route path="/dash/bookslist">
              <Route index element={<BooksList />} />
            </Route>


      </Route>
    </Routes>
  );
}

export default App;
