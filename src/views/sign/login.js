import React from "react";
import KLogin from "./KakaoLogin";
import { Card, CardHeader, CardBody, CardFooter } from "shards-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
export default function SignIn() {
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
        {/* 카카오톡 로그인 시작 */}
        <KLogin />
        {/* 카카오톡 로그인 끝 */}
      </CardBody>
      <CardFooter>@kunité</CardFooter>
    </Card>
  );
}
