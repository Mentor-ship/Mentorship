import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

import License, { LicenseDoc } from '../models/License';
import mutateObject from '../utils/mutateObject';
import { deleteImage } from './ImageRouter';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      license: LicenseDoc;
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
    const licenses = await License.find();
    res.status(200).json(licenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getLicense, async (req: Request, res: Response) => {
  res.status(500).send(res.license);
});

// POST ONE
router.post(
  '/',
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'licenseDate' }, { name: 'licenseName' }, { name: 'tags' }]),
  async (req: Request, res: Response) => {
    const { tags, licenseDate, licenseName } = req.body;

    let logo;
    if (!req.files['logo']) {
      logo = '';
      if (req.body.logo) logo = req.body.logo;
    } else {
      logo = req.files['logo'][0]['filename'];
    }

    const license = License.build({ licenseDate, licenseName, tags, logo });
    try {
      const newLicense = await license.save();
      res.status(200).json(newLicense);
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
    getLicense,
    upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'licenseDate' }, { name: 'licenseName' }, { name: 'tags' }]),
  ],
  async (req: Request, res: Response) => {
    deleteImage(res.license.logo);
    mutateObject(req.body, res.license);

    if (req.files['logo']) {
      res.license.logo = req.files['logo'][0]['filename'];
    }

    try {
      const updatedLicense = await res.license.save();
      res.status(200).json(updatedLicense);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

// DELETE ONE
router.delete('/:id', getLicense, async (req: Request, res: Response) => {
  try {
    deleteImage(res.license.logo);
    await res.license.remove();
    res.status(200).json({
      message: 'License has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * Middleware to get the specific License by id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function getLicense(req: Request, res: Response, next: NextFunction) {
  try {
    const license = await License.findById(req.params.id);

    res.license = license!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
