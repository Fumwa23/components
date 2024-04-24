import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/generic/next-auth";
import config from "@/config";
import TextSideMenu from "@/components/hyperUI/TextSideMenu";
import Breadcrumbs from "@/components/hyperUI/Breadcrumbs";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function LayoutPrivate({ children }) {

    const session = await getServerSession(authOptions);
    const headersList = headers()
    const redirectPath = headersList.get("pathname")
    const query = `?callbackUrl=${encodeURIComponent(redirectPath)}`
    if (!session) {
        redirect(config.auth.loginUrl + query);
    }

    const breadcrumbs = headersList.get("pathname").split("/").filter((x) => x !== "").filter((x) => x !== "app")
    .map((x, i, arr) => {
        return {
            label: capitalizeFirstLetter(x),
            href: "/app/" + arr.slice(0, i + 1).join("/")
        }
    })
    
    return <div className="h-full">
        <div className="
            z-[-1]
            absolute
            h-full w-full
            blur-3xl
        ">
            <div className="relative h-full w-full">
                {/* <div className="absolute bg-gradient-to-b from-blue-400 to-blue-100 via-sky-200 h-full w-full"></div> */}
                {/* <div className="absolute left-0 top-32 bg-red-200 h-64 w-32 rounded-full"></div> */}
                {/* <div className="absolute left-64 bottom-16 bg-pink-200 h-64 w-32 rounded-full"></div> */}
                {/* <div className="absolute right-0 bottom-64 bg-green-200 h-32 w-64 rounded-full"></div> */}
            </div>
        </div>
        
        <div className="flex w-full h-full">
            <TextSideMenu 
                menuItems={[
                    // TODO replace SVGs with feather icon
                    {label: "Research", href: "/app/research", svgElement: <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>},
                    {label: "Buttons", href: "/app/buttons", svgElement: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" /></svg>},
                    {label: "Runs", href: "/app/runs", svgElement: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" /></svg>},
                    {label: "Cards", href: "/app/cards", svgElement: <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>},
                    {label: "Text Boxes", href: "/app/text", svgElement: <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>},
                    {label: "Research", href: "/app/research", svgElement: <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>},
                ]}
            />
            <div className="flex flex-col w-full h-full p-4">
                {/* <div className='text-2xl p-4 font-medium'>My Sales Webinars</div> */}
                    <Breadcrumbs home="/app" items={breadcrumbs} />
                <div className="pt-4 h-full w-full overflow-scroll">
                    {children}
                </div>
            </div>
        </div>
    </div>;
}
