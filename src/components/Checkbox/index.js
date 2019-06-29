import classnames from 'classnames'

const Checkbox = props => {
    return (
        <div className={props.wrapClassName}>
            <legend>{props.label}</legend>
            {props.choices.map((choice, index) => {
                return (
                    <div key={`${props.name}-${index}`}>
                        <input
                            type="checkbox"
                            id={`field-${props.name}-${index}`}
                            name={`field-${props.name}`}
                            value={props.text}
                            checked={props.isSelected}
                            ref={props.register()}
                        />
                        <label htmlFor={`field-${field.id}-${index}`}>
                            {choice.text}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}

export default Checkbox
