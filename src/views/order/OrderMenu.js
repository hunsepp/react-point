import React, {useState, useEffect} from 'react';
import qs from 'qs';
import axios from 'axios';
import {InputGroup, 
    Container, 
    Row, 
    Col, 
    Card, 
    CardBody, 
    CardHeader, 
    Button, 
    Modal,
    ModalHeader,
    ModalBody,
    CardFooter,
    InputGroupText,
    InputGroupAddon,
    CardImg,
    ButtonGroup,
    ButtonToolbar,
    FormInput,
    ListGroup,
    ListGroupItem
} from "shards-react";
import PageTitle from '../../components/common/PageTitle';
import americano from '../../images/coffee_Img/americano.png';
import caffeLatte from '../../images/coffee_Img/caffeLatte.jpg';
import espresso from '../../images/coffee_Img/espresso.jpg';
import Loader from '../Loader';
import {useInput} from '../../utils/common';
import { PropagateLoader } from 'react-spinners';

const menuName = {
    color:"DarkSeaGreen",
    fontSize: "1.3rem"
}

const pointBtn = {
    borderRadius: ".25rem"
}

const point2 = {
    color : "red"
}

export default function({location, history}) {
    const [menuList, setMenuList] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState();
    const imgList = [americano, caffeLatte, espresso];
    const [loading, setLoading] = useState(true);
    const [store, setStore] = useState();
    const point = useInput();
    const [pointUsed, setPointUsed] = useState(false)

    // 선택한 메뉴 추가
    const menuSelect = menu => {
        // 선택된 메뉴 금액 총 금액에 추가
        setTotal(prev => prev + parseInt(menu.price));
    
        // 이미 선택한 메뉴일 때 개수만 추가
        if(selectList.includes(menu)) {
            const changeList = selectList.filter((select) => {
                if(select.name == menu.name) {
                    select.count++;
                }
                
                return select;
            })
            setSelectList(changeList);
            
        // 선택되지 않은 메뉴일 때 리스트에 추가
        } else {
            menu.count = 1;
            setSelectList(prev => prev.concat(menu))
        }        
    }
    
    // 선택한 메뉴 빼기
    const menuMinus = menu => {
        // 선택된 메뉴 금액 총 금액에 빼기
        setTotal(prev => prev - parseInt(menu.price));
    
        const changeList = selectList.filter((select) => {
            if(select.name == menu.name) {
                if(select.count > 1) {
                    return select.count--
                }
            }else {
                return select;
            }
        })
        setSelectList(changeList);
    }

    // 선택한 메뉴 모두 없애고 총 가격 0으로
    const clearMenu = () => {
        setSelectList([]);
        setTotal(0);
    }

    // 포인트 사용
    const usingPoint = () => {
        setPointUsed(true);
        setTotal(prev => prev - point.value);
    }

    // 주문하기
    const orderMenu = () => {
        if(selectList.length == 0) return;
        if(!address) return;
        if(!window.confirm('정말 주문하시겠습니까?')) return;

        axios.post('/api/order', {selectList, total, address, point: point.value})
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
            setStore(data.menus[0].store);
            setLoading(false);
        })
    }, [])

    return loading ? <Loader loading={loading} /> : (
        <Container fluid className="main-content-container px-4">
            <Row>
                <Col lg="6" md="12" className="mb-4">
                    <Card small className="card-post card-post--1">
                        <div
                        className="card-post__image"
                        style={{
                            backgroundImage: `url(${require("../../images/content-management/9.jpeg")})`,
                        }}
                        ></div>

                        <CardBody>
                        <h5 className="card-title">{store?.name}</h5>

                        <ListGroup small flush className="list-group-small">
                            <ListGroupItem className="d-flex px-3 border-top border-bottom">
                            <span className="text-semibold text-fiord-blue">상태</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">
                                {store?.approve}
                            </span>
                            </ListGroupItem>
                        </ListGroup>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg="6" sm="12" className="mb-4">
                    <Row>
                        {menuList.map((menu, idx) => (
                            <Col sm="6" className="mb-4" key={idx} >
                                <Card>
                                    <div className="card-post__image" style={{ backgroundImage: `url('${imgList[idx]}')` }}></div>
                                    <CardFooter>
                                        <p style={menuName} className="card-title">{menu.name}</p>
                                        <span className="text-muted">{menu.price}원</span>
                                        <Button pill theme="warning" size="sm" onClick={() => menuSelect(menu)}>담기</Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col lg="6" md="12" className="mb-4">
                    <Card small className="mb-4" >
                        {!pointUsed &&
                            <CardHeader className="border-bottom">
                                <p className="m-0 text-center">주문 목록(적립예정쿤) </p>
                                <p className="m-0 text-center" style={point2}>{total/100}</p>
                            </CardHeader>
                        }
                        <CardBody>
                            {selectList.map((select, idx) => (
                                <Row key={idx}>
                                    <Col className="ml-auto">{select.name} {select.count}</Col>
                                    <Col className="d-flex px-3 border-0 ">
                                    <p className="ml-auto">{select.price * select.count}원</p>
                                    <ButtonGroup size="sm" className="mr-2">
                                        <Button onClick={() => menuSelect(select)}>+</Button>
                                        <Button theme="danger" onClick={() => menuMinus(select)}>-</Button>
                                    </ButtonGroup>
                                    </Col>
                                </Row>
                            ))}
                            {selectList.length == 0 ?
                                <h5 className="card-title text-center">주문할 제품을 선택해주세요</h5>
                            :
                                <h5 className="card-title text-center">총 금액 : {total}</h5>
                            }
                        </CardBody>

                            <Col>                                
                                <Button pill size="sm" onClick={usingPoint} disabled={pointUsed}>포인트사용</Button>사용가능한 포인트 : 
                                <FormInput type="number" placeholder="금액을 입력해주세요." {...point} disabled={pointUsed} />
                            </Col>
                        
                            <Col>
                                <Button pill theme="success" size="sm" >요청사항</Button>
                                <FormInput placeholder="예) 휘핑 많이 올려주세요~"/>
                            </Col>

                        <CardFooter>
                            <Row>
                                <Col>
                                    <Button block theme="secondary" className="ml-auto" onClick={clearMenu}>비우기</Button>
                                </Col>                            
                            </Row>
                            <Row>
                                <Col className="d-flex px-3 border-0">
                                    <Button block className="ml-auto" onClick={orderMenu}>주문하기</Button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}