import { Schema, model, Model, Document } from 'mongoose';

const GroupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface IGroup
 */
interface IGroup {
  groupName: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface GroupModelInterface
 * @extends {Model<any>}
 */
interface GroupModelInterface extends Model<GroupDoc> {
  build(attr: IGroup): GroupDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface GroupDoc
 * @extends {Document}
 */
interface GroupDoc extends Document {
  groupName: string;
}

/**
 * Binging build function to schema
 *
 * @param {IGroup} attr
 * @return {*}
 */
GroupSchema.statics.build = (attr: IGroup) => {
  return new Group(attr);
};

const Group = model<GroupDoc, GroupModelInterface>('Groups', GroupSchema);

export default Group;

export { IGroup, GroupModelInterface, GroupDoc };
