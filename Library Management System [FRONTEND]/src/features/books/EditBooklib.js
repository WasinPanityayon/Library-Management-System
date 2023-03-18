import { useParams } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import EditBooklibForm from './EditBooklibForm'
import { useGetBooksQuery } from './booksApiSlice'
import useTitle from '../../hooks/useTitle'

const EditBooklib = () => {
    useTitle('Book')

    const { id } = useParams()

    const { book } = useGetBooksQuery("BooksList", {
        selectFromResult: ({ data }) => ({
            book: data?.entities[id]
        }),
    })

    if (!book) return <PulseLoader color={"#000"} />

    const content = 
    <>
        <EditBooklibForm book={book} />
    </>
    return content
}
export default EditBooklib