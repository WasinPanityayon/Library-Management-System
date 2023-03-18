import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'
import EditUserForm from './EditUserForm'

const EditUser = () => {
    const { id } = useParams()

    const user = useSelector(state => selectUserById(state, id))

    const content = <EditUserForm user={user} />

    return content
}
export default EditUser