import { NextResponse } from "next/server";
import { gptRequest } from "@/utils/generic/ai";
import { text } from "stream/consumers";
import { generateVideoFromScript } from "@/utils/generic/ai/heygen";
const https = require('https');
const cheerio = require('cheerio');
const axios = require("axios");
import { createTalk } from "@/utils/generic/ai/d-id";
import framework from "@/data/videoFrameworks/5-minute-perfect-webinar"; // TODO move to pass in from api body or something

export async function POST(req) {
	console.log('getting website')
	
	const body = await req.json();

	let webpageContent = await fetch(body.customerWebsiteUrl);
	webpageContent = await webpageContent.text()
	// console.log(webpageContent)
	// TODO use puppeteer to work for dynamic websites
	// TODO evaluate other scraping options listed here
	const $ = cheerio.load(webpageContent)
	webpageContent = $('html').prop('innerText')
	webpageContent = webpageContent.replace(/\s+/g, ' ')
	console.log('got website HTML')

	const outlinePrompt = `I need your help designing a video webinar that follow the following framework:
${framework.map((f, idx) => {
	return `${idx}. ${f.section}: ${f.prompt}` + (f.example ? ` (example: ${f.example})` : '')
}).join('\n')}


At this stage, we just need a sentence or two describing the idea for each of these sections. We will work on the details later.

Respond with a JSON dictionary that has the following schema:
${framework.map((f, idx) => {
	return `"${f.section}": string`
}).join('\n')}

Customer's website:
${webpageContent}
`
	let response = await gptRequest({
		messages: [{role: 'user', content: outlinePrompt}], 
		json: true,
		model: "gpt-4-1106-preview"
	})
	console.log(response)
	// parse json
	response = JSON.parse(response)

	// for each key
	let script = [];
	let sectionResponse;
	let section;
	for (const [key, value] of Object.entries(response)) {
		let sectionPrompt = `I need your help writing the script for a video sales webinar.

Here is the framework I am following:
${framework.map((f, idx) => {
	return `${idx}. ${f.section}: ${f.prompt}`
}).join('\n')}

Now, I need you to write the script for the section: ${key}.
The idea behind this section is: ${value}

Please write a word-by word script for this section. 
The script for each section should be less than 30 seconds long.

DO NOT include anything except for exactly what you want me to say as this will be transcribed exactly.
DO NOT comment on the script or include any notes.
DO NOT say anything along the lines of "Certainly, here is a script"!
DO NOT include [END SCRIPT] or [START SCRIPT] or anything like that.
ANYTHING that you respond with will be said aloud in the video, so it is extremely important that you only include exactly what you want me to say.
If you include anything other than the exact words to say, the company will lose millions of dollars in sales.
`
		sectionResponse = await gptRequest({
			messages: [{role: 'user', content: sectionPrompt}], 
			model: "gpt-4-1106-preview"
		})
		section = {
			section: key,
			prompt: value,
			response: sectionResponse
		}
		script.push(section)
	}

	console.log(script)

	return NextResponse.json({script}, { status: 200 });
}