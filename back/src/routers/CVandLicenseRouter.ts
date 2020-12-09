import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import CV_and_License, { CV_and_LicenseDoc } from '../models/CV_and_License';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      cv_and_License: CV_and_LicenseDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const cv_and_Licenses = await CV_and_License.find();
    res.status(200).json(cv_and_Licenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCV_and_License, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { cvId, licenseId, order } = req.body;
  const cv_and_License = CV_and_License.build({ cvId, licenseId, order });
  try {
    const newCV_and_License = await cv_and_License.save();
    res.status(200).json(newCV_and_License);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCV_and_License, async (req: Request, res: Response) => {
  try {
    await res.cv_and_License.remove();
    res.status(200).json({
      message: 'CV_and_License has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCV_and_License], async (req: Request, res: Response) => {
  mutateObject(req.body, res.cv_and_License);
  try {
    const updatedCV_and_License = await res.cv_and_License.save();
    res.status(200).json(updatedCV_and_License);
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
async function getCV_and_License(req: Request, res: Response, next: NextFunction) {
  try {
    const cv_and_License = await CV_and_License.findById(req.params.id);

    res.cv_and_License = cv_and_License!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
