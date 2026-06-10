import { useEffect, useState } from 'react'
import './App.css'
import { Footer } from './Footer'
import { Header } from './Header'
import type Note from "../../src/lib/types";
import { configDotenv } from 'dotenv';

configDotenv();
const port = Number(process.env.PORT);

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`http://localhost:${port}/notes`);
      const data = await response.json();

      setNotes(data.notes);

      console.log(data);
    }

    fetchNotes();
  }, []);

  return (
    <>
      <Header />

      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <br />
        </div>
      ))}

      <Footer />
    </>
  );
}

export default App
