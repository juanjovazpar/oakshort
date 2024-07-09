import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  accessCount: { type: Number, default: 0 },
});

export default mongoose.model('URL', schema);
