<template>
  <div class="single_more_posts">
    <div v-for='(v, k) in morePost' :key='k' class="col-md-3 box-1 float-left">
      <article class="post type-post status-publish format-standard">
        <div class="entry-thumb hover-scale">
          <router-link :to="'/' + v.id + '.html'">
            <img
            width="200"
            height="340"
            :src="getImg(v.header_img)"
            class="lazy show"
            style="display: block;">
          </router-link>
          <ul class="post-categories">
            <li v-for='(v, k) in v.menuMeta' :key='k'><router-link :to="'/category/' + v.value" rel="category tag">{{ v.label }}</router-link></li>
          </ul>
        </div>
        <router-link :to="'/author/' + v.authorMeta.id" class="post_box_avatar_link" :title="v.authorMeta.id">
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
            <h2 class="entry-title h4"><router-link :to="'/' + v.id + '.html'" rel="bookmark">{{ v.title }}</router-link>
            </h2>
            <div class="entry-meta entry-meta-1">
              <span class="entry-date text-muted"><i class="fas fa-bell"></i><time class="entry-date" :datetime="v.updated_at" :title="v.updated_at">{{ diaplayTime(v.updated_at) }}</time></span>
              <span class="comments-link text-muted pull-right"><i class="far fa-comment"></i><a>{{ v.comment_count }}</a></span>
              <span class="views-count text-muted pull-right"><i class="fas fa-eye"></i>{{ v.views }}</span>
            </div>
          </header>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { getPostList } from '@/api/post'
import { getImg, diaplayTime } from '@/utils/util'

export default {
  name: 'morePost',
  props: ['k'],
  data () {
    return {
      'morePost': {},
      getImg,
      diaplayTime
    }
  },
  created () {
    const that = this
    getPostList({
      'menu': this.k
    })
      .then(res => {
        if (res.code !== 200) {
          that.$message.error(res.message)
          return []
        }
        console.log(res)
        this.morePost = res.result.data
      })
  }
}
</script>

<style scoped>

</style>
