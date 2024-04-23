const TextInput = (props) => {
	
	const fieldAttributes = {
		id: props.id || "defaultTextfieldId",
		class: "mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm",
		placeholder: props.placeholder,
		onChange: props.onChange,
		value: props.value,
		rows: props.rows,
	}

    return (
        <div>
			<label for="field" class="block text-sm font-medium ">{props.label}</label>
			{
				props.multiline ?
				<textarea {...fieldAttributes}></textarea>
				:
				<input {...fieldAttributes}></input>
			}
        </div>
    )
}

export default TextInput
