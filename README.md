📕사용라이브러리 

-dropzone (파일 저장)
-multer (노드서버 파일저장)
-ffmpeg (파일 썸네일 생성)


👨‍💻 배운것 

  ✔몽고DB 정보저장 과정 
    client : state 와 Redux 에서 객체 정보를 가져와 server 로 넘겨준다 
    server : 정보를 받기위해 model 을 만을어 놓고 라우터를 이용해 받은 정보(req.body)를 모델에 저장한다  
            => 몽고디비 메소드 (save()) 로 저장을한다 -video.js

  ✔조건주는방식 
   {썸네일  &&  play(a) }
   썸네일이 있어야 a가 실행된다   
   

  ✔ event.preventDefault();
   진행중이던 실행을 멈추고 이후에 코드를 실행함  