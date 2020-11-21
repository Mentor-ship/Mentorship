import { Schema, model, Model, Document } from 'mongoose';

const Charge_typeSchema = new Schema({
  chargeType: {
    type: String,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ICharge_type
 */
interface ICharge_type {
  chargeType: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface Charge_typeModelInterface
 * @extends {Model<any>}
 */
interface Charge_typeModelInterface extends Model<Charge_typeDoc> {
  build(attr: ICharge_type): Charge_typeDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface Charge_typeDoc
 * @extends {Document}
 */
interface Charge_typeDoc extends Document {
  chargeType: string;
}

/**
 * Binging build function to schema
 *
 * @param {ICharge_type} attr
 * @return {*}
 */
Charge_typeSchema.statics.build = (attr: ICharge_type) => {
  return new Charge_type(attr);
};

const Charge_type = model<Charge_typeDoc, Charge_typeModelInterface>('Charge_types', Charge_typeSchema);

export default Charge_type;

export { ICharge_type, Charge_typeModelInterface, Charge_typeDoc };
