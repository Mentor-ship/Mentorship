import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Education, { EducationDoc } from '../models/Education';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      education: EducationDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const educations = await Education.find();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getEducation, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { cvId, instituteId, degree, startDate, endDate, gpa } = req.body;
  const education = Education.build({ cvId, instituteId, degree, startDate, endDate, gpa });
  try {
    const newEducation = await education.save();
    res.status(200).json(newEducation);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getEducation, async (req: Request, res: Response) => {
  try {
    await res.education.remove();
    res.status(200).json({
      message: 'Education has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getEducation], async (req: Request, res: Response) => {
  mutateObject(req.body, res.education);
  try {
    const updatedEducation = await res.education.save();
    res.status(200).json(updatedEducation);
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
async function getEducation(req: Request, res: Response, next: NextFunction) {
  try {
    const education = await Education.findById(req.params.id);

    res.education = education!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
