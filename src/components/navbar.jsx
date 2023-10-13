import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export function logout() {
    localStorage.removeItem("token");
}


export default function Header(props) {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">{props.name}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/twitch">Twitch Clips</Nav.Link>
                        <Nav.Link href="/youtube-clips">Youtube Clips</Nav.Link>
                        <Nav.Link href="/youtube">Youtube Vídeos</Nav.Link>
                        <Nav.Link href="/posts">Postagens</Nav.Link>
                        <Nav.Link href="/schedules">Agendamentos</Nav.Link>
                        <Nav.Link href="/bots">Bots</Nav.Link>
                    </Nav>
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={props.name}
                        menuVariant="dark"
                    >
                        <NavDropdown.Item href="/parameters">Parâmetros</NavDropdown.Item>
                        <NavDropdown.Item onClick={logout} href="/">Sair</NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </Navbar>
        </>
    )
}