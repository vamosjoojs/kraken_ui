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
  const [disabled, setDisabled] = useState(true);

  const tagChange = event => {
    setTag(event.target.value);
  }


  useEffect(() => {
    axiosInstance.get(Endpoints.twitter.getBots())
      .then(res => {
        setTwitterBots(res.data)
      })
  }, [])

  // useEffect(() => {
  //   const editBots = {
  //     twitter_handle: "string",
  //     oauth_token: "string",
  //     oauth_secret: "string",
  //     consumer_key: "string",
  //     consumer_secret: "string",
  //     tag: tag,
  //     message: "string",
  //     activated: true
  //   }
  //   axiosInstance.put(Endpoints.twitter.editBots(), editBots)
  //     .then()
  // }, [tagChange])

  const lis = twitterBots.map(item => {
    return (
      <Tab eventKey={item.twitter_handle} title={item.twitter_handle}>
        <Badge pill bg="info">
          Total de usuários enviados: {item.total_sended}
        </Badge>{' '}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Twitter handle</Form.Label>
            <Form.Control type="text" disabled defaultValue={item.twitter_handle} />
          </Form.Group>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              defaultValue={item.tag}
              onChange={tagChange}
              disabled={disabled}
            />
            <Button onClick={() => setDisabled(false)} variant="outline-secondary" id="button-addon2">
              <i class="fa-solid fa-pen"></i>
            </Button>
          </InputGroup>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} disabled defaultValue={item.message} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Activated</Form.Label>
            <Form.Control type="text" disabled defaultValue={item.activated} />
          </Form.Group>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Chaves e Conexões</Accordion.Header>
              <Accordion.Body>
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
          <p></p>
          <Button disabled={disabled} variant="primary" type="submit">
            Salvar
          </Button>
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