import { useParams } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import EditUserForm from './EditUserForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useTitle from '../../hooks/useTitle'

const EditUser = () => {
    useTitle('LMS | EDIT USER')

    const { id } = useParams()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return <PulseLoader color={"#FFF"} />

    const content = <EditUserForm user={user} />

    return content
}
export default EditUser