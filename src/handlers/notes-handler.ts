import { Context } from "hono";
import { prisma } from "../lib/prisma";

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

    const newNote = await prisma.note.create({
        data: {
            title: body.title,
            body: body.body
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