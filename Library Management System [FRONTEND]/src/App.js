import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'
import { ROLES } from './config/roles'
import Layout from './components/Layout'
import Homepage from './components/Homepage'
import Signin from './features/auth/Signin'
import Signup from './features/auth/Signup'
import PersistSignin from './features/auth/PersistSignin'
import RequireAuth from './features/auth/RequireAuth'
import Prefetch from './features/auth/Prefetch'
import Dashboard from './components/Dashboard'
import BooksShowList from './features/books/BooksShowList'
import BookDetail from './features/books/BookDetail';
import NewBook from './features/books/NewBook';
import EditBooklib from './features/books/EditBooklib';
import Usercheck from './features/users/Usercheck';
import EditCurrentUser from './features/users/EditCurrentUser';

import UsersList from './features/users/UsersList'
import BooksList from './features/books/BooksList'
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'
import NewBookForm from './features/books/NewBookForm'
import EditBook from './features/books/EditBook'
import useTitle from './hooks/useTitle';

function App() {
  useTitle('Library Management System')

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />

          <Route element={<PersistSignin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>

                <Route path="dash">
                  <Route index element={<Homepage />} />
                </Route>

                <Route path="books">
                  <Route element={<Dashboard />}>
                    <Route index element={<BooksShowList />} />
                  </Route>
                  <Route path=":id" element={<BookDetail />} />
                  <Route path="new" element={<NewBook />} />
                  <Route path="edit/:id" element={<EditBooklib />} />
                </Route>

                <Route element={<Dashboard />}>
                    <Route path="new" element={<NewBook />} />
                  <Route path="settings">

                  </Route>
                  <Route path="users">
                    <Route index element={<Usercheck />} />
                    <Route path=":id" element={<EditCurrentUser />} />
                  </Route>
                </Route>



                <Route path="/dash/userslist">
                  <Route index element={<UsersList />} />
                  <Route path="new" element={<NewUserForm />} />
                  <Route path=":id" element={<EditUser />} />
                </Route>
                <Route path="/dash/bookslist">
                  <Route index element={<BooksList />} />
                  <Route path="new" element={<NewBookForm />} />
                  <Route path=":id" element={<EditBook />} />
                </Route>



              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
