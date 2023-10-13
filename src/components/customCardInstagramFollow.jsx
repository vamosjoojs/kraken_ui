import React, { useEffect, useState } from "react";

import { Accordion, Badge, Button, Container, Form, FormControl, FormLabel, InputGroup, Modal, Tab, Tabs } from "react-bootstrap";
import { axiosInstance } from "../api";
import { Endpoints } from "../api/endpoints";
import "./CustomCard.css"

export default (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [key, setKey] = useState();
  const [instagramBots, setInstagramBots] = useState([]);
  const [tag, setTag] = useState("");
  const [resultType, setResultType] = useState("");
  const [isActive, setisActive] = useState("");
  const [edit, setEdit] = useState("");
  const [disabled, setDisabled] = useState(true);

  const tagChange = event => {
    setTag(event.target.value);
  }
  const isActiveChange = event => {
    setisActive(event.target.value);
  }
  const resultTypeChange = event => {
    setResultType(event.target.value);
  }


  useEffect(() => {
    axiosInstance.get(Endpoints.instagram.getFollow())
      .then(res => {
        setInstagramBots(res.data)
      })
  }, [])

  // useEffect(() => {
  //   const editBots = {
  //     twitter_handle: edit.twitter_handle,
  //     tag: tag || edit.tag,
  //     result_type: resultType || edit.result_type,
  //   }
  //   if (edit !== "") {
  //     axiosInstance.put(Endpoints.twitter.editBots(edit.id), editBots)
  //       .then(setDisabled(true))
  //   }
  // }, [edit])


  const lis = instagramBots.map(item => {
    return (
      <Tab eventKey={item.instagram_handle} title={item.instagram_handle}>
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
            <Form.Label>Ativado</Form.Label>
            <Form.Control type="text" disabled={disabled} defaultValue={item.activated} onChange={isActiveChange} />
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
          <h3>
            Bot de follow e unfollow no Instagram
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