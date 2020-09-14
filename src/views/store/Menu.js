import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Card, CardHeader, CardBody, FormInput, Button, FormSelect} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import {useInput} from '../../utils/common';
import Loader from '../Loader';

export default function Menu({history}) {
    const [store, setStore] = useState();
    const [menuList, setMenuList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    const menuName = useInput('');
    const menuCategory = useInput('');
    const menuPrice = useInput(0);

    // 메뉴 등록
    const menuAdd = () => {
        if(store.approve != "승인") return alert('승인 후 시도해주세요.');

        axios.post('/api/menu', {
            id: store._id,
            name: menuName.value,
            price: menuPrice.value,
            category: menuCategory.value
        }).then(({data}) => {
            if(data.result == 0) return;
            getMenuList(store._id);
        });
    }

    // 메뉴 삭제
    const menuDel = id => {
        if(store.approve != "승인") return alert('승인 후 시도해주세요.');

        axios.delete(`/api/menu/${id}`).then(({data}) => {
            if(data.result == 0) return;
            getMenuList(store._id);
        })
    }

    // 메뉴 목록
    const getMenuList = id => {
        axios.get(`/api/menu/${id}`).then(({data}) => {
            if(data.result == 1) {
                setMenuList(data.menus);
                setCategoryList(data.category);

                // 입력값 초기화
                menuName.reset('');
                menuPrice.reset(0);
                menuCategory.reset('');

                // 로딩 종료
                setLoading(false);
            };
        });
    }

    // 액세스 토큰이 있을 경우 계정 정보 받아오기
    useEffect(() => {
        const token = localStorage.getItem('storeToken');
        axios.get(`/api/store/${token}`).then(({data}) => {
            if(data.result == 0 || !data.store) return history.push('/storelogin');
            setStore(data.store);            

            // 계정 정보가 있을 경우 메뉴 정보 받아오기
            getMenuList(data.store._id);
        });
    }, [])

    return loading ? <Loader loading={loading} /> : (
    <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
            <PageTitle
                sm="4"
                title="메뉴관리"
                className="text-sm-left"
            />
        </Row>

        <Row>
            <Col lg="6" md="12" className="mb-4">
                <Card small>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">메뉴관리</h6>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm="12" className="form-group">
                                <label htmlFor="menu-name">메뉴명</label>
                                <FormInput id="menu-name" type="text" {...menuName} />
                            </Col>
                            <Col sm="12" className="form-group">
                                <label htmlFor="menu-category">카테고리</label>
                                <FormSelect id="feInputState" {...menuCategory}>
                                    <option value="">선택</option>
                                    {categoryList.map(category => {
                                        return <option>{category}</option>
                                    })}
                                </FormSelect>
                                <FormInput id="menu-category" type="text" {...menuCategory} />
                            </Col>
                            <Col sm="12" className="form-group">
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
                                    <th scope="col" className="border-0">카테고리</th>
                                    <th scope="col" className="border-0">가격</th>
                                    <th scope="col" className="border-0">기능</th>
                                </tr>
                            </thead>
                            <tbody>
                            {menuList.map((menu) => {
                                return (
                                    <tr key={menu._id}>
                                        <td>{menu.name}</td>
                                        <td>{menu.category}</td>
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
    </Container>
    )
}