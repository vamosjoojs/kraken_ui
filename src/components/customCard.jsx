import React, { useEffect, useState } from "react";

import { Container, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import "./CustomCard.css"

export default (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [key, setKey] = useState();
  const [twitterBots, setTwitterBots] = useState([]);

  useEffect(() => {
    axiosInstance.get(Endpoints.twitter.getBots())
      .then(res => {
        setTwitterBots(res.data)
      })
  }, [])

  const lis = twitterBots.map(item => {
    return (
      <Tab eventKey={item.twitter_handle} title={item.twitter_handle}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Twitter handle</Form.Label>
            <Form.Control type="text" disabled defaultValue={item.twitter_handle} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Oauth token</Form.Label>
            <Form.Control type="text" disabled defaultValue={item.oauth_token} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Oauth secret</Form.Label>
            <Form.Control type="password" disabled defaultValue={item.oauth_secret} />
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
            <Form.Label>Tag</Form.Label>
            <Form.Control type="text" disabled defaultValue={item.tag} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} disabled defaultValue={item.message} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Activated</Form.Label>
            <Form.Control type="text" disabled defaultValue={item.activated} />
          </Form.Group>
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