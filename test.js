import test from 'ava'
import mongoose from 'mongoose'
import depopulate from './'

const Schema = new mongoose.Schema({
  ref: { type: mongoose.Schema.Types.ObjectId, ref: 'Reference' },
  refs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reference' }],
  very: {
    deep: {
      ref: { type: mongoose.Schema.Types.ObjectId, ref: 'Reference' }
    }
  }
})

test('depopulates ref', (t) => {
  const ref = {
    _id: 'objectid',
    name: 'name'
  }

  const doc = {
    ref: ref,
    refs: [ref, ref],
    very: {
      deep: {
        ref: ref
      }
    }
  }

  t.deepEqual(depopulate(Schema, doc), {
    ref: ref._id,
    refs: [ref._id, ref._id],
    very: {
      deep: {
        ref: ref._id
      }
    }
  })
})
