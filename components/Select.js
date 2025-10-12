import React from 'react'

/**
 * 下拉单选框
 */
class Select extends React.Component {
<<<<<<< HEAD
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
=======
  handleChange = event => {
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
    const { onChange } = this.props
    onChange(event.target.value)
  }

<<<<<<< HEAD
  render () {
    return (
      <div className='py-1 space-x-3'>
        <label className='text-gray-500'>{this.props.label}</label>
        <select value={this.props.value} onChange={this.handleChange} className='border p-1 rounded cursor-pointer'>
=======
  render() {
    return (
      <div className='py-1 space-x-3'>
        <label className='text-gray-500'>{this.props.label}</label>
        <select
          value={this.props.value}
          onChange={this.handleChange}
          className='border p-1 rounded cursor-pointer'>
>>>>>>> 1d4dad242e4be006e130e03a1cd8d1ce712cec5a
          {this.props.options?.map(o => (
            <option key={o.value} value={o.value}>
              {o.text}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
Select.defaultProps = {
  label: '',
  value: '1',
  options: [
    { value: '1', text: '选项1' },
    { value: '2', text: '选项2' }
  ]
}
export default Select
