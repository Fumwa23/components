import { convertSnakeToTitle } from "@/utils/convertSnakeToTitle"

const Table = (props) => {

    // headings are all of the keys of the data attribute dictionary of each iterm in the data array
    const headings = Object.keys(props.data[0].data)

    console.log("researchId, ", props.data)

    return <div class="overflow-x-auto rounded">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
                <tr>
                    {headings.map((heading, idx) => {
                        return <th key={idx} class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">{convertSnakeToTitle(heading)}</th>
                    })}
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                {props.data[1] ? 
                props.data.map((row, idx) => {
                    if (idx==0) return <tr></tr>
                    return <tr key={idx}>
                        {Object.values(row.data).map((value, idx) => {   
                            return <td key={idx} class="whitespace-nowrap px-4 py-2 text-gray-700">{value}</td>
                        })}
                        <td class="whitespace-nowrap px-4 py-2">
                            <a href={`/app/research/${row.researchId}/${row.dealId}`} class="inline-block rounded bg-black px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">View</a>
                        </td>
                    </tr>
                }) :
                <tr></tr>}
            </tbody>
            {/* <tr>
                <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                <td class="whitespace-nowrap px-4 py-2">
                <a
                    href="#"
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                    View
                </a>
                </td>
            </tr>

            <tr>
                <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Jane Doe</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
                <td class="whitespace-nowrap px-4 py-2">
                <a
                    href="#"
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                    View
                </a>
                </td>
            </tr>

            <tr>
                <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gary Barlow</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
                <td class="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
                <td class="whitespace-nowrap px-4 py-2">
                <a
                    href="#"
                    class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                    View
                </a>
                </td>
            </tr>
            </tbody> */}
        </table>
        </div>
    
    }

export default Table