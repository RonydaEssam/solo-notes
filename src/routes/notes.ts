import { Hono } from "hono";
import { createNote, deleteNote, getNotes, getNoteById } from "../handlers/notes-handler";

const notesRoute = new Hono();

notesRoute.get('/', getNotes);

notesRoute.get('/:id', getNoteById);

notesRoute.post('/', createNote);

notesRoute.delete('/:id', deleteNote);

export { notesRoute };