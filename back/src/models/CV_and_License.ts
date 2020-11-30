import { Schema, model, Model, Document } from 'mongoose';

const CV_and_LicenseSchema = new Schema({
  cvId: {
    type: String,
  },
  licenseId: {
    type: String,
  },
  order: {
    type: Number,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ICV_and_License
 */
interface ICV_and_License {
  cvId: string;
  licenseId: String;
  order: Number;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CV_and_LicenseModelInterface
 * @extends {Model<any>}
 */
interface CV_and_LicenseModelInterface extends Model<CV_and_LicenseDoc> {
  build(attr: ICV_and_License): CV_and_LicenseDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CV_and_LicenseDoc
 * @extends {Document}
 */
interface CV_and_LicenseDoc extends Document {
  cvId: string;
  licenseId: String;
  order: Number;
}

/**
 * Binging build function to schema
 *
 * @param {ICV_and_License} attr
 * @return {*}
 */
CV_and_LicenseSchema.statics.build = (attr: ICV_and_License) => {
  return new CV_and_License(attr);
};

const CV_and_License = model<CV_and_LicenseDoc, CV_and_LicenseModelInterface>('CVs_and_Licenses', CV_and_LicenseSchema);

export default CV_and_License;

export { ICV_and_License, CV_and_LicenseModelInterface, CV_and_LicenseDoc };
