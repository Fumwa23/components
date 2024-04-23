"use client"
import { signOut } from "next-auth/react"
import logo from "@/public/branding/logo.png"
import Image from "next/image";
import config from "@/config";

const SideMenu = (props) => {
    return (
        <div class="flex h-screen w-16 flex-col justify-between border-e ">
            <div>
                <div class="inline-flex h-16 w-16 items-center justify-center">
                <span
                    class="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
                >
                    <Image
                        src={logo}
                        alt={`${config.appName} logo`}
                        priority={true}
                        className="w-6 h-6"
                        width={24}
                        height={24}
                    />
                </span>
                </div>

                <div class="border-t border-gray-100">
                    <div class="px-2">
                        {/* <div class="py-4">
                            <a
                                href=""
                                class="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 opacity-75"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                                >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                </svg>

                                <span
                                class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
                                >
                                General
                                </span>
                            </a>
                        </div> */}

                        <ul class="space-y-1 border-t border-gray-100 pt-4">

                            {props.menuItems && props.menuItems.map((item, idx) => {
                                return <li key={idx}>
                                    <a href={item.href} class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                                        {item.svgElement}
                                    {/* <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5 opacity-75"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                    >
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg> */}

                                        <span class="w-full absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible">
                                            {item.label}
                                        </span>
                                    </a>
                                </li>
                            }
                            )}
                        </ul>
                    </div>
                    </div>
                </div>

                <div class="sticky inset-x-0 bottom-0 border-t border-gray-100  p-2">
                    <form>
                    <button
                        onClick={()=>signOut({ callbackUrl: "/" })}
                        type="submit"
                        class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                        {/* TODO replace SVG with feather icon */}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                        </svg>

                        <span
                        class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white invisible group-hover:visible"
                        >
                            Logout
                        </span>
                    </button>
                    </form>
                </div>
            </div>
    )
}

export default SideMenu