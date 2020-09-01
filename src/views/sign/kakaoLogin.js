import KakaoLogin from "react-kakao-login";
import React, { Component, useState } from "react";
import axios from "axios";

const KLogin = () => {
  const [id, setId] = useState([]);
  const [nickname, setNickname] = useState([]);
  const [thumbnail_image, setThumbnail_image] = useState([]);

  //카카오 로그인 성공시
  responseKakao = res => {
    setId(res.profile.id);
    setNickname(res.profile.properties.nickname);
    setThumbnail_image(res.profile.properties.thumbnail_image);

    axios
      .get("/api/kakao/signUp", {
        params: {
          id,
          nickname,
          thumbnail_image
        }
      })
      .then(result => {
        console.log(result.data);
        if (result.data != null) {
          //resultIsVisible = true;
          //barIsVisible = false;
        }
      });
  };

  responseFail = err => {
    console.error(err);
  };
  return (
    <div>
      <KakaoLogin
        //카카오에서 발급받은 API KEY값
        jsKey="89c4c146837a62268d96281c80662bdd"
        //로그인 성공시 실행할 함수
        onSuccess={this.responseKakao}
        //로그인 실패시 실행할 함수
        onFailure={this.responseFail}
        //사용자 프로필 정보 가져오기
        getProfile={true}
      />
    </div>
  );
};

export default KLogin;
