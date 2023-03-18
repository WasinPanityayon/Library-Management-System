import PulseLoader from 'react-spinners/PulseLoader'
import { useState } from "react"
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"
import { useGetBooksQuery } from "./booksApiSlice"
import BookShow from "./BookShow"
import useAuth from '../../hooks/useAuth'
import useTitle from "../../hooks/useTitle"

const BooksShowList = () => {
    useTitle('LMS | BOOKS')

    const { isLibrarian, isAdmin } = useAuth()

    const [search, setSearch] = useState('');

    const navigate = useNavigate()

    const onSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const {
        data: books,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBooksQuery('booksList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = books

        const tableContent = ids?.length && ids.map(bookId => <BookShow key={bookId} bookId={bookId} search={search}/>)

        const newButton = () => navigate(`/books/new`)

        let addnewbutton = null
        if (isLibrarian || isAdmin) {
            addnewbutton = (
                <button
                        className="icon_button"
                        onClick={newButton}
                    >
                        <FontAwesomeIcon icon={faPlus} />NEW
                    </button>
            )
        }

        content = (
            <>
                <header className='table_show_head'>
                    <h1>Books</h1>
                    <div>
                        <input
                            className="search__input"
                            type="text"
                            placeholder="Search books..."
                            value={search}
                            onChange={onSearchChange}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                    {addnewbutton}
                </header>
                <table className="table_show">
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </>
        )
    }

    return content
}
export default BooksShowList