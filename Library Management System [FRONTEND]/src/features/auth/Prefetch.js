import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../app/store'
import { booksApiSlice } from '../books/booksApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(booksApiSlice.util.prefetch('getBooks', 'booksList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
