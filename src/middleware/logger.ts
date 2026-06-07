import { createMiddleware } from 'hono/factory'

const logger = createMiddleware(async (c, next) => {
    const start = Date.now();
    const method = c.req.method;
    const path = c.req.path;

    console.log(`-> ${method} ${path}`);

    await next();

    const duration = Date.now() - start;
    const status = c.res.status;
    console.log(`<- ${method} ${path} [${status}] ${duration}ms`)
})

export { logger };