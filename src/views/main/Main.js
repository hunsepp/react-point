import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, CardBody, CardImg } from "shards-react";
import styled from "styled-components";
import main1 from "../../images/main1.jpg";
import main2 from "../../images/main2.jpg";
  
// export default function Slide({ img }) {
//   return <CardImg top src={img} />;
// }

const main = () => (
  <Container fluid className="main-content-container px-4">
    <link
      href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap"
      rel="stylesheet"
    ></link>
    <div>
      <br />
    </div>
    <Card>
      <CardImg
        top
        src={main2}
        style={{
          width: "100%",
          height: "75vh",
        }}
      />
      <CardBody
        style={{
          color: "brown",
          fontSize: "large",
          fontWeight: "bold",
          fontFamily: "Nanum Myeongjo, serif",
          opacity: 1.0,
        }}
      >
        kunité에서 다양한 적립 서비스를 즐겨보세요! ^__^
      </CardBody>
    </Card>
  </Container>
);

export default main;
