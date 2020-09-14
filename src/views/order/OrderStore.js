import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Card, CardBody, Badge} from "shards-react";  
import PageTitle from '../../components/common/PageTitle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import Loader from '../Loader';
const {kakao} = window;

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
      setLoading(false);
      setStores(data.stores);
    })
  }, []);

  useEffect(() => {
    if(loading) return;
    
    // 지도 그리기
    const container = document.getElementById("map");
    const options = {
        center: new kakao.maps.LatLng('37.4873275895417', '127.014465676374'),
        level: 7,
    };
    const map = new kakao.maps.Map(container, options);

    // 마커 추가하기
    const geocoder = new kakao.maps.services.Geocoder();

    console.log(stores);
    stores.map(store => {
      geocoder.addressSearch(store.address, (res, status) => {
        if(status === "OK") {
          // 해당 위치 마커로 표시
          const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(res[0].y, res[0].x),
              map: map,
          });

          // 마커 클릭시 주문 화면으로
          kakao.maps.event.addListener(marker, 'click', function() {
            history.push(`/ordermenu?id=${store._id}`);
          });
        }
      })
    })
  }, [stores])
    
  return loading ? <Loader loading={loading} /> : (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="매장 선택" subtitle="주문하기" className="text-sm-left" />
      </Row>

      <Row>
        <Col id="map" lg="6" sm="12" style={{height: '300px'}} className="mb-5">
        </Col>

        <Col lg="6" sm="12">
          <Row>
            {stores.map((store, idx) => (
              <Col sm="6" className="mb-4" key={idx} onClick={() => moveMenu(store._id)}>
                <Card small className="card-post card-post--1">
                  <div className="card-post__image" style={{ backgroundImage: `url(/api/upload/${store.account})` }}>
                    <Badge pill className={`card-post__category bg-dark`}
                    >{store.category}</Badge>
                  </div>
                  <CardBody>
                    <Row>
                    <Col sm="8">
                    <h5 className="card-title">{store.name}</h5>
                    </Col>
                    <Col sm="4">
                    <FontAwesomeIcon icon={faSearchLocation} color="black" size="2x" />
                    </Col>
                    </Row>
                    <p className="card-text d-block mt-3">{store.address}</p>
                    
                    <p className="card-text d-block">
                      영업시간
                      {store.open && store.close &&
                        <span>　　{store.open} ~ {store.close}</span>
                      }
                    </p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}