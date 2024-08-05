import express from 'express';
import { body } from 'express-validator';
import * as  userController  from "../controllers/userController";
import * as  transactionController  from "../controllers/transactionManagementController";

const router = express.Router();
router.post(
    '/',
    [
        body('name')
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .trim()
        .escape()
    ],
    userController.createUser
);
router.get('/', (req, res) => userController.getUserList(req, res));
router.get('/:id', (req, res) => userController.getUser(req, res));

router.post('/:userId/borrow/:bookId', transactionController.borrowBook);
router.post('/:userId/return/:bookId', transactionController.returnBook);


export default router;