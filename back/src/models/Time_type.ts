import { Schema, model, Model, Document } from 'mongoose';

const Time_typeSchema = new Schema({
  timeType: {
    type: String,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ITime_type
 */
interface ITime_type {
  timeType: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface Time_typeModelInterface
 * @extends {Model<any>}
 */
interface Time_typeModelInterface extends Model<Time_typeDoc> {
  build(attr: ITime_type): Time_typeDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface Time_typeDoc
 * @extends {Document}
 */
interface Time_typeDoc extends Document {
  timeType: string;
}

/**
 * Binging build function to schema
 *
 * @param {ITime_type} attr
 * @return {*}
 */
Time_typeSchema.statics.build = (attr: ITime_type) => {
  return new Time_type(attr);
};

const Time_type = model<Time_typeDoc, Time_typeModelInterface>('Time_types', Time_typeSchema);

export default Time_type;

export { ITime_type, Time_typeModelInterface, Time_typeDoc };
