import classnames from 'classnames'

const Multiselect = props => {
    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
            </label>
            <select
                id={props.name}
                name={props.name}
                className={classNames('gravityform__input', props.className)}
                ref={register({
                    required: props.required,
                })}
                onChange={props.handleChange}
            >
                {props.choices.map((choice, index) => {
                    return (
                        <option
                            key={`${field.id}-${index}`}
                            value={choice.value}
                            defaultValue={choice.isSelected}
                        >
                            {choice.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Multiselect
