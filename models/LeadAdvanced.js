import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// LEAD SCHEMA is used to store the leads that are generated from the landing page.
// You would use this if your product isn't ready yet and you want to collect emails
// The <ButtonLead /> component & the /api/lead route are used to collect the emails
const leadAdvancedSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      private: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
leadAdvancedSchema.plugin(toJSON);

export default mongoose.models.LeadAdvanced || mongoose.model("LeadAdvanced", leadAdvancedSchema);
