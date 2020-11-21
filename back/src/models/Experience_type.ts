import { Schema, model, Model, Document } from 'mongoose';

const Experience_typeSchema = new Schema({
  experienceType: {
    type: String,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface IExperience_type
 */
interface IExperience_type {
  experienceType: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface Experience_typeModelInterface
 * @extends {Model<any>}
 */
interface Experience_typeModelInterface extends Model<Experience_typeDoc> {
  build(attr: IExperience_type): Experience_typeDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface Experience_typeDoc
 * @extends {Document}
 */
interface Experience_typeDoc extends Document {
  experienceType: string;
}

/**
 * Binging build function to schema
 *
 * @param {IExperience_type} attr
 * @return {*}
 */
Experience_typeSchema.statics.build = (attr: IExperience_type) => {
  return new Experience_type(attr);
};

const Experience_type = model<Experience_typeDoc, Experience_typeModelInterface>(
  'Experience_types',
  Experience_typeSchema,
);

export default Experience_type;

export { IExperience_type, Experience_typeModelInterface, Experience_typeDoc };
