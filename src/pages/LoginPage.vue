<template>
  <div class="login">
    <section class="login_container">
      <div class="loginWrap">
        <div class="t">
          <h1></h1>
          <span> WiseN TM 방문을 환영합니다. </span>
        </div>
        <div class="b">
          <ul>
            <li>
              <input type="text" placeholder="아이디" v-model="user.user_id"/><i class="xi xi-mail-o"></i>
            </li>
            <li><input type="password" placeholder="비밀번호" v-model="user.password" @keyup.enter="loginCheck" /><i class="xi xi-lock-o"></i></li>
            <li>
              <a class="btn_login" @click="loginCheck">LOGIN</a>
            </li>
          </ul>

        </div>
      </div>
    </section>

    <footer class="footerWrap">
      <div class="login_footer">
        <h1></h1>
        COPYRIGHT©2024 GS NEOTEK ALL RIGHTS RESERVED.
      </div>
    </footer>

  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
import { global } from 'assets/js/publish/global'


const user = ref({
  password:'',
  user_id:''
});

let visible = ref(false);

function loginCheck(){

  if(user.value.user_id === ''){
    return global.onNotify('아이디를 입력해주세요.', 'deep-orange-9');
  } else if(user.value.password === '') {
    return global.onNotify('비밀번호를 입력해주세요.', 'deep-orange-9');
  }

  // location.href = "#/monitoring/dashboard";
  login();
}


function login(){
  let objectParam = {param: user.value };
  global.onLoadingShow();
  global.onLogin(objectParam).then(res => {

    // global.consoleLog("로그인 페이지 login >  onLogin : " , res.data);
    if (res.data.accessToken) {
      localStorage.setItem('accessToken',  res.data.accessToken);
      localStorage.setItem('refreshToken',  res.data.refreshToken);
    }

    if(res.data != null){
      location.href = "#/monitoring/dashboard";
    } else {
      global.onNotify('다시 확인해주세요.', 'deep-orange-9');
    }

    global.onLoadingHide();
  }).catch(error=> {
    global.consoleLog("로그인 페이지 login 에러", error);
    global.onLoadingHide();
    if(error.response && error.response.status === 500){
      global.onNotify('아이디와 비밀번호를 다시 확인해주세요.', 'deep-orange-9');
    }
  })
}

function pwdReInput() {
  visible.value = true;
}

function codeModal() {
  visible.value = false;
}
</script>
