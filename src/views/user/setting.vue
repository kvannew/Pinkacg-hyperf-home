<template>
  <div class="main">
    <div class="clearfix container setting">
      <user-aside></user-aside>
      <div class="col-md-10 float-right setting_box">
        <div class="pinkacg_setting_content">
          <div class="pinkacg_setting_content_container">
            <fieldset class="pinkacg_setting_content_item">
              <legend class="pinkacg_setting_content_item_title">
                <span class="pinkacg_setting_content_primary">
                  <span class="poi-icon fa-user-circle fas fa-fw"></span>
                  <span class="pinkacg_setting_content_text">我的头像</span></span>
              </legend>
              <div class="pinkacg_setting_content_item_content">
                <div class="pinkacg_setting_content_preface">
                  <p>修改头像需要 -5 个喵爪哦！</p>
                </div>
                <div class="pinkacg_setting_content_my_avatar">
                  <div class="pinkacg_setting_content_my_avatar_img">
                    <img
                      style="width: 100px;height: 100px;"
                      v-if="userInfo.avatar"
                      :src="getImg(userInfo.avatar)"
                      alt="avatar"
                      class="pinkacg_setting_content_avatar_img"
                      width="100"
                      height="100">
                  </div>
                  <a-spin :spinning='loading'>
                    <label style="padding: 0px 100px;" class="pinkacg_setting_content_my_avatar_upload-btn">
                      <a-upload
                        name="file"
                        :show-upload-list="false"
                        :customRequest="value => getUploadAvatar(value, 'avatar')"
                        :before-upload="beforeUpload"
                      >
                        <span class="poi-icon fa-camera fas fa-fw"></span>
                        <span class="pinkacg_setting_content_text">更改我的头像</span>
                      </a-upload>
                    </label>
                  </a-spin>
                </div>
              </div>
            </fieldset>
            <fieldset class="pinkacg_setting_content_item">
              <legend class="pinkacg_setting_content_item_title">
                <span class="pinkacg_setting_content_primary">
                  <span class="poi-icon fa-user-circle fas fa-fw"></span>
                  <span class="pinkacg_setting_content_text">个人资料</span></span>
              </legend>
              <div class="pinkacg_setting_content_item_content">
                <div class="pinkacg_setting_content_preface">
                  <p>这里可以修改个人资料哦！</p>
                </div>
                <a-form-model
                  :model="userInfo"
                  ref="userInfo"
                  :rules="userInfoRules">
                  <a-form-model-item
                    prop="name"
                    class="pinkacg_setting_content_preface_item">
                    <div class="clearfix ">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">昵称</div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-input
                            class="pinkacg_setting_content_preface_control"
                            placeholder="昵称"
                            title="昵称"
                            v-model="userInfo.name"/>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item
                    prop="desc"
                    class="pinkacg_setting_content_preface_item">
                    <div class="clearfix ">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">描述</div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-textarea
                            class="pinkacg_setting_content_preface_control"
                            placeholder="描述"
                            title="描述"
                            v-model="userInfo.desc">
                          </a-textarea>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item class="pinkacg_setting_content_preface_item">
                    <div class="clearfix ">
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-button @click="updateUserInfo" class="pinkacg_setting_content_btn_success">
                            <span class="poi-icon fa-check fas fa-fw"></span>
                            <span class="pinkacg_setting_content_text">更新个人资料</span>
                          </a-button>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                </a-form-model>
              </div>
            </fieldset>
            <fieldset class="pinkacg_setting_content_item">
              <legend class="pinkacg_setting_content_item_title">
                <span class="pinkacg_setting_content_primary">
                  <span class="poi-icon fa-at fas fa-fw"></span>
                  <span class="pinkacg_setting_content_text">账号邮箱</span></span>
              </legend>
              <div class="pinkacg_setting_content_item_content">
                <div class="pinkacg_setting_content_preface">
                  <p>修改账号邮箱，需要 -10 个喵爪哦！</p>
                </div>
                <a-form-model
                  :model="userEmail"
                  ref="userEmail"
                  :rules="userEmailRules">
                  <a-form-model-item
                    prop="email"
                    class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">新邮箱</div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-input
                            class="pinkacg_setting_content_preface_control"
                            placeholder="新邮箱"
                            title="新邮箱"
                            v-model="userEmail.email"/>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item
                    prop="myConfirm"
                    class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">验证码</div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <div class="clearfix">
                            <div style="padding-left:0px" class="col-lg-7 float-left">
                              <a-input
                                class="pinkacg_setting_content_preface_control"
                                placeholder="验证码"
                                title="验证码"
                                v-model="userEmail.myConfirm"/>
                            </div>
                            <div style="line-height: 0px;margin: 0px;" class="col-lg-5 float-right">
                              <a-button style="margin: 0" @click="sendMails" class="sent_email pinkacg_setting_content_btn_success">
                                <span class="poi-icon fa-envelope fas fa-fw"></span>
                                <span class="">发送验证码</span>
                              </a-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title"></div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-button
                            @click="updateUserEmails"
                            class="pinkacg_setting_content_btn_success">
                            <span class="poi-icon fa-check fas fa-fw"></span>
                            <span class="pinkacg_setting_content_text">更新邮箱</span>
                          </a-button>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                </a-form-model>
              </div>
            </fieldset>
            <fieldset class="pinkacg_setting_content_item">
              <legend class="pinkacg_setting_content_item_title is-enabled-toggle">
                <span class="pinkacg_setting_content_primary">
                  <span class="poi-icon fa-lock fas fa-fw"></span>
                  <span class="pinkacg_setting_content_text">我的密码</span></span>
              </legend>
              <div class="pinkacg_setting_content_item_content is-expand">
                <div class="pinkacg_setting_content_preface">
                  <p>修改密码，需要 -10 个喵爪哦！</p>
                </div>
                <a-form-model
                  :model="userNewPassword"
                  ref="userNewPassword"
                  :rules="userNewPasswordRules">
                  <a-form-model-item
                    prop="password"
                    class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">旧密码</div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-input
                            class="pinkacg_setting_content_preface_control"
                            placeholder="旧密码"
                            title="旧密码"
                            v-model="userNewPassword.password"/>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item
                    prop="newPassword"
                    class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">新密码</div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-input
                            class="pinkacg_setting_content_preface_control"
                            placeholder="新密码"
                            title="新密码"
                            v-model="userNewPassword.newPassword"/>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item
                    prop="confirmPassword"
                    class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">确认新密码</div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-input
                            class="pinkacg_setting_content_preface_control"
                            placeholder="确认新密码"
                            title="确认新密码"
                            v-model="userNewPassword.confirmPassword"/>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <div class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title"></div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-button
                            @click="updateUserPassword"
                            class="pinkacg_setting_content_btn_success">
                            <span class="poi-icon fa-check fas fa-fw"></span>
                            <span class="pinkacg_setting_content_text">更新密码</span>
                          </a-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a-form-model>
              </div>
            </fieldset>
            <fieldset class="pinkacg_setting_content_item">
              <legend class="pinkacg_setting_content_item_title is-enabled-toggle">
                <span class="pinkacg_setting_content_primary">
                  <span class="poi-icon fa-lock fas fa-fw"></span>
                  <span class="pinkacg_setting_content_text">提醒显示</span></span>
              </legend>
              <div class="pinkacg_setting_content_item_content is-expand">
                <div class="pinkacg_setting_content_preface">
                  <p>邮件提醒及内容显示开关</p>
                </div>
                <a-form-model>
                  <a-form-model-item class="pinkacg_setting_content_preface_item" style="margin: 25px 0px;">
                    <div class="clearfix">
                      <div class="col-lg-4 float-left">
                        <div class="pinkacg_setting_content_preface_item_title">显示ip地址</div>
                      </div>
                      <div class="col-lg-8 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <div class="toggle-button-cover">
                            <div class="button-cover">
                              <div class="button r">
                                <input value="yes" type="checkbox" name="show_ip" class="pinkacg_show_ip checkbox">
                                <div class="knobs"></div>
                                <div class="layer"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                  <a-form-model-item class="pinkacg_setting_content_preface_item">
                    <div class="clearfix">
                      <div class="col-lg-2 float-left">
                        <div class="pinkacg_setting_content_preface_item_title"></div>
                      </div>
                      <div class="col-lg-10 float-right">
                        <div class="pinkacg_setting_content_preface_item_content">
                          <a-button
                            class="my_switch_msg pinkacg_setting_content_btn_success">
                            <span class="poi-icon fa-check fas fa-fw"></span>
                            <span class="pinkacg_setting_content_text">更新选项</span></a-button>
                        </div>
                      </div>
                    </div>
                  </a-form-model-item>
                </a-form-model>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userAside from '@/views/user/components/aside'
