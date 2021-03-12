const express = require("express");
const multer = require("multer");
const router = express.Router();
var ffmpeg = require("fluent-ffmpeg");

const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
  /*destination :  파일 저장위치  -> uploads 폴더*/
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  /*filename : 파일저장시 이름 형식*/
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  /*fileFilter : mp4형식*/
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" || ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             video
//=================================

/* req  : client 에서 보내온 files */
router.post("/uploadfiles", (req, res) => {
  /*client video 서버에 저장 => multer 라이브러리 사용 */
  upload(req, res, (err) => {
    /*에러발생 -> false*/
    if (err) {
      return res.json({ success: false, err });
    }
    /*성공 ->true   url:파일경로 fileName: 보내준다*/
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadVideo", (req, res) => {
  /*비디오 정보 저장  req.body : 클라이언트에서 보낸 variables 들  */
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

/*정보저장 */
router.get("/getVideos", (req, res) => {
  /*비디오를 DB 에서 가져온다
     Video 모델 사용 -> find() 사용하여 모든 video 데이타 가져온다 
    */

  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideoDetail", (req, res) => {
  Video.findOne({ "_id": req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

router.post("/thumbnail", (req, res) => {
  /*썸네일 생성 + 비디오 러닝 타임가져오기(ffmpeg 사용)*/

  let filePath = "";
  let fileDuration = "";
  /*비디오 정보 가져오기*/
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  /*썸네일생성 */
  /*req.body.url => uploads */
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.error("Screenshots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("err", function () {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      // count:3 3개의 스크린샷
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

module.exports = router;
