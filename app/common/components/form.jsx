import React, { PropTypes } from 'react'
import uniqueId from '~/common/utils/unique_id'

// Field component
export const renderField = ({ input, label, type, meta: { touched, error } }) => {
  const id = uniqueId(input.name)

  return (
    <div className={`${touched && error ? 'has-error' : ''}`}>
      <div className="grid-block">
        <div className="small-6">
          <label htmlFor={id}>{label}</label>
        </div>
        <div className="small-6">
          {touched && error && <span className="alert label float-right">{error}</span>}
        </div>
      </div>
      <input {...input} placeholder={label} type={type} id={id} />
    </div>
  )
}
renderField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
}

// Select component
export const renderSelect = ({ input, label, type, values, meta: { touched, error } }) => (
  <div className={`${touched && error ? 'has-error' : ''}`}>
    <div className="grid-block">
      <div className="small-6">
        <label htmlFor={input}>{label}</label>
      </div>
      <div className="small-6">
        {touched && error && <span className="alert label float-right">{error}</span>}
      </div>
    </div>
    <select {...input} placeholder={label} type={type}>
      {values.map(option =>
        <option value={option.value} key={option.value}>{option.label}</option>)}
    </select>
  </div>
)

renderSelect.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  values: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
}
