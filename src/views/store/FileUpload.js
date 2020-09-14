import React, { useState } from "react";
import { FormInput, Button } from "shards-react";
import axios from "axios";

const CustomFileUpload = ({account}) => {
  const [img, setImage] = useState(null);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onClick = async () => {
    if(!img.type == 'image/jpeg') alert('jpg 파일만 가능합니다');
    
    const formData = new FormData();
    formData.append("file", img);
    // 서버의 upload API 호출
    const res = await axios.post(`/api/upload/${account}`, formData);
    console.log(res);
  };
  return (
    <div className="file-inputs">
      <FormInput
        type="file"
        name="storeImage"
        id="storeImage"
        onChange={onChange}
        className="mb-6"
      />
      <div>
        <br />
      </div>
      <Button
        outline
        theme="secondary"
        onClick={onClick}
        style={{ float: "right" }}
      >
        UPLOAD
      </Button>
    </div>
  );
};

export default CustomFileUpload;
