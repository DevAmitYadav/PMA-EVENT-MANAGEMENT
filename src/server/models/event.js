import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    location: String,
    type: { 
      type: String, 
      enum: ['wedding event', 'birthday event', 'corporate event'], 
      required: true 
    },
    image: String,
    createdBy: String,
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
