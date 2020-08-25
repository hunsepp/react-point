import React, { Component } from 'react';
import Kakao from 'kakaojs';

class KakaoLogout extends Component{

  componentDidMount(){
    if (!Kakao.Auth.getAccessToken()) {
        alert('Not logged in.')
        return
      }
      Kakao.Auth.logout(function() {
        alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
      })
  }
  render(){
    return (
      <div>
        <button class="api-btn" onclick="kakaoLogout()">로그아웃</button>
        
      </div>
    );
  }
}

export default KakaoLogout;