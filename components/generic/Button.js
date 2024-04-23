//This button takes the following props:
// - title: The text to display on the button.
// - href: The URL to navigate to when the button is clicked.
// - className: The CSS classes to apply to the button.
// - onClick: The function to call when the button is clicked.
// - loading: A boolean to show a loading spinner when true.
// - children: The children to render inside the button.

const Button = (props) => {

	return <a href={props.href}>
		{/* <button className={"btn btn-md bg-gray-900 text-white " + props.className} href={props.href} onClick={props.onClick}>  THIS LINE CONTAINS DEFAULT UI*/}
		<button className={props.className} href={props.href} onClick={props.onClick}>
				{props.title}
				{props.loading && <span className="loading loading-spinner loading-xs"></span>}
				{props.children}
		</button>
	</a>
}

export default Button