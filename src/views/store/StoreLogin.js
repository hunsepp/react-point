import React, {useEffect} from "react";
import KaKaoBtn from 'react-kakao-login';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default function StoreLogin({history}) {
  // 카카오 연동/로그인
  const login = res => {
    axios.post('/api/store', res).then(({data}) => {
        if(data.result == 1) {
            localStorage.setItem('storeToken', res.response.access_token);
            history.push('/');
        } else {
          console.log(data);
        }
    })
  }

  // 액세스 토큰이 있을 경우 계정 정보 받아오기
  useEffect(() => {
    const token = localStorage.getItem('storeToken');
    axios.get(`/api/store/${token}`).then(({data}) => {
        if(data.result == 1 && data.store) return history.push('/');
    });
  }, [])

  return (
    <Card
      style={{
        textAlign: "center",
        position: "absolute",
        top: "300%",
        left: "45%",
      }}
    >
      <div>
        <br />
      </div>
      <CardHeader
        style={{
          color: "#ffe812",
          fontSize: "large",
        }}
      >
        <FontAwesomeIcon icon={faCog} size="3x" spin />
        <br />
        SIGN IN
        <br />
      </CardHeader>
      <CardBody>
        <KaKaoBtn
          jsKey={'e485f303b8a8927fd4c89c5b81705b9e'}
          buttonText='카카오 로그인'
          onSuccess={login}
          getProfile={true}
          useDefaultStyle
        />
      </CardBody>
      <CardFooter>@kunité</CardFooter>
    </Card>
  );
}
