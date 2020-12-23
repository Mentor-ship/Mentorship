/**
 * Takes mutable object and changes all its field to fields provided by mutating object
 *
 * @export
 * @param {Object} mutating
 * @param {Object} mutable
 */
export default function mutateObject(mutating: Object, mutable: Object) {
  for (const field in mutable) {
    if (field !== '_id' && field !== '__v') {
      if (mutating[field] && mutating[field] !== '') {
        mutable[field] = mutating[field];
      }
    }
  }
}
