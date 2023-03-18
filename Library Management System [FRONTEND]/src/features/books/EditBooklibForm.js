import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeleteBookMutation, useUpdateBookMutation } from "./booksApiSlice"

const EditBooklibForm = ({ book }) => {

    const [updateBook, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateBookMutation()

    const [deleteBook, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteBookMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(book.title)
    const [author, setAuthor] = useState(book.author)
    const [isbn, setIsbn] = useState(book.isbn)
    const [imagebook, setImagebook] = useState(book.imagebook)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setImagebook('')
            setTitle('')
            setAuthor('')
            setIsbn('')
            navigate('/books')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onImagebookChanged = e => setImagebook(e.target.value)
    const onTitleChanged = e => setTitle(e.target.value)
    const onAuthorChanged = e => setAuthor(e.target.value)
    const onIsbnChanged = e => setIsbn(e.target.value)

    const canSave = [title].every(Boolean) && !isLoading

    const onSaveBookClicked = async (e) => {
        if (canSave) {
            await updateBook({ id: book.id, imagebook, title, author, isbn })
        }
    }

    const onDeleteBookClicked = async () => {
        await deleteBook({ id: book.id })
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validImagebookClass = !imagebook ? '' : ''
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validAuthorClass = !author ? '' : ''
    const validIsbnClass = !isbn ? '' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const backButton = () => navigate(`/books`)

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <div className='bookdetail_header'>
                <button
                    className="icon_button"
                    title="Back"
                    onClick={backButton}
                >
                    <FontAwesomeIcon icon={faLongArrowLeft} />
                </button>
                <h2>Edit Book</h2>
                <div></div>
            </div>
            <section className='newbook_main' >
                <section className='bookdetail_row'>
                    <form className="public_form" onSubmit={e => e.preventDefault()}>
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

                        <label className="form__label" htmlFor="note-title">
                            Title:</label>
                        <input
                            className={`form__input ${validTitleClass}`}
                            id="note-title"
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
                        <button className="public_form__submit-button"
                            onClick={onSaveBookClicked}>
                                SUBMIT
                        </button>
                        <button className="public_form__submit-button"
                            onClick={onDeleteBookClicked}>
                                DELETE
                        </button>
                    </form>
                </section>
            </section>
        </>
    )

    return content
}

export default EditBooklibForm