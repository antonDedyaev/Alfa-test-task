import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Heart } from 'react-bootstrap-icons'
export const NavBar = () => {
    return (
        <Navbar className="shadow-sm" expand="lg" bg="light" variant="light">
            <Container className="d-flex justify-content-start">
                <Navbar.Brand>
                    <h1>Shibe-gram</h1>
                </Navbar.Brand>
                <Button className="mx-5" variant="secondary">
                    <span className="mx-2">Show favourites</span>
                    <Heart />
                </Button>            
            </Container>
        </Navbar>
    )
}