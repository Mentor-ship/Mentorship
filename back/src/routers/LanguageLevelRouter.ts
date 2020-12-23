import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Language_level, { Language_levelDoc } from '../models/Language_level';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      language_level: Language_levelDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const language_levels = await Language_level.find();
    res.status(200).json(language_levels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getLanguage_level, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { languageLevel } = req.body;
  const language_level = Language_level.build({ languageLevel });
  try {
    const newLanguage_level = await language_level.save();
    res.status(200).json(newLanguage_level);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getLanguage_level, async (req: Request, res: Response) => {
  try {
    await res.language_level.remove();
    res.status(200).json({
      message: 'Language_level has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getLanguage_level], async (req: Request, res: Response) => {
  mutateObject(req.body, res.language_level);
  try {
    const updatedLanguage_level = await res.language_level.save();
    res.status(200).json(updatedLanguage_level);
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
async function getLanguage_level(req: Request, res: Response, next: NextFunction) {
  try {
    const language_level = await Language_level.findById(req.params.id);

    res.language_level = language_level!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
