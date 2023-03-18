import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetBooksQuery } from '../books/booksApiSlice'
import { memo } from 'react'

const Book = ({ bookId }) => {

    const { book } = useGetBooksQuery("booksList", {
        selectFromResult: ({ data }) => ({
            book: data?.entities[bookId]
        }),
    })

    const navigate = useNavigate()

    if (book) {
        const handleEdit = () => navigate(`/settings/bookslist/${bookId}`)

        return (
            <tr className="table__row">
                <td className="table__cell book__title">{book.ticket}</td>
                <td className="table__cell book__title">
                    <img className='book__img'
                        src={book.imagebook}
                        alt={book.imagebook}
                    />
                </td>
                <td className="table__cell book__title">{book.title}</td>
                <td className="table__cell book__title">{book.author}</td>
                <td className="table__cell book__title">{book.isbn}</td>
                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedbook = memo(Book)

export default memoizedbook