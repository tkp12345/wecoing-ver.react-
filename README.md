๐จโ๐ป์ฐฝ์ ๊ฒฝ์ง๋ํ ์์ด๋์ด๋ฅผ ๊ธฐ๋ฐ์ผ๋กํ ๊ฐ์ ์ฌ์ดํธ "wecoing" ์ ์ (ver VideoPlay)
---
<img src = "https://images.velog.io/images/tkp12345/post/1d460f1d-97ef-4785-bc1c-0c2c15cee9c7/WECODING.jpg" width="900px">

React ์ nodejs ๋ฅผ ์ฌ์ฉํ ๋น๋์ค ์๋ก๋ ํ์ด์ง ๊ธฐ๋ฅ  
--
```
ํ์ด์ง>
1.๋ก๊ทธ์ธ/ํ์๊ฐ์
2.๋ฉ์ธ
3.๋์์์๋ก๋ 
4.๋์์์คํ
```
```
ํด๋ผ์ด์ธํธ : reactJS 
์๋ฒ : NodeJs , MongoDB
```
์คํ ํ์ด์ง
---
![page](https://user-images.githubusercontent.com/46067837/111562701-fdc2ff00-87d9-11eb-9272-1211304e9506.png)

์คํ๋ฐฉ๋ฒ
---
```
1. git clone ...
2. server\config\dev.js ์ถ๊ฐ >
 dev.js)
    module.exports={
    mongoURI:'mongodb+srv://๋ชฝ๊ณ ๋๋นํด๋ฌ์คํฐ ์์ด๋, ๋น๋ฐ๋ฒํธ
   }

3.
 ํฐ๋ฏธ๋) 
 c:\..\..> npm run dev
```
---
๋ฒ์ ์ ๋ณด
---
```
"node": "10.16.0",
"npm": "6.9.0"
"bcrypt": "^5.0.0"
"mongoose": "^5.4.20",
 ```


๐์ฌ์ฉ๋ผ์ด๋ธ๋ฌ๋ฆฌ 
---
 ```
๋ก๊ทธ์ธ 
-bcrypt(๋น๋ฐ๋ฒํธ ์ํธํ)
<br>
```

```
ํ์ผ ์๋ก๋
-dropzone (ํ์ผ ์ ์ฅ)
<br>
-multer (๋ธ๋์๋ฒ ํ์ผ์ ์ฅ)
<br>
-ffmpeg (ํ์ผ ์ธ๋ค์ผ ์์ฑ)
<br>
```



๐จโ๐ป ๋ฐฐ์ด๊ฒ 
---
  โ Axios & Router ํ๋ฆ <br>
      1. client : Axios.post('../๊ฒฝ๋ก', ์ ๋ณด) server๋ก ๋ณด๋ธ๋ค <br>
      2. server  : rouster.post('๊ฒฝ๋ก', ...) ํด๋ผ์ด์ธํธ๋ก ๋ฐ์ DB ์์ ์ ๋ณด๋ฅผ <br>
          ์ฐพ๊ณ  ์ฐพ์ ์ ๋ณด๋ฅผ client๋ก ์ ๋ฌํ๋ค<br>
      3. client : server๋ก ๋ถํฐ ๋ฐ์์ ๋ณด๋ฅผ State ์ ์ ์ฅํ์ฌ ์ฌ์ฉํ๋ค.

  โ ๋ชฝ๊ณ DB ์ ๋ณด์ ์ฅ ๊ณผ์  <br>
    client : Redux ์์ ๊ฐ์ฒด ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ server ๋ก ๋๊ฒจ์ค๋ค <br>
    server : ์ ๋ณด๋ฅผ ๋ฐ๊ธฐ์ํด model ์ ๋ง์์ด ๋๊ณ  ๋ผ์ฐํฐ๋ฅผ ์ด์ฉํด ๋ฐ์ ์ ๋ณด(req.body)๋ฅผ ๋ชจ๋ธ์ ์ ์ฅํ๋ค  <br>
            => ๋ชฝ๊ณ ๋๋น ๋ฉ์๋ (save()) ๋ก ์ ์ฅ์ํ๋ค -video.js<br>

  โ ์๋ก๋๋ฐฉ์ (submit)
     
     1.์ ์ฅํ๊ธฐ์ํ ์ ๋ณด์ collection(ํ์ด๋ธ) ์ ๋ง๋ ๋ค 
     2.submit ์ ๊ดํ function ์ ๋ง๋ ๋ค 
     3.์๋ฒ๋ก ๋ณด๋ธ๋ค 

  * collection ์์ฑ์  ref : 'User' => User.js(module.exports = { User }) ์ ๋ชจ๋  ์ ๋ณด๋ฅผ ๊ฐ์ ธ์ฌ์์๋ค <br>
  ```
       writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
  ```


  โ ์กฐ๊ฑด์ฃผ๋๋ฐฉ์ <br>
  ```
   {"์ธ๋ค์ผ"  &&  play(a) }
   ```
   ์ธ๋ค์ผ์ด ์์ด์ผ a๊ฐ ์คํ๋๋ค   
   <br>
   

  โ event.preventDefault();<br><br>
   ์งํ์ค์ด๋ ์คํ์ ๋ฉ์ถ๊ณ  ์ดํ์ ์ฝ๋๋ฅผ ์คํํจ  <br>

  โ ์งํ ์๋ฃํ ๋ฃจํธ ํ์ด์ง๋ก ๋์๊ฐ๊ธฐ (3์ดํ)<br>
  ```
   setTimeout( ()=> {
                props.history.push('/')
              }, 3000);
  ```

  โ useEffect ๋?
  ```
  useEffect ( ()=> {

     Dom ์ด ๋ก๋๋๋ฉด ํด์ผํ ์ผ ... 

     })<br>
  ```
  โ404ํ์ด์ง ์ฒ๋ฆฌ 
  ```
    App.js 
        <Route exact path="/" component={Home} /><br>
        <Route path="/about" component={About} /><br>
        <Route component={NotFound} /><br>
  ```

      *์ง์ ๋์ง ์๋ ํ์ด์ง ์ ๊ทผ์ NotFound ๋ก ์ฒ๋ฆฌํ๋ค
     <br>
 
      *<Switch> ์ปดํฌ๋ํธ๋ฅผ ์ฌ์ฉํ๋ฉด ๊ทธ ํ์์ ์๋ <Route> ์ปดํฌ๋ํธ ์ค์ ๋งค์น๋๋ ์ ์ผ ์ฒซ๋ฒ์งธ ์ปดํฌ๋ํธ๋ง ๋ณด์ฌ ์ค๋ค
 

 ๐ซ๋ง์ฃผ์น ์ค๋ฅ๋ค 
 ---
  โ  Invalid Hook Call Error(-LandingPage.js ์ Calousel.js ์ปดํฌ๋ํธ ์ถ๊ฐ์)
       
       ์์ธ 
        1. Mismatching Versions of React and React DOM
          =>๋ฆฌ์กํธ ๋ฒ์ ์ด 16.8 ๋ณด๋ค ๋์์ผ ํ ์ฌ์ฉ์ ์๋ฌ๊ฐ ์์๊ธด๋ค

        2. Breaking the Rules of Hooks
          =>Hooks๋ฅผ ํธ์ถ ํ  ๋๋ ํจ์ํ component์ ์ต์์ ๋ถ๋ถ์์ ํธ์ถํด์ผ ํ๋ค.

      โ (์์ธ)3. Duplicate React
         => Hooks์ด ์ ๋๋ก ์๋ํ๋ ค๋ฉด ๋ด ์ดํ๋ฆฌ์ผ์ด์์ ์ฝ๋์ import์     react-dom์ import๊ฐ ๊ฐ์ ๋ชจ๋๋ก ํด์๋์ด์ผ ํ๋ค



 โ GET http://localhost:3000/api/video/getVideos 504 (Gateway Timeout)<br>
 ```
 ์์ธ: Axios.post('....')๋ก ํด๋ผ์ด์ธํธ์์ ์๋ฒ๋ก ๋ณด๋ด์ค๊ฒ์ <br>
      ์๋ฒ์์  router.get('...') ์ผ๋ก ๋ฐ๊ณ ์์๋ค <br>
       get-> post๋ก ์์  <br>
  ```

 โ SyntaxError: Cannot use import statement outside a module

  
 โ index.js:1 Warning: Each child in a list should have a unique "key" prop.<br>
 ```
 ์์ธ :๋ฆฌ์กํธ์์ ๋ฐ๋ณต์ด ๋๋ child ๊ฐ์ ๊ฒฝ์ฐ์๋ ๊ทธ ํ๋์ child๋ง๋ค ๊ณ ์ ์ ๊ฐ์ ๊ฐ๊ณ  ์์ดํ๋ค 
 -LandingPage.js 

 const renderCards = Video.map((video, index) => {
   ...
  <Col lg={6} md={8} xs={24} key={index}>
  ...

```

 ๊ทผ๋ณธ์์ธ : ํ์ง๋ง ๋ด๋ฌธ์ ๋ ์ฝ๋๊ฐ ๋ค๋ฅธํ๊ทธ ๋ด๋ถ๋ก ์๋ชป ์์ฑ๋์ด๋ ์ค๋ฅ์๋ค
 

  ์ฐธ๊ณ 
 ---
 https://github.com/jaewonhimnae/boilerplate-mern-stack<br>
 https://github.com/dropzone/dropzone
 

 




 




       
