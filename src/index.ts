import { Hono } from "hono";
import { configDotenv } from "dotenv";
import { serve } from "@hono/node-server";
import { notesRoute } from './routes/notes';
import { logger } from "./middleware/logger";


configDotenv();

const app = new Hono();
const port = Number(process.env.PORT) || 3000;
const appName = process.env.APP_NAME;

app.use('*', logger);

app.route('/notes', notesRoute);

app.get('/', (c) => c.json({ message: `${appName} is working on http:/localhost:${port}` }))

serve({
    fetch: app.fetch,
    port: port
});

export default app;