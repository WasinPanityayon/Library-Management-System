import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBookById } from './booksApiSlice'
import EditBookForm from './EditBookForm'

const EditBook = () => {
    const { id } = useParams()

    const book = useSelector(state => selectBookById(state, id))

    const content = <EditBookForm book={book} />
    
    return content
}
export default EditBook