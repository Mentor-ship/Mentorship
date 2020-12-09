import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Duty_type, { Duty_typeDoc } from '../models/Duty_type';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      duty_type: Duty_typeDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const duty_types = await Duty_type.find();
    res.status(200).json(duty_types);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getDuty_type, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { dutyType } = req.body;
  const duty_type = Duty_type.build({ dutyType });
  try {
    const newDuty_type = await duty_type.save();
    res.status(200).json(newDuty_type);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getDuty_type, async (req: Request, res: Response) => {
  try {
    await res.duty_type.remove();
    res.status(200).json({
      message: 'Duty_type has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getDuty_type], async (req: Request, res: Response) => {
  mutateObject(req.body, res.duty_type);
  try {
    const updatedDuty_type = await res.duty_type.save();
    res.status(200).json(updatedDuty_type);
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
async function getDuty_type(req: Request, res: Response, next: NextFunction) {
  try {
    const duty_type = await Duty_type.findById(req.params.id);

    res.duty_type = duty_type!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
