import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

import Language, { LanguageDoc } from '../models/Language';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      language: LanguageDoc;
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
    const languages = await Language.find();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getLanguage, async (req: Request, res: Response) => {
  res.status(500).send(res.language);
});

// POST ONE
router.post(
  '/',
  upload.fields([{ name: 'languageName' }, { name: 'logo', maxCount: 1 }]),
  async (req: Request, res: Response) => {
    const { languageName } = req.body;
    const logoURL = `${req.files['logo'][0]['filename']}`;

    console.log({ languageName, logoURL });

    const language = Language.build({ languageName, logo: logoURL });
    console.log('Builded!');
    try {
      console.log('Saving');
      const newLanguage = await language.save();
      console.log('Saved');
      res.status(200).json(newLanguage);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

// PUT ONE
router.put('/:id', getLanguage, async (req: Request, res: Response) => {
  mutateObject(req.body, res.language);

  try {
    const updatedLanguage = await res.language.save();
    res.status(200).json(updatedLanguage);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getLanguage, async (req: Request, res: Response) => {
  try {
    await res.language.remove();
    res.status(200).json({
      message: 'Language has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * Middleware to get the specific language by id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function getLanguage(req: Request, res: Response, next: NextFunction) {
  try {
    const language = await Language.findById(req.params.id);

    res.language = language!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
