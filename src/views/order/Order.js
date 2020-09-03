import React, {useState, useEffect} from 'react';
import qs from 'qs';
import axios from 'axios';
import {Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button} from "shards-react";
import PageTitle from "../../components/common/PageTitle";

export default function Order({location, history}) {
    const [order, setOrder] = useState();

    // 날짜 포맷 변경
    function formatDate(date) { 
        const d = new Date(date)
        const year = d.getFullYear(); 
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        
        if (month.length < 2) month = '0' + month; 
        if (day.length < 2) day = '0' + day; 
        
        return [year, month, day].join('-'); 
    }

    // 금액에 , 찍기
    function comma(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // 주문 정보 가져오기, 주문 id가 없을 경우 매장 선택화면으로 이동
    useEffect(() => {
        const query = qs.parse(location.search, {ignoreQueryPrefix: true});
        if(!query.id) return history.push('/orderstore');

        axios.get(`/api/order/${query.id}`)
        .then(({data}) => {
            if(!data.order) return history.push('/orderstore');
            setOrder(data.order);
        })
    }, [])

    return (
        <>
            {order &&
                <Container fluid className="main-content-container px-4">
            
            
                    <Row noGutters className="page-header py-4">
                        <PageTitle
                            sm="4"
                            title="주문서"
                            className="text-sm-left"
                        />
                    </Row>

                    <Row>
                        <Col lg="6" md="12" className="mb-4">
                            <Card small>
                                <CardHeader className="border-bottom">
                                    <h6 className="m-0">주문 정보</h6>
                                </CardHeader>

                                <CardBody>
                                    <Row>
                                        <Col className="ml-auto">매장명</Col>
                                        <Col className="d-flex px-3 border-0 ">
                                            <p className="ml-auto">{order.store.name}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="ml-auto">주문일</Col>
                                        <Col className="d-flex px-3 border-0 ">
                                            <p className="ml-auto">{formatDate(order.create)}</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="ml-auto">주문 총액</Col>
                                        <Col className="d-flex px-3 border-0 ">
                                            <p className="ml-auto">{comma(order.total)}원</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="ml-auto">적립 포인트</Col>
                                        <Col className="d-flex px-3 border-0 ">
                                            <p className="ml-auto">{order.point}KUN</p>
                                        </Col>
                                    </Row>
                                </CardBody>

                                <CardFooter className="border-top">
                                    <Row>
                                        <Col className="text-center view-report">
                                            <a href={`https://baobab.scope.klaytn.com/tx/${order.txHash}`} target="_blank">
                                                <Button theme="secondary">적립 TX 확인</Button>
                                            </a>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>

                        <Col lg="6" md="12" className="mb-4">
                            <Card small className="mb-4">
                                <CardHeader className="border-bottom">
                                    <h6 className="m-0">주문 품목</h6>
                                </CardHeader>
                                <CardBody className="p-0 pb-3">
                                    <table className="table mb-0">
                                        <thead className="bg-light">
                                            <tr>
                                                <th scope="col" className="border-0">메뉴명</th>
                                                <th scope="col" className="border-0">가격</th>
                                                <th scope="col" className="border-0">개수</th>
                                                <th scope="col" className="border-0">합계</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {order.menus.map((menu) => {
                                            return (
                                                <tr key={menu._id}>
                                                    <td>{menu.name}</td>
                                                    <td>{comma(menu.price)}원</td>
                                                    <td>{menu.count}</td>
                                                    <td>{comma(menu.price * menu.count)}원</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}