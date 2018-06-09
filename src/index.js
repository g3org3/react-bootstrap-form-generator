import React, { Component } from 'react'
import PropTypes from 'prop-types'

const capitalize = { textTransform: 'capitalize' }
const outlines = { border: '1px solid orange', padding: '20px' }

const Grid = ({ layout=false, items=[], verbose }) => {
  let i = 0
  if (!layout) {
    return <div className="row">
      <div className="col-md-12">
        {items}
      </div>
    </div>
  }
  return <div>
    {layout.map((row, r) => ! items[i] ? null : (
      <div key={`${r}`} className="row" style={verbose? outlines: {}}>
        {row.map(col => ! items[i] ? null : (
          <div key={`${i}-${col}`} className={`col-md-${col}`} style={verbose? outlines: {}}>
            {items[i++]}
          </div>
        ))}
      </div>
    ))}
  </div>
}

const InputText = ({label, name, type, value, onChange, disabled, placeholder}) => (
  <div className="form-group">
    <label style={capitalize}>{label||name}</label>
    <input
      name={name}
      className="form-control"
      type={type}
      onChange={onChange}
      placeholder={placeholder||name}
      value={value}
      disabled={disabled}
    />
  </div>
)

const TextArea = ({label, name, value, required, disabled, onChange}) => (
  <div className="form-group">
    <label style={capitalize}>{label||name}</label>
    <textarea value={value} className="form-control" name={name} required={required} disabled={disabled} onChange={onChange} />
  </div>
)

const InputSelect = ({label, name, value, onChange, disabled, options, required}) => (
  <div className="form-group">
    <label style={capitalize}>{label||name}</label>
    <select className="form-control" name={name} onChange={onChange} required={required} disabled={disabled} value={value}>
      <option value="">--</option>
      {options.map(option => {
        const value = typeof option === 'string'? option : option.value
        const labelText = typeof option === 'string'? option : option.label
        return <option key={value+name} value={value}>{labelText}</option>
      })}
    </select>
  </div>
)

const InputChoice = ({ value, type, label, name, onChange, options, disabled, required }) => (
  <div className="form-group">
    <label style={capitalize}>{label||name}</label>
    {options.map(option => {
      const optionValue = typeof option === 'string' ? option : option.value
      const labelText = typeof option === 'string' ? option : option.label
      const checked = type === 'checkbox' ? value[optionValue] : value === optionValue
      return <div key={optionValue+name}>
      <label>
        <input
          name={name}
          type={type}
          onClick={onChange}
          disabled={disabled}
          onChange={onChange}
          required={required}
          value={optionValue}
          checked={checked}
        />
        {labelText}
      </label>
      </div>
    })}
  </div>
)

class Form extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    const empty = Object.keys(this.props.schema).reduce((_obj, key) => {
      _obj[key] = this.props.schema[key].type === 'checkbox'? {} : ''
      return _obj
    }, {})
    this.state = this.props.defaultValue ? Object.assign(empty, this.props.defaultValue) : empty
  }

  onChange({ target }) {
    const { name, value, checked, type } = target
    this.props.onChange({ key: name, value, checked })
    if (type === 'checkbox') {
      this.setState({
        [name]: Object.assign(this.state[name], {
          [value]: checked
        })
      })
    } else {
      this.setState({
        [name]: value
      })
    }
  }

  propsToInputs() {
    const { schema } = this.props
    const fields = Object.keys(schema).filter(key => typeof schema[key] == 'string' || schema[key].hidden !== true)
    return fields.map(field => {
      const spec = schema[field]
      if (typeof spec == 'string') {
        const type = (spec.split(':').length == 2)
          ? spec.split(':')[1]
          : 'text'
        return <InputText
          key={field}
          name={field}
          type={type}
          onChange={this.onChange}
          value={this.state[field]}
        />
      }
      switch(spec.type) {
        case 'textarea': {
          return <TextArea
            key={field}
            label={spec.label}
            name={field}
            required={spec.required}
            disabled={spec.disabled}
            onChange={this.onChange}
            value={this.state[field]}
          />
        }
        case 'checkbox':
        case 'radio': {
          return <InputChoice
            key={field}
            type={spec.type}
            label={spec.label}
            name={field}
            required={spec.required}
            disabled={spec.disabled}
            onChange={this.onChange}
            options={spec.options}
            value={this.state[field]}
          />
        }
        case 'select': {
          return <InputSelect
            key={field}
            name={field}
            label={spec.label}
            required={spec.required}
            disabled={spec.disabled}
            onChange={this.onChange}
            value={this.state[field]}
            options={spec.options}
          />
        }
        case 'string':
        case 'string:email':
        case 'string:password':
        case 'string:time':
        case 'string:date': {
          const type = (spec.type.split(':').length == 2)
          ? spec.type.split(':')[1]
          : 'text'
          return <InputText
            key={field}
            name={field}
            label={spec.label}
            required={spec.required}
            disabled={spec.disabled}
            placeholder={spec.placeholder}
            type={type}
            onChange={this.onChange}
            value={this.state[field]}
          />
        }
      }
    })
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const fields = this.propsToInputs()
    const {
      layout,
      verbose,
      submitLabel,
      onCancel,
      cancelLabel,
      submitBtnClass
    } = this.props
    return (
      <form onSubmit={this.onSubmit}>
        <Grid layout={layout} items={fields} verbose={verbose} />
        <div className="form-group">
          { onCancel
            ? <a href="#" onClick={onCancel} style={{marginRight: '20px'}} className="btn btn-default">
              {cancelLabel}
            </a>
            : null
          }
          <button type="submit" className={submitBtnClass? submitBtnClass : "btn btn-primary"}>
            {submitLabel}
          </button>
        </div>
        { verbose? <pre>{JSON.stringify(this.state, null, 2)}</pre>: null }
      </form>
    )
  }
}

Form.defaultProps = {
  onSubmit: () => {},
  onChange: () => {},
  submitLabel: 'submit',
  cancelLabel: 'cancel'
}

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  verbose: PropTypes.bool,
  submitLabel: PropTypes.string,
  layout: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  cancelLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  defaultValue: PropTypes.object,
  submitBtnClass: PropTypes.string
}

export default Form
