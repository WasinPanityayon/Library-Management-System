import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetBooksQuery } from './booksApiSlice'

const BookShow = ({ bookId, search }) => {

    const { book } = useGetBooksQuery("booksList", {
            selectFromResult: ({ data }) => ({
                book: data?.entities[bookId],
            }),
        
    })

    const navigate = useNavigate()

    if (book && book.title.toLowerCase().includes(search.toLowerCase())) {
        const handleEdit = () => navigate(`/books/${bookId}`)

        return (
            <>
                <button className="showbook" onClick={handleEdit}>
                    <section>
                        <img className='showbookimg'
                            src={book.imagebook}
                            alt={book.imagebook}
                        />
                    </section>
                    <section >{book.title}</section>
                </button>
            </>
            
        )

    } else return null
}

const memoizedbook = memo(BookShow)

export default memoizedbook