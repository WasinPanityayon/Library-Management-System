import PulseLoader from 'react-spinners/PulseLoader'
import { useGetUsersQuery } from "./usersApiSlice"
import CurrentUser from './CurrentUser'
import useTitle from "../../hooks/useTitle"

const Usercheck = () => {
    useTitle('LMS | USER INFO')

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#000"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const Content = ids?.length && ids.map(userId => <CurrentUser key={userId} userId={userId} />)

        content = (
            <main>
                {Content}
            </main>
        )
    }

    return content
}
export default Usercheck