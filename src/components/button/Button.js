const Button = ({text='Клик',
                mod = "",}) => {
  return (
    <button className={`button ${mod}`}>
      {text}
    </button>
  )
}

export default Button;