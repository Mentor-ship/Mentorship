import { Schema, model, Model, Document } from 'mongoose';

const Language_levelSchema = new Schema({
  languageLevel: {
    type: String,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ILanguage_level
 */
interface ILanguage_level {
  languageLevel: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface Language_levelModelInterface
 * @extends {Model<any>}
 */
interface Language_levelModelInterface extends Model<Language_levelDoc> {
  build(attr: ILanguage_level): Language_levelDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface Language_levelDoc
 * @extends {Document}
 */
interface Language_levelDoc extends Document {
  languageLevel: string;
}

/**
 * Binging build function to schema
 *
 * @param {ILanguage_level} attr
 * @return {*}
 */
Language_levelSchema.statics.build = (attr: ILanguage_level) => {
  return new Language_level(attr);
};

const Language_level = model<Language_levelDoc, Language_levelModelInterface>('Language_levels', Language_levelSchema);

export default Language_level;

export { ILanguage_level, Language_levelModelInterface, Language_levelDoc };
