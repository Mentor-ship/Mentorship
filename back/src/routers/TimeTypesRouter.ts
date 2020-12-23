import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Time_type, { Time_typeDoc } from '../models/Time_type';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      time_type: Time_typeDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const time_types = await Time_type.find();
    res.status(200).json(time_types);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getTime_type, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { timeType } = req.body;
  const time_type = Time_type.build({ timeType });
  try {
    const newTime_type = await time_type.save();
    res.status(200).json(newTime_type);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getTime_type, async (req: Request, res: Response) => {
  try {
    await res.time_type.remove();
    res.status(200).json({
      message: 'Time_type has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getTime_type], async (req: Request, res: Response) => {
  mutateObject(req.body, res.time_type);
  try {
    const updatedTime_type = await res.time_type.save();
    res.status(200).json(updatedTime_type);
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
async function getTime_type(req: Request, res: Response, next: NextFunction) {
  try {
    const time_type = await Time_type.findById(req.params.id);

    res.time_type = time_type!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
