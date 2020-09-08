import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Card, CardBody, Badge} from "shards-react";  
import PageTitle from '../../components/common/PageTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import Loader from '../Loader';

export default function OrderStore({history}){
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  // 메뉴 선택으로 이동
  const moveMenu = id => {
    history.push(`/ordermenu?id=${id}`);
  }

  // 매장 목록 가져오기
  useEffect(() => {
    axios.get('/api/store')
    .then(({data}) => {
      setStores(data.stores);
      setLoading(false);
    })
  }, []);
    
  return loading ? <Loader loading={loading} /> : (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="매장 선택" subtitle="주문하기" className="text-sm-left" />
      </Row>

      <Row>
        {stores.map((store, idx) => (
          <Col lg="3" md="6" sm="12" className="mb-4" key={idx} onClick={() => moveMenu(store._id)}>
            <Card small className="card-post card-post--1">
              <div className="card-post__image" style={{ backgroundImage: `url(${require("../../images/content-management/"+(idx+1)+".jpeg")})` }}>
                <Badge pill className={`card-post__category bg-dark`}
                >{store.category}</Badge>
              </div>
              <CardBody>
                <Row>
                <Col lg="8">
                <h5 className="card-title">{store.name}</h5>
                </Col>
                <Col lg="4">
                <FontAwesomeIcon icon={faSearchLocation} color="black" size="2x" />
                </Col>
                </Row>
                <p className="card-text d-block mb-3">{store.address}</p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}