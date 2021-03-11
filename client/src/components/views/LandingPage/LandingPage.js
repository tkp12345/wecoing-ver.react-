import React, {useEffect,useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import moment from 'moment';
import Axios from 'axios';
const { Title } = Typography;
const { Meta } = Card;



function LandingPage() {
    /*video 정보  state 저장 */
    const [Video,setVideo] = useState([])

    useEffect(() => {
            
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success){
                console.log(response.data);
                setVideo(response.data.videos)
            }else{
                alert('파일 가져오기 실패')

            }
        })
        
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                {/* 비디오 클릭시 해당 id 링크  */}
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                <div className=" duration">
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    // 사용자 이미지
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>

    })
    
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2} > Recommended </Title>
        <hr />
        {renderCards}
        <Row gutter={[32,16]}>
            {/* /럼사이즈 - 클때 6 (4개) 중간 8(3개) 작을때 24 (1개)*/}
        <Col lg={6} md={8} xs={24}>

        </Col>
        </Row>
        </div>
       
    )
}

export default LandingPage
