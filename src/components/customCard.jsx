import React, { useEffect, useState } from "react";

import { Accordion, Badge, Button, Container, Form, FormControl, FormLabel, InputGroup, Modal, Tab, Tabs } from "react-bootstrap";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import "./CustomCard.css"

export default (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [key, setKey] = useState();
  const [twitterBots, setTwitterBots] = useState([]);
  const [tag, setTag] = useState("");
  const [resultType, setResultType] = useState("");
  const [message, setMessage] = useState("");
  const [isActive, setisActive] = useState("");
  const [edit, setEdit] = useState("");
  const [disabled, setDisabled] = useState(true);

  const tagChange = event => {
    setTag(event.target.value);
  }
  const messageChange = event => {
    setMessage(event.target.value);
  }
  const isActiveChange = event => {
    setisActive(event.target.value);
  }
  const resultTypeChange = event => {
    setResultType(event.target.value);
  }


  useEffect(() => {
    axiosInstance.get(Endpoints.twitter.getBots())
      .then(res => {
        setTwitterBots(res.data)
      })
  }, [])

  useEffect(() => {
    const editBots = {
      twitter_handle: edit.twitter_handle,
      oauth_token: edit.oauth_token,
      oauth_secret: edit.oauth_secret,
      consumer_key: edit.consumer_key,
      consumer_secret: edit.consumer_secret,
      tag: tag || edit.tag,
      result_type: resultType || edit.result_type,
      message: message || edit.message,
      activated: isActive || edit.activated
    }
    if (edit !== "") {
      axiosInstance.put(Endpoints.twitter.editBots(edit.id), editBots)
        .then(setDisabled(true))
    }
  }, [edit])


  const lis = twitterBots.map(item => {
    return (
      <Tab eventKey={item.twitter_handle} title={item.twitter_handle}>
        <Badge pill bg="info">
          Total de usuários enviados: {item.total_sended}
        </Badge>{' '}
        <Form>
          <div className="buttonsForm">
            {
              disabled === true ? <>
                <Button style={{ margin: "5px" }} variant="dark" onClick={() => setDisabled(false)}>
                  Editar <i class="fa-solid fa-pen"></i>
                </Button>
              </> :
                <>
                  <Button style={{ margin: "5px" }} variant="dark" onClick={() => setEdit(item)}>
                    Salvar <i class="fa-solid fa-check"></i>
                  </Button>
                  <Button style={{ margin: "5px" }} variant="dark" onClick={() => setDisabled(true)}>
                    Cancelar edição
                  </Button>
                </>
            }
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tag</Form.Label>
            <Form.Control type="text" disabled={disabled} defaultValue={item.tag} onChange={tagChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Result type</Form.Label>
            <Form.Control type="text" disabled={disabled} defaultValue={item.result_type} onChange={resultTypeChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Mensagem</Form.Label>
            <Form.Control as="textarea" rows={4} disabled={disabled} defaultValue={item.message} onChange={messageChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ativado</Form.Label>
            <Form.Control type="text" disabled={disabled} defaultValue={item.activated} onChange={isActiveChange} />
          </Form.Group>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Chaves e Conexões</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Twitter handle</Form.Label>
                  <Form.Control type="text" disabled defaultValue={item.twitter_handle} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Consumer key</Form.Label>
                  <Form.Control type="text" disabled defaultValue={item.consumer_key} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Consumer secret</Form.Label>
                  <Form.Control type="password" disabled defaultValue={item.consumer_secret} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Oauth token</Form.Label>
                  <Form.Control type="text" disabled defaultValue={item.oauth_token} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Oauth secret</Form.Label>
                  <Form.Control type="password" disabled defaultValue={item.oauth_secret} />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Form>
      </Tab>
    )
  })

  return (
    <Container>
      <div class="col-lg-6 col-md-12">
        <div onClick={() => setModalShow(true)} class="card" id="customCard">
          <div class="card-content">
            <div class="card-body cleartfix">
              <div class="media align-items-stretch">
                <div class="align-self-center">
                  <h2 class="mr-2" id="fontColors">{props.children}</h2>
                </div>
                <div class="media-body">
                  <h4 id="fontColors">{props.title}</h4>
                  <span id="fontColors">{props.subTitle}</span>
                </div>
                <div class="align-self-center">
                  <i class={props.icon}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton onHide={() => setModalShow(false)}>
          <h3>
            Bot de envio de mensagens no Twitter
          </h3>

        </Modal.Header>
        <Modal.Body className="modalBodyCustom">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            {lis}
          </Tabs>
        </Modal.Body>
      </Modal>
    </Container>
  );
};