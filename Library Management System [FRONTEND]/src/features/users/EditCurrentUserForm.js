import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from "./usersApiSlice"

const NAME_REGEX = /^[A-z]{1,50}$/
const USER_REGEX = /^[A-z0-9]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%*_.-]{4,12}$/

const EditCurrentUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const navigate = useNavigate()

    const [firstname, setFirstname] = useState(user.firstname)
    const [validFirstname, setValidFirstname] = useState(false)
    const [surname, setSurname] = useState(user.surname)
    const [validSurname, setValidSurname] = useState(false)
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [CheckConfirmPassword, setCheckConfirmPassword] = useState(false)

    const userRef = useRef()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setValidFirstname(NAME_REGEX.test(firstname))
    }, [firstname])

    useEffect(() => {
        setValidSurname(NAME_REGEX.test(surname))
    }, [surname])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setCheckConfirmPassword(confirmPassword === password)
    }, [password, confirmPassword])

    useEffect(() => {
        setActive(prev => prev)
    }, [setActive])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess) {
            setFirstname('')
            setSurname('')
            setUsername('')
            setPassword('')
            setRoles([])
            toast.dismiss()
            toast.success('Update account successful.', {
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/users')
        }

    }, [isSuccess, navigate])

    useEffect(() => {
        if(isError) {
            toast.dismiss()
            toast.error(error?.data?.message, {
                position: "bottom-right",
                autoClose: 10000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [isError, error?.data?.message])

    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onSurnameChanged = e => setSurname(e.target.value)
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value)

    if (isLoading) return <PulseLoader color={"#FFF"} />


    const onSaveUserClicked = async (e) => {
        if(CheckConfirmPassword) {
            if (password) {
                await updateUser({ id: user.id, firstname, surname, username, password, roles, active })
            } 
            else {
                await updateUser({ id: user.id, firstname, surname, username, roles, active })
            }
        }
    }

    let canSave
    if(CheckConfirmPassword){
        if (password) {
            canSave = [roles.length, validFirstname, validSurname, validUsername, validPassword].every(Boolean) && !isLoading
        } else {
            canSave = [roles.length, validFirstname, validSurname, validUsername].every(Boolean) && !isLoading
        }
    }

    const validFirstnameClass = !validFirstname ? 'public_form__input--incomplete' : ''
    const validSurnameClass = !validSurname ? 'public_form__input--incomplete' : ''
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''

    const content = (
        <section className="public_signin">
            <section>
                <header className='text'>
                    <h1>EDIT USER</h1>
                </header>
                <section className="public_signin_container">
                    <main className="signin">

                        <form className="public_form" onSubmit={onSaveUserClicked}>
                            <section>
                                <section className="public_form_name">
                                    <label htmlFor="firstname">Firstname:</label>
                                    <input
                                        className={`public_form__input ${validFirstnameClass}`}
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        ref={userRef}
                                        value={firstname}
                                        onChange={onFirstnameChanged}
                                        autoComplete="off"
                                        required
                                    />

                                    <label htmlFor="surname">Surname:</label>
                                    <input
                                        className={`public_form__input ${validSurnameClass}`}
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        value={surname}
                                        onChange={onSurnameChanged}
                                        autoComplete="off"
                                        required
                                    />
                                </section>
                            </section>
                            

                            <label htmlFor="username">Username:</label>
                            <input
                                className={`public_form__input ${validUserClass}`}
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={onUsernameChanged}
                                autoComplete="off"
                                required
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                className={`public_form__input ${validPwdClass}`}
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onPasswordChanged}
                            />

                            <label htmlFor="passwordconfirm">Confirm Password:</label>
                            <input
                                className={`public_form__input ${(confirmPassword === password) ? validPwdClass : 'public_form__input--incomplete'}`}
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                value={confirmPassword}
                                onChange={onConfirmPasswordChanged}
                            />

                            <button className="public_form__submit-button" disabled={!canSave}>Save</button>
                        </form>
                    </main>
                </section>
                <footer>
                    <Link to="/users">Back to User</Link>
                </footer>
            </section>
        </section>
    )

    return content
}
export default EditCurrentUserForm