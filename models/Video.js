import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// USER SCHEMA
const videoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    publicUrl: {
      type: String,
      // required: true,
    },
    ctaUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Generating", "Published", "Error"],
      default: "Generating",
    },
    duration: {
      type: Number, // in seconds
      required: false
    },
    conversion: {
      type: Number,
      default: 100
    },
    visits: {
      type: Number,
      default: 0
    },
    // TODO add
    // script: {
    //   type: Array,
    //   required: false,
    // },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
videoSchema.plugin(toJSON);

export default mongoose.models.Video || mongoose.model("Video", videoSchema);
