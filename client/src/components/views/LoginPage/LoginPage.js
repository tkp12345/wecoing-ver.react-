import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Icon, Input, Button, Checkbox, Typography } from "antd";
//리덕스 사용 (src/_actions/user_action.js)
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";

  return (
    <Formik
      initialValues={{
        email: initialEmail,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("이메일이 틀렸습니다")
          .required("이메일이 필요합니다"),
        password: Yup.string()
          .min(6, "비밀번호는 6글자까지 가능합니다")
          .required("비밀번호가 필요합니다"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password,
          };

          dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.id);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                //로그인 페이지 이동 
                props.history.push("/");
              } else {
                setFormErrorMessage("당신의 계정, 비밀번호를 다시 확인해주세요");
              }
            })
            .catch((err) => {
              setFormErrorMessage("당신의 계정, 비밀번호를 다시 확인해주세요");
              setTimeout(() => {
                setFormErrorMessage("");
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <Title level={2}>로그인</Title>
            <form onSubmit={handleSubmit} style={{ width: "350px" }}>
              <Form.Item required>
                <Input
                  id="email"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="이메일 입력"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="비밀번호 입력"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label>
                  <p
                    style={{
                      color: "#ff0000bf",
                      fontSize: "0.7rem",
                      border: "1px solid",
                      padding: "1rem",
                      borderRadius: "10px",
                    }}
                  >
                    {formErrorMessage}
                  </p>
                </label>
              )}

              <Form.Item>
                <Checkbox
                  id="rememberMe"
                  onChange={handleRememberMe}
                  checked={rememberMe}
                >
                  사용자 정보 저장
                </Checkbox>
                <a
                  className="login-form-forgot"
                  href="/reset_user"
                  style={{ float: "right", color: "rgba(0,0,0,.25)" }}
                >
                  비밀번호 찾기
                </a>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: "100%" }}
                    disabled={isSubmitting}
                    onSubmit={handleSubmit}
                  >
                    로그인
                  </Button>
                </div>
                <a href="/register" style={{ color: "rgba(0,0,0,.5)" }}>
                  회원가입 now!
                </a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(LoginPage);
