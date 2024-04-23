import { redirect } from "next/navigation"

const App = () => {

	// redirect to /videos
	return (
		redirect("/app/research")
	)
}

export default App