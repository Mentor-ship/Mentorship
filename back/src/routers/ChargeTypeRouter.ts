import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Charge_type, { Charge_typeDoc } from '../models/Charge_type';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      charge_type: Charge_typeDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const charge_types = await Charge_type.find();
    res.status(200).json(charge_types);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCharge_type, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { chargeType } = req.body;
  const charge_type = Charge_type.build({ chargeType });
  try {
    const newCharge_type = await charge_type.save();
    res.status(200).json(newCharge_type);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCharge_type, async (req: Request, res: Response) => {
  try {
    await res.charge_type.remove();
    res.status(200).json({
      message: 'Charge type has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCharge_type], async (req: Request, res: Response) => {
  mutateObject(req.body, res.charge_type);
  try {
    const updatedCharge_type = await res.charge_type.save();
    res.status(200).json(updatedCharge_type);
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
async function getCharge_type(req: Request, res: Response, next: NextFunction) {
  try {
    const charge_type = await Charge_type.findById(req.params.id);

    res.charge_type = charge_type!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
