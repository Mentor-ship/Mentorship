import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import CV, { CVDoc } from '../models/CV';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      cv: CVDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const cvs = await CV.find();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCV, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { lastEdit } = req.body;
  const cv = CV.build({ lastEdit });
  try {
    const newCV = await cv.save();
    res.status(200).json(newCV);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV, async (req: Request, res: Response) => {
  try {
    await res.cv.remove();
    res.status(200).json({
      message: 'CV has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCV], async (req: Request, res: Response) => {
  mutateObject(req.body, res.cv);
  try {
    const updatedCV = await res.cv.save();
    res.status(200).json(updatedCV);
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
async function getCV(req: Request, res: Response, next: NextFunction) {
  try {
    const cv = await CV.findById(req.params.id);

    res.cv = cv!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
