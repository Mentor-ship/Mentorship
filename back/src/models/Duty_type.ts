import { Schema, model, Model, Document } from 'mongoose';

const Duty_typeSchema = new Schema({
  dutyType: {
    type: String,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface IDuty_type
 */
interface IDuty_type {
  dutyType: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface Duty_typeModelInterface
 * @extends {Model<any>}
 */
interface Duty_typeModelInterface extends Model<Duty_typeDoc> {
  build(attr: IDuty_type): Duty_typeDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface Duty_typeDoc
 * @extends {Document}
 */
interface Duty_typeDoc extends Document {
  dutyType: string;
}

/**
 * Binging build function to schema
 *
 * @param {IDuty_type} attr
 * @return {*}
 */
Duty_typeSchema.statics.build = (attr: IDuty_type) => {
  return new Duty_type(attr);
};

const Duty_type = model<Duty_typeDoc, Duty_typeModelInterface>('Duty_types', Duty_typeSchema);

export default Duty_type;

export { IDuty_type, Duty_typeModelInterface, Duty_typeDoc };
