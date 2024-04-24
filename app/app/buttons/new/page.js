"use client"
import React, { use, useEffect, useState } from 'react';
import TextInput from '@/components/hyperUI/TextInput';
import { toast } from "react-hot-toast";
import Button from '@/components/generic/Button';
import { useRouter } from "next/navigation";
import apiClient from '@/utils/generic/api';
import { useSession } from 'next-auth/react';
import Dropdown from '@/components/hyperUI/Dropdown';

export default function NewResearch() {

	const [researchObject, setResearchObject] = useState({
		title: "",
		recurrence: "One-off",
		status: "Queued",
		config: { 
			criteria: "",
			thingsToAvoid: "",
			howWeHelp: ""
		}
	})

	const [loading, setLoading] = useState(false)
	const [organisationId, setOrganisationId] = useState("")
	const [userId, setUserId] = useState("")

	const router = useRouter();
	
	//GET THE ORGANISATION ID FROM THE USER

	//Fetch the organistionId and populate the text boxes
	useEffect(() => {

		const asyncFunc = async () => {
			const user = await apiClient.get("/user")

			setOrganisationId(user.organisationId)
			setUserId(user.id)

			const organisation = await apiClient.get(`/organisation?id=${user.organisationId}`)
			setResearchObject({...researchObject, config:{...researchObject.config, ...organisation.overview}})
		}

		asyncFunc()
	}, [])

	const kickOffResearch = async () => {
		setLoading(true)
		

		const payload = {
			...researchObject,
			organisationId,
			userId
		}

		apiClient.post("/research", payload)
		.then(() => {
			setLoading(false)
			toast.success("Research initiated");
			router.push("/app/research");
		})
	}

    return (<>
		<div className='h-full w-full'>
			<div className='h-full w-full flex flex-col items-center'>
				<div className='flex flex-col justify-start p-4 h-full max-w-2xl w-full'> {/* keeps content centered */}
					<div className='text-3xl mb-4'>Kick off new research</div>
					<div className='mb-4'>
						<TextInput 
							label="What do you want to title this research?" 
							placeholder="e.g. High growth healthcare startups"
							value={researchObject.title}
							onChange={(e) => setResearchObject({...researchObject, title: e.target.value})}
						/>
					</div>
					<div className='mb-4'>
						<Dropdown label="How often should this research be repeated?" options={["One-off", "Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]} value={researchObject.recurrence} setValue={(recurrence)=>setResearchObject({...researchObject, recurrence})} />
					</div>
					<div className='mb-4'>
						<TextInput 
							multiline 
							label="What criteria must a company meet for you to consider investing? (Prepopulated based on thesis)"
							placeholder="Describe what standards a company must meet for you to consider investing"
							value={researchObject.config.criteria}
							onChange={(e)=>setResearchObject({ ...researchObject, config: { ...researchObject.config, criteria: e.target.value } })}
							rows={3}
						/>
					</div>
					<div className='mb-4'>
						<TextInput 
							multiline 
							label="What do you avoid?" 
							placeholder="Describe anything that you are completely uninterested in investing in"
							value={researchObject.config.thingsToAvoid}
							onChange={(e)=>setResearchObject({ ...researchObject, config: { ...researchObject.config, thingsToAvoid: e.target.value } })}
							rows={3}
						/>
					</div>
					<div className='mb-4'>
						<TextInput 
							multiline 
							label="Describe how you best help companies" 
							placeholder="Describe what principles guide your firm's investments"
							value={researchObject.config.howWeHelp}
							onChange={(e)=>setResearchObject({ ...researchObject, config: { ...researchObject.config, howWeHelp: e.target.value } })}
							rows={3}
						/>
					</div>
					<div className='flex justify-between w-full flex-row-reverse'>
						<Button onClick={kickOffResearch} loading={loading}>Initiate Research</Button>
					</div>
				</div>
			</div>
		</div>
	</>
  );
}