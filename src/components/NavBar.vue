<template>
  <div class="nav-bar">
    <router-view />
    <div class="footer">
      <div class="nav">
        <div class="nav-item"
             :class="[index === selectIndex ? 'active' : '']"
             v-for="(item, index) in navList"
             :key="index"
             @click="changeIndex(index)">
          <router-link :to="item.pageUrl">
            <img class="item-img"
                 :src="item.url"
                 :ref="index">
            <span>{{item.name}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      selectIndex: 1,
      navList: [
        {
          url: "./static/ebook-icon/find.png",
          back: "./static/ebook-icon/find.png",
          select: "./static/ebook-icon/find_full.png",
          name: "发现",
          pageUrl: '/shelf'
        },
        {
          url: "./static/ebook-icon/book.png",
          back: "./static/ebook-icon/book.png",
          select: "./static/ebook-icon/book_full.png",
          name: "书架",
          pageUrl: '/shelf'
        },
        {
          url: "./static/ebook-icon/idea.png",
          back: "./static/ebook-icon/idea.png",
          select: "./static/ebook-icon/idea_full.png",
          name: "想法",
          pageUrl: '/shelf'
        },
        {
          url: "./static/ebook-icon/my.png",
          back: "./static/ebook-icon/my.png",
          select: "./static/ebook-icon/my_full.png",
          name: "我",
          pageUrl: '/shelf'
        }
      ]
    }
  },
  methods: {
    init () {
      this.navList[this.selectIndex].url = this.navList[
        this.selectIndex
      ].select;
    },
    changeIndex (index) {
      this.selectIndex = index;
      this.navList[index].url = this.navList[index].select;
      for (var i = 0, len = this.navList.length; i < len; i++) {
        if (i != index) {
          this.navList[i].url = this.navList[i].back;
        }
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

 <style lang="scss">
@import "../assets/styles/global";
.nav-bar {
  position: relative;
  width: 100%;
  height: 100%;
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1001;
    background-color: #fff;
    height: px2rem(60);
    border-top: px2rem(1) solid #e6e8ea;
    box-shadow: 0 -1px 1px 0 #efefef;
    .nav {
      width: 100%;
      height: calc(100% - 20px);
      padding: px2rem(10) 0;
      .nav-item {
        position: relative;
        float: left;
        width: 25%;
        height: 100%;
        font-size: px2rem(10);
        text-align: center;
        color: #717882;
        img {
          height: px2rem(30);
          display: block;
          margin: 0 auto;
        }
        &.nav-item:nth-child(2) {
          img {
            height: px2rem(26);
            margin-top: px2rem(4);
          }
        }
        &.active {
          a {
            color: #1b88ee;
          }
        }
      }
    }
  }
}
</style>
