const Select = ({data = [],
                  onChange = null,
                  value,
                  mod = ""}) => {
  data = data.map((item, i) => {
    return (
      <option key={i} value={item.value}> {item.name}</option>
    )
  })
  return (
    <select className={`select ${mod}`} onChange={onChange} value={value}>
      {data}
    </select>
  )
}

export default Select;