const Button = ({variant="clearOnHover", ...props}) => {

    if (variant === "clearOnHover") {
        return (
                <a
                class="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                onClick={props.onClick}
                >
                <span
                    class="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
                >
                    {props.ctaText}
                </span>

                <span
                    class="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600 group-active:text-indigo-500"
                >
                    <svg
                    class="h-5 w-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                    </svg>
                </span>
                </a>
        )
    }
    else if (variant === "fillOnHover") {
        return <a
                class="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
                onClick={props.onClick}
                href={props.href}
            >
            <span class="font-medium transition-colors group-hover:text-white"> 
                {props.ctaText}
            </span>

            <span
                class="shrink-0 rounded-full border border-indigo-600 bg-white p-2 group-active:border-indigo-500"
            >
                <svg
                class="h-5 w-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
                </svg>
            </span>
            </a>
    }
}

export default Button