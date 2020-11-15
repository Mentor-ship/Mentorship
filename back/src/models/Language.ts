import { Schema, model, Model, Document } from 'mongoose';

const LanguageSchema = new Schema({
  languageName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ILanguage
 */
interface ILanguage {
  languageName: string;
  logo: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface LanguageModelInterface
 * @extends {Model<any>}
 */
interface LanguageModelInterface extends Model<LanguageDoc> {
  build(attr: ILanguage): LanguageDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface LanguageDoc
 * @extends {Document}
 */
interface LanguageDoc extends Document {
  languageName: string;
  logo: string;
}

/**
 * Binging build function to schema
 *
 * @param {ILanguage} attr
 * @return {*}
 */
LanguageSchema.statics.build = (attr: ILanguage) => {
  return new Language(attr);
};

const Language = model<LanguageDoc, LanguageModelInterface>('Languages', LanguageSchema);

export default Language;

export { ILanguage, LanguageModelInterface, LanguageDoc };
