<template>
  <div id="login">
    <div class="login-wrap">
      <!-- 顶部按钮 -->
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTabs"
          :key="index"
          :class="{active:isActive==index}"
          @click="toggleMenu(index)"
        >{{item.text}}</li>
      </ul>
      <!-- Login表单—— start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="uname" class="form-item">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2" class="form-item" v-show='isActive===1'>
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password2"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button type="success" class="block">验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn">提交</el-button>
        </el-form-item>
      </el-form>
      <!-- Login表单—— end -->
    </div>
  </div>
</template>

<script>
import {
  validataUsername,
  validataPassword,
  validataVcode,
  stripscript
} from "@/tools/validata.js";
export default {
  data() {
    //验证邮箱
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      } else if (validataUsername(value)) {
        callback(new Error("邮箱格式有误"));
      } else callback();
    };

    //验证密码
    var validatePass = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (validataPassword(value)) {
        callback(new Error("密码必须为字母+数字（6-20位）"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePass2 = (rule, value, callback) => {
      /* 
      判断是登录还是注册界面，
      若是登陆界面则不进行重复密码验证。
      */
      if(this.isActive===0){
        callback();
      }

      // 过滤特殊字符
      this.ruleForm.password2 = stripscript(value);
      value = this.ruleForm.password2;
      if (value === "") {
        callback(new Error("重复密码不能为空"));
      } else if (value!==this.ruleForm.password) {
        callback(new Error("两次输入的密码不相同"));
      } else {
        callback();
      }
    };
    //验证验证码
    var validateCode = (rule, value, callback) => {
      // 过滤特殊字符
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (validataVcode(value)) {
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };
    return {
      menuTabs: [{ text: "登录" }, { text: "注册" }],
      isActive: 0,
      ruleForm: {
        uname: "",
        password: "",
        password2:'',
        code: ""
      },
      rules: {
        uname: [{ validator: validateUname, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 切换按钮样式
    toggleMenu(index) {
      this.isActive = index;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
  .login-wrap {
    width: 330px;
    margin: 0 auto;
    .menu-tab {
      text-align: center;
      display: flex;
      justify-content: center;
      li {
        width: 88px;
        line-height: 36px;
        color: #fff;
        cursor: pointer;
        border-radius: 2px;
      }
      .active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    color: #fff;
    line-height: 36px;
    margin-bottom: 3px;
    width: 100%;
  }
  .form-item {
    margin-bottom: 13px;
    width: 100%;
  }
  .login-btn {
    width: 100%;
    margin-top: 19px;
  }
  .block {
    display: block;
    width: 100%;
  }
}
</style> 