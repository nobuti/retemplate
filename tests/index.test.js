import React from 'react'
import renderer from 'react-test-renderer'

import template from '../src'

describe('template', () => {
  it('should return an array of children', () => {
    expect(Array.isArray(template('wadus'))).toBe(true)
  })

  it('should work without data', () => {
    const component = renderer.create(<div>{template('hello')}</div>)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should replace string with data', () => {
    const component = renderer.create(<div>{template('hello {world}', {
      world: 'girl'
    })}</div>)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should replace string with data function result', () => {
    const component = renderer.create(<div>{template('good {time}', {
      time: () => 'morning'
    })}</div>)

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should replace string with data function result', () => {
    const component = renderer.create(<div>{template('hello {world}', {
      world: () => <span>world</span>
    })}</div>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
