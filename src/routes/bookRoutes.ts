import express from 'express';
import { body } from 'express-validator';
import * as bookController from "../controllers/bookController";

const router = express.Router();
router.post(
    '/',
    [
      body('name')
        .not()
        .isEmpty()
        .withMessage('Book name can not be empty!')
        .trim()
        .escape()
    ],
    bookController.createBook
  );
router.get('/', (req, res) => bookController.getBookList(req, res));
router.get('/:id', (req, res) => bookController.getBook(req, res));

export default router;