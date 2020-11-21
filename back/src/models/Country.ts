import { Schema, model, Model, Document } from 'mongoose';

const CountrySchema = new Schema({
  countryName: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ICountry
 */
interface ICountry {
  countryName: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CountryModelInterface
 * @extends {Model<any>}
 */
interface CountryModelInterface extends Model<CountryDoc> {
  build(attr: ICountry): CountryDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CountryDoc
 * @extends {Document}
 */
interface CountryDoc extends Document {
  countryName: string;
}

/**
 * Binging build function to schema
 *
 * @param {ICountry} attr
 * @return {*}
 */
CountrySchema.statics.build = (attr: ICountry) => {
  return new Country(attr);
};

const Country = model<CountryDoc, CountryModelInterface>('Countries', CountrySchema);

export default Country;

export { ICountry, CountryModelInterface, CountryDoc };
