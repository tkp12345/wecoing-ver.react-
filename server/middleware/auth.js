const { User } = require('../models/User');

//미들웨어 auth 
let auth = (req, res, next) => {
  //client 쿠키 정보 가져옴
  let token = req.cookies.w_auth;

  //인증처리 
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

    //토큰이 있으면 토큰 정보 누어주고 , 유저정보 추가 (미들웨어 실행후 사용하려고)
    req.token = token;
    req.user = user;
    next();
  });
};

// 공유 
module.exports = { auth };
