import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
// import TextArea from "antd/lib/input/TextArea";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
import "../VideUploadPage/VideUploadPage.css";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { value: 0, label: "비공개" },
  { value: 1, label: "공개" },
];

const CategoryOptions = [
  { value: 0, label: "백앤드" },
  { value: 1, label: "프론트앤드" },
  { value: 2, label: "알고리즘" },
];

function VideUploadPage(props) {
  const user = useSelector((state) => state.user);
  const [Videotitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onTitleChange = (e) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const onPrivateChange = (e) => {
    setPrivacy(e.currentTarget.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    /*서버에 request - axios 사용*/

    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      /* 응답 성공 */
      if (response.data.success) {
        /*받은 데이터 들 변수로 보내준다 */
        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        };

        setFilePath(response.data.url);

        Axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            setDuration(response.data.fileDuration);
            setThumbnailPath(response.data.url);
          } else {
            alert("썸네일 생성 실패");
          }
        });
      } else {
        alert("업로드 실패");
      }
    });
  };

  const onSubmit = (e) => {
    /*진행중인 실행 멈추고 */
    e.preventDefault();

    /*Redux 를 사용해 사용자 정보를가져온다*/
    const variables = {
      writer: user.userData._id,
      title: Videotitle,
      description: Description,
      privacy: privacy,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };

    Axios.post("/api/video/uploadVideo", variables).then((response) => {
      if (response.data.success) {
        message.success("업로드 성공");

        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("비디오 업로드 실패");
      }
    });
  };

  return (
    <div className="container-upload">
      <div className="title">
        <h2> 업로드할 비디오를 등록해주세요</h2>
      </div>
      
      <Form onSubmit={onSubmit}>
      <div className="contents">
                  <div className="dropzone">
                        {/*영상추가*/}
                        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                          {({ getRootProps, getInputProps }) => (
                                <div
                                  style={{
                                    width: "300px",
                                    height: "240px",
                                    border: "1px solid lightgray",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <Icon
                                    type="plus"
                                    className="add"
                                    style={{ fontSize: "2rem" }}
                                  />
                                </div>
                          )}
                        </Dropzone>
                    </div>
                      <div className="info">
                        <label>제목</label>
                        <Input onChange={onTitleChange} value={Videotitle} />

                        <label>설명</label>
                        <TextArea onChange={onDescriptionChange} value={Description} />

                        <label>공개범위</label>
                        <select onChange={onPrivateChange}>
                          {PrivateOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>

                        <label>과목</label>
                        <select onChange={onCategoryChange}>
                          {CategoryOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
              </div>
         
       

        <br />
        <br />

        {/*썸네일*/}
        {ThumbnailPath !== "" && (
          <div>
            <img
              scr={`http://localhost:5000/${ThumbnailPath}`}
              alt="thumbnail"
            ></img>
          </div>
        )}
        <br />
        <br />
        <div className="btn-form">
          <Button type="primary" size="large" onClick={onSubmit}>
            저장
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default VideUploadPage;
