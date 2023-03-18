import { useParams } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import EditBookForm from './EditBookForm'
import { useGetBooksQuery } from './booksApiSlice'
import useTitle from '../../hooks/useTitle'

const EditBook = () => {
    useTitle('LMS | EDIT BOOK')

    const { id } = useParams()

    const { book } = useGetBooksQuery("BooksList", {
        selectFromResult: ({ data }) => ({
            book: data?.entities[id]
        }),
    })

    if (!book) return <PulseLoader color={"#FFF"} />

    const content = 
    <>
        <EditBookForm book={book} />
    </>
    return content
}
export default EditBook