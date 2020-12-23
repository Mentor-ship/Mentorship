import { Schema, model, Model, Document } from 'mongoose';

const CurrencySchema = new Schema({
  currencyName: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ICurrency
 */
interface ICurrency {
  currencyName: string;
  logo: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CurrencyModelInterface
 * @extends {Model<any>}
 */
interface CurrencyModelInterface extends Model<CurrencyDoc> {
  build(attr: ICurrency): CurrencyDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CurrencyDoc
 * @extends {Document}
 */
interface CurrencyDoc extends Document {
  currencyName: string;
  logo: string;
}

/**
 * Binging build function to schema
 *
 * @param {ICurrency} attr
 * @return {*}
 */
CurrencySchema.statics.build = (attr: ICurrency) => {
  return new Currency(attr);
};

const Currency = model<CurrencyDoc, CurrencyModelInterface>('Currencies', CurrencySchema);

export default Currency;

export { ICurrency, CurrencyModelInterface, CurrencyDoc };
