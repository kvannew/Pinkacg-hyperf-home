<template>
  <div class="main">
    <div class="clearfix container setting">
      <user-aside></user-aside>
      <div class="col-md-10 float-right setting_box">
        <div class="pinkacg_setting_content">
          <a-form-model
            :model="model"
            ref="publishPost"
            :rules="publishPostRules"
            class="drafts pinkacg_setting_content_container">
            <a-form-model-item>
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">投稿须知</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div class="pinkacg_setting_content_preface">
                    <p>您可以在这个页面查看您发布过的帖子，鼠标悬浮即可见编辑按钮。</p>
                    <p>重新编辑帖子后需要二次审核，请谨慎编辑哦！</p>
                  </div>
                  <div class="pinkacg_setting_content_my_avatar">
                  </div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item>
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">投稿类型</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div class="pinkacg_setting_content_preface_item_content">
                    <a @click="exchangePostType('post')" class="pinkacg_setting_content_btn routine_post" :class="model.type === 'post' ? 'is_success' : ''">
                      <span class="poi-icon fa-check fas fa-fw" aria-hidden="true"></span>
                      <span class="pinkacg_setting_content_text">文章</span>
                    </a>
                    <a @click="exchangePostType('video')" class="pinkacg_setting_content_btn video_post" :class="model.type === 'video' ? 'is_success' : ''">
                      <span class="poi-icon fa-check fas fa-fw" aria-hidden="true"></span>
                      <span class="pinkacg_setting_content_text">视频</span>
                    </a>
                    <a @click="exchangePostType('music')" class="pinkacg_setting_content_btn music_post" :class="model.type === 'music' ? 'is_success' : ''">
                      <span class="poi-icon fa-check fas fa-fw" aria-hidden="true"></span>
                      <span class="pinkacg_setting_content_text">音乐</span>
                    </a>
                  </div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item v-if="model.type === 'music'">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">音乐链接</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div v-for="(k, v) in model.music" :key="v" class="clearfix pinkacg_download_link">
                    <a-form-model-item
                      :prop="`music[${v}].name`"
                      :rules="[ { required: true, message: '请输入音乐名称!' }, { min: 10, message: '音乐名称不得小于10字符' }, { max: 100, message: '音乐名称不得超过100字符' }]"
                      class="col-lg-5 float-left poi-g_lg-2-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-cloud-download-alt fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.name" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="下载名称" title="下载名称"/></span>
                      </label>
                    </a-form-model-item>
                    <a-form-model-item
                      :prop="`music[${v}].link`"
                      :rules="[ {required: true, message: '请输入链接地址', trigger: 'blur'}, { validator: isTrueUrl, trigger: 'blur' } ]"
                      class="col-lg-5 float-left poi-g_lg-2-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-link fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.link" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="下载链接" title="下载链接"/></span>
                      </label>
                    </a-form-model-item>
                    <div class="col-lg-1 float-left poi-g_lg-1-10">
                      <div class="poi-btn-group pinkacg_download_link_storage_btns">
                        <a @click="addMusic" class="link_add pinkacg_download_link_delete_btn">
                          <span class="poi-icon fa-plus fas fa-fw" aria-hidden="true"></span>
                        </a>
                        <a @click="deleteMusic" style="color:gray;cursor: pointer;" class="pinkacg_download_link_delete_btn">
                          <span class="poi-icon fa-trash fas fa-fw" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item v-if="model.type === 'video'">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">视频链接</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div v-for="(k, v) in model.video" :key="v" class="clearfix pinkacg_download_link">
                    <a-form-model-item
                      :prop="`video[${v}].name`"
                      :rules="[ { required: true, message: '请输入视频名称!' }, { min: 10, message: '视频名称不得小于10字符' }, { max: 100, message: '视频名称不得超过100字符' }]"
                      class="col-lg-3 float-left poi-g_lg-2-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-cloud-download-alt fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.name" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="下载名称" title="下载名称"/></span>
                      </label>
                    </a-form-model-item>
                    <a-form-model-item
                      :prop="`video[${v}].link`"
                      :rules="[ {required: true, message: '请输入链接地址', trigger: 'blur'}, { validator: isTrueUrl, trigger: 'blur' } ]"
                      class="col-lg-5 float-left poi-g_lg-2-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-link fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.link" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="下载链接" title="下载链接"/>
                        </span>
                      </label>
                    </a-form-model-item>
                    <a-form-model-item
                      :prop="`video[${v}].credit`"
                      :rules="[{ validator: checkCredit }]"
                      class="col-lg-2 float-left poi-g_lg-2-10"
                    >
                      <a-input-number class='publish_newpost_credit pinkacg_setting_content_preface_control' v-model="k.credit" placeholder="视频积分" style="margin-right: 3%"/>
                    </a-form-model-item>
                    <div class="col-lg-1 float-left poi-g_lg-1-10">
                      <div class="poi-btn-group pinkacg_download_link_storage_btns">
                        <a @click="addVideo" class="link_add pinkacg_download_link_delete_btn">
                          <span class="poi-icon fa-plus fas fa-fw" aria-hidden="true"></span>
                        </a>
                        <a @click="deleteVideo" style="color:gray;cursor: pointer;" class="pinkacg_download_link_delete_btn">
                          <span class="poi-icon fa-trash fas fa-fw" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item
              prop="title">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">帖子标题</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div class="pinkacg_setting_content_preface_item_content">
                    <a-input v-model="model.title" class="post_title pinkacg_setting_content_preface_control" placeholder="帖子标题" title="帖子标题"/></div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item
              prop="excerpt">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">帖子摘要</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div class="pinkacg_setting_content_preface_item_content">
                    <a-textarea v-model="model.excerpt" class="post_title pinkacg_setting_content_preface_control" placeholder="帖子标题" title="帖子标题"/></div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item
              prop="content">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">帖子内容</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <quill-editor
                    v-model="model.content"
                    ref="myQuillEditor"
                    :options="editorOption">
                  </quill-editor>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item
              prop="content_file">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">帖子图片</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div class="pinkacg_post_imgs_upload">
                    <label class="pinkacg_post_imgs_upload_btn">
                      <span class="poi-icon fa-hand-paper fas fa-fw" aria-hidden="true"></span>
                      <a-upload
                        :customRequest="getUploadPostImg"
                        :before-upload="beforeUpload"
                        class="upload-list-inline"
                      >
                        添加图片
                      </a-upload>
                    </label>
                  </div>
                  <div class="pinkacg_mypic">
                    <div v-for="(v, k) in model.content_file" :key="k" class="pinkacg_my_pic">
                      <div class="my_postimg">
                        <img
                          :src="getImgs(v.path + v.title + '.' + v.type)">
                      </div>
                      <a-form-model-item
                        prop="header_img"
                        v-model="model.header_img"
                        :rules="[ { required: true, message: '请输入网站封面!' }]"
                      >
                        <div class="pictype">
                          <span @click="insertImg(v)" class="pinkacg_btn pinkacg_btn_success">插入文章</span>
                          <span
                            @click="setHeaderImg(v, k)"
                            :class="set_header_img === k ? 'pinkacg_btn_success' : ''"
                            class="pinkacg_btn">设为封面</span>
                        </div>
                      </a-form-model-item>
                    </div>
                  </div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item
              prop="menu">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">帖子分类</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <a-cascader
                    :options="postCategory"
                    v-model="model.menu"
                    :fieldNames="{ label: 'label', value: 'id', children: 'children' }"
                    change-on-select
                    placeholder="请输入："
                  />
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item
              prop="tag">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">帖子标签</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div class="pinkacg_post_tag_inputs">
                    <div v-for="(v, k) in model.tag" :key="k" class="poi-btn-group pinkacg_post_tag_inputs_container">
                      <a-form-model-item
                        :prop="`tag[${k}]`"
                        :rules="[ { required: true, message: '请输入下载链接标题!' }, { min: 3, message: '下载链接标题不得小于3字符' }, { max: 20, message: '文章标题不得超过20字符' }]">
                        <a-input v-model="(model.tag)[k]" class="pinkacg_setting_content_preface_control pinkacg_post_tag_input" placeholder="帖子标签"/>
                      </a-form-model-item>
                      <a @click="delTag(k)" style="cursor: pointer;" class="poi-btn poi-btn_default pinkacg_post_tag_input_btn">
                        <span class="poi-icon fa-trash fas fa-fw" aria-hidden="true"></span>
                      </a>
                    </div>
                  </div>
                  <a @click="addTag" class="add_posttag pinkacg_setting_content_btn_success">
                    <span class="poi-icon fa-plus fas fa-fw" aria-hidden="true"></span>
                  </a>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item>
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">下载链接</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content pinkacg_download">
                  <a @click="model.download_status = 1" style="width: 48%;margin:0px 1% 20px 1%;display: inline-block" :class="model.download_status ===1 ? 'pinkacg_btn_success' : ''" class="pinkacg_btn">开启</a>
                  <a @click="model.download_status = 0" style="width: 48%;margin:0px 1% 20px 1%;display: inline-block" :class="model.download_status ===0 ? 'pinkacg_btn_success' : ''" class="pinkacg_btn">关闭</a>
                  <div v-if="model.download_status" v-for="(k, v) in model.download" :key="v" class="clearfix pinkacg_download_link">
                    <a-form-model-item
                      :prop="`download[${v}].name`"
                      :rules="[ { required: true, message: '请输入下载链接标题!' }, { min: 3, message: '下载链接标题不得小于3字符' }, { max: 20, message: '文章标题不得超过20字符' }]"
                      class="col-lg-2 float-left poi-g_lg-2-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-cloud-download-alt fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.name" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="下载名称" title="下载名称"/></span>
                      </label>
                    </a-form-model-item>
                    <a-form-model-item
                      :prop="`download[${v}].link`"
                      :rules="[ {required: true, message: '请输入链接地址', trigger: 'blur'}, { validator: isTrueUrl, trigger: 'blur' } ]"
                      class="col-lg-3 float-left poi-g_lg-2-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-link fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.link" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="下载链接" title="下载链接"/></span>
                      </label>
                    </a-form-model-item>
                    <a-form-model-item
                      :prop="`download[${v}].pwd`"
                      class="col-lg-2 float-left poi-g_lg-1-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-key fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.pwd" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="提取密码" title="提取密码"/></span>
                      </label>
                    </a-form-model-item>
                    <a-form-model-item
                      :prop="`download[${v}].pwd2`"
                      class="col-lg-2 float-left poi-g_lg-1-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-unlock fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.pwd2" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="解压密码" title="解压密码"/></span>
                      </label>
                    </a-form-model-item>
                    <a-form-model-item
                      :prop="`download[${v}].credit`"
                      :rules="[{ validator: checkCredit }]"
                      class="col-lg-2 float-left poi-g_lg-1-10">
                      <label class="pinkacg_download_link_group_inputs">
                        <span class="pinkacg_download_link_inputs_icon">
                          <span class="poi-icon fa-unlock fas fa-fw" aria-hidden="true"></span>
                        </span>
                        <span class="pinkacg_download_link_inputs_content">
                          <a-input v-model="k.credit" class="pinkacg_setting_content_preface_control_downloadlink " type="text" placeholder="购买积分(0免费)" title="购买积分(0免费)"/></span>
                      </label>
                    </a-form-model-item>
                    <div class="col-lg-1 float-left poi-g_lg-1-10">
                      <div class="poi-btn-group pinkacg_download_link_storage_btns">
                        <a @click="addDownload" class="link_add pinkacg_download_link_delete_btn">
                          <span class="poi-icon fa-plus fas fa-fw" aria-hidden="true"></span>
                        </a>
                        <a @click="delDownload(k)" style="color:gray;cursor: pointer;" class="pinkacg_download_link_delete_btn">
                          <span class="poi-icon fa-trash fas fa-fw" aria-hidden="true"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item
              prop="comment_status">
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">评论状态</span>
                  </span>
                </legend>
                <div class="pinkacg_setting_content_item_content pinkacg_download">
                  <a @click="model.comment_status = 1" style="width: 48%;margin:0px 1% 20px 1%;display: inline-block" :class="model.comment_status ===1 ? 'pinkacg_btn_success' : ''" class="pinkacg_btn">开启</a>
                  <a @click="model.comment_status = 0" style="width: 48%;margin:0px 1% 20px 1%;display: inline-block" :class="model.comment_status ===0 ? 'pinkacg_btn_success' : ''" class="pinkacg_btn">关闭</a>
                </div>
              </fieldset>
            </a-form-model-item>
            <a-form-model-item>
              <fieldset class="pinkacg_setting_content_item">
                <legend class="pinkacg_setting_content_item_title">
                  <span class="pinkacg_setting_content_primary">
                    <span class="poi-icon fa-user-circle fas fa-fw" aria-hidden="true"></span>
                    <span class="pinkacg_setting_content_text">作品来源</span></span>
                </legend>
                <div class="pinkacg_setting_content_item_content">
                  <div class="pinkacg_setting_content_preface">
                    <p>本站默认作品为原创内容</p>
                  </div>
                  <div class="pinkacg_setting_content_my_avatar">
                  </div>
                </div>
              </fieldset>
            </a-form-model-item>
            <a @click="handleOk" style="padding: 8px;" class="submit_post pinkacg_setting_content_btn_success">
              <span class="poi-icon fa-plus fas fa-fw" aria-hidden="true">提交</span>
            </a>
          </a-form-model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import userAside from '@/views/user/components/aside'
