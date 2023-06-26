import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

app.use(cors());

app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/quotes', routes.quote);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.serverMessage = 'Server generated message';
    next();
});


app.listen(3000, () => {
    console.log(process.env.ENVIRONMENT);
    console.log('Example app listening on port 3000!');
});
