import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import Axios from "axios";



function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("정보를 가져올수 없습니다");
      }
    });
  }, []);

  if (VideoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{marginLeft:"10vw" , width: "100%", padding: "3rem 4em" }}>
            <div style={{ color:"rgba(255, 255, 255, 0.692)" ,fontSize:"2.0rem",marginBottom:"10px"}}>
            🎥 {VideoDetail.description}
            </div>
            <video
              style={{  width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            ></video>
            <div style={{ padding:"20px",marginTop:"20px",background:"rgba(211, 211, 211, 0.664)", borderRadius:"25px", border:"9px solid rgba(255, 255, 255, 0.836)"}}>
            <List.Item actions>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={VideoDetail.writer && VideoDetail.writer.image}
                  />
                }
                title={VideoDetail.writer.name}
                description={VideoDetail.description}
              />
            </List.Item>

            {/*커멘트 */}
          </div>
          </div>
        </Col>
        {/* <Col lg={6} xs={24}>
        </Col> */}
      </Row>
    );
  }else{
      return(
      <div>..로딩</div>
      )
  }
}

export default VideoDetailPage;
