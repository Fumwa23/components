const doneColor = "blue-600"
const todoColor= "gray-600"

const isDone = (props) => {
    return props.activeStep >= props.idx
}

const getColor = (props) => {
    console.log(props)
    console.log(props.activeStep, props.idx)
    return isDone(props) ? doneColor : todoColor
}

const CheckedCircle = (props) => {
    return (
        <span class={
            "transition duration-200 w-5 h-5 rounded-full" 
            // + (idx === 0 ? " left-1/2 -translate-x-1/2" : idx === props.steps.length - 1 ? " end-0" : "")
        }>
            {/* {props.item.svgElement} */}
            <svg
                // class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
                />
            </svg>

        </span>
    )
}

const StepperNode = (props) => {
    console.log(props)
    return (
        <li class={`relative flex flex-col justify-start items-center text-${getColor(props)}`} key={props.idx}>

            {/* CHECKED CIRCLE */}
            <CheckedCircle activeStep={props.activeStep}/>


            {/* LARGE SCREEN LABEL */}
            <span class="hidden sm:block">{props.title}</span>

            {/* SMALL SCREEN LOGO */}
            <svg
                class="h-6 w-6 sm:hidden"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
            </svg>

        </li>
    )
}

const StepperArc = (props) => <div className={`mt-2 w-1/2 h-[0.2rem] bg-${todoColor}` } >
    <div className={`h-full transition duration-200 bg-${doneColor} ${isDone(props) ? "w-full" : "w-[0px]"}`}></div>
    {/* failed attempt to get blue to increase linearly ^ */}
</div>

const Stepper = (props) => {

    // const steps = [props.steps[0]]
    const steps = props.steps

    return (
        <div className="w-full pb-8 pt-8">
            <h2 class="sr-only">Steps</h2>

                <ol class="flex">
                    {steps.map((item, idx) => {
                        return <>
                            {idx > 0 && <StepperArc item={item} key={idx} idx={idx} activeStep={props.activeStep} />}
                            <StepperNode {...item} key={idx} idx={idx} activeStep={props.activeStep} />
                        </>
                    })}
               </ol>

        </div>
    )
}

export default Stepper
                    // <li class="relative flex justify-center text-blue-600">
                    //     <span
                    //     class="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-blue-600 text-white"
                    //     >
                    //     <svg
                    //         class="h-5 w-5"
                    //         xmlns="http://www.w3.org/2000/svg"
                    //         viewBox="0 0 20 20"
                    //         fill="currentColor"
                    //     >
                    //         <path
                    //         fill-rule="evenodd"
                    //         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    //         clip-rule="evenodd"
                    //         />
                    //     </svg>
                    //     </span>

                    //     <span class="hidden sm:block"> Address </span>

                    //     <svg
                    //     class="mx-auto h-6 w-6 sm:hidden"
                    //     xmlns="http://www.w3.org/2000/svg"
                    //     fill="none"
                    //     viewBox="0 0 24 24"
                    //     stroke="currentColor"
                    //     stroke-width="2"
                    //     >
                    //     <path
                    //         stroke-linecap="round"
                    //         stroke-linejoin="round"
                    //         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    //     />
                    //     <path
                    //         stroke-linecap="round"
                    //         stroke-linejoin="round"
                    //         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    //     />
                    //     </svg>
                    // </li>

                    // <li class="relative flex justify-end">
                    //     <span class="absolute -bottom-[1.75rem] end-0 rounded-full bg-gray-600 text-white">
                    //     <svg
                    //         class="h-5 w-5"
                    //         xmlns="http://www.w3.org/2000/svg"
                    //         viewBox="0 0 20 20"
                    //         fill="currentColor"
                    //     >
                    //         <path
                    //         fill-rule="evenodd"
                    //         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    //         clip-rule="evenodd"
                    //         />
                    //     </svg>
                    //     </span>

                    //     <span class="hidden sm:block"> Payment </span>

                    //     <svg
                    //     class="h-6 w-6 sm:hidden"
                    //     xmlns="http://www.w3.org/2000/svg"
                    //     fill="none"
                    //     viewBox="0 0 24 24"
                    //     stroke="currentColor"
                    //     stroke-width="2"
                    //     >
                    //     <path
                    //         stroke-linecap="round"
                    //         stroke-linejoin="round"
                    //         d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    //     />
                    //     </svg>
                    // </li>
 