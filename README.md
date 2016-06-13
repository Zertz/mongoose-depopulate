# mongoose-depopulate [![Build Status](https://travis-ci.org/Zertz/mongoose-depopulate.png)](https://travis-ci.org/Zertz/mongoose-depopulate) [![NPM version](https://badge.fury.io/js/mongoose-depopulate.png)](http://badge.fury.io/js/mongoose-depopulate)

> Depopulate an object from a mongoose model

```js
npm install --save mongoose-depopulate
```

## Usage

```js
const depopulate = require('mongoose-depopulate')
const mongoose = require('mongoose')

const Base = mongoose.model('Base', new mongoose.Schema({
  ref: { type: mongoose.Schema.Types.ObjectId, ref: 'Reference' }
}))

const Reference = mongoose.model('Reference', new mongoose.Schema({
  name: { type: String }
}))

const base = new Base({
  ref: new Reference({
    name: 'name'
  })
})

depopulate(Base.schema, doc.toObject())

//= { _id: "...", ref: "..." }
```



## License

MIT © [Pier-Luc Gendreau](https://github.com/Zertz)
