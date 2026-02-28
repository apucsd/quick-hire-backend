import { createServer, Server as HTTPServer } from 'http';
import app from './app';
import seedSuperAdmin from './app/DB';
import config from './config';

const port = config.port || 5000;

async function main() {
    try {
        const server: HTTPServer = createServer(app);

        server.listen(port, () => {
            console.log(`${config.app_name} server is running on port ${port}`);
            seedSuperAdmin();
        });

        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    console.info(`${config.app_name} server closed!`);
                });
            }
            process.exit(1);
        };

        process.on('uncaughtException', (error) => {
            console.log(error);
            exitHandler();
        });

        process.on('unhandledRejection', (error) => {
            console.log(error);
            exitHandler();
        });
    } catch (error) {
        console.error('❌ Server startup failed:', error);
        process.exit(1);
    }
}

main();
