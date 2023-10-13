import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { axiosInstance } from "../../api";
import { Endpoints } from "../../api/endpoints";
import EditParametersModal from "../../components/modalEditParameters";
import "./Parameters.css"

export default function Parameters() {
    const [parameters, setParameters] = useState([]);
    const [updateTable, setUpdateTable] = useState(false)

    
    useEffect(() => {
        axiosInstance.get(Endpoints.parameters.getParameters())
            .then(res => {
                setParameters(res.data)
            })
    }, [updateTable])

    function ModalEdit(props) {
        const [modalShow, setModalShow] = React.useState(false);
        setUpdateTable(false)
        return (
            <>
                <Button className={props.classname} onClick={() => setModalShow(true)}>
                    <i className={props.simbol}></i> {props.modalName}
                </Button>
                <EditParametersModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    head={props.name}
                    data={props.data}
                    update={() => setUpdateTable(true)}
                />
            </>
        );
    }

    const lis = parameters.map(item => {
        {
            return (
                <tr>
                    <td className='td1'>{item.name}</td>
                    <td className='td1'>{item.activated}</td>
                    <td className='td1'>{item.value}</td>
                    <td className='td1'>{item.bool_value}</td>
                    <td className='td1'>{item.int_value}</td>
                    <td className='td1'>{<ModalEdit modalName='Editar' data={item} name={item.name}></ModalEdit>}</td>
                </tr>
            )
        }
    })

    return (
        <Container className='postPage'>
            <div className="cardPost">
                <Table hover className="table" variant="dark">
                    <thead>
                        <tr className='tr'>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Valor</th>
                            <th>Valor booleano</th>
                            <th>Valor numerico</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lis}
                    </tbody>
                </Table>
            </div>
        </Container>);
};



