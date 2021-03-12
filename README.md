📕사용라이브러리 

-dropzone (파일 저장)
<br>
-multer (노드서버 파일저장)
<br>
-ffmpeg (파일 썸네일 생성)
<br>


👨‍💻 배운것 

  ✔ Axios & Router 흐름 
      1. client : Axios.post('../경로', 정보) server로 보낸다 
      2. server  : rouster.post('경로', ...) 클라이언트로 받아 DB 에서 정보를 
          찾고 찾은 정보를 client로 전달한다
      3. client : server로 부터 받은정보를 State 에 저장하여 사용한다.

  ✔ 몽고DB 정보저장 과정 
    client : Redux 에서 객체 정보를 가져와 server 로 넘겨준다 
    server : 정보를 받기위해 model 을 만을어 놓고 라우터를 이용해 받은 정보(req.body)를 모델에 저장한다  
            => 몽고디비 메소드 (save()) 로 저장을한다 -video.js

  ✔ 업로드방식 (submit)
     
     1.저장하기위한 정보의 collection(테이블) 을 만든다 
     2.submit 에 관한 function 을 만든다 
     3.서버로 보낸다 

  * collection 생성시  ref : 'User' => User.js(module.exports = { User }) 의 모든 정보를 가져올있다 
       writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },


  ✔ 조건주는방식 
   {썸네일  &&  play(a) }
   썸네일이 있어야 a가 실행된다   
   

  ✔ event.preventDefault();
   진행중이던 실행을 멈추고 이후에 코드를 실행함  

  ✔ 진행 완료후 루트 페이지로 돌아가기 (3초후)
   setTimeout( ()=> {
                props.history.push('/')
              }, 3000);

  ✔ useEffect ( ()=> { Dom 이 로드되면 해야할일 ... })

  ✔404페이지 처리 
    App.js 
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>

      *<Switch> 컴포넌트를 사용하면 그 하위에 있는 <Route> 컴포넌트 중에 매치되는 제일 첫번째 컴포넌트만 보여 wnsek

 🚫마주친 오류들 

 ✔ GET http://localhost:3000/api/video/getVideos 504 (Gateway Timeout)
 원인: Axios.post('....')로 클라이언트에서 서버로 보내준것을 
      서버에서  router.get('...') 으로 받고있었다 
       get-> post로 수정 

 ✔ SyntaxError: Cannot use import statement outside a module

  
 ✔ index.js:1 Warning: Each child in a list should have a unique "key" prop.
 원인 :리액트에서 반복이 되는 child 같은 경우에는 그 하나의 child마다 고유의 값을 갖고 있어한다 
 -LandingPage.js 

 const renderCards = Video.map((video, index) => {
   ...
  <Col lg={6} md={8} xs={24} key={index}>
  ...

 근본원인 : 하지만 내문제는 코드가 다른태그 내부로 잘못 작성되어난 오류였다 




 




       