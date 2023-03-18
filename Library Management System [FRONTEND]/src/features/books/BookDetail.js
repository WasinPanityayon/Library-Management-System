import { useNavigate, useParams } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import { faLongArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetBooksQuery } from './booksApiSlice'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const BookDetail = () => {
    useTitle('LMS | BOOK INFO')

    const { isLibrarian, isAdmin } = useAuth()

    const navigate = useNavigate()

    const { id } = useParams()

    const { book } = useGetBooksQuery("BooksList", {
        selectFromResult: ({ data }) => ({
            book: data?.entities[id]
        }),
    })

    if (!book) return <PulseLoader color={"#000"} />

    const backButton = () => navigate(`/books`)
    const editButton = () => navigate(`/books/edit/${id}`)

    let showeditbutton = null
        if (isLibrarian || isAdmin) {
            showeditbutton = (
                <button
                    className="icon_button"
                    title="Edit"
                    onClick={editButton}
                >
                    <FontAwesomeIcon icon={faPencil} />
                </button>
            )
        }

    const content = 
    <>
        <section>
            <div className='bookdetail_header'>
                <button
                    className="icon_button"
                    title="Back"
                    onClick={backButton}
                >
                    <FontAwesomeIcon icon={faLongArrowLeft} />
                </button>
                <h2>View Book Detail #{book.ticket}</h2>
                <div>{showeditbutton}</div>
            </div>
            <section className='bookdetail_main' >
                <section className='bookdetail_row'>
                    <div>
                        <img className='showbookimg'
                        src={book.imagebook}
                        alt={book.imagebook}
                        />
                    </div>
                    <section className='bookdetail_col'>
                        <div>
                            {book.title}
                        </div>
                        <>
                            <div>
                                Author: {book.author}
                            </div>
                            <div>
                                ISBN: {book.isbn}
                            </div>
                        </>
                    </section>
                </section>
            </section>
        </section>  
    </>
    return content
}
export default BookDetail