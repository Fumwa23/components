import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const personaSchema = mongoose.Schema(
  {
    sysMsg: {
      type: String,
      trim: true,
      lowercase: false,
      required: true,
    },
    imgURL: {
        type: String,
        trim: true,
        lowercase: false,
        required: true
    },
    voice: {
        type: String,
        trim: true,
        lowercase: false,
        required: true
    },
    title: {
        type: String,
        trim: true,
        lowercase: false,
        required: true
    },
    speakFirst: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
personaSchema.plugin(toJSON);

export default mongoose.models.Persona || mongoose.model("Persona", personaSchema);