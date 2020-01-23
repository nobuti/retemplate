import { Children } from 'react'

/*
 * Given a string, replace every {key} with the data[key] passed. This can be a function returning a
 * string or a raw string. The result will be an array of strings mixed with jsx elements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * Example:
 * template("hola {mundo} cruel {mundo} foo {wadus}", { mundo: () => "<span>mundo</span>", wadus: "foo" })
 *
 */

function insert (arr, index, ...items) {
  return [...arr.slice(0, index), ...items, ...arr.slice(index)]
}

const flat = arr => [].concat(...arr)

const replace = (result, match, data) => {
  for (let index = 1; index < result.length; index += 2) {
    const datum = data[match]
    const item = typeof datum === 'function' ? datum() : datum
    result = insert(result, index, item)
  }

  return result
}

export default (locale, data = {}) => {
  let str = [locale]

  Object.keys(data).forEach(key => {
    const re = new RegExp('{' + key + '}', 'g')
    str = flat(str).map(x => {
      if (typeof x === 'string') {
        const arr = x.split(re)
        const result = replace(arr, key, data)
        return result
      }

      return x
    })
  })

  const children = flat(str).filter(s => !!s)
  return Children.map(children, child => child)
}
