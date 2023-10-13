import { Container, Card, Form, Button, Spinner, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from "react";
import "./Login.css"
import { Endpoints } from '../../api/endpoints';
import { axiosInstance } from '../../api';


export default function Login(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [token, setToken] = React.useState();
    const [show, setShow] = React.useState(false);

    const tokenChange = event => {
        setToken(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axiosInstance.get(Endpoints.login.Login(token))
            .then(res => {
                if (res.data === true) {
                    props.setToken(token);
                    localStorage.setItem("token", token);
                }
                else {
                    setShow(true)
                    setIsLoading(false)
                }
            });
    }

    return (
        <Container className="loginContainer">
            <Card className="cardLogin">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Token</Form.Label>
                            <Form.Control required="true" placeholder="Entre com o token" onChange={tokenChange} />
                        </Form.Group>
                        <p></p>
                        <Alert show={show} variant="danger">
                            Token Errado!
                        </Alert>
                        <p></p>
                        <Button type="submit" variant="primary" disabled={isLoading == true ? true : false}>
                            <span>Entrar </span>
                            {isLoading == true ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : ''}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}