import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useAddNewBookMutation } from "./booksApiSlice"
import useTitle from '../../hooks/useTitle'
import { toast } from "react-toastify"

const NewBook = () => {
    useTitle('LMS | NEW BOOK')

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewBookMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [isbn, setIsbn] = useState('')
    const [imagebook, setImagebook] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setImagebook('')
            setTitle('')
            setAuthor('')
            setIsbn('')
            navigate('/books')
            toast.success('New book has been add.', {
                position: "bottom-right",
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [isSuccess, navigate])

    const onImagebookChanged = e => setImagebook(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onAuthorChanged = e => setAuthor(e.target.value)
    const onIsbnChanged = e => setIsbn(e.target.value)

    const canSave = [title].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ imagebook, title, author, isbn })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validImagebookClass = !imagebook ? '' : ''
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validAuthorClass = !author ? '' : ''
    const validIsbnClass = !isbn ? '' : ''

    const backButton = () => navigate(`/books`)

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <div className='bookdetail_header'>
                <button
                    className="icon_button"
                    title="Back"
                    onClick={backButton}
                >
                    <FontAwesomeIcon icon={faLongArrowLeft} />
                </button>
                <h2>New Book</h2>
                <div></div>
            </div>
            <section className='newbook_main' >
                <section className='bookdetail_row'>
                    <form className="public_form" onSubmit={onSaveNoteClicked}>
                        <label className="form__label" htmlFor="imagebook">
                            Imagebook:</label>
                        <input
                            className={`form__input ${validImagebookClass}`}
                            id="imagebook"
                            name="imagebook"
                            type="text"
                            autoComplete="off"
                            value={imagebook}
                            onChange={onImagebookChanged}
                        />

                        <label className="form__label" htmlFor="title">
                            Title:</label>
                        <input
                            className={`form__input ${validTitleClass}`}
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />

                        <label className="form__label" htmlFor="author">
                            Author:</label>
                        <input
                            className={`form__input ${validAuthorClass}`}
                            id="author"
                            name="author"
                            type="text"
                            autoComplete="off"
                            value={author}
                            onChange={onAuthorChanged}
                        />

                        <label className="form__label" htmlFor="isbn">
                            ISBN:</label>
                        <input
                            className={`form__input ${validIsbnClass}`}
                            id="isbn"
                            name="isbn"
                            type="text"
                            autoComplete="off"
                            value={isbn}
                            onChange={onIsbnChanged}
                        />
                        <button className="public_form__submit-button">SUBMIT</button>
                    </form>
                </section>
            </section>
        </>
    )

    return content
}

export default NewBook