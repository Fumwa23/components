import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"

export const SlideUp = (props) => {

  return (
        <Transition
        appear={true}
          as={"div"}
          show={true}
          enter="transform transition duration-[400ms]"
          enterFrom="translate-y-64"
          enterTo="translate-y-0"
        //   LEAVING HERE FOR EXAMPLE
        //   leave="transform duration-200 transition ease-in-out"
        //   leaveFrom="opacity-100 rotate-0 scale-100 "
        //   leaveTo="opacity-0 scale-95 "
        >
          {/* <div className="h-full w-full rounded-md bg-white shadow-lg" /> */}
          {props.children}
        </Transition>
  )
}

// export const Grow = (props) => {
//     return (
//         <Transition
//         appear={true}
//           as={"div"}
//           show={true}
//           enter="transform transition duration-[400ms]"
//           enterFrom="scale-0"
//           enterTo="scale-100"
//         >
//           {props.children}
//         </Transition>
//     )
// }

//homemade implementation
export const Grow = (props) => {

    // const [transitionStyle, setTransitionStyle] = useState("scale-[75%] text-blue-700")
    const [transitionStyle, setTransitionStyle] = useState("transform translate-x-12 scale-0")

    useEffect(() => {
      setTimeout(
        () => {
          console.log("setting transition style")
          setTransitionStyle("transform scale-100")
        },
        props.delay ? props.delay : 0
      )
    })

    const transitionClasses = `transform duration-300 ease-in-out ${transitionStyle} transition`

    return <div className={transitionClasses}>
      {props.children}
    </div>
}