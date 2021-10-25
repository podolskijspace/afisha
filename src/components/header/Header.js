import Container from "../container/Container"
import Nav from "../nav/Nav"

const Header = () => {
  return (
    <header className="header">
        <Container>
          <Nav>
            {[
              {to:'events', text:'События'},
              {to:'calendar', text:'Календарь'},
            ]}
          </Nav>
        </Container>
    </header>
  )
}

export default Header