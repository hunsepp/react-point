import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import axios from 'axios';

export default function Point({history}) {
    const [pointList, setPointList] = useState([]);

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

    useEffect(() => {
        // 액세스 토큰으로 유저 정보 확인, 없을 경우 로그인 화면으로 이동
        const access = localStorage.getItem('userAccessToken');
        axios.get(`/api/kakao/${access}`)
        .then(({data}) => {
            if(data.result == 0 || !data.kuser) return history.push('/login');
            else {
                // 유저 어드레스로 토큰 히스토리 가져오기
                axios.get(`/api/point/${data.kuser.address}`)
                .then(({data}) => {
                    console.log(data.pointList)
                    if(data.result == 1) setPointList(data.pointList);
                    else console.log(data);
                })
            }
        })
    }, [])

    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    sm="4"
                    title="포인트 내역"
                    className="text-sm-left"
                />
            </Row>
            <Row>
                <Col lg="12" md="12" className="mb-4">
                    <Card small className="mb-4">
                        <CardHeader />

                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="border-0">구분</th>
                                        <th scope="col" className="border-0">날짜</th>
                                        <th scope="col" className="border-0">포인트</th>
                                        <th scope="col" className="border-0">기능</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {pointList?.map((point) => {
                                    let type;
                                    if(point.from == '0x0000000000000000000000000000000000000000') type = "적립";
                                    else type = "사용"
                                    return (
                                        <tr key={point.transactionHash}>
                                            <td>{type}</td>
                                            <td>{formatDate(point.timestamp * 1000)}</td>
                                            <td>{point.value} KUN</td>
                                            <td>
                                                <a href={`https://baobab.scope.klaytn.com/tx/${point.transactionHash}`} target="_blank">
                                                    <Button theme="secondary">확인</Button>
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