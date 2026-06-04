import { Hono } from "hono";
import { createNote, deleteNote, getNotes } from "../handlers/notes-handler";

const notesRoute = new Hono();

const createNoteSchema = {}

notesRoute.get('/', getNotes)

notesRoute.post('/', createNote)

notesRoute.delete('/:id', deleteNote)

export default notesRoute;