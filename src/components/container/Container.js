const Container = ({mod = "", children, }) => (
  <div className={`container ${mod}`}>
    {children}
  </div>
)

export default Container