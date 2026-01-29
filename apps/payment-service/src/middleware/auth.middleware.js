import { createMiddleware } from 'hono/factory';
import { getAuth } from '@hono/clerk-auth';
export const shouldBeAuthenticated = createMiddleware(async (c, next) => {
    const auth = getAuth(c);
    const userId = auth.userId;
    if (!userId) {
        return c.json({ message: 'You are not logged in' }, 401);
    }
    c.set('userId', userId);
    await next();
});
