import React, { Component } from 'react';
import Kakao from 'kakaojs';

class KakaoLogin extends Component{

  componentDidMount(){
   //02ced8bfeeec0a4a05a7ba7f1931de94
    console.log("Trying to approach kakao api access...");
    
    if (Kakao.Auth == null) {
        //토큰 넣고 초기화
        Kakao.init('89c4c146837a62268d96281c80662bdd');
      }
    this.setState({"kakao": Kakao})
    console.log("Kakao access"+Kakao);

    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: function(authObj) {
        Kakao.API.request({
          url: '/check',
          success: function(res) {
            alert(JSON.stringify(res))
          },
          fail: function(error) {
            alert(
              'login success, but failed to request user information: ' +
                JSON.stringify(error)
            )
          },
        })
      },
      fail: function(err) {
        alert('failed to login: ' + JSON.stringify(err))
      },
    })
  }
  render(){
    return (
      <div>
        <a id="kakao-login-btn">
        </a>
      </div>
    );
  }
}

export default KakaoLogin;