import { useEffect, useState } from "react";
import { createBook, deleteBook, getBooks, updateBook } from "./services/api";
import { query } from "firebase/firestore";

function App() {
  const [bookTitle, setBookTitle] = useState();
  const [bookId, setBookId] = useState();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    queryBooks();
  }, []);

  const queryBooks = () => {
    getBooks().then((data) => {
      setBooks(data);
    });
  };

  const handleSave = async () => {
    await createBook({ title: bookTitle });
    queryBooks();
  };

  const handleDelete = async (id) => {
    console.log("1111111111", id);
    await deleteBook(id);
    queryBooks();
  };

  const handleUpdate = async () => {
    await updateBook(bookId, { title: bookTitle });
    queryBooks();
  };

  const handleDuplicate = async (obj) => {
    await createBook({ title: obj.title });
    queryBooks();
  };
  return (
    <>
      <input
        placeholder="Title"
        type="text"
        onChange={(e) => setBookTitle(e.target.value)}
      />
      <input
        placeholder="Id"
        type="text"
        onChange={(e) => setBookId(e.target.value)}
      />
      <button onClick={handleSave}>Save book</button>
      <button onClick={handleUpdate}>Update book</button>

      <table border={2}>
        <tr>
          <th>id</th>
          <th>Title</th>
          <th>Options</th>
        </tr>
        {books.map((b) => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.title}</td>
            <td>
              <button onClick={() => handleDelete(b.id)}>Borrar</button>
              <button onClick={() => handleDuplicate(b)}>Duplicar</button>
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default App;
