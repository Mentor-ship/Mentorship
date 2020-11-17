import { Router, Request, Response, NextFunction } from 'express';
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

// GET ALL
router.get('/', async (req, res) => {
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
router.get('/:id', getLanguage, async (req: Request, res, Response) => {
  res.status(500).send(res.language);
});

// POST ONE
router.post('/', async (req, res) => {
  const { languageName, logo } = req.body;

  const language = Language.build({ languageName, logo });

  try {
    const newLanguage = await language.save();
    res.status(200).json(newLanguage);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// PUT ONE
router.put('/:id', getLanguage, async (req, res) => {
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
