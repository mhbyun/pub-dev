<template>
  <router-view />
</template>

<script setup>


</script>

<style>

.login .login_container {
  height: calc(100% - 90px);
  min-height: 802px;
  background: #eee url('../assets/images/login_bg.jpg');
  background-size: cover;
}
.login .footerWrap {
  display: block;
  width: 100%;
  height: 90px;
  background: #fff;
}
.login .footerWrap .login_footer {
  position: relative;
  display: block;
  width: 1200px;
  height: auto;
  margin: 0 auto;
  padding-top: 20px;
  text-align: left;
  font-size: 13px;
  color: #888;
  letter-spacing: -0.025em;
}
.login .footerWrap .login_footer h1 {
  display: block;
  width: 130px;
  height: 35px;
  background: url('../assets/images/footer_h1.png') 0 0 no-repeat;
}
.login .loginWrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 25%;
  transform: translateY(-17.3%);
  margin: 0 auto;
  width: 620px;
  padding: 50px 40px 40px 40px;
  background: #fff;
  box-shadow: 0 15px 45px rgba(38, 53, 74, 0.12);
}
.login .loginWrap:after {
  clear: both;
  display: block;
  content: '';
}
.login .loginWrap > div {
  display: block;
}
.login .loginWrap .t {
  padding: 0 0 42px;
  color: #474a50;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
  letter-spacing: -0.05em;
}
.login .loginWrap .t h1 {
  display: block;
  width: 100%;
  height: 45px;
  background: url('../assets/images/login_h1.svg') 50% 50% no-repeat;
  background-size: auto 80%;
}
.login .loginWrap .t span {
  display: block;
  margin-top: 10px;
  line-height: 1.6;
  font-size: 14px;
}
.login .loginWrap .b {
  padding-top: 35px;
}
.login .loginWrap .b b {
  display: block;
  height: 28px;
  line-height: 28px;
  margin-bottom: 15px;
  font-size: 25px;
  color: #383c45;
  text-transform: uppercase;
  text-align: center;
}
.login .loginWrap .b ul {
  width: 360px;
  margin: 0 auto;
}
.login .loginWrap .b li {
  position: relative;
  display: block;
  margin-top: 5px;
  text-align: center;
}
.login .loginWrap .b li input + i {
  position: absolute;
  top: 10px;
  left: 17px;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #838a97;
  font-size: 18px;
}
.login .loginWrap .b li input {
  width: 100%;
  height: 55px;
  line-height: 55px;
  padding-left: 50px;
  border: 1px solid #dde3eb !important;
  font-size: 14px;
  color: #222;
  font-weight: bold;
  background: #f0f5fc;
  border-radius: 0;
}
.login .loginWrap .b li input::-moz-placeholder {
  color: #a6aab0;
  font-weight: normal;
  font-size: 13px;
}
.login .loginWrap .b li input::placeholder {
  color: #a6aab0;
  font-weight: normal;
  font-size: 13px;
}
.login .loginWrap .b li .txt_info {
  margin-bottom: 20px;
  text-align: left;
}
.login .loginWrap .b a.btn_login {
  display: block;
  width: 100%;
  height: 65px;
  line-height: 65px;
  margin-top: 15px;
  font-size: 22px;
  background: #3569fd;
  color: #fff;
  text-align: center;
  box-shadow: 0 5px 10px rgba(76, 113, 231, 0.3);
  font-weight: 600;
  transition: ease 0.3s;
  text-decoration: none;
}
.login .loginWrap .b a.btn_login:hover {
  background: rgba(76, 113, 231, 0.9);
}
.login .loginWrap .b > p {
  margin: 30px 0 20px;
  text-align: center;
}
.login .loginWrap .b > p a {
  display: inline-block;
  line-height: 1.4;
  min-height: 1.4;
  font-size: 13px;
  color: #575a60;
  text-align: center;
  text-decoration: underline;
}

</style>
