import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  detail: {
    type: Array,
    required: true
  },
  cartNo: {
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
  }
})

export default mongoose.model('Cart', CartSchema)
