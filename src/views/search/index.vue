<template>
  <div class="main">
    <div class="search container">
      <div class="pinkacg_search_form">
        <div class="pinkacg_search_form_container">
          <label class="pinkacg_search_form_input_label">
            <span class="poi-icon fa-search fas fa-fw" aria-hidden="true"></span>
          </label>
          <a-input @pressEnter="Search" class="pinkacg_search_form_s" placeholder="您想搜索什么？" v-model="word"/></div>
        <div class="pinkacg_search_form_cat_container">
          <div class="pinkacg_search_form_group">
            <span class="pinkacg_search_form_group_title">分类 : </span>
            <div class="pinkacg_search_form_condition_container">
              <div class="pinkacg_search_form_condition_group">
                <label v-for="(v, k) in categoryAll" :key="k" class="pinkacg_search_form_condition_label">
                  <input
                    type="radio"
                    hidden=""
                    :value="v.value"
                    checked="">
                  <span
                    class="pinkacg_search_form_condition_text is-checked">{{ v.label }}</span>
                </label>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="search_box">
        <section class="cat-2 cat-col cat-col-full">
          <div class="cat-container clearfix">
            <div class="pinkacg_box_1 cms-cat cms-cat-s7">
              <a-spin :spinning="loading">
                <div class="page-1">
                  <a-empty style="padding: 180px;" v-if="posts.length === 0" />
                  <div v-for="(v, k) in posts" :key="k" class="col-md-2 box-2 float-left">
                    <article class="post type-post status-publish format-standard">
                      <div class="entry-thumb hover-scale">
                        <router-link :to="'/' + v.id + '.html'"><img
                          width="500"
                          height="340"
                          :src="getImg(v.header_img)"
                          class="lazy show"
                          :alt="v.title"
                          style="display: block;"></router-link>
                        <ul class="post-categories">
                          <li v-if="v.menuMeta"><router-link :to="'/category/' + v.menuMeta.value" rel="category tag">{{ v.menuMeta.label }}</router-link></li>
                        </ul>
                      </div>
                      <router-link v-if="v.authorMeta" :to="'/author/' + v.authorMeta.id" class="post_box_avatar_link" :title="v.authorMeta.name">
                        <img
                          class="post_box_avatar_img"
                          :title="v.authorMeta.name"
                          :src="getImg(v.authorMeta.avatar)"
                          width="50"
                          height="50"
                          :alt="v.authorMeta.name">
                        <span class="post_box_avatar_author_name">{{ v.authorMeta.name }}</span>
                      </router-link>
                      <div class="entry-detail">
                        <header class="entry-header">
                          <h2 class="entry-title h4">
                            <router-link v-if="v.authorMeta" :to="'/author/' + v.authorMeta.id">{{ v.title }}</router-link>
                          </h2>
                          <div class="entry-meta entry-meta-1">
                            <span class="entry-date text-muted"><i class="fas fa-bell"></i><time
                              class="entry-date"
                              :datetime="v.updated_at"
                              :title="v.updated_at">{{ diaplayTime(v.updated_at) }}</time></span>
                            <span class="comments-link text-muted pull-right"><i class="far fa-comment"></i>
                              <a>{{ v.comment_count }}</a></span>
                            <span class="views-count text-muted pull-right"><i class="fas fa-eye"></i>{{ v.views }}</span>
                          </div>
                        </header>
                      </div>
                    </article>
                  </div>
                </div>
              </a-spin>
              <div class="pinkacg_other_more_post">
                <a @click="loadMorePost(pageNo - 1)" class="more-post ajax-morepost">上一页<i
                  class="tico tico-angle-right"></i>
                </a>
                <a @click="loadMorePost(pageNo + 1)" class="more-post ajax-morepost">下一页<i
                  class="tico tico-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryList } from '@/api/category'
import { getPostList } from '@/api/post'
import { getImg, diaplayTime } from '@/utils/util'

export default {
  name: 'Index',
  data () {
    return {
      word: '',
      categoryAll: {},
      posts: {},
      getImg,
      diaplayTime,
      pageNo: 1,
      loading: false
    }
  },
  metaInfo () {
    return {
      title: this.$route.params.word + ' - 搜索页面'
    }
  },
  created () {
    this.loadCategoryList()
    this.loadPostList()
    this.word = this.$route.params.word
  },
  methods: {
    Search () {
      this.$router.push({ path: '/search/' + this.word })
    },
    loadCategoryList () {
      getCategoryList().then((res) => {
        if (res.code !== 200) {
          this.$message.error(res.message)
          return []
        }
        this.categoryAll = res.result.data
      })
    },
    loadPostList (pageNo = this.pageNo) {
      this.loading = true
      getPostList({
        'title': this.$route.params.word,
        'pageNo': pageNo
      }).then((res) => {
        if (res.code !== 200) {
          this.$message.error(res.message)
          return []
        }
        if (res.result.data.length === 0) {
          this.$message.info('暂无更多数据')
          this.loading = false
          return []
        }
        this.posts = res.result.data
        this.pageNo = res.result.pageNo
        this.loading = false
      })
    },
    loadMorePost (pageNo) {
      this.loadPostList(pageNo)
    }
  }
}
</script>

<style scoped>

</style>
