import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import CV_and_Language, { CV_and_LanguageDoc } from '../models/CV_and_Language';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      cv_and_Language: CV_and_LanguageDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const cv_and_Languages = await CV_and_Language.find();
    res.status(200).json(cv_and_Languages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCV_and_Language, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { cvId, languageId, languageLevelId, order } = req.body;
  const cv_and_Language = CV_and_Language.build({ cvId, languageId, languageLevelId, order });
  try {
    const newCV_and_Language = await cv_and_Language.save();
    res.status(200).json(newCV_and_Language);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV_and_Language, async (req: Request, res: Response) => {
  try {
    await res.cv_and_Language.remove();
    res.status(200).json({
      message: 'CV_and_Language has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCV_and_Language], async (req: Request, res: Response) => {
  mutateObject(req.body, res.cv_and_Language);
  try {
    const updatedCV_and_Language = await res.cv_and_Language.save();
    res.status(200).json(updatedCV_and_Language);
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
async function getCV_and_Language(req: Request, res: Response, next: NextFunction) {
  try {
    const cv_and_Language = await CV_and_Language.findById(req.params.id);

    res.cv_and_Language = cv_and_Language!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
