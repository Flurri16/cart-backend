import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    cost: {type: Number, required: true, default: 0},
    imgUrl: {type: String}
}, {timestamps: true})
export default mongoose.model('Item', UserSchema)