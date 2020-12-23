import { Schema, model, Model, Document } from 'mongoose';

const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface ICategory
 */
interface ICategory {
  categoryName: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface CategoryModelInterface
 * @extends {Model<any>}
 */
interface CategoryModelInterface extends Model<CategoryDoc> {
  build(attr: ICategory): CategoryDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface CategoryDoc
 * @extends {Document}
 */
interface CategoryDoc extends Document {
  categoryName: string;
}

/**
 * Binging build function to schema
 *
 * @param {ICategory} attr
 * @return {*}
 */
CategorySchema.statics.build = (attr: ICategory) => {
  return new Category(attr);
};

const Category = model<CategoryDoc, CategoryModelInterface>('Categories', CategorySchema);

export default Category;

export { ICategory, CategoryModelInterface, CategoryDoc };
