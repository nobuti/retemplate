# retemplate

A template utility to replace strings with jsx elements.

Given a string, replace every {key} with the data[key] passed. This can be a function returning a
string or a raw string. The result will be an array of strings mixed with jsx elements. The primary
use case is similar to using String.prototype.replace except for React.

# Usage

```
import template from '@nobuti/retemplate'

render() { 
  return (
    <div>
      {template("hola {mundo} cruel {mundo} foo {wadus}", { 
        mundo: () => <span>mundo</span>, 
        wadus: "foo" 
      })}
    </div>
  )
}

```
