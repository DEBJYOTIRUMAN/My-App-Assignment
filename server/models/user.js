import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema, 'users');