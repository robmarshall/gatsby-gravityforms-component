/**
 * Loop through object of errors passed back by Gravity Forms
 * Set errors to the corrosponding input
 */

export const handleGravityFormsValidationErrors = (data, setError) => {
    Object.keys(data).forEach(function(key) {
        const id = key.replace('.', '_')
        const fieldId = `input_${id}`
        setError(fieldId, 'gf_validation', data[key])
    })
}
