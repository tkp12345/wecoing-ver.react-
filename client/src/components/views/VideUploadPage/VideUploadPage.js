import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
// import TextArea from "antd/lib/input/TextArea";
import Dropzone from "react-dropzone";
import Axios from 'axios';
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
  { value: 0, label: "private" },
  { value: 1, label: "public" },
];

const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

function VideUploadPage(props) {
  const user = useSelector(state => state.user);
  const [Videotitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [ThumbnailPath, setThumbnailPath] = useState("")

  const onTitleChange= (e)=>{
      setVideoTitle(e.currentTarget.value);
  }

  const onDescriptionChange= (e)=>{
    setDescription(e.currentTarget.value);
  }

  const onPrivateChange= (e)=>{
    setPrivacy(e.currentTarget.value);
  }

  const onCategoryChange= (e)=>{
    setCategory(e.currentTarget.value);
  }

  const onDrop = (files)=>{
    let formData = new FormData;
    const config ={
        header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", files[0])
    /*서버에 request - axios 사용*/

    Axios.post('/api/video/uploadfiles', formData, config)
        .then(response => {
            /* 응답 성공 */
            if(response.data.success){
                
                /*받은 데이터 들 변수로 보내준다 */ 
                let variable ={
                    url: response.data.url,
                    fileName: response.data.fileName
                }

                setFilePath(response.data.url);

                Axios.post('/api/video/thumbnail', variable)
                    .then(response=> {
                        if(response.data.success){
                            setDuration(response.data.fileDuration);
                            setThumbnailPath(response.data.url);
                            
                        }else{
                            alert('썸네일 생성 실패')
                        }
                    })

            }else{
                alert('업로드 실패')
            }
         })
  }

  const onSubmit = (e)=>{
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
  }


    Axios.post('/api/video/uploadVideo', variables)
      .then(response=>{
        if(response.data.success){
              message.success('업로드 성공')

              setTimeout( ()=> {
                props.history.push('/')
              }, 3000);

            
        }else{
          alert('비디오 업로드 실패')
        }
      })

  }

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/*영상추가*/}
          <Dropzone 
          onDrop={onDrop}
           multiple={false} 
           maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div style={{width: "300px",height: "240px",border: "1px solid lightgray",display: "flex",alignItems: "center",justifyContent: "center",}}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/*썸네일*/}
          {ThumbnailPath !== "" &&
          <div>
            <img scr={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail"></img>
          </div>
        }
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={Videotitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideUploadPage;
