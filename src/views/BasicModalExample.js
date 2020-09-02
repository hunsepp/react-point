import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";

export default class BasicModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const { open } = this.state;
    return (
      <center>
        <Button theme="success" onClick={this.toggle}>주문하기</Button>
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader>포인트 적립완료!</ModalHeader>
          <ModalBody>👋 이용해주셔서 감사합니다!</ModalBody>
        </Modal>
      </center>
    );
  }
}