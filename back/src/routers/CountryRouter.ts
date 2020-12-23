import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

import Country, { CountryDoc } from '../models/Country';
import mutateObject from '../utils/mutateObject';

// Initializing router
const router: Router = Router();

// Declaring new namespace for Response
declare global {
  namespace Express {
    interface Response {
      country: CountryDoc;
    }
  }
}

// GET ALL
router.get('/', async (_, res: Response) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ONE
router.get('/:id', getCountry, async (req: Request, res: Response) => {
  res.status(500).send(res.institution);
});

// POST ONE
router.post('/', async (req: Request, res: Response) => {
  const { countryName } = req.body;
  const country = Country.build({ countryName });
  try {
    const newCountry = await country.save();
    res.status(200).json(newCountry);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE ONE
router.delete('/:id', getCountry, async (req: Request, res: Response) => {
  try {
    await res.country.remove();
    res.status(200).json({
      message: 'Country has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//PUT ONE
router.put('/:id', [getCountry], async (req: Request, res: Response) => {
  mutateObject(req.body, res.country);
  try {
    const updatedCountry = await res.country.save();
    res.status(200).json(updatedCountry);
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
async function getCountry(req: Request, res: Response, next: NextFunction) {
  try {
    const country = await Country.findById(req.params.id);

    res.country = country!;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export default router;
