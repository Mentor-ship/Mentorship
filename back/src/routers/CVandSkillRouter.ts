import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import CV_and_Skill, { CV_and_SkillDoc } from '../models/CV_and_Skill';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      cv_and_Skill: CV_and_SkillDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const cv_and_Skills = await CV_and_Skill.find();
    res.status(200).json(cv_and_Skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCV_and_Skill, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { cvId, skillId, order } = req.body;
  const cv_and_Skill = CV_and_Skill.build({ cvId, skillId, order });
  try {
    const newCV_and_Skill = await cv_and_Skill.save();
    res.status(200).json(newCV_and_Skill);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV_and_Skill, async (req: Request, res: Response) => {
  try {
    await res.cv_and_Skill.remove();
    res.status(200).json({
      message: 'CV_and_Skill has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCV_and_Skill], async (req: Request, res: Response) => {
  mutateObject(req.body, res.cv_and_Skill);
  try {
    const updatedCV_and_Skill = await res.cv_and_Skill.save();
    res.status(200).json(updatedCV_and_Skill);
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
async function getCV_and_Skill(req: Request, res: Response, next: NextFunction) {
  try {
    const cv_and_Skill = await CV_and_Skill.findById(req.params.id);

    res.cv_and_Skill = cv_and_Skill!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
