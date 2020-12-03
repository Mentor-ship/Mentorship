import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import CV_and_Achievement, { CV_and_AchievementDoc } from '../models/CV_and_Achievement';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      cv_and_Achievement: CV_and_AchievementDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const cv_and_Achievements = await CV_and_Achievement.find();
    res.status(200).json(cv_and_Achievements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCV_and_Achievement, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { cvId, achievementId, order } = req.body;
  const cv_and_Achievement = CV_and_Achievement.build({ cvId, achievementId, order });
  try {
    const newCV_and_Achievement = await cv_and_Achievement.save();
    res.status(200).json(newCV_and_Achievement);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV_and_Achievement, async (req: Request, res: Response) => {
  try {
    await res.cv_and_Achievement.remove();
    res.status(200).json({
      message: 'CV_and_Achievement has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCV_and_Achievement], async (req: Request, res: Response) => {
  mutateObject(req.body, res.cv_and_Achievement);
  try {
    const updatedCV_and_Achievement = await res.cv_and_Achievement.save();
    res.status(200).json(updatedCV_and_Achievement);
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
async function getCV_and_Achievement(req: Request, res: Response, next: NextFunction) {
  try {
    const cv_and_Achievement = await CV_and_Achievement.findById(req.params.id);

    res.cv_and_Achievement = cv_and_Achievement!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
