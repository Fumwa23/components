const sdk = require('api')('@d-id/v4.2.0#bk13ostlri055d9');

sdk.auth(process.env.D_ID_API_KEY);

export const createTalk = async ({script, img_path }) => {
    const response = await sdk.createTalk(
        {
            source_url: img_path,
            script: {
                type: 'text',
                subtitles: 'false',
                provider: {type: 'elevenlabs', voice_id: 'kbTjcdkU1uz7BDKgRTMZ'},
                ssml: 'false',
                input: script,
            },
            config: {
                fluent: 'false', 
                pad_audio: '0.0',
                stitch: true
            }
        },
        {'x-api-key-external': JSON.stringify({elevenlabs: process.env.ELEVENLABS_API_KEY})}
    )
    return response.data.id
}


// export const createClip = async ({script}) => {
//     // FYI ONLY WORKS WITH PRE-SET PRESENTERS (use createTalk instead for custom presenter)

//     const response = await sdk.createClip(
//         {
//             presenter_id: "rian-lZC6MmWfC1",
//             script: {
//                 type: 'text',
//                 // subtitles: 'false',
//                 provider: {type: 'elevenlabs', voice_id: '21m00Tcm4TlvDq8ikWAM'},
//                 ssml: 'false',
//                 input: script,
//             },
//             config: {result_format: 'mp4'},
//             presenter_config: {crop: {type: 'rectangle', rectangle: {bottom: 1.0, top: 0.0, left: 0.0, right: 1.0}}},
//         }, 
//         // {'x-api-key-external': process.env.ELEVENLABS_API_KEY}
//     )

//     console.log(response)
//     return response
// }

export const retrieveDIDVideoURLById = async (id) => {
    const response = await sdk.getTalk({id})
    // console.log('D-ID video:', response)
    const videoURL = response.data.result_url
    return videoURL
}