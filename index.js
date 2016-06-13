'use strict'

var isArray = require('lodash.isarray')
var isPlainObject = require('lodash.isplainobject')
var isUndefined = require('lodash.isundefined')

var depopulate = function (schema, src) {
  var dst = {}

  for (var key in src) {
    var path = schema.path(key)

    if (path && path.caster && path.caster.instance === 'ObjectID') {
      if (isArray(src[key])) {
        for (var j = 0; j < src[key].length; ++j) {
          if (typeof src[key][j] === 'object') {
            dst[key] = dst[key] || {}
            dst[key][j] = src[key][j]._id
          }
        }
      } else if (isPlainObject(src[key])) {
        dst[key] = src[key]._id
      }
    } else if (isPlainObject(src[key])) {
      if (path && path.instance === 'ObjectID') {
        dst[key] = src[key]._id
      } else {
        dst[key] = depopulate(src[key])
      }
    }

    if (isUndefined(dst[key])) {
      dst[key] = src[key]
    }
  }

  return dst
}

module.exports = depopulate