import { getCategoryList } from '@/api/category'
import { uploadImgFile } from '@/api/upload'
import { getImg } from '@/utils/util'
import { createPostList } from '@/api/post'

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [
    {
      'header': 1
    },
    {
      'header': 2
    }
  ],
  [
    {
      'list': 'ordered'
    },
    {
      'list': 'bullet'
    }
  ],
  [
    {
      'script': 'sub'
    },
    {
      'script': 'super'
    }
  ],
  [
    {
      'indent': '-1'
    },
    {
      'indent': '+1'
    }
  ],
  [
    {
      'direction': 'rtl'
    }
  ],

  [
    {
      'size': ['small', false, 'large', 'huge']
    }
  ],
  [
    {
      'header': [1, 2, 3, 4, 5, 6, false]
    }
  ],

  [
    {
      'color': []
    },
    {
      'background': []
    }
  ],
  [
    {
      'font': []
    }
  ],
  [
    {
      'align': []
    }
  ],
  ['link'],
  ['clean']
]

export default {
  name: 'Index',
  components: {
    userAside,
    quillEditor,
    getImg
  },
  metaInfo () {
    return {
      title: '新建文章 - 个人设置'
    }
  },
  data () {
    return {
      'publishPostRules': {
        title: [
          {
            required: true,
            message: '请输入文章标题!'
          },
          {
            min: 5,
            message: '文章标题不得小于5字符'
          },
          {
            max: 100,
            message: '文章标题不得超过100字符'
          }
        ],
        excerpt: [
          {
            required: true,
            message: '请输入文章摘要!'
          },
          {
            min: 10,
            message: '文章摘要不得小于10字符'
          },
          {
            max: 200,
            message: '文章摘要不得超过200字符'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入文章内容!'
          },
          {
            min: 50,
            message: '文章内容不得小于20字符'
          },
          {
            max: 10000,
            message: '文章内容不得超过10000字符'
          }
        ],
        content_file: [
          {
            type: 'array',
            required: true,
            message: '请输入文章图片!'
          }
        ],
        menu: [
          {
            type: 'array',
            required: true,
            message: '请输入文章菜单!'
          }
        ]
      },
      set_header_img: null,
      editorOption: {
        placeholder: '请在这里输入', // 提示
        readyOnly: false, // 是否只读
        theme: 'snow', // 主题 snow/bubble
        syntax: true, // 语法检测
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      },
      postCategory: {},
      model: {
        'author': null,
        'type': 'post',
        'content_file': [],
        'tag': [],
        'comment_status': 1,
        'comment_count': 0,
        'views': 0,
        'status': 'draft',
        'download_status': 1,
        'download': [{
          'name': '',
          'link': '',
          'pwd': '',
          'pwd2': '',
          'credit': ''
        }],
        'music': [{
          'name': '',
          'link': ''
        }],
        'video': [{
          'name': '',
          'link': ''
        }]
      }
    }
  },
  created () {
    this.PostCategory()
  },
  methods: {
    isTrueUrl (rule, value, callback) {
      const reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的链接'))
      } else {
        callback()
      }
    },
    checkCredit (rule, value, callback) {
      if (value > 0 && value < 21) {
        callback()
        return
      }
      callback(new Error('积分必须在1到20之间!'))
    },
    exchangePostType (v) {
      this.model.type = v
    },
    setHeaderImg (v, k) {
      this.model.header_img = k
      this.set_header_img = k
    },
    getImgs (k) {
      return getImg(k)
    },
    addTag () {
      if (this.model.tag.length > 4) {
        this.$message.warn('最多发布五个')
        return
      }
      this.model.tag.push('')
    },
    delTag (k) {
      if (this.model.tag.length > 1) {
        this.model.tag.splice(k, 1)
      } else {
        this.$message.warn('至少保留一个')
      }
    },
    addDownload () {
      if (this.model.download.length > 9) {
        this.$message.warn('最多发布十个')
        return
      }
      this.model.download.push({
        'name': '',
        'link': '',
        'pwd': '',
        'pwd2': '',
        'credit': ''
      })
    },
    delDownload (k) {
      if (this.model.download.length > 1) {
        this.model.download.splice(k, 1)
      } else {
        this.$message.warn('至少保留一个')
      }
    },
    addMusic () {
      if (this.model.music.length > 9) {
        this.$message.warn('最多发布十个')
        return
      }
      this.model.music.push({
        'name': '',
        'link': ''
      })
    },
    deleteMusic () {
      if (this.model.music.length > 1) {
        this.model.music.pop()
      } else {
        this.$message.warn('至少要保留一个')
      }
    },
    addVideo () {
      if (this.model.video.length > 9) {
        this.$message.warn('最多发布十个')
        return
      }
      this.model.video.push({
        'name': '',
        'link': '',
        'credit': ''
      })
    },
    deleteVideo () {
      if (this.model.video.length > 1) {
        this.model.video.pop()
      } else {
        this.$message.warn('至少要保留一个')
      }
    },
    PostCategory () {
      const that = this
      getCategoryList({
        'son': 0
      })
        .then(res => {
          if (res.code !== 200) {
            that.$message.error(res.message)
            return []
          }
          this.postCategory = res.result.data
        })
    },
    insertImg (file) {
      // 获取富文本组件实例
      const quill = this.$refs.myQuillEditor.quill
      // 获取光标所在位置
      if (quill.getSelection() === null) {
        quill.focus()
      }
      const length = quill.getSelection().index
      // 插入图片，res为服务器返回的图片链接地址
      quill.insertEmbed(length, 'image', getImg(file.path + file.title + '.' + file.type))
      // 调整光标到最后
      quill.setSelection(length + 1)
    },
    getUploadPostImg (info) {
      const that = this
      const formData = new FormData()
      formData.append('file', info.file)
      // 开始上传
      this.upload_loading = true
      uploadImgFile(formData).then((res) => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          that.upload_loading = false
          return []
        }
        // 获取富文本组件实例
        const quill = this.$refs.myQuillEditor.quill
        // 获取光标所在位置
        if (quill.getSelection() === null) {
          quill.focus()
        }
        const length = quill.getSelection().index
        // 插入图片，res为服务器返回的图片链接地址
        console.log(process.env.VUE_APP_API_BASE_SERVER_HOST)
        console.log(res.result.link)
        quill.insertEmbed(length, 'image', getImg(res.result.link))
        // 调整光标到最后
        quill.setSelection(length + 1)
        info.file.thumbUrl = res.result.link
        this.model.content_file.push(res.result.data)
        that.$message.success(res.message)
        that.upload_loading = false
      })
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('你只能上传jpep与png文件!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大于2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleOk () {
      console.log(1212)
      this.$refs.publishPost.validate(valid => {
        console.log(valid)
        if (valid) {
          this.model.author = this.$store.getters.userInfo.id
          createPostList(this.model).then(res => {
            if (res.code !== 200) {
              this.$message.error(res.message)
              return []
            }
            this.$message.success(res.message)
            setTimeout(() => {
              this.$router.replace('/user/draft')
            }, 1000)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.pinkacg_setting_content_item {
  line-height: 15px;
}
.ant-form legend {
  border-bottom: 0px solid #d9d9d9;
}
.ant-cascader-input.ant-input {
  border-radius: 1rem 1rem 1rem 1rem;
  border: 2px solid #00000012;
}
.ant-cascader-picker:hover .ant-cascader-input {
  border: 2px solid var(--site-color);
}
.ant-upload-list {
  display: none;
}
.ant-form-item {
  margin-bottom: 0px;
}
</style>
