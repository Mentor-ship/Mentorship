import { Schema, model, Model, Document } from 'mongoose';

const CV_and_SkillSchema = new Schema({
  cvId: {
    type: String,
  },
  skillId: {
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
 * @interface ICV_and_Skill
 */
interface ICV_and_Skill {
  cvId: string;
  skillId: string;
  order: number;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CV_and_SkillModelInterface
 * @extends {Model<any>}
 */
interface CV_and_SkillModelInterface extends Model<CV_and_SkillDoc> {
  build(attr: ICV_and_Skill): CV_and_SkillDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CV_and_SkillDoc
 * @extends {Document}
 */
interface CV_and_SkillDoc extends Document {
  cvId: string;
  skillId: string;
  order: number;
}
}

/**
 * Binging build function to schema
 *
 * @param {ICV_and_Skill} attr
 * @return {*}
 */
CV_and_SkillSchema.statics.build = (attr: ICV_and_Skill) => {
  return new CV_and_Skill(attr);
};

const CV_and_Skill = model<CV_and_SkillDoc, CV_and_SkillModelInterface>('CVs_and_Skills', CV_and_SkillSchema);

export default CV_and_Skill;

export { ICV_and_Skill, CV_and_SkillModelInterface, CV_and_SkillDoc };
