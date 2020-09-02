import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Form, Button ,FormInput, FormGroup,Container, Row, Col } from "shards-react";
import BasicModalExample from "./BasicModalExample";
import PageTitle from "../components/common/PageTitle";


const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const onChange = e => setValue(e.target.value);
  return {value, onChange};
}

function Transfer() {
  const inputPublic = useInput('0xa85badfd203ae6fabffa302d5470854eee2385d7');
  const plusToken = useInput(0);
  
 
  // 토큰 적립
  const saveToken = () => {
    axios.get('/api/save', {
      params: {
        address: inputPublic.value,
        value: plusToken.value
      }
    })
  }
  
  return <div>
    <div>
      <Form>
        <FormGroup>
          <Row noGutters className="page-header py-4">
          
          <PageTitle sm="4"  title="키 입력" className="text-sm-left" /></Row>
          <FormInput type="text" id="#publicKey" placeholder="PublicKey" {...inputPublic}/>
        </FormGroup>
        <FormGroup>
          <Row noGutters className="page-header py-4">
          <PageTitle sm="4"  title="포인트 입력" className="text-sm-left" /></Row>
          <FormInput type="number" id="#point" placeholder="Point" {...plusToken} />
        </FormGroup>
      </Form>
    </div>
    <div><BasicModalExample onClick={saveToken}></BasicModalExample></div>
    </div>
}

export default Transfer;