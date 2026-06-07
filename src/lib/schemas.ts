import { z } from 'zod';

const createNoteSchema = z.object({
    title: z.string().min(1),
    body: z.string().min(1)
})

export { createNoteSchema }