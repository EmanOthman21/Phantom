import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const Topic = new Schema({
  name: String,
  followers: [mongoose.Types.ObjectId],
  description: String,
  pins: [mongoose.Types.ObjectId],
  imageWidth: Number,
  imageHeight: Number,
  recommendedUsers: [mongoose.Types.ObjectId],
  imageId: String,
});
