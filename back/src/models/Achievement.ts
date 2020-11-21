import { Schema, model, Model, Document } from 'mongoose';

const AchievementSchema = new Schema({
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
 * @interface IAchievement
 */
interface IAchievement {
  achievementName: string;
  achievementDate: Date;
  logo: string;
  tags: [String];
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface AchievementModelInterface
 * @extends {Model<any>}
 */
interface AchievementModelInterface extends Model<AchievementDoc> {
  build(attr: IAchievement): AchievementDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface AchievementDoc
 * @extends {Document}
 */
interface AchievementDoc extends Document {
  achievementName: string;
  achievementDate: Date;
  logo: string;
  tags: [String];
}

/**
 * Binging build function to schema
 *
 * @param {IAchievement} attr
 * @return {*}
 */
AchievementSchema.statics.build = (attr: IAchievement) => {
  return new Achievement(attr);
};

const Achievement = model<AchievementDoc, AchievementModelInterface>('Achievements', AchievementSchema);

export default Achievement;

export { IAchievement, AchievementModelInterface, AchievementDoc };
