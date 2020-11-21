import { Schema, model, Model, Document } from 'mongoose';

const ExperienceSchema = new Schema({
  achievementName: {
    type: String,
    required: true,
  },
  achievementDate: {
    type: Date,
  },
  logo: {
    type: String,
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
  achievementName: string;
  achievementDate: Date;
  logo: string;
  tags: [String];
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
  achievementName: string;
  achievementDate: Date;
  logo: string;
  tags: [String];
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
