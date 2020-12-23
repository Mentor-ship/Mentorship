import { Schema, model, Model, Document } from 'mongoose';

const CV_and_AchievementSchema = new Schema({
  cvId: {
    type: String,
  },
  achievementId: {
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
 * @interface ICV_and_Achievement
 */
interface ICV_and_Achievement {
  cvId: string;
  achievementId: string;
  order: number;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CV_and_AchievementModelInterface
 * @extends {Model<any>}
 */
interface CV_and_AchievementModelInterface extends Model<CV_and_AchievementDoc> {
  build(attr: ICV_and_Achievement): CV_and_AchievementDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CV_and_AchievementDoc
 * @extends {Document}
 */
interface CV_and_AchievementDoc extends Document {
  cvId: string;
  achievementId: string;
  order: number;
}

/**
 * Binging build function to schema
 *
 * @param {ICV_and_Achievement} attr
 * @return {*}
 */
CV_and_AchievementSchema.statics.build = (attr: ICV_and_Achievement) => {
  return new CV_and_Achievement(attr);
};

const CV_and_Achievement = model<CV_and_AchievementDoc, CV_and_AchievementModelInterface>(
  'CVs_and_Achievements',
  CV_and_AchievementSchema,
);

export default CV_and_Achievement;

export { ICV_and_Achievement, CV_and_AchievementModelInterface, CV_and_AchievementDoc };
