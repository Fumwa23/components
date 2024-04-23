import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import { Int32 } from "mongodb";

// EXAMPLE OF DATA ENTRY
// {
//     "_id": "sldkfljandflka",
//     "name": "ANYbotics", 
//     "data": {
//         "tagline": "We can make ANY robot and it will be amazing."
//         "companySummary": "ANYbotics, a Swiss startup founded in 2016 and a spinout from ETH Zurich, develops four-legged autonomous robots for industrial use. These robots, including their first product ANYmal, are used for inspection in hazardous environments in sectors like oil and gas, mining, and chemicals. Their innovative approach includes thermographic imaging and gas detection sensors. The company has recently raised $50m in Series B funding to fulfill product preorders and expand to new markets, with plans to grow their team significantly."
//         "age": "8",
//         "headcount": "10"
//         "estimatedRevenue": "unknown",
//         "estimatedInvestment": "$50m",
//         "updatesSinceLastChecked": "1",
//         "funding": [
//             {
//                 "amount": "4 million",
//                 "timestamp": "8/12/2023"
//                 "source": "Y Combinator"
//             },
//             {
//                 "amount": "1 million",
//                 "timestamp": "8/6/2022"
//                 "source": "Y Combinator"
//             },
//         ],
//         "team": [
//              {
//                  "name": "Péter Fankhauser",
//                  "title": "CEO and Co-Founder",
//                  "age": "35"
//                  "email": "unknown",
//                  "phoneNumber": "unknown"
//              }
//          ],
//          "keyEvents": [
//              {
//                 "event":"raised $50m in Series B funding",
//                 "timestamp": "2023"
//              },
//          ],
//     },
//     "portfolioScore": 4 // out of 10, based on relevance to our investment thesis
//     "portfolioScoreReason": "ANYbotics, specializing in autonomous robots for industrial inspection, diverges from our core investment thesis centered on healthcare, biohacking, supplements, and longevity. Despite its technological innovation and growth potential, its focus on industrial applications limits its relevance to our investment criteria.",
//     "researchId": "ald29k39h9472h2k39",
//     "flagged": "a",
//     "createdAt": 23-02-1341
// }

const dealSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    portfolioScore: {
      type: String,
      required: true
    },
    portfolioScoreReason: {
        type: String,
        trim: true,
        lowercase: false,
        required: true
    },
    researchId: {
        type: String,
        trim: true,
        lowercase: false,
        required: true
    },
    flagged: {
      type: String, 
      trim: true,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
dealSchema.plugin(toJSON);

export default mongoose.models.Deal || mongoose.model("Deal", dealSchema);