import React, { useEffect, useState } from "react";
import KLogin from "./kakaoLogin";
import { Card, CardHeader, CardBody, CardFooter } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Loader from '../Loader';

export default function SignIn({history}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 액세스 토큰으로 유저 정보 확인, 없을 경우 로그인 화면으로 이동
    const access = localStorage.getItem('userAccessToken');
    axios.get(`/api/kakao/${access}`)
    .then(({data}) => {
        if(data.result == 1 && data.kuser) return history.push('/');
        setLoading(false);
    })
  }, [])

  return loading ? <Loader loading={loading} /> : (
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
        {/* 카카오톡 로그인 시작 */}
        <KLogin />
        {/* 카카오톡 로그인 끝 */}
      </CardBody>
      <CardFooter>@kunité</CardFooter>
    </Card>
  );
}
