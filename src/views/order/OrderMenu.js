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
    CardFooter,
    InputGroupText,
    InputGroupAddon,
    CardImg,
    ButtonGroup,
    ButtonToolbar,
    FormInput
} from "shards-react";
import PageTitle from '../../components/common/PageTitle';
import americano from '../../images/coffee_Img/americano.png';
import caffeLatte from '../../images/coffee_Img/caffeLatte.jpg';
import espresso from '../../images/coffee_Img/espresso.jpg';

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

const useInput = (initialState) => {
    const [value, setValue] = useState(initialState);
    const onChange = e => setValue(e.target.value);
    return {value, onChange};
  }

export default function({location, history}) {
    const [menuList, setMenuList] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState();
    const imgList = [americano, caffeLatte, espresso];
    const [result, setResult] = useState('ready');
    const inputPrivate = useInput('0x3743fcf1ba8f2c9175674f6f470a8de919a91c3ef54cd6d9276cb011d654c189');
    const minusToken = useInput(0);
    const [list, setList] = useState([]);
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
    // 토큰 사용하기 
    const useToken = () => {
        setResult('pending...');
        axios.post('/api/use', {
          privateKey: inputPrivate.value, 
          value: minusToken.value
        })
        .then(({data}) => {
          // 토큰 내역 업데이트
          tokenList();
    
          // 결과 업데이트
          setResult(
            <a target="_blank" href={`https://baobab.scope.klaytn.com/tx/${data.transactionHash}?tabId=eventLog`}>{data.transactionHash}</a>
          )
        });
      }

    const tokenList = () => {
    axios.get('/api/list')
    .then(({data}) => setList(data.items));
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
                    <PageTitle sm="4" title="메뉴 선택" className="text-sm-left" />
                </Row>
                
                <Row>
                    {menuList.map((menu, idx) => (
                        <Col lg="6" sm="12" className="mb-4" key={idx} onClick={() => menuSelect(menu)}>
                            <Card style={{ maxWidth: "500px" }}>
                                <div className="card-post__image" style={{ backgroundImage: `url('${imgList[idx]}')` }}></div>
                                {/* <CardImg top src={imgList[idx]}/> */}
                                <CardFooter>
                                    <p style={menuName} className="card-title">{menu.name}</p>
                                    {/* <p className="card-text d-block mb-3"></p> */}
                                    <span className="text-muted">{menu.price}원</span>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
            <Row>
                <Col  sm={{ size: 8, order: 2, offset: 2 }}>
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                            <p className="m-0 text-center">주문 목록(적립예정쿤) </p>
                            <p className="m-0 text-center" style={point2}>{total/100}</p>
                        </CardHeader>
                        <CardBody>
                            {selectList.map((select, idx) => (
                                <Row key={idx}>
                                    <Col className="ml-auto">{select.name} {select.count}</Col>
                                    <Col className="d-flex px-3 border-0 ">
                                    <ButtonGroup size="sm" className="mr-2">
                                        <Button>+</Button>
                                        <Button theme="danger">-</Button>
                                    </ButtonGroup><p className="ml-auto">{select.price * select.count}원</p>
                                    </Col>
                                </Row>
                            ))}

                            {selectList.length == 0 ?
                                <h5 className="card-title text-center">주문할 제품을 선택해주세요</h5>
                            :
                                <h5 className="card-title text-center">총 금액 : {total}</h5>
                            }
                        </CardBody>

                       <div>
                            <Button size="sm" onClick={useToken}>포인트사용</Button>
                            <FormInput placeholder="금액을 입력해주세요."/>
                        </div>                   
                        
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
            </Row>
        </Container>
    )
}