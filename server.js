import { listenAndServe } from 'https://deno.land/std/http/server.ts';
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts';
import chat from './chat.js';

listenAndServe({ port: 5123 }, async (req) => {
    if (acceptable(req)) {
        acceptWebSocket({
            conn: req.conn,
            bufReader: req.r,
            bufWriter: req.w,
            headers: req.headers,
        }).then(chat);
    }
});
console.log('Server started on port 5123');
