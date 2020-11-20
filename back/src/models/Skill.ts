import { Schema, model, Model, Document } from 'mongoose';

const SkillSchema = new Schema({
  logo: {
    type: String,
    required: true,
  },
  skillName: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ISkill
 */
interface ISkill {
  logo: string;
  skillName: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface SkillModelInterface
 * @extends {Model<any>}
 */
interface SkillModelInterface extends Model<SkillDoc> {
  build(attr: ISkill): SkillDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface SkillDoc
 * @extends {Document}
 */
interface SkillDoc extends Document {
  logo: string;
  skillName: string;
}

/**
 * Binging build function to schema
 *
 * @param {ISkill} attr
 * @return {*}
 */
SkillSchema.statics.build = (attr: ISkill) => {
  return new Skill(attr);
};

const Skill = model<SkillDoc, SkillModelInterface>('skills', SkillSchema);

export default Skill;

export { ISkill, SkillModelInterface, SkillDoc };
