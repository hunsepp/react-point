import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, CardBody, Button} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import axios from 'axios';
import {Link} from 'react-router-dom';
import {formatDate, pointType, comma} from '../../utils/common';
import Loader from '../Loader';

export default function OrderList({history}) {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 주문 상세보기
    const orderInfo = id => {
        history.push(`/order?id=${id}`);
    }

    useEffect(() => {
        // 액세스 토큰으로 유저 정보 확인, 없을 경우 로그인 화면으로 이동
        const access = localStorage.getItem('userAccessToken');
        axios.get(`/api/kakao/${access}`)
        .then(({data}) => {
            if(data.result == 0 || !data.kuser) return history.push('/login');
            else {
                // 유저 어드레스로 주문 기록 가져오기
                axios.get(`/api/order/list/${data.kuser.address}`)
                .then(({data}) => {
                    if(data.result == 1) {
                        setOrderList(data.orderList);
                        setLoading(false);
                    } else console.log(data);
                })
            }
        })
    }, [])

    return loading ? <Loader loading={loading} /> : (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    sm="4"
                    title="주문내역"
                    className="text-sm-left"
                />
            </Row>

            <Row>
                <Col lg="12" className="mb-4">
                    <Card small className="mb-4">
                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="border-0">주문 매장</th>
                                        <th scope="col" className="border-0">주문일</th>
                                        <th scope="col" className="border-0">구분</th>
                                        <th scope="col" className="border-0">포인트</th>
                                        <th scope="col" className="border-0">주문 총액</th>
                                        <th scope="col" className="border-0">주문 상세</th>
                                        <th scope="col" className="border-0">Tx</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {orderList?.map((order) => {
                                    return (
                                        <tr key={order._id}>
                                            <td>
                                                <Link to={`/ordermenu?id=${order.store._id}`}>
                                                    {order.store.name}
                                                </Link>
                                            </td>
                                            <td>{formatDate(order.create)}</td>
                                            <td>{pointType(order.point)}</td>
                                            <td>{comma(order.point)}KUN</td>
                                            <td>{comma(order.total)}원</td>
                                            <td>
                                                <Button theme="secondary" onClick={() => orderInfo(order._id)}>확인</Button>
                                            </td>
                                            <td>
                                                <a href={`https://baobab.scope.klaytn.com/tx/${order.txHash}`} target="_blank">
                                                    <Button theme="secondary" outline>확인</Button>
                                                </a>
                                            </td>
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
    )
}