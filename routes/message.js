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
    return res.send(Object.values(req.context.models.messages));
});
router.get('/:messageId', (req, res) => {
    return res.send(Object.values(req.context.models.messages[req.params.messageId]));
});
router.post('/', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        serverMessage: req.serverMessage,
        userId: req.context.me.id,
    };

    req.context.models.messages[id] = message;

    return res.send(message);
});

router.delete('/:messageId', (req, res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = req.context.models.messages;

    req.context.models.messages = otherMessages;

    return res.send(message);
});

export default router;