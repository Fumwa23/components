import { Grow } from "@/transitions"
import Image from "next/image"

const Card = ({variant, ...props}) => {

    if (variant === "row") {
        return (
            // <Grow>
            <a href={props.href} class="block rounded-lg p-0 m-2 w-full shadow-sm shadow-indigo-100 border hover:shadow-md transform duration-200">
                <div className="flex justify-between align-center">
                    <div class="ml-4 flex flex-col justify-center w-[60%]">
                        <div class="text-sm text-gray-500">{props.overline}</div>
                        <p class="font-medium whitespace-nowrap	truncate">{props.title}</p>
                    </div>
                    {props.tags && 
                        <div className="w-full justify-around flex">
                            {props.tags.map((tag, idx) => {
                                return <div class="flex items-center justify-start m-2 text-xs" key={idx}>
                                    {tag.svg}
                                    <div class="mt-1.5 sm:mt-0 pl-2 w-[80px]">
                                        <div class="text-gray-500">{tag.label}</div>
                                        <div class="font-medium w-full">{tag.value}</div>
                                    </div>
                                </div>
                            })}
                        </div>
                    }
                </div>
            </a>
                
            // </Grow>
        )
    }
    else {
        return (
            <a href={props.href} class="block rounded-lg p-4 m-2 w-full max-w-md shadow-sm shadow-indigo-100 border hover:shadow-md transform duration-200">
                {props.imgSrc &&
                    <Image
                        src={props.imgSrc}
                        alt={props.title}
                        width={props.imgWidth}
                        height={props.imgHeight}
                        className="rounded-md object-cover"
                        // class="h-56 w-full rounded-md object-cover"
                    />
                }

                <div class="">
                    <dl>
                    <div>
                        <dt class="sr-only">Overline</dt>

                        <dd class="text-sm text-gray-500">{props.overline}</dd>
                    </div>

                    <div>
                        <dt class="sr-only">Title</dt>

                        <dd class="font-medium">{props.title}</dd>
                    </div>
                    </dl>

                    {props.tags && 
                        <div class="mt-6 flex justify-around text-xs w-full">
                            {props.tags.map((tag, idx) => {
                                return <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2" key={idx}>
                                    {tag.svg}
                                    <div class="mt-1.5 sm:mt-0">
                                        <p class="text-gray-500">{tag.label}</p>
                                        <p class="font-medium">{tag.value}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    }
                </div>
            </a>
        )
    }
}

export default Card