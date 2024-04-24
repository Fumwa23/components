"use client"
import React, { use, useEffect, useState } from 'react';
import apiClient from '@/utils/generic/api';
// import Button from '@/components/hyperUI/Button';
import TextInput from '@/components/hyperUI/TextInput';
import Stepper from '@/components/hyperUI/Stepper';
import { useRouter } from "next/navigation";
import { set } from 'mongoose';
import { toast } from "react-hot-toast";
import Button from '@/components/generic/Button';
import { useSession } from 'next-auth/react';

export default function CreatePage() {

	const [loading, setLoading] = useState(false)
	const [overviewConfig, setOverviewConfig] = useState({
		criteria: "",
		thingsToAvoid: "",
		howWeHelp: ""
	})
	const [organisationId, setOrganisationId] = useState("")

	//Fetch the organistionId and populate the text boxes
	useEffect(() => {
		console.log("running")

		const asyncFunc = async () => {
			const user = await apiClient.get("/user")

			setOrganisationId(user.organisationId)

			const organisation = await apiClient.get(`/organisation?id=${user.organisationId}`)
			setOverviewConfig({...overviewConfig, ...organisation.overview})
		}

		//asyncFunc()
	}, [])

	const save = async () => {
		setLoading(true)


		const payload = {
			id: organisationId == "" ? console.log("ERROR: organisationId not found") : organisationId,
			overview: overviewConfig
		}
		apiClient.put("/organisation", payload)
		.then(() => {
			setLoading(false)
			toast.success("Investment Criteria Saved");
		}, 2000)
	}

    return (<>
		<div className='h-full w-full'>
			<div className='h-full w-full flex flex-col items-center'>
				<div className='flex flex-col justify-start p-4 h-full max-w-2xl w-full'> {/* keeps content centered */}
					<div className='text-3xl mb-4'>Your Investment Criteria</div>
					<div className='mb-4'>
						<TextInput 
							multiline 
							label="What criteria must a company meet for you to consider investing?"
							placeholder="Describe what standards a company must meet for you to consider investing"
							value={overviewConfig.criteria}
							onChange={(e)=>setOverviewConfig({...overviewConfig, criteria: e.target.value})}
							rows={6}
						/>
					</div>
					<div className='mb-4'>
						<TextInput 
							multiline 
							label="What do you avoid?" 
							placeholder="Describe anything that you are completely uninterested in investing in"
							value={overviewConfig.thingsToAvoid}
							onChange={(e)=>setOverviewConfig({...overviewConfig, thingsToAvoid: e.target.value})}
							rows={4}
						/>
					</div>
					<div className='mb-4'>
						<TextInput 
							multiline 
							label="Describe how you best help companies" 
							placeholder="Describe what principles guide your firm's investments"
							value={overviewConfig.howWeHelp}
							onChange={(e)=>setOverviewConfig({...overviewConfig, howWeHelp: e.target.value})}
							rows={6}
						/>
					</div>
					<div className='flex justify-between w-full flex-row-reverse'>
						<Button onClick={save} loading={loading}>Save</Button>
					</div>
				</div>
			</div>
		</div>
	</>
  );
}