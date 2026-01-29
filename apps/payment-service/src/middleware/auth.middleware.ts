import { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import { getAuth } from '@hono/clerk-auth';
import { Variables } from 'hono/types';

export const shouldBeAuthenticated = createMiddleware<{ Variables: { userId: string } }>(async (c: Context, next) => {
    const auth = getAuth(c) as any;
    const userId = auth.userId;

    if (!userId) {
        return c.json({ message: 'You are not logged in' }, 401);
    }

    c.set('userId', userId);

    await next();
})