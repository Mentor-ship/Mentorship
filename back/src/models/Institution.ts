import { Schema, model, Model, Document } from 'mongoose';

const InstitutionSchema = new Schema({
  logo: {
    type: String,
    required: true,
  },
  instituteName: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface IInstitution
 */
interface IInstitution {
  logo: string;
  instituteName: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface InstitutionModelInterface
 * @extends {Model<any>}
 */
interface InstitutionModelInterface extends Model<InstitutionDoc> {
  build(attr: IInstitution): InstitutionDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface InstitutionDoc
 * @extends {Document}
 */
interface InstitutionDoc extends Document {
  logo: string;
  instituteName: string;
}

/**
 * Binging build function to schema
 *
 * @param {IInstitution} attr
 * @return {*}
 */
InstitutionSchema.statics.build = (attr: IInstitution) => {
  return new Institution(attr);
};

const Institution = model<InstitutionDoc, InstitutionModelInterface>('Institutions', InstitutionSchema);

export default Institution;

export { IInstitution, InstitutionModelInterface, InstitutionDoc };
