import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, CardBody, Button} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import axios from 'axios';
import Loader from '../Loader';

export default function StoreApprove({history}) {
    const [storeList, setStoreList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 매장 승인 처리
    const approve = id => {
        setLoading(true);
        
        axios.put(`/api/approve`, {id})
        .then(({data}) => {
            if(data.result == 1) getStoreList();
        })
    }

    // 승인 요청 중인 매장 목록 불러오기
    const getStoreList = () => {
        axios.get(`/api/approve`)
        .then(({data}) => {
            setStoreList(data.stores);
            setLoading(false);
        });
    }

    // 액세스 토큰이 있을 경우 계정 정보 받아오기
    useEffect(() => {
        const token = localStorage.getItem('storeToken');
        axios.get(`/api/store/${token}`)
        .then(({data}) => {
            if(data.result == 0 || !data.store) return history.push('/storelogin');

            // 계정 정보가 있을 경우 승인 요청 중인 매장목록 받아오기
            getStoreList();
        });
    }, [])

    return loading ? <Loader loading={loading} /> : (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    sm="4"
                    title="매장승인"
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
                                        <th scope="col" className="border-0">매장명</th>
                                        <th scope="col" className="border-0">업종</th>
                                        {/* <th scope="col" className="border-0">전화번호</th> */}
                                        <th scope="col" className="border-0">승인여부</th>
                                        <th scope="col" className="border-0">사업자등록증</th>
                                        <th scope="col" className="border-0">기능</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storeList.map(store => {
                                        return (
                                            <tr key={store._id}>
                                                <td>{store.name}</td>
                                                <td>{store.category}</td>
                                                {/* <td>2</td> */}
                                                <td>{store.approve}</td>
                                                <td><Button theme="secondary" outline disabled>보기</Button></td>
                                                <td><Button theme="secondary" onClick={() => approve(store._id)}>승인</Button></td>
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