# retemplate

A template utility to replace string with react children

# Usage

```
import t from 'retemplate'

render() {
  return <div>{t(someString, {
    name: 'Wadus',
    user: () => <span>Jane</span>
  })}</div>
}

```
