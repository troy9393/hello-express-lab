import { Router } from 'express';
import {v4 as uuidv4} from 'uuid';
import models from '../models';
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
    req.context = {
        models
    };
    next();
})

router.get('/', (req, res) => {
    return res.send(Object.values(req.context.models.quotes)); 
})

router.get('/:id', (req, res) => {
    return res.send(Object.values(req.context.models.quotes[req.params.id]));
})

router.post('/', (req, res) => {
    const id = req.body.id;
    const quote = {
        id,
        quote: req.body.quote,
        author: req.body.author,
        year: req.body.year
    };

    req.context.models.quotes[id] = quote;

    return res.send(quote);
});

export default router;