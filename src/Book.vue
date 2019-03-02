<template>
  <div class="book">
    <div class="header" :class="{show: isShow}">
      <div class="headline">书架</div>
    </div>
    <div class="content">
      <div class="content-wrapper" ref="content">
        <div class="search-wrapper">
          <div class="search">
            <div class="icon">
              <img src="./assets/search.png">
            </div>
            <div class="input-wrapper">
              <input placeholder="搜索">
            </div>
          </div>
        </div>
        <div class="item-wrapper">
          <div class="item" v-for="(item, index) in bookInfo" :key="index">
            <router-link :to="item.bookUrl">
              <div class="item-img">
                <img :src="item.bookImageUrl">
              </div>
              <span>{{item.bookName}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="nav">
        <div
          class="nav-item"
          :class="[index === selectIndex ? 'active' : '']"
          v-for="(item, index) in navList"
          :key="index"
          @click="changeIndex(index)"
        >
          <img class="item-img" :src="item.url" :ref="index">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
      selectIndex: 1,
      isShow: false,
      navList: [
        {
          url: "./static/ebook-icon/find.png",
          back: "./static/ebook-icon/find.png",
          select: "./static/ebook-icon/find_full.png",
          name: "发现"
        },
        {
          url: "./static/ebook-icon/book.png",
          back: "./static/ebook-icon/book.png",
          select: "./static/ebook-icon/book_full.png",
          name: "书架"
        },
        {
          url: "./static/ebook-icon/idea.png",
          back: "./static/ebook-icon/idea.png",
          select: "./static/ebook-icon/idea_full.png",
          name: "想法"
        },
        {
          url: "./static/ebook-icon/my.png",
          back: "./static/ebook-icon/my.png",
          select: "./static/ebook-icon/my_full.png",
          name: "我"
        }
      ],
      bookInfo: [
        {
          bookName: "白夜行",
          bookUrl: "/ebook/0",
          bookImageUrl: "./static/ebook-img/1.jpg"
        },
        {
          bookName: "时生",
          bookUrl: "/ebook/1",
          bookImageUrl: "./static/ebook-img/2.jpg"
        },
        {
          bookName: "恶意",
          bookUrl: "/ebook/2",
          bookImageUrl: "./static/ebook-img/3.jpg"
        },
        {
          bookName: "秘密",
          bookUrl: "/ebook/3",
          bookImageUrl: "./static/ebook-img/4.jpg"
        },
        {
          bookName: "嫌疑人x的献身",
          bookUrl: "/ebook/4",
          bookImageUrl: "./static/ebook-img/5.jpg"
        },
        {
          bookName: "幻夜",
          bookUrl: "/ebook/5",
          bookImageUrl: "./static/ebook-img/6.jpg"
        },
        {
          bookName: "圣女的救赎",
          bookUrl: "/ebook/6",
          bookImageUrl: "./static/ebook-img/7.jpg"
        }
      ]
    };
  },
  methods: {
    init() {
      this.navList[this.selectIndex].url = this.navList[
        this.selectIndex
      ].select;
    },
    changeIndex(index) {
      this.selectIndex = index;
      this.navList[index].url = this.navList[index].select;
      for (var i = 0, len = this.navList.length; i < len; i++) {
        if (i != index) {
          this.navList[i].url = this.navList[i].back;
        }
      }
    },
    handleScroll() {
      const top = document.documentElement.scrollTop;
      const top1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      console.log(top1);
      if (top > 10) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  mounted() {
    this.init();
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang='scss'>
@import "assets/styles/global";
.book {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  a {
    text-decoration: none;
    color: black;
  }
  .header {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    background-color: white;
    padding: px2rem(14) 0;
    &.show {
      border-bottom: px2rem(1) solid #e6e8ea;
      box-shadow: 0 1px 1px 0 #efefef;
    }
    .headline {
      text-align: center;
      font-size: px2rem(20);
    }
  }
  .content {
    position: relative;
    top: px2rem(48);
    width: 100%;

    margin-bottom: px2rem(60);
    .content-wrapper {
      .search-wrapper {
        position: relative;
        width: calc(100% - 20px);
        height: px2rem(30);
        padding: 0 10px;
        .search {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          background-color: #f2f2f2;
          .icon {
            position: absolute;
            width: px2rem(30);
            height: px2rem(30);
            padding: px2rem(6);
            img {
              width: 60%;
              height: 60%;
            }
          }
          .input-wrapper {
            position: relative;
            width: calc(100% - px2rem(30));
            height: 100%;
            padding-left: px2rem(30);
            input {
              position: absolute;
              border: none;
              outline: none;
              background-color: rgba(0, 0, 0, 0);
              height: 100%;
            }
          }
        }
      }
      .item-wrapper {
        &.item-wrapper:after {
          content: "";
          display: block;
          clear: both;
        }
        position: relative;
        width: 100%;
        margin-bottom: 41px;
        .item {
          position: relative;
          float: left;
          width: 33.3%;
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: px2rem(10);
          text-align: center;
          .item-img {
            position: relative;
            img {
              display: block;
              height: px2rem(140);
              margin: 10px auto;
            }
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
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
            margin-top: px2rem(3);
          }
        }
        &.active {
          color: #1b88ee;
        }
      }
    }
  }
}
</style>
