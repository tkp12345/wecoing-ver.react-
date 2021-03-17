import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from "antd";
import moment from "moment";
import Axios from "axios";
/*css*/
import "../LandingPage/LandingPage.css";
 
import Carousel_slider from "./Carousel.js";

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  /*video 정보  state 저장 */
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideo(response.data.videos);
      } else {
        alert("파일 가져오기 실패");
      }
    });
  }, []);

  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    console.log(video._id);

    return (
      <Col lg={6} md={8} xs={24}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              alt="썸네일 이미지"
              src={`http://localhost:5000/${video.thumbnail}`}
            ></img>
            <div className=" duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={
            // 사용자 이미지
            <Avatar src={video.writer.image} />
          }
          title={video.title}
          description=""
        />
        <span>{"게시자: "+video.writer.name}  </span>
        <br />
        {/* <span style={{ marginLeft: "3rem" }}> {video.views}</span>-{" "} */}
        <span> {moment(video.createdAt).format("게시일: "+'MM/DD/YYYY')} </span>
      </Col>
    );
  });

  return (
    <div className="container">
      <div className="section car">
        <Carousel_slider />
      </div>
      <div className="section">
        <div className="project-title">
          <h2>진행중인 프로젝트<span>👩‍🏫</span> </h2>
          <Row gutter={[32, 16]}>
            {renderCards}

            {/* /럼사이즈 - 클때 6 (4개) 중간 8(3개) 작을때 24 (1개)*/}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
