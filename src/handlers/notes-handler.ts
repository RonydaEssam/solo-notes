import { Context } from "hono";
import { prisma } from "../lib/prisma";
import { createNoteSchema } from "../lib/schemas";

const getNotes = async (c: Context) => {
    try {
        const notes = await prisma.note.findMany();

        return c.json({ notes });
    } catch (error) {
        return c.json({ error: 'something went wrong' }, 500)
    }
}

const getNoteById = async (c: Context) => {
    try {
        const reqId = Number(c.req.param('id'));
        const note = await prisma.note.findUnique({ where: { id: reqId } });

        if (!note) {
            return c.json({ error: 'note not found' }, 404)
        }

        return c.json({ note });
    } catch (error) {
        return c.json({ error: 'something went wrong' }, 500)
    }
}

const createNote = async (c: Context) => {
    try {
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
    } catch (error) {
        return c.json({ error: 'something went wrong' }, 500)
    }
}

const deleteNote = async (c: Context) => {
    try {
        const reqId = Number(c.req.param('id'));
        const noteId = await prisma.note.findUnique({ where: { id: reqId } });

        if (!noteId) {
            return c.json({ error: 'note Id not found' }, 404)
        }

        await prisma.note.delete({ where: { id: reqId } });
        return c.json({ message: `note ${reqId} deleted!` });
    } catch (error) {
        return c.json({ error: 'something went wrong' }, 500)
    }
}

export { getNotes, getNoteById, createNote, deleteNote };