"use client"
import { toast } from "react-hot-toast";
import Table from "@/components/hyperUI/Table";
import { useEffect, useState } from "react";
import { Search as SearchIcon, ArrowUpRight as ArrowUpRight, Eye as EyeIcon, Calendar as CalendarIcon, RefreshCcw as RefreshCcw } from "react-feather";
import Button from "@/components/generic/Button";
import { Grow } from "@/transitions";
import apiClient from "@/utils/generic/api";
import { usePathname } from 'next/navigation'
import { get } from "mongoose";

const ResearchOutput = () => {


    const pathname = usePathname()
    const researchId = pathname.split("/").pop()

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

    const [deals, setDeals] = useState([
        {
            "data": {
                "name": "Smedvig Ventures",
                "estimatedRevenue": "unknown",
                "estimatedInvestment": "€115M",
                "updatesSinceLastChecked": "1",
                "portfolioScore": "6" // out of 10, based on relevance to our investment thesis
            },
            "researchId": "adfadfasdf",
            "ctaText": "View",
            "href": "/app/deals/smedvig-ventures",
            "id": "smedvig-ventures",
            "keyUpdates": [
                "closed new €115M fund to invest in European B2B startups"
            ],
            "founders": [
                {
                    "name": "Jonathan Lerner",
                    "title": "Partner",
                    "email": "unknown",
                    "phoneNumber": "unknown"
                },
                {
                    "name": "Joe Knowles",
                    "title": "Partner",
                    "email": "unknown",
                    "phoneNumber": "unknown"
                }
            ],
            "portfolioScore": "9",
            "portfolioScoreReason": "Smedvig Ventures' new fund focusing on B2B startups, particularly in software and AI applications, is tangentially relevant to our healthcare-focused investment thesis. While their emphasis on infrastructure software and tech-enabled services could potentially overlap with our interests, their broad sector approach and focus on the Series A to B gap in B2B startups place them outside our primary investment criteria.",
            "companySummary": "Smedvig Ventures, a UK-based venture capital firm, has recently closed a €115M fund aimed at investing in B2B startups across Europe, particularly in the UK, Nordics, and Benelux regions. The fund, primarily backed by the Smedvig family office, will target startups at the Series A and B stages, focusing on infrastructure software, data platforms, applied AI, and tech-enabled services. With plans to invest in three to four startups annually, the firm aims to bridge the operational gap faced by businesses between early seed traction and later-stage success."
        }
    
    ])

    const [researchData, setResearchData] = useState({
        // id: 3,
        // title: "Series A SaaS Startups",
        // createdAt: '2024-02-03',
        // status: "Complete",
        // recurrence: "One-off"
    })

    useEffect(() => {
        const asyncFunc = async () => {

            console.log("starting")

            //get the research for the current page using the research ID
            const getResearchData = (await apiClient.get(`/research?id=${researchId}`))
            
            
            //sort getResearchData by portfolio_score parameter in descending order
            setResearchData(getResearchData)
            
            //get the list of deals using the research Id
            const newDeals = await apiClient.get(`/deal/batch?id=${researchId}`)
            setDeals([ ...deals, ...newDeals ]
                .filter((deal) => {
                    // remove if name is "Unknown", "unknown", "N/A", "n/a"
                    return !["Unknown", "unknown", "N/A", "n/a", "Undefined", "undefined"].includes(deal.company_name)
                })
                .map((deal) => {
                    // multiply portfolio_score of each dict by 85 for each dictionary in the dict
                    return {...deal, portfolio_score: parseInt(parseFloat(deal.portfolio_score) * 85)}
                })
                .sort((a, b) => {
                return b.portfolio_score - a.portfolio_score
            }))
        }

        asyncFunc()
    },[])


    //filter the information in the deals dictionary
    const tableColumnHeadings = [
        "company_name",
        "company_sector",
        "amount_raised_in_seed_round",
        "portfolio_score"
    ]

    //created flattened dictioanary:
    const flattenedDeals = deals.map((deal, idx) => {
        return deal = {...deal, ...deal.data} // havnt actually flattened the dictionary. Just extracted data object
    })

    // choose the items from the flattened data to send to the table.
    const tableData = flattenedDeals.map((deal) => {
        return {researchId: deal.researchId, dealId: deal.id, data: Object.fromEntries(tableColumnHeadings.map(heading => [heading, deal[heading]]))}
    })

    const [loading, setLoading] = useState(false)


    const clickedRefreshButton = async () => {

        // THIS FUNCTION EXISTS FOR TESTING DEALS ENDPOINT

        const payload = {
            "name": "ANYbotics", 
            "data": {
                "tagline": "We can make ANY robot and it will be amazing.",
                "companySummary": "ANYbotics, a Swiss startup founded in 2016 and a spinout from ETH Zurich, develops four-legged autonomous robots for industrial use. These robots, including their first product ANYmal, are used for inspection in hazardous environments in sectors like oil and gas, mining, and chemicals. Their innovative approach includes thermographic imaging and gas detection sensors. The company has recently raised $50m in Series B funding to fulfill product preorders and expand to new markets, with plans to grow their team significantly.",
                "age": "8",
                "headcount": "10",
                "estimatedRevenue": "unknown",
                "estimatedInvestment": "$50m",
                "updatesSinceLastChecked": "1",
                "funding": [
                    {
                        "amount": "4 million",
                        "timestamp": "8/12/2023",
                        "source": "Y Combinator"
                    },
                    {
                        "amount": "1 million",
                        "timestamp": "8/6/2022",
                        "source": "Y Combinator"
                    },
                ],
                "team": [
                     {
                         "name": "Péter Fankhauser",
                         "title": "CEO and Co-Founder",
                         "age": "35",
                         "email": "unknown",
                         "phoneNumber": "unknown"
                     }
                 ],
                 "keyEvents": [
                     {
                        "event":"raised $50m in Series B funding",
                        "timestamp": "2023"
                     },
                 ],
            },
            "portfolioScore": "4",
            "portfolioScoreReason": "ANYbotics, specializing in autonomous robots for industrial inspection, diverges from our core investment thesis centered on healthcare, biohacking, supplements, and longevity. Despite its technological innovation and growth potential, its focus on industrial applications limits its relevance to our investment criteria.",
            "researchId": researchId,
            "flagged": "a"
        }

        //await apiClient.post("/deal", payload)

        //DISABLE BUTTON SO SHAUN DOESNT USE IT:
        //create delay that waits 3 seconds
        toast.loading("Scanning for updates")
        setTimeout(() => {
            toast.success("You are up to date!")
        }, 3000)

    }


    console.log(deals)

    return (<>
    <div className="pl-8 relative h-full overflow-hidden">
        <div className="flex h-full">
            <div className="h-full w-[80%]">
                <div className="flex justify-between">
                    <div>
                        <div class="text-sm text-gray-500">Research Output</div>
                        <div className='text-2xl font-medium'>{researchData.title}</div>
                    </div>
                </div>
                <div className="mt-4">
                    <div class="text-sm text-gray-500">Created</div>
                    <div>{researchData.createdAt}</div>
                    <div class="text-sm text-gray-500">Recurrence</div>
                    <div>{researchData.recurrence}</div>
                    <div class="text-sm text-gray-500">Status</div>
                    <div>{researchData.status}</div>
                </div>
                <div className="flex flex-col items-start w-full h-full justify-start mt-8 overflow-scroll">
                    <Table
                        data={tableData}
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <Button className="mb-6" onClick={clickedRefreshButton}>
                    <RefreshCcw /> Update Research
                </Button>
                <Timeline />
            </div>
        </div>
    </div>
    </>
    )
}

