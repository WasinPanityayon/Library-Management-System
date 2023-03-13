import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"

const HomepageHeader = () => {
    const navigate = useNavigate()

    const onbooksClicked = () => navigate('/books')
    const ontransectionsClicked = () => navigate('/books')
    const onsettingsClicked = () => navigate('/settings')
    const onusersClicked = () => navigate('/users')
    const onsigninClicked = () => navigate('/signin')
    const onsignupClicked = () => navigate('/signup')
    const onsignoutClicked = () => navigate('/signout')

    let booksButton = (
        <button
            className="button_og"
            title="Books"
            onClick={onbooksClicked}
        >
            Books
        </button>
    )

    let transectionsButton = (
        <button
            className="button_og"
            title="Transections"
            onClick={ontransectionsClicked}
        >
            Transections
        </button>
    )

    let settingsButton = (
        <button
            className="button_og"
            title="Settings"
            onClick={onsettingsClicked}
        >
            Settings
        </button>
    )

    let usersButton = (
        <button
            className="button_og"
            title="Users"
            onClick={onusersClicked}
        >
            Users
        </button>
    )

    let signupButton = (
        <button
            className="button_og"
            title="SIGN UP"
            onClick={onsignupClicked}
        >
            SIGN UP
        </button>
    )


    let signinButton =  (
        <button
            className="button_signin"
            title="Sign In"
            onClick={onsigninClicked}
        >
            SIGN IN
        </button>
    )

    let signoutButton = (
        <button
            className="icon_button"
            title="Signout"
            onClick={onsignoutClicked}
        >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </button>
    )

    let buttonContentLeft = (
        <>
            {booksButton}
            {transectionsButton}
            {settingsButton}
            {usersButton}
        </>
    )
    
    let buttonContentRight = (
        <>
            {signupButton}
            {signinButton}
            {signoutButton}
        </>
    )

    const content = (
        <>
            <header className="homepage_header">
                <div className={`homepage_header_container`}>
                    <nav className="homepage_header_nav">
                        {buttonContentLeft}
                    </nav>
                    <nav className="homepage_header_nav">
                        {buttonContentRight}
                    </nav>
                </div>
            </header>
        </>
    )

    return content

}
export default HomepageHeader