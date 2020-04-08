import mongoose from 'mongoose'

const order = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  img: {
    type: Object,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
})

export default mongoose.model('order', order)
