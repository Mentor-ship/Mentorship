import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

import Skill, { SkillDoc } from '../models/Skill';
import mutateObject from '../utils/mutateObject';
import { deleteImage } from './ImageRouter';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      skill: SkillDoc;
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
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getSkill, async (req: Request, res: Response) => {
  res.status(500).send(res.skill);
});

// POST ONE
router.post(
  '/',
  upload.fields([{ name: 'skillName' }, { name: 'logo', maxCount: 1 }]),
  async (req: Request, res: Response) => {
    const { skillName } = req.body;

    let logo;
    if (!req.files['logo']) {
      logo = '';
      if (req.body.logo) logo = req.body.logo;
    } else {
      logo = req.files['logo'][0]['filename'];
    }

    const skill = Skill.build({ skillName, logo });
    try {
      const newSkill = await skill.save();
      res.status(200).json(newSkill);
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
  [getSkill, upload.fields([{ name: 'skillName' }, { name: 'logo', maxCount: 1 }])],
  async (req: Request, res: Response) => {
    deleteImage(res.skill.logo);
    mutateObject(req.body, res.skill);

    if (req.files['logo']) {
      res.skill.logo = req.files['logo'][0]['filename'];
    }

    try {
      const updatedSkill = await res.skill.save();
      res.status(200).json(updatedSkill);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

// DELETE ONE
router.delete('/:id', getSkill, async (req: Request, res: Response) => {
  try {
    deleteImage(res.skill.logo);
    await res.skill.remove();
    res.status(200).json({
      message: 'Skill has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * Middleware to get the specific Skill by id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function getSkill(req: Request, res: Response, next: NextFunction) {
  try {
    const skill = await Skill.findById(req.params.id);

    res.skill = skill!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
