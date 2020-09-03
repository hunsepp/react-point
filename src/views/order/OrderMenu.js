import React, {useState, useEffect} from 'react';
import qs from 'qs';
import axios from 'axios';
import {Container, Row, Col, Card, CardBody, CardHeader, Button, CardFooter} from "shards-react";
import PageTitle from '../../components/common/PageTitle';
import americano from '../../images/coffee_Img/americano.png';
import caffeLatte from '../../images/coffee_Img/caffeLatte.jpg';
import espresso from '../../images/coffee_Img/espresso.jpg';

export default function({location, history}) {
    const [menuList, setMenuList] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState();
    const imgList = [americano, caffeLatte, espresso];
    let user;

    // 선택한 메뉴 추가
    const menuSelect = menu => {
        // 선택된 메뉴 금액 총 금액에 추가
        setTotal(prev => prev + parseInt(menu.price));

        // 이미 선택한 메뉴일 때 개수만 추가
        if(selectList.includes(menu)) {
            const changeList = selectList.filter((select) => {
                if(select.name == menu.name) {
                    select.count++;
                    return select
                } else {
                    return select;
                }
            })
            setSelectList(changeList);
            
        // 선택되지 않은 메뉴일 때 리스트에 추가
        } else {
            menu.count = 1;
            setSelectList(prev => prev.concat(menu))
        }        
    }

    // 선택한 메뉴 모두 없애고 총 가격 0으로
    const clearMenu = () => {
        setSelectList([]);
        setTotal(0);
    }

    // 주문하기
    const orderMenu = () => {
        if(selectList.length == 0) return;
        if(!address) return;

        axios.post('/api/order', {selectList, total, address})
        .then(({data}) => {
            if(data.result ==1) {
                history.push(`/order?id=${data.order}`)
            } else {
                console.log(data);
            }
        })
    }

    useEffect(() => {
        // 액세스 토큰으로 유저 정보 확인, 없을 경우 로그인 화면으로 이동
        const access = localStorage.getItem('userAccessToken');
        axios.get(`/api/kakao/${access}`)
        .then(({data}) => {
            if(data.result == 0 || !data.kuser) return history.push('/login');
            else {
                setAddress((data.kuser.address));
            }
        })

        // 매장 id로 메뉴 목록 가져오기, 매장 id가 없을시 매장 선택화면으로 이동
        const query = qs.parse(location.search, {ignoreQueryPrefix: true});
        if(!query.id) history.push('/orderstore');
        
        axios.get(`/api/menu/${query.id}`)
        .then(({data}) => {
            setMenuList(data.menus);
        })
    }, [])

    return (
        <Container fluid className="main-content-container px-4">
            <Col lg="6" md="12" className="mb-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="메뉴 선택" subtitle="주문하기" className="text-sm-left" />
                </Row>

                <Row>
                    {menuList.map((menu, idx) => (
                        <Col lg="6" sm="12" className="mb-4" key={idx} onClick={() => menuSelect(menu)}>
                            <Card small className="card-post card-post--aside card-post--1">
                                <div className="card-post__image" style={{ backgroundImage: `url('${imgList[idx]}')` }}></div>

                                <CardBody>
                                    <h5 className="card-title">{menu.name}</h5>
                                    <p className="card-text d-block mb-3">　</p>
                                    <span className="text-muted">{menu.price}원</span>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>

            <Col lg="6" md="12" className="mb-4">
                <Card small className="mb-4">
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">주문 목록</h6>
                    </CardHeader>
                    <CardBody>
                        {selectList.map((select, idx) => (
                            <Row key={idx}>
                                <Col className="ml-auto">{select.name} {select.count}</Col>
                                <Col className="d-flex px-3 border-0 ">
                                    <p className="ml-auto">{select.price * select.count}원</p>
                                </Col>
                            </Row>
                        ))}

                        {selectList.length == 0 ?
                            <h5 className="card-title text-center">주문할 제품을 선택해주세요</h5>
                        :
                            <h5 className="card-title text-center">총 금액 : {total}</h5>
                        }
                    </CardBody>

                    <CardFooter>
                        <Row>
                            <Col>
                                <Button theme="secondary" outline size="sm" className="ml-auto" onClick={clearMenu}>비우기</Button>
                            </Col>
                            <Col className="d-flex px-3 border-0">
                                <Button theme="secondary" size="sm" className="ml-auto" onClick={orderMenu}>주문하기</Button>
                            </Col>
                        </Row>
                    </CardFooter>
                </Card>
            </Col>
        </Container>
    )
}