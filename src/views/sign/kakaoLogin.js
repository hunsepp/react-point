import KakaoLogin from "react-kakao-login";
import { browserHistory } from "react-router";
import React, { Component, useState } from "react";
import axios from "axios";
const dotenv = require("dotenv");

const KLogin = () => {
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [thumbnail_image, setThumbnail_image] = useState("");
  const [access_token, setAccessToken] = useState("");
  const [refresh_token, setRefreshToken] = useState("");
  const [kuser, setKuser] = useState();

  //카카오 로그인 성공시
  const responseKakao = (res) => {
    setId(res.profile.id);
    setNickname(res.profile.properties.nickname);
    setThumbnail_image(res.profile.properties.thumbnail_image);
    setAccessToken(res.response.access_token);
    setRefreshToken(res.response.refresh_token);

    axios
      .post("/api/kakao/signUp", {
        user_id: id,
        user_nickname: nickname,
        user_thumbnail_image: thumbnail_image,
        user_access_token: access_token,
        user_refresh_token: refresh_token,
      })
      .then(({ data }) => {
        if (data.result == 1) {
          localStorage.setItem("userAccessToken", access_token);
          setKuser(data.kuser);
          window.location = "/blog-overview";
        }
      });
  };

  const responseFail = (err) => {
    alert(err);
  };
  return (
    <div>
      <KakaoLogin
        //카카오에서 발급받은 API KEY값
        jsKey={"89c4c146837a62268d96281c80662bdd"}
        //로그인 성공시 실행할 함수
        onSuccess={responseKakao}
        //로그인 실패시 실행할 함수
        onFailure={responseFail}
        //사용자 프로필 정보 가져오기
        getProfile={true}
        useDefaultStyle
      />
    </div>
  );
};

export default KLogin;
