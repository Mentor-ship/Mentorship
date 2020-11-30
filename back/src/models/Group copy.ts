import { Schema, model, Model, Document } from 'mongoose';

const StudentSchema = new Schema({
  cvId: {
    type: String,
  },
});

/**
 * Interface to make moongoose recognize only these fields
 *
 * @interface IStudent
 */
interface IStudent {
  cvId: string;
}

/**
 * Interface to make mongoose recognize build function
 *
 * @interface StudentModelInterface
 * @extends {Model<any>}
 */
interface StudentModelInterface extends Model<StudentDoc> {
  build(attr: IStudent): StudentDoc;
}
/**
 * Interface to make mongoose recognize docs
 *
 * @interface StudentDoc
 * @extends {Document}
 */
interface StudentDoc extends Document {
  cvId: string;
}

/**
 * Binging build function to schema
 *
 * @param {IStudent} attr
 * @return {*}
 */
StudentSchema.statics.build = (attr: IStudent) => {
  return new Student(attr);
};

const Student = model<StudentDoc, StudentModelInterface>('Students', StudentSchema);

export default Student;

export { IStudent, StudentModelInterface, StudentDoc };
