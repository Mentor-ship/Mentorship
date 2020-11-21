import { Schema, model, Model, Document } from 'mongoose';

const CV_and_LanguageSchema = new Schema({
  cvId: {
    type: String,
  },
  languageId: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
  languageLevelId: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ICV_and_Language
 */
interface ICV_and_Language {
  cvId: string;
  languageId: string;
  order: number;
  languageLevelId: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CV_and_LanguageModelInterface
 * @extends {Model<any>}
 */
interface CV_and_LanguageModelInterface extends Model<CV_and_LanguageDoc> {
  build(attr: ICV_and_Language): CV_and_LanguageDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CV_and_LanguageDoc
 * @extends {Document}
 */
interface CV_and_LanguageDoc extends Document {
  cvId: string;
  languageId: string;
  order: number;
  languageLevelId: string;
}

/**
 * Binging build function to schema
 *
 * @param {ICV_and_Language} attr
 * @return {*}
 */
CV_and_LanguageSchema.statics.build = (attr: ICV_and_Language) => {
  return new CV_and_Language(attr);
};

const CV_and_Language = model<CV_and_LanguageDoc, CV_and_LanguageModelInterface>(
  'CVs_and_Languages',
  CV_and_LanguageSchema,
);

export default CV_and_Language;

export { ICV_and_Language, CV_and_LanguageModelInterface, CV_and_LanguageDoc };
