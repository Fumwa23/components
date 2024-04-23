import { useState, useRef } from "react"
import detectOutsideClick from "@/hooks/detectOutsideClick";

const Dropdown = (props) => {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null);
    detectOutsideClick(wrapperRef, ()=>{setOpen(false)})
    return <div class="relative">
            <label for="field" class="block text-sm font-medium mb-2">{props.label}</label>
            <button class="inline-flex items-center overflow-hidden rounded-md border bg-white hover:bg-gray-50" onClick={()=>setOpen(!open)} ref={wrapperRef}>
                <div
                    class="px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                    {props.value}
                </div>

                <div class="h-full p-2 text-gray-600">
                    {/* <span class="sr-only">Menu</span> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </button>

            {open &&
                <div
                    class="absolute start-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                    role="menu"
                >
                    <div class="p-2">
                        {
                            props.options.map((item, idx) => {
                                return <div
                                    onClick={()=>{
                                        props.setValue(item)
                                        setOpen(false)
                                    }}
                                    class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                    role="menuitem"
                                    key={idx}
                                >
                                    {item}
                                </div>
                            })
                        }
                    </div>

                    {/* <form method="POST" action="#">
                        <button
                        type="submit"
                        class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>

                        Delete Product
                        </button>
                    </form> */}
                </div>
            }
        </div>
}

export default Dropdown