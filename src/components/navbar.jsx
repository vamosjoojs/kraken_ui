import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export default function Header(props) {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">{props.name}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/twitch">Twitch Clips</Nav.Link>
                        <Nav.Link href="/posts">Postagens</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}