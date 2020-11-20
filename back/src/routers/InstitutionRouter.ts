import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

import Institution, { InstitutionDoc } from '../models/Institution';
import mutateObject from '../utils/mutateObject';
import { deleteImage } from './ImageRouter';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      institution: InstitutionDoc;
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
    const institutions = await Institution.find();
    res.status(200).json(institutions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getInstitution, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post(
  '/',
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'instituteName' }]),
  async (req: Request, res: Response) => {
    const { instituteName } = req.body;

    let logo;
    if (!req.files['logo']) {
      logo = '';
      if (req.body.logo) logo = req.body.logo;
    } else {
      logo = req.files['logo'][0]['filename'];
    }

    const institution = Institution.build({ instituteName, logo });
    try {
      const newInstitution = await institution.save();
      res.status(200).json(newInstitution);
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
  [getInstitution, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'instituteName' }])],
  async (req: Request, res: Response) => {
    deleteImage(res.institution.logo);
    mutateObject(req.body, res.institution);

    if (req.files['logo']) {
      res.institution.logo = req.files['logo'][0]['filename'];
    }

    try {
      const updatedInstitution = await res.institution.save();
      res.status(200).json(updatedInstitution);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

// DELETE ONE
router.delete('/:id', getInstitution, async (req: Request, res: Response) => {
  try {
    deleteImage(res.institution.logo);
    await res.institution.remove();
    res.status(200).json({
      message: 'Institution has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * Middleware to get the specific Institution by id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function getInstitution(req: Request, res: Response, next: NextFunction) {
  try {
    const institution = await Institution.findById(req.params.id);

    res.institution = institution!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
