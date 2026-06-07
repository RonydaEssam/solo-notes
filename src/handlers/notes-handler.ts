import { Context } from "hono";
import { prisma } from "../lib/prisma";
import { createNoteSchema } from "../lib/schemas";

const getNotes = async (c: Context) => {
    const notes = await prisma.note.findMany();

    return c.json({ notes });
}

const getNoteById = async (c: Context) => {
    const reqId = Number(c.req.param('id'));
    const note = await prisma.note.findUnique({ where: { id: reqId } });

    if (!note) {
        return c.json({ error: 'note not found' })
    }

    return c.json({ note });
}

const createNote = async (c: Context) => {
    const body = await c.req.json();
    const result = createNoteSchema.safeParse(body);

    if (!result.success) {
        return c.json({ error: 'Invalid Input', message: 'make sure title and body are not empty' }, 400)
    }

    const newNote = await prisma.note.create({
        data: {
            title: result.data.title,
            body: result.data.body
        }
    });

    return c.json({ message: "success", params: newNote });
}

const deleteNote = async (c: Context) => {
    const reqId = Number(c.req.param('id'));
    const noteId = await prisma.note.findUnique({ where: { id: reqId } });

    if (!noteId) {
        return c.json({ error: 'note Id not found' })
    }

    await prisma.note.delete({ where: { id: reqId } });
    return c.json({ message: `note ${reqId} deleted!` });
}

export { getNotes, getNoteById, createNote, deleteNote };