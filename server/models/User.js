const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

//유저 정보 형식 
const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    //관리자 권한설정 0 : 일반휴저 , 1 :관리자
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    //유효성 관리
    token : {
        type: String,
    },
    //토큰 유효기간
    tokenExp :{
        type: Number
    }
})

//DB 저장 전 (pre) 암호화과정 
userSchema.pre('save', function( next ) {
    // userSchma 의  password 정보 가져오기
    var user = this;
    
    //비밀번호 바꿀때만 암호화 
    if(user.isModified('password')){    
        // console.log('password changed')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                
                //암호화 성공 -> hash된 비밀번호로  교체
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

//비밀번호 비교 
userSchema.methods.comparePassword = function(plainPassword,cb){
    //암호화 해서 비교 
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err)
         return cb(err);
        cb(null, isMatch)
    })
}

// 토큰생성
userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user',user)
    console.log('userSchema 스키마', userSchema)
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) 
            return cb(err)
        cb(null, user);
    })
}

//토큰 찾기(미들웨어) -> 토큰을넣고 콜백실행
userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    //토큰 디코딩 -> 아이디 
    jwt.verify(token,'secret',function(err, decode){
    //아이디 -> DB 아이디 확인    
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err)
             return cb(err);
            cb(null, user);
        })
    })
}

//스키마 모델로 감싸줌
const User = mongoose.model('User', userSchema);

module.exports = { User }