import pino from 'pino';

const logger = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',
        ignore: 'pid, hostname'
    },
    depthLimit: 1
});

export default logger;
