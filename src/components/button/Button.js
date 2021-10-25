import cn from 'classnames'

const Button = ({text,mod, children,...props }) => (
  <button className={cn('button', mod)} {...props}>
    {text || children}
  </button>
)
export default Button