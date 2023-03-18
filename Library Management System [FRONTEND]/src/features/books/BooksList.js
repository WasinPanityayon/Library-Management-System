import { useGetBooksQuery } from "./booksApiSlice"
import Book from "./Book"

const BooksList = () => {
    const {
        data: books,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetBooksQuery('booksList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    
    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = books

        const tableContent = ids?.length && ids.map(bookId => <Book key={bookId} bookId={bookId} />)

        content = (
            <table className="table_book">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th book__edit">Book No.</th>
                        <th scope="col" className="table__th book__title">Img</th>
                        <th scope="col" className="table__th book__title">Title</th>
                        <th scope="col" className="table__th book__status">author</th>
                        <th scope="col" className="table__th book__status">isbn</th>
                        <th scope="col" className="table__th book__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
    
}
export default BooksList