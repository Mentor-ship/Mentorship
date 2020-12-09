import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';
import path from 'path';

import Currency, { CurrencyDoc } from '../models/Currency';
import mutateObject from '../utils/mutateObject';
import { deleteImage } from './ImageRouter';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      currency: CurrencyDoc;
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
    const currencies = await Currency.find();
    res.status(200).json(currencies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCurrency, async (req: Request, res: Response) => {
  res.status(500).send(res.currency);
});

// POST ONE
router.post(
  '/',
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'instituteName' }]),
  async (req: Request, res: Response) => {
    const { currencyName } = req.body;

    let logo;
    if (!req.files['logo']) {
      logo = '';
      if (req.body.logo) logo = req.body.logo;
    } else {
      logo = req.files['logo'][0]['filename'];
    }

    const currency = Currency.build({ currencyName, logo });
    try {
      const newCurrency = await currency.save();
      res.status(200).json(newCurrency);
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
  [getCurrency, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'instituteName' }])],
  async (req: Request, res: Response) => {
    deleteImage(res.currency.logo);
    mutateObject(req.body, res.currency);

    if (req.files['logo']) {
      res.currency.logo = req.files['logo'][0]['filename'];
    }

    try {
      const updatedCurrency = await res.currency.save();
      res.status(200).json(updatedCurrency);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
);

// DELETE ONE
router.delete('/:id', getCurrency, async (req: Request, res: Response) => {
  try {
    deleteImage(res.currency.logo);
    await res.currency.remove();
    res.status(200).json({
      message: 'Currency has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * Middleware to get the specific Currency by id
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
async function getCurrency(req: Request, res: Response, next: NextFunction) {
  try {
    const currency = await Currency.findById(req.params.id);

    res.currency = currency!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
