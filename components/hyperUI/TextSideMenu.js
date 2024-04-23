import { headers } from 'next/headers'
import Image from 'next/image'
import ButtonAccount from '../generic/ButtonAccount'

const TextSideMenu = (props) => {

    const pathname = headers().get('pathname')

    console.log(pathname)

    return <div class="flex h-screen flex-col justify-between shadow-lg w-64">
        <div class="px-4 py-6">
            {/* <span class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                <Image src="/branding/logo.png" width={32} height={32} />
            </span> */}
            <ButtonAccount/>

            <ul class="mt-6 space-y-1">
                {props.menuItems.map((item, idx) => {
                    console.log(pathname, item.href)
                    const selected = pathname === item.href
                    return <li key={idx}>
                        <a href={item.href} className={"block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 " + (selected ? "bg-gray-100" : "")}>
                            {item.label}
                        </a>
                    </li>
                })}
            </ul>
        </div>

        <div class="sticky inset-x-0 bottom-0">
            <a href="/app/research/criteria" class="flex items-center gap-2  p-4">
                <img
                    alt="Man"
                    src="/Scale Up Group Logo.jpeg"
                    class="h-10 w-10 rounded-full object-cover"
                />
                <div>
                    <p class="text-xs">
                    <strong class="block font-medium">ScaleUp Group</strong>

                    {/* <span> harry@parapet.org </span> */}
                    </p>
                </div>
            </a>
        </div>
    </div>
}

export default TextSideMenu