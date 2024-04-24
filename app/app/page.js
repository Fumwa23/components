import { redirect } from "next/navigation"

const App = () => {

	// redirect to /videos
	return (
		redirect("/app/buttons")
	)
}

export default App