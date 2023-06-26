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
    return res.send(Object.values(req.context.models.users));
});
router.get('/:userId', (req, res) => {
    return res.send(Object.values(req.context.models.users[req.params.userId]));
});
router.post('/', (req, res) => {
    res.send('Received a POST HTTP method on user resource');
})
router.put('/:userId', (req, res) => {
    res.send(`Received a PUT HTTP method on user/${req.params.userId} resource`);
})
router.delete('/:userId', (req, res) => {
    res.send(`Received a DELETE HTTP method on user/${req.params.userId} resource`);
})

export default router;