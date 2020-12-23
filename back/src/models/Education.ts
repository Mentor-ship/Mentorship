import { Schema, model, Model, Document } from 'mongoose';

const EducationSchema = new Schema({
  cvId: {
    type: String,
  },
  instituteId: {
    type: String,
  },
  degree: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  gpa: {
    type: Number,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface IEducation
 */
interface IEducation {
  cvId: string;
  instituteId: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  gpa: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface EducationModelInterface
 * @extends {Model<any>}
 */
interface EducationModelInterface extends Model<EducationDoc> {
  build(attr: IEducation): EducationDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface EducationDoc
 * @extends {Document}
 */
interface EducationDoc extends Document {
  cvId: string;
  instituteId: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  gpa: string;
}

/**
 * Binging build function to schema
 *
 * @param {IEducation} attr
 * @return {*}
 */
EducationSchema.statics.build = (attr: IEducation) => {
  return new Education(attr);
};

const Education = model<EducationDoc, EducationModelInterface>('Educations', EducationSchema);

export default Education;

export { IEducation, EducationModelInterface, EducationDoc };
