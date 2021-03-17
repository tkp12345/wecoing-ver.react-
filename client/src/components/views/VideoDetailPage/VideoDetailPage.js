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
            <video
              style={{  width: "100%" }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            ></video>

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
