import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewBookMutation } from "../books/booksApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewBookForm = () => {

    const [addNewBook, {
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
            navigate('/settings/bookslist')
        }
    }, [isSuccess, navigate])

    const onImagebookChanged = e => setImagebook(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onAuthorChanged = e => setAuthor(e.target.value)
    const onIsbnChanged = e => setIsbn(e.target.value)

    const canSave = [title].every(Boolean) && !isLoading

    const onSaveBookClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewBook({ imagebook, title, author, isbn })
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validImagebookClass = !imagebook ? '' : ''
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validAuthorClass = !author ? '' : ''
    const validIsbnClass = !isbn ? '' : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveBookClicked}>
                <div className="form__title-row">
                    <h2>New Book</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
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

            </form>
        </>
    )

    return content
}

export default NewBookForm