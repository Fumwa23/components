'use client'
import Card from '@/components/hyperUI/Card';
import Button from '@/components/generic/Button';
import { getStyledStatus, getStatusIcon } from '@/utils/researchStatusUtils';
import { Layers as LayersIcon, Plus as AddIcon, Repeat as RepeatIcon, Check as CheckIcon, AlertTriangle as AlertTriangleIcon, Calendar as CalendarIcon } from "react-feather";
import { useState, useEffect } from 'react';
import apiClient from '@/utils/generic/api';

const iconProps = {size: 20}

// const getMyVideos = async () => {
//     await connectMongo();
//     const session = await getServerSession(authOptions)
//     const userId = session.user.id
//     // find all with userId
//     return await Video.find({ userId })
// }

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('/');
};

export default function CreatePage() {

	//Fake info for DEMO
	const [researches, setResearches] = useState([
		// {
		// 	id: 1,
		// 	title: "High growth healthcare startups",
		// 	description: "This is a description of the research",
		// 	conversion: 20,
		// 	visits: 100,
		// 	createdAt: '2024-02-03',
		// 	status: "In progress",
		// 	recurrence: "daily"
		// },
		// {
		// 	id: 2,
		// 	title: "Pre-seed AI Startups",
		// 	description: "This is a description of the research",
		// 	conversion: 20,
		// 	visits: 100,
		// 	createdAt: '2024-02-03',
		// 	status: "Queued",
		// 	recurrence: "monthly"
		// },
		// // {
		// // 	id: 3,
		// // 	title: "Series A SaaS Startups",
		// // 	description: "This is a description of the research",
		// // 	conversion: 20,
		// // 	visits: 100,
		// // 	createdAt: new Date(),
		// // 	status: "Failed",
		// // 	recurrence: "weekly"
		// // },
		// {
		// 	id: 3,
		// 	title: "Series A SaaS Startups",
		// 	description: "This is a description of the research",
		// 	conversion: 20,
		// 	visits: 100,
		// 	createdAt: '2024-02-03',
		// 	status: "Complete",
		// 	recurrence: "weekly"
		// },
		// {
		// 	id: 4,
		// 	title: "Series A SaaS Startups",
		// 	description: "This is a description of the research",
		// 	conversion: 20,
		// 	visits: 100,
		// 	createdAt: '2024-02-03',
		// 	status: "Complete",
		// 	recurrence: "One-off"
		// }
	])
	//end of Fake info.

	const [organisationId, setOrganisationId] = useState("")

	//Fetch ALL of the researches by the user ID.

	useEffect(() => {

		const asyncFunc = async () => {
			const user = await apiClient.get("/user")

			setOrganisationId(user.organisationId)

			// fetch all the researches by the organisation

			//fetch ALL the researches under the organisation (as upposed to a specific research)
			const newResearches = await apiClient.get(`/research/batch?id=${user.organisationId}`)

			setResearches([ ...researches, ...newResearches ])
		}

		asyncFunc()
	}, [])

    return (<>
		<div className='h-full w-full'>
			<div className='h-full w-full flex flex-col items-center'>
				<div className='flex flex-col justify-start p-4 h-full max-w-3xl w-full'> {/* keeps content centered */}
				<div className='flex justify-between align-center mb-4'>

					<div className='text-3xl flex flex-col justify-center'>Research</div>
					<Button className="" href="/app/research/new"><AddIcon />New Research</Button>
				</div>
					<div className='mb-4'>
						Your organisational criteria is applied to every set of research, and can be edited <a href="/app/research/criteria" className='underline pointer'>here</a>.
					</div>
					<div className='mb-4'>
						{
							researches.map((research, idx) => {
								const cardProps = {
									title: research.title,
									description: research.description,
									href: `/app/research/${research.id}`,
									// overline: research.title,
									tags: [
										// {
										// 	label: "Conversion",
										// 	value: research.conversion + "%",
										// 	svg: <FilterIcon />
										// },
										{
											label: "Recurrence",
											value: research.recurrence,
											svg: <RepeatIcon {...iconProps} />
										},
										{
											label: "Status",
											value: getStyledStatus(research.status),
											svg: getStatusIcon(research.status)
										},
										{
											label: "Created",
											value: new Date(research.createdAt).yyyymmdd(),
											svg: <CalendarIcon {...iconProps} />
										}
									]
								}
								return <Card variant="row" key={idx} {...cardProps} />
							})
						}
					</div>
				</div>
			</div>
		</div>
	</>
  );
}