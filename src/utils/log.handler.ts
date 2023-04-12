import winston from "winston"

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'white',
} 

winston.addColors(colors)

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, metadata }) => {
                return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
                    metadata
                )}`
            })
        )
    }),
    new winston.transports.File({
        dirname: "logs",
        filename: "backend.log",
        format: winston.format.combine(
            winston.format.printf(({ timestamp, level, message, metadata }) => {
                return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(
                    metadata
                )}`
            })
        )    
    })
]

const logger = winston.createLogger({
    levels: levels,
    transports: transports,
    format: winston.format.combine(winston.format.metadata(), winston.format.timestamp()),
})

export default logger