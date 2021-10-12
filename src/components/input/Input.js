const Input = ({  type="text",
                  placeholder="",
                  value="",
                  mod="",
                  onInput=null,}) => {



  return <input
          onInput={onInput}
          type={type}
          placeholder={placeholder}
          value={value}
          className={`input ${mod}`}/>
}

export default Input;