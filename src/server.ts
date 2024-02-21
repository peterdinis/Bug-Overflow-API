import errorHandler from 'errorhandler';
import app from './app';
import dotenv from "dotenv";

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

dotenv.config();

const PORT = process.env.PORT as unknown as number;

const server = app.listen(PORT, () => {
    console.log(`Applikácia beží na porte ${PORT}`);
});

export default server;