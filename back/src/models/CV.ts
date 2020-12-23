import { Schema, model, Model, Document } from 'mongoose';

const CVSchema = new Schema({
  lastEdit: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ICV
 */
interface ICV {
  lastEdit: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CVModelInterface
 * @extends {Model<any>}
 */
interface CVModelInterface extends Model<CVDoc> {
  build(attr: ICV): CVDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CVDoc
 * @extends {Document}
 */
interface CVDoc extends Document {
  lastEdit: string;
}

/**
 * Binging build function to schema
 *
 * @param {ICV} attr
 * @return {*}
 */
CVSchema.statics.build = (attr: ICV) => {
  return new CV(attr);
};

const CV = model<CVDoc, CVModelInterface>('CVs', CVSchema);

export default CV;

export { ICV, CVModelInterface, CVDoc };
