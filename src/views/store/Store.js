import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormInput,
  Button,
  FormTextarea,
  InputGroup,
  InputGroupAddon,
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import {useInput} from '../../utils/common';
import Loader from '../Loader';
import Checkboxes from "./Checkboxes";
import FileUpload from "./FileUpload";
import OpenClose from "./OpenClose";
import StoreInfro from "./StoreInfo"
const {daum} = window;

export default function Store({history}) {
  const [store, setStore] = useState();
  const name = useInput();
  const category = useInput();
  const discription = useInput();
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
  });
  const open = useInput('07:30');
  const close = useInput('17:30');
  const [address, setAddress] = useState();

  // 매장 정보 수정
  const storeMod = () => {
    axios
      .put(`/api/store/${store.account}`, {
        name: name.value,
        category: category.value,
        address,
        discription: discription.value,
        approve: "승인",
        option,
        open: open.value,
        close: close.value
      })
      .then(({ data }) => {
        if (data.result == 1) setStore(data.store);
      });
  };

  // 승인 요청
  const approveReq = () => {
    axios.post(`/api/approve/${store.account}`)
    .then(({data}) => {
      if(data.result == 1 && data.store) setStore(data.store);
      else console.log(data);
    })
  }

  // 주소 검색
  const addrSearch = () => {
    new daum.Postcode({
      oncomplete: data => {
        setAddress(data.address);
      }
    }).open();
  }

  // 액세스 토큰이 있을 경우 계정 정보 받아오기
  useEffect(() => {
      const token = localStorage.getItem('storeToken');
      axios.get(`/api/store/${token}`)
      .then(({data}) => {
          if(data.result == 0 || !data.store) return history.push('/storelogin');

          setStore(data.store);
          setLoading(false);
      });
  }, [])

  // 매장 정보 변경시 기존에 등록된 매장 정보 입력값에 출력
  useEffect(() => {
    if(!store) return;

    if(store?.name) name.reset(store.name);
    if(store?.category) category.reset(store.category);
    if(store?.address) setAddress(store.address);
    if(store?.discription) discription.reset(store.discription);
    if(store?.option) setOption(store.option);
    if(store?.open) open.reset(store.open);
    if(store?.close) close.reset(store.close);
  }, [store])

  return loading ? <Loader loading={loading} /> : (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="매장관리" className="text-sm-left" />
      </Row>

      <Row>
        <StoreInfro store={store} />

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
                  <label htmlFor="hours">영업 시간</label>
                  <OpenClose open={open} close={close} />
                </Col>
                <Col md="12" className="form-group">
                  <InputGroup seamless className="mb-3">
                    <FormInput value={address} />
                    <InputGroupAddon type="append">
                      <Button theme="secondary" onClick={addrSearch} outline>검색</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>

                <Col md="12" className="form-group">
                  <Checkboxes option={option} setOption={setOption} read={false} />
                </Col>

                <Col md="12" className="form-group">
                  <label htmlFor="image">대표이미지</label>
                  <FileUpload account={store.account} />
                </Col>
                <Col md="12" className="form-group">
                  <label htmlFor="description">매장 소개</label>
                  <FormTextarea id="description" rows="5" {...discription} />
                </Col>
                <Col>
                  {store.approve == '미승인' &&
                    <Button
                      theme="secondary"
                      outline
                      size="sm"
                      className="ml-auto"
                      onClick={approveReq}
                    >
                      승인요청
                    </Button>
                  }
                </Col>
                <Col className="d-flex px-3 border-0">
                  <Button
                    theme="secondary"
                    size="sm"
                    className="ml-auto"
                    onClick={storeMod}
                  >
                    변경
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
