import { Schema, model, Model, Document } from 'mongoose';

const ExperienceSchema = new Schema({
  companyId: {
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
  tags: {
    type: [String],
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface IExperience
 */
interface IExperience {
  companyId: string;
  startDate: Date;
  endDate: Date;
  tags: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface ExperienceModelInterface
 * @extends {Model<any>}
 */
interface ExperienceModelInterface extends Model<ExperienceDoc> {
  build(attr: IExperience): ExperienceDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface ExperienceDoc
 * @extends {Document}
 */
interface ExperienceDoc extends Document {
  companyId: string;
  startDate: Date;
  endDate: Date;
  tags: string;
}

/**
 * Binging build function to schema
 *
 * @param {IExperience} attr
 * @return {*}
 */
ExperienceSchema.statics.build = (attr: IExperience) => {
  return new Experience(attr);
};

const Experience = model<ExperienceDoc, ExperienceModelInterface>('Experiences', ExperienceSchema);

export default Experience;

export { IExperience, ExperienceModelInterface, ExperienceDoc };
