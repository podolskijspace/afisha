const Button = ({text='Клик',
                mod = "",
                onClick = null}) => {
  return (
    <button className={`button ${mod}`}
    onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;