export default ResearchOutput

const Timeline = (props) => {

    // TODO get research id


    const [timeline, setTimeline] = useState([])

    const t = [
        {
            "title": 'Searched Google for "Series A SaaS Startups"',
            "date": new Date('2024-02-03T17:00:01'),
            "icon": <SearchIcon size={20}/>
        },
        // {
        //     "title": 'Visited first search link',
        //     "date": new Date('2024-02-03T17:00:02'),
        //     "icon": <ArrowUpRight size={20}/>
        // },
        // {
        //     title: "Read page",
        //     "date": new Date('2024-02-03T17:00:04'),
        //     icon: <EyeIcon size={20}/>
        // },
        // {
        //     "title": 'Searched for "ACME Corp" founders',
        //     "date": new Date('2024-02-03T17:00:05'),
        //     "icon": <SearchIcon size={20}/>
        // },
        // {
        //     "title": 'Searched for "ACME Corp" total investment',
        //     "date": new Date('2024-02-03T17:00:07'),
        //     "icon": <SearchIcon size={20}/>
        // },
        // {
        //     "title": 'Searched for "ACME Corp" funding rounds',
        //     "date": new Date('2024-02-03T17:00:09'),
        //     "icon": <SearchIcon size={20}/>
        // },

    ]

    // gradually add to timeline
    useEffect(()=>{
        t.forEach((i, idx) => {
            setTimeout(()=>{
                setTimeline(t.slice(0, idx+1))
            }, 1000 * idx)
        })
    }, [])

    return (
        <div className="border p-4 rounded h-[100%] w-full">
            <div>
                Timeline
            </div>
            {timeline
            .sort((a, b) => {
                return b.date - a.date
            })
            .map((t, idx) => {
                return (
                    <>
                        {/* <div className="transform scale-75 hover:scale-0 transition duration-300">
                            yo
                        </div> */}
                        {/* <Grow delay={2000} key={idx}> */}
                        <div key={idx} className="mt-4 flex items-center text-xs">
                            <div className="mr-2">
                                {t.icon}
                            </div>
                            {t.title}
                        </div>
                        {/* </Grow> */}
                    </>
                )
            })}
        </div>
    )
}
