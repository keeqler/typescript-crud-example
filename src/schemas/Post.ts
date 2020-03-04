import { Schema, model, Document } from 'mongoose';

interface PostInterface extends Document {
  title: string;
  body: string;
  authorName: string;
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    authorName: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<PostInterface>('Post', PostSchema);
