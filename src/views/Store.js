import React, {useEffect, useState} from 'react';
import KaKaoBtn from 'react-kakao-login';
import axios from 'axios';
import {Container, Row, Col, Card, CardHeader, CardBody, FormInput, Button, ListGroup, ListGroupItem, FormTextarea} from "shards-react";
import PageTitle from "../components/common/PageTitle";

const useInput = (initialState) => {
    const [value, setValue] = useState(initialState);
    const onChange = e => setValue(e.target.value);
    const reset = initialState => setValue(initialState);
    return {value, onChange, reset};
}

export default function Store() {
    const [store, setStore] = useState();
    const name = useInput();
    const category = useInput();
    const address = useInput();
    const discription = useInput();

    // 카카오 연동/로그인
    const login = res => {
        axios.post('/api/store', res)
        .then(({data}) => {
            if(data.result == 1) {
                localStorage.setItem('storeToken', res.response.access_token);
                setStore(data.store);
            } else {
                console.log(data)
            }
        })
    }

    // 매장 정보 수정
    const storeMod = () => {
        axios.put(`/api/store/${store.account}`, {
            name: name.value,
            category: category.value,
            address: address.value,
            discription: discription.value,
            approve: "승인"
        })
        .then(({data}) => {
            if(data.result == 1) setStore(data.store);
        })
    }

    // 기존에 등록된 매장 정보 입력값에 출력
    const storeInfo = (info) => {
        setStore(info);
        if(info.name) name.reset(info.name);        
        if(info.category) category.reset(info.category);        
        if(info.address) address.reset(info.address);        
        if(info.discription) discription.reset(info.discription);        
    }

    // 액세스 토큰이 있을 경우 계정 정보 받아오기
    useEffect(() => {
        const token = localStorage.getItem('storeToken');
        axios.get(`/api/store/${token}`)
        .then(({data}) => {
            if(data.result == 0 || !data.store) return;
            storeInfo(data.store);
        });
    }, [])

    return (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle
                sm="4"
                title="매장관리"
                className="text-sm-left"
            />
        </Row>

        {store?.account ?
            <Row>
                <Col lg="6" md="12" className="mb-4">
                    <Card small className="card-post card-post--1">
                        <div
                        className="card-post__image"
                        style={{ backgroundImage: `url(${require("../images/content-management/9.jpeg")})` }}
                        >
                        </div>
                        <CardBody>
                            <h5 className="card-title">{store.name}</h5>

                            <ListGroup small flush className="list-group-small">
                                <ListGroupItem className="d-flex px-3">
                                    <span className="text-semibold text-fiord-blue">상태</span>
                                    <span className="ml-auto text-right text-semibold text-reagent-gray">{store.approve}</span>
                                </ListGroupItem>
                            </ListGroup>
                            <ListGroup small flush className="list-group-small" />
                        </CardBody>
                    </Card>
                </Col>

                <Col lg="6" md="12" className="mb-4">
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">매장 정보</h6>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="6" className="form-group">
                                    <label htmlFor="name">매장명</label>
                                    <FormInput id="name" type="text" {...name} />
                                </Col>
                                <Col md="6" className="form-group">
                                    <label htmlFor="category">업종</label>
                                    <FormInput id="category" type="text" {...category} />
                                </Col>
                                <Col md="12" className="form-group">
                                    <label htmlFor="address">주소</label>
                                    <FormInput id="address" type="text" {...address} />
                                </Col>
                                <Col md="12" className="form-group">
                                    <label htmlFor="description">매장 소개</label>
                                    <FormTextarea id="description" rows="5" {...discription} />
                                </Col>
                                <Col>
                                    <Button theme="secondary" outline size="sm" className="ml-auto" disabled>승인요청</Button>
                                </Col>
                                <Col className="d-flex px-3 border-0">
                                    <Button theme="secondary" size="sm" className="ml-auto" onClick={storeMod}>변경</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        :
            <KaKaoBtn
                jsKey={'e485f303b8a8927fd4c89c5b81705b9e'}
                buttonText='카카오 로그인'
                onSuccess={login}
                getProfile={true}
                useDefaultStyle
            />
        }
    </Container>
    )
}