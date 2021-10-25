import cn from 'classnames';

import arrow from '../../assets/img/arrow.png'

const Select = ({mod = "",children, ...props}) => {
  const dataMap = () => {
    return (
      children.map((item, i) => {
        return (
          <option key={i} value={item.value}> {item.name}</option>
        )
      })
    )
  }

  return (
    <div className={cn('select', mod)}>
      <img className="select__arrow" src={arrow} alt="arrow"/>
      <select className="select__select" {...props}>
        {dataMap()}
      </select>
    </div>

  )
}

export default Select;