import { getUserList, sendChangeMail, updateUserEmail, updateUserInfo, updateUserPassword } from '@/api/user'
import { getImg } from '@/utils/util'
import { uploadImgFile, uploadAvatarImg } from '@/api/upload'

export default {
  name: 'Index',
  components: {
    userAside
  },
  metaInfo () {
    return {
      title: '我的设置 - 个人设置'
    }
  },
  data () {
    return {
      'userInfoRules': {
        name: [{ required: true, message: '请输入名称！' }, { min: 4, message: '用户名不得小于4字符' }, { max: 15, message: '用户名不得超过15字符' }],
        desc: [{ required: true, message: '请输入描述！' }, { min: 10, message: '描述不得小于10字符' }, { max: 50, message: '描述不得超过50字符' }]
      },
      'userEmailRules': {
        email: [
          {
            type: 'email',
            required: true,
            message: '邮箱格式不正确'
          },
          {
            max: 50,
            message: '邮箱不得超过50字符'
          }
        ],
        myConfirm: [
          {
            required: true,
            message: '请输入验证码！'
          },
          {
            min: 4,
            message: '验证码不得小于4字符'
          },
          {
            max: 4,
            message: '验证码不得超过4字符'
          }
        ]
      },
      'userNewPasswordRules': {
        password: [
          {
            required: true,
            message: '请输入你的密码!'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '请确定你的密码!'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入你的新密码!'
          }
        ]
      },
      'userNewPassword': {
        'password': '',
        'confirmPassword': '',
        'newPassword': ''
      },
      'userEmail': {
        'myConfirm': '',
        'email': ''
      },
      'userInfo': {},
      confirmDirty: false,
      getImg,
      loading: false
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUploadAvatar (info, value) {
      const that = this
      that.loading = true
      const formData = new FormData()
      formData.append('file', info.file)
      uploadImgFile(formData).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        that.loading = true
        uploadAvatarImg({
          'avatar': res.result.data,
          'id': this.$store.getters.userInfo.id
        }).then((res) => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          that.$message.success(res.message)
          setTimeout(() => {
            that.$router.replace({
              'path': '/refresh'
            })
          }, 2000)
        })
      })
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('你只能上传jpep与png文件!')
      }
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('图片大于1MB!')
      }
      return isJpgOrPng && isLt1M
    },
    updateUserEmails () {
      const that = this
      this.$refs.userEmail.validate(valid => {
        if (valid) {
          updateUserEmail({
            'id': this.userInfo.id,
            'email': this.userEmail.email,
            'myConfirm': this.userEmail.myConfirm
          }).then((res) => {
            if (res.code !== 200) {
              that.$message.error(res.message)
              return []
            }
            that.$message.success(res.message)
            setTimeout(() => {
              this.$router.replace({
                'path': '/refresh'
              })
            }, 2000)
          })
        } else {
          that.$message.info('格式错误')
        }
      })
    },
    sendMails () {
      const that = this
      sendChangeMail({
        'id': this.userInfo.id,
        'email': this.userEmail.email
      }).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        that.$message.success(res.message)
        setTimeout(() => {
          this.$router.replace({
            'path': '/refresh'
          })
        }, 2000)
      })
    },
    updateUserPassword () {
      const that = this
      this.$refs.userNewPassword.validate(valid => {
        console.log(valid)
        if (valid) {
          updateUserPassword(this.userNewPassword, this.userInfo.id).then((res) => {
            if (res.code !== 200) {
              that.$message.error(res.message)
              return []
            }
            that.$message.success(res.message)
            setTimeout(() => {
              this.$router.replace({
                'path': '/refresh'
              })
            }, 2000)
          })
        } else {
          that.$message.info('格式错误')
        }
      })
    },
    updateUserInfo () {
      const that = this
      this.$refs.userInfo.validate(valid => {
        if (valid) {
          updateUserInfo(this.userInfo).then((res) => {
            if (res.code !== 200) {
              that.$message.error(res.message)
              return []
            }
            that.$message.success(res.message)
            setTimeout(() => {
              this.$router.replace({
                'path': '/refresh'
              })
            }, 2000)
          })
        } else {
          that.$message.info('格式错误')
        }
      })
    },
    getUserInfo () {
      const that = this
      getUserList({
        'id': this.$store.getters.userInfo.id
      }).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        this.userInfo = res.result.data[0]
      })
    }
  }
}
</script>

<style scoped>
  input, textarea, button {
    font-size: 12px;
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
</style>
