import cn from 'classnames'

const Input = ({mod="", ...props}) => <input className={cn('input', mod)} {...props}/>

export default Input