const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//*****************************************/
//  User 정보 라우터 
//****************************************/

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    //전달정보 
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//*****************************************/
//  회원가입
//****************************************/
router.post("/register", (req, res) => {
  
  //가져온 유저정보 
  //req.body : json 형식정보 
  const user = new User(req.body);

  user.save((err, doc) => {
    //DB 저장실패
    if (err) return res.json({ success: false, err });
    //DB 저장성공 
    return res.status(200).json({
      success: true,
    });
  });
});

//*****************************************/
//  로그인
//***************************************
router.post("/login", (req, res) => {
  //DB 이메일 정보 확인 
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, 이메일 정보를 찾을수 없습니다",
      });

    //DB 비밀번호 정보 확인 
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 잘못됬습니다" });
    
     //이메일 + 비밀번호  확인되면 토큰 생성  
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //1. 토큰 쿠키에 저장 
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        //2. 로컬 스토리지에 저장 
        });
      });
    });
  });
});

//*****************************************/
//  로그아웃
//***************************************
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
