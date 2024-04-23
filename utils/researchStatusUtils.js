import { Layers as LayersIcon, Plus as AddIcon, Repeat as RepeatIcon, Check as CheckIcon, AlertTriangle as AlertTriangleIcon, Calendar as CalendarIcon } from "react-feather";

const getStyledStatus = (status) => {
	// return div with tailwind style using a switch
	switch (status) {
		case "In progress":
			return <div className="text-yellow-500">{status}</div>
		case "Complete":
			return <div className="text-green-600">{status}</div>
		case "Failed":
			return <div className="text-red-800">{status}</div>
		case "Queued":
			return <div className="text-blue-600">{status}</div>
		default:
			return <div className="text-gray-800">{status}</div>
	}
}

const getStatusIcon = (status) => {
    const iconProps = {size: 20}

	// return div with tailwind style using a switch
	switch (status) {
		case "In progress":
			return <span className="loading loading-spinner loading-xs"></span>
		case "Complete":
			return <CheckIcon {...iconProps}/>
		case "Failed":
			return <AlertTriangleIcon {...iconProps}/>
		case "Queued":
			return <LayersIcon {...iconProps}/>
		default:
			return <span className="loading loading-spinner loading-xs"></span>
	}
}

export { getStyledStatus, getStatusIcon}