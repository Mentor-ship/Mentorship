import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Group, { GroupDoc } from '../models/Group';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      group: GroupDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getGroup, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { groupName } = req.body;
  const group = Group.build({ groupName });
  try {
    const newGroup = await group.save();
    res.status(200).json(newGroup);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getGroup, async (req: Request, res: Response) => {
  try {
    await res.group.remove();
    res.status(200).json({
      message: 'Group has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getGroup], async (req: Request, res: Response) => {
  mutateObject(req.body, res.group);
  try {
    const updatedGroup = await res.group.save();
    res.status(200).json(updatedGroup);
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
async function getGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const group = await Group.findById(req.params.id);

    res.group = group!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
