import { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import "./CustomCard.css"


export default function EditParametersModal(props) {
    const [text, setText] = useState("");
    const [intValue, setIntValue] = useState("");
    const [boolValue, setBoolValue] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const textChange = event => {
        setText(event.target.value);
    }

    const boolChange = event => {
        setBoolValue(event.target.value);
    }

    const intChange = event => {
        console.log(event.target.value)
        setIntValue(event.target.value);
    }

    const statusChange = event => {
        setStatus(event.target.value);
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const editParameters = {
            name: props.data.name,
            activated: status || props.data.activated,
            value: text || props.data.value,
            bool_value: boolValue || props.data.bool_value,
            int_value: intValue || props.data.int_value,
        }
        axiosInstance.put(Endpoints.parameters.editParameter(props.data.id), editParameters)
            .then((res) => {
                setIsLoading(false)
                props.update()
                props.onHide()
            }
            )
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.head}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modalBodyCustom">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" disabled defaultValue={props.data.name} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Valor texto</Form.Label>
                        <Form.Control type="text" defaultValue={props.data.value} onChange={textChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Valor boleano</Form.Label>
                        <Form.Control type="text" defaultValue={props.data.bool_value} onChange={boolChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>valor numérico</Form.Label>
                        <Form.Control type="text" defaultValue={props.data.int_value} onChange={intChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ativado</Form.Label>
                        <Form.Control type="text" defaultValue={props.data.activated} onChange={statusChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {isLoading === true ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : 'Salvar'}
                    </Button>{' '}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    )
}
