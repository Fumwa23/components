import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// {
//     name: "parapet",
//     overview: 
//     {
//         thesis: "hello",
//         investmentCriteria: "",
//         thingsToAvoid: "",
//         -------
//         maxSeedFunding, min employees, minimimum preferred CEO age, sector, etc. etc. etc.        
//     }
// }

const organisationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: false,
      required: true,
    },
    overview: {
        type: Object,
        trim: true,
        lowercase: false,
        required: true
    }
  },
  {
    timestamps: false,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
organisationSchema.plugin(toJSON);

export default mongoose.models.Organisation || mongoose.model("Organisation", organisationSchema);