import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Category, { CategoryDoc } from '../models/Category';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      category: CategoryDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCategory, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { categoryName } = req.body;
  const category = Category.build({ categoryName });
  try {
    const newCategory = await category.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCategory, async (req: Request, res: Response) => {
  try {
    await res.category.remove();
    res.status(200).json({
      message: 'Category has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCategory], async (req: Request, res: Response) => {
  mutateObject(req.body, res.category);
  try {
    const updatedCategory = await res.category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @return {*}
 */
async function getCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await Category.findById(req.params.id);

    res.category = category!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
