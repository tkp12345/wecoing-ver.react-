/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

//인증체크
//option :  (null: 누구나), (true:로그인한 유저만), flase(로그인한 유저 출입 불가)
export default function (SpecificComponent, option, adminRoute = null) {
 

  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // 사용자 정보
    useEffect(() => {
      //api/users/auth
      //auth 액션 
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          //로그인 안됬을때
          if (option) {
            props.history.push("/login");
          }
          //로그인 됬을때 
        } else {
          //어드민 아닐때
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          }
          //로그인한 유저 출입불가페이지
          else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
