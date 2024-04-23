'use client'
import apiClient from "@/utils/generic/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { convertSnakeToTitle } from "@/utils/convertSnakeToTitle";

const CompanyOverview = () => {
    const pathname = usePathname()
    const dealId = pathname.split("/").pop()

    const [company, setCompany] = useState({data:{}})

    useEffect(() => {
        const asyncFunc = async () => {

            console.log("THIS RUNS")
            //get the research for the current page using the research ID
            const getCompanyInfo = await apiClient.get(`/deal?id=${dealId}`)
            console.log(getCompanyInfo)
            setCompany({...company, ...getCompanyInfo})
            console.log("company", company)
        }

        asyncFunc()
    },[])
    console.log("company", company)

    const criteria = [];
    for (const [key, value] of Object.entries(company.data)) {
        criteria.push(<div className="flex flex-col mb-4">
            <div className="text-sm">{convertSnakeToTitle(key)}</div>
            <div className="text-md font-bold">{value}</div>
        </div>)
    }

    return (
        <div className="p-8 w-full h-full">
            <h2>{company.name}</h2>
            {/* display other company details */}
            {/* company summary */}
            <div className="mb-8">
                <div className="text-2xl mb-4">
                    Company Summary
                </div>
                <div className="mb-4">
                    {"An overview of the company and the main interesting points about them would go here. This box should have around 3-4 sentences of text inside it to ensure enough information without clutter. The constant that needs to be developed is: company.data.company_summary"}
                </div>
            </div>
            <div className="mb-8">
                <div className="text-2xl mb-4">
                    Key Updates
                </div>
                <div className="mb-4">
                    {company.data.keyEvents ? company.data.keyEvents.map((update, idx) => {
                        return (
                            <div key={idx} className="flex flex-col mb-4">
                                <div className="text-sm">{update.timestamp}</div>
                                <div className="text-sm font-bold">{update.event}</div>
                            </div>
                        )
                    }) : "No updates found"}
                </div>
            </div>
            <div className="mb-8">
                {/* DETAILS HEADING */}
                <div className="text-2xl mb-4">
                    Details
                </div>
                <div>
                    {criteria}
                </div>

                {/*  // THIS IS THE OLD WAY OF DISPLAYING THE DETAILS
                <div className="flex flex-col mb-4">
                    <div className="text-sm">Estimated Revenue</div>
                    <div className="text-md font-bold">{company.data.estimated_revenue}</div>
                </div>
                <div className="flex flex-col mb-4">
                    <div className="text-sm">Estimated Investment</div>
                    <div className="text-md font-bold">{company.data.estimated_investment}</div>
                </div>
                <div className="flex flex-col mb-4">
                    <div className="text-sm">Updates Since Last Checked</div>
                    <div className="text-md font-bold">{company.data.updates_since_last_checked}</div>
                </div>
                */}

                <div className="flex flex-col mb-4">
                    <div className="text-sm">Portfolio Score</div>
                    <div className="text-md font-bold">{company.portfolio_score}</div>
                </div>

                <div className="flex flex-col mb-4">
                    <div className="text-sm">Portfolio Score Reason</div>
                    <div className="text-md font-bold">{company.portfolio_score_reason}</div>
                </div>
            </div>
            <div>
                <div className="text-2xl mb-4">
                    Founders
                </div>
                <div className="flex flex-col mb-4">
                    {company.data.team ? company.data.team.map((founder, idx) => {
                        return (
                            <div key={idx} className="flex flex-col mb-4">
                                <div className="text-sm">{founder.name}</div>
                                <div className="text-md font-bold">{founder.title}</div>
                            </div>
                        )
                    }) : "No founders found"}
                </div>

            </div>
        </div>
    )
}

export default CompanyOverview