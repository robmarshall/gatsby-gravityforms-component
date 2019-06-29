import classnames from 'classnames'

const Textarea = props => {
    return (
        <div className={props.wrapClassName}>
            <label htmlFor={props.name} className="gravityform__label">
                {props.label}
            </label>
            <textarea
                id={props.name}
                type={field.type}
                className={classNames('gravityform__input', props.className)}
                name={props.name}
                defaultValue={props.value}
                placeholder={props.placeholder}
                ref={props.register({
                    required: props.required,
                    maxlength: props.maxLength,
                })}
            />
        </div>
    )
}

export default Textarea
