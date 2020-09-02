import React, {useEffect, useState} from 'react';
import KaKaoBtn from 'react-kakao-login';
import axios from 'axios';
import {Container, Row, Col, Card, CardHeader, CardBody, FormInput, Button, ListGroupItem} from "shards-react";
import PageTitle from "../components/common/PageTitle";

const useInput = (initialState) => {
    const [value, setValue] = useState(initialState);
    const onChange = e => setValue(e.target.value);
    const reset = initialState => setValue(initialState);
    return {value, onChange, reset};
}

export default function Menu() {
    const [store, setStore] = useState();
    const [menuList, setMenuList] = useState();

    const menuName = useInput('');
    const menuPrice = useInput(0);

    // 카카오 연동/로그인
    const login = res => {
        axios.post('/api/store', res).then(({data}) => {
            if(data.result == 1) {
                localStorage.setItem('storeToken', res.response.access_token);
                setStore(data.store);
                getMenuList(data.store.kakaoId);
            }
        })
    }

    // 메뉴 등록
    const menuAdd = () => {
        if(store.approve != "승인") return alert('승인 후 시도해주세요.');

        axios.post('/api/menu', {
            kakaoId: store.kakaoId,
            name: menuName.value,
            price: menuPrice.value
        }).then(({data}) => {
            if(data.result == 0) return;
            
            getMenuList(store.kakaoId);
            menuName.reset('');
            menuPrice.reset(0);
        });
    }

    // 메뉴 삭제
    const menuDel = id => {
        if(store.approve != "승인") return alert('승인 후 시도해주세요.');

        axios.delete(`/api/menu/${id}`).then(({data}) => {
            if(data.result == 0) return;
            getMenuList(store.kakaoId);
        })
    }

    // 메뉴 목록
    const getMenuList = id => {
        axios.get(`/api/menu/${id}`).then(({data}) => {
            if(data.result == 1) setMenuList(data.menus);
        });
    }

    // 액세스 토큰이 있을 경우 계정 정보 받아오기
    useEffect(() => {
        const token = localStorage.getItem('storeToken');
        axios.get(`/api/store/${token}`).then(({data}) => {
            if(data.result == 0) return;
            setStore(data.store);            

            // 계정 정보가 있을 경우 메뉴 정보 받아오기
            getMenuList(data.store.kakaoId);
        });
    }, [])

    return (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle
                sm="4"
                title="메뉴관리"
                className="text-sm-left"
            />
        </Row>

        {store?.account ?
            <Row>
                <Col lg="6" md="12" className="mb-4">
                    <Card small>
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">메뉴관리</h6>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col lg="6" md="12" className="form-group">
                                    <label htmlFor="menu-name">메뉴명</label>
                                    <FormInput id="menu-name" type="text" {...menuName} />
                                </Col>
                                <Col lg="6" md="12" className="form-group">
                                    <label htmlFor="menu-price">가격</label>
                                    <FormInput id="menu-price" type="number" {...menuPrice} />
                                </Col>
                                <Col className="d-flex px-3 border-0">
                                    <Button theme="secondary" size="sm" className="ml-auto" onClick={menuAdd}>등록</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg="6" md="12" className="mb-4">
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <h6 className="m-0">메뉴목록</h6>
                        </CardHeader>
                        <CardBody className="p-0 pb-3">
                            <table className="table mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">메뉴명</th>
                                        <th scope="col" className="border-0">가격</th>
                                        <th scope="col" className="border-0">기능</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {menuList?.map((menu) => {
                                    return (
                                        <tr key={menu._id}>
                                            <td>{menu.name}</td>
                                            <td>{menu.price}</td>
                                            <td><Button outline theme="secondary" size="sm" onClick={() => menuDel(menu._id)}>삭제</Button></td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
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