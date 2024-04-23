import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import { NearMe } from "@mui/icons-material";


// name
// recurrence
// status
// timestamp
// userId
// organisationId
//

const researchSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            lowercase: false, 
            required: true
        },
        recurrence: {
            type: String,
            trim: true,
            lowercase: false, 
            required: true
        },
        status: {
            type: String,
            trim: true,
            lowercase: false, 
            required: true
        },
        config: {
            type: Object,
            required: true
        },
        organisationId: {
            type: String,
            trim: true,
            lowercase: false,
            required: true,
        },
        userId: {
            type: String,
            trim: true,
            lowercase: false,
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

// add plugin that converts mongoose to json
researchSchema.plugin(toJSON);

export default mongoose.models.Research || mongoose.model("Research", researchSchema);