import { keys as rKeys } from 'ramda'
import arrayLikeKeys from './arrayLikeKeys'
import concat from './concat'
import isArrayLike from './isArrayLike'
import isMap from './isMap'

/**
 * Returns the keys of the given collection.
 *
 * Supports objects, Maps and array like values. If given an array like value, the indexes will be returned.
 *
 * @function
 * @since v0.0.3
 * @category data
 * @param {*} collection The collection to get the keys from
 * @returns {*} The keys of the given collection
 * @example
 *
 * keys({ foo: 'bar', 'baz': 'bat', bim: 'bop' }) //=> ['foo', 'baz', 'bim']
 * keys({}) //=> []
 *
 * keys(['fi', 'fo', 'fum']) //=> [ 0, 1, 2 ]
 * keys([]) //=> []
 *
 * keys('abc') //=> [0, 1, 2]
 * keys('') //=> []
 */
const keys = (collection) => {
  if (isArrayLike(collection)) {
    return arrayLikeKeys(collection)
  }

  if (isMap(collection)) {
    return Array.from(collection.keys())
  }

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    return Reflect.ownKeys(collection)
  }

  let ownKeys = rKeys(collection)

  if (typeof Object.getOwnPropertySymbols === 'function') {
    ownKeys = concat(ownKeys, Object.getOwnPropertySymbols(collection))
  }

  return ownKeys
}

export default keys