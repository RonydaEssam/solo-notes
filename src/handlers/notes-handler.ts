import { Context, Hono } from "hono";
import { notes } from "../data/notes-data";
import Note from "../lib/types";

const getNotes = (c: Context) => {
    return c.json({ notes })
}

const createNote = async (c: Context) => {
    const noteBody = await c.req.json();

    const newNote: Note = {
        id: notes.length + 1,
        title: noteBody.title,
        body: noteBody.body
    }

    notes.push(newNote);

    return c.json({ message: "success", params: newNote })
}

const deleteNote = (c: Context) => {
    const reqId = Number(c.req.param('id'));
    const noteId = notes.findIndex(u => u.id === reqId)

    if (noteId === -1) {
        return c.json({ error: 'note Id not found' })
    }

    notes.splice(noteId, 1);
    return c.json({ message: `note ${reqId} deleted!` })

}

export { getNotes, createNote, deleteNote };