const Select = ({data = [], onChange = null, value}) => {
  data = data.map((item, i) => {
    return (
      <option key={i} value={item.value}> {item.name}</option>
    )
  })
  return (
    <select onChange={onChange} value={value}>
      {data}
    </select>
  )
}

export default Select;