import { useParams } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import EditCurrentUserForm from './EditCurrentUserForm'
import { useGetUsersQuery } from './usersApiSlice'
import useTitle from '../../hooks/useTitle'

const EditCurrentUser = () => {
    useTitle('LMS | EDIT USER')

    const { id } = useParams()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        }),
    })

    if (!user) return <PulseLoader color={"#FFF"} />

    const content = <EditCurrentUserForm user={user} />

    return content
}
export default EditCurrentUser