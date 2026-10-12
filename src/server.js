import http from 'http';
import mongoose from 'mongoose';
import { env } from './lib/config/env.js';
import { logger } from "./pkg/logger/logger.js";
import { createApp } from './app.js';

const app = createApp();

const server = http.createServer(app);

server.listen(env.port, () => {
  logger.info({ message: 'Server started on port 3000' });
});

async function shutdown() {
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);