import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

import Achievement, { AchievementDoc } from '../models/Achievement';
import mutateObject from '../utils/mutateObject';
import { deleteImage } from './ImageRouter';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      achievement: AchievementDoc;
    }
  }
}

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI!,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getAchievement, async (req: Request, res: Response) => {
  res.status(500).send(res.achievement);
});

// POST ONE
router.post(
  '/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'achievementName' },
    { name: 'achievementDate' },
    { name: 'tags' },
  ]),
  async (req: Request, res: Response) => {
    const { achievementName, achievementDate, tags } = req.body;

    let logo;
    if (!req.files['logo']) {
      logo = '';
      if (req.body.logo) logo = req.body.logo;
    } else {
      logo = req.files['logo'][0]['filename'];
    }

    const achievement = Achievement.build({ achievementName, achievementDate, tags, logo });
    try {
      const newAchievement = await achievement.save();
      res.status(200).json(newAchievement);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

// PUT ONE
router.put(
  '/:id',
  [
    getAchievement,
    upload.fields([
      { name: 'logo', maxCount: 1 },
      { name: 'achievementName' },
      { name: 'achievementDate' },
      { name: 'tags' },
    ]),
  ],
  async (req: Request, res: Response) => {
    deleteImage(res.achievement.logo);
    mutateObject(req.body, res.achievement);

    if (req.files['logo']) {
      res.achievement.logo = req.files['logo'][0]['filename'];
    }

    try {
      const updatedAchievement = await res.achievement.save();
      res.status(200).json(updatedAchievement);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

// DELETE ONE
router.delete('/:id', getAchievement, async (req: Request, res: Response) => {
  try {
    deleteImage(res.achievement.logo);
    await res.achievement.remove();
    res.status(200).json({
      message: 'Achievement has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * Middleware to get the specific Achievement by id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function getAchievement(req: Request, res: Response, next: NextFunction) {
  try {
    const achievement = await Achievement.findById(req.params.id);

    res.achievement = achievement!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
