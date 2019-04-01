<template>
  <div class="wechat-read-shelf">
    <div class="header"
         :class="{show: isShow}">
      <div class="headline">书架</div>
    </div>
    <div class="content">
      <div class="content-wrapper"
           ref="content">
        <div class="search-wrapper">
          <div class="search">
            <div class="icon">
              <img src="../../assets/search.png">
            </div>
            <div class="input-wrapper">
              <input placeholder="搜索">
            </div>
          </div>
        </div>
        <div class="item-wrapper">
          <div class="item"
               v-for="(item, index) in bookInfo"
               :key="index">
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
  </div>
</template>

<script>
export default {
  name: "wechatReadShelf",
  data () {
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
    handleScroll () {
      const top = document.documentElement.scrollTop;
      const top1 =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(top1);
      if (top > 10) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  },
  mounted () {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted () {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang='scss'>
@import "../../assets/styles/global";
.wechat-read-shelf {
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
        height: 40px;
        padding: 0 10px;
        .search {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          background-color: #f2f2f2;
          .icon {
            position: absolute;
            height: 100%;
            width: 40px;
            img {
              width: 60%;
              height: 60%;
              margin: 20%;
            }
          }
          .input-wrapper {
            position: relative;
            width: calc(100% - 40px);
            height: 100%;
            padding-left: 40px;
            input {
              border: none;
              outline: none;
              background-color: rgba(0, 0, 0, 0);
              height: 100%;
              width: 100%;
              padding: 0;
              float: left;
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
        padding-bottom: 41px;
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
}
</style>
