import { Schema, model, Model, Document } from 'mongoose';

const CV_and_ExperienceSchema = new Schema({
  cvId: {
    type: String,
  },
  experienceId: {
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
 * @interface ICV_and_Experience
 */
interface ICV_and_Experience {
  cvId: string;
  experienceId: string;
  order: number;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CV_and_ExperienceModelInterface
 * @extends {Model<any>}
 */
interface CV_and_ExperienceModelInterface extends Model<CV_and_ExperienceDoc> {
  build(attr: ICV_and_Experience): CV_and_ExperienceDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CV_and_ExperienceDoc
 * @extends {Document}
 */
interface CV_and_ExperienceDoc extends Document {
  cvId: string;
  experienceId: string;
  order: number;
}

/**
 * Binging build function to schema
 *
 * @param {ICV_and_Experience} attr
 * @return {*}
 */
CV_and_ExperienceSchema.statics.build = (attr: ICV_and_Experience) => {
  return new CV_and_Experience(attr);
};

const CV_and_Experience = model<CV_and_ExperienceDoc, CV_and_ExperienceModelInterface>(
  'CVs_and_Experiences',
  CV_and_ExperienceSchema,
);

export default CV_and_Experience;

export { ICV_and_Experience, CV_and_ExperienceModelInterface, CV_and_ExperienceDoc };
