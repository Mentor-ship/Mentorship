import { Schema, model, Model, Document } from 'mongoose';

const LicenseSchema = new Schema({
  logo: {
    type: String,
  },
  licenseDate: {
    type: Date,
  },
  licenseName: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ILicense
 */
interface ILicense {
  logo: string;
  licenseDate: Date;
  licenseName: string;
  tags: [String];
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface LicenseModelInterface
 * @extends {Model<any>}
 */
interface LicenseModelInterface extends Model<LicenseDoc> {
  build(attr: ILicense): LicenseDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface LicenseDoc
 * @extends {Document}
 */
interface LicenseDoc extends Document {
  logo: string;
  licenseDate: Date;
  licenseName: string;
  tags: [String];
}

/**
 * Binging build function to schema
 *
 * @param {ILicense} attr
 * @return {*}
 */
LicenseSchema.statics.build = (attr: ILicense) => {
  return new License(attr);
};

const License = model<LicenseDoc, LicenseModelInterface>('Licenses', LicenseSchema);

export default License;

export { ILicense, LicenseModelInterface, LicenseDoc };
