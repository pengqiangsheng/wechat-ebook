<template>
  <div class="wechat-read-ebook">
    <div class="loading"
         v-if="waiting === 2">
      <div class="flex-container">
        <div class="unit">
          <div class="heart">
            <div class="heart-piece-0"></div>
            <div class="heart-piece-1"></div>
            <div class="heart-piece-2"></div>
            <div class="heart-piece-3"></div>
            <div class="heart-piece-4"></div>
            <div class="heart-piece-5"></div>
            <div class="heart-piece-6"></div>
            <div class="heart-piece-7"></div>
            <div class="heart-piece-8"></div>
          </div>
          <p>loading</p>
        </div>
      </div>
    </div>
    <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left"
             @click="prevPage"></div>
        <div class="center"
             @click="toggleTitleAndMenu"></div>
        <div class="right"
             @click="nextPage"></div>
      </div>
      <div class="mask-tip"
           v-if="waiting == 3"
           @click="toggleMaskAndRead">
        <div class="left tip-wrapper">
          <div class="wrapper">
            <div class="tip-text-up">
              <span>点击左边</span>
            </div>
            <div class="tip arrow-left"></div>
            <div class="tip-text">
              <span>上一页</span>
            </div>
          </div>
        </div>
        <div class="center tip-wrapper">
          <div class="wrapper">
            <div class="tip-text-up">
              <span>点击中间</span>
            </div>
            <div class="tip tap"></div>
            <div class="tip-text">
              <span>弹出菜单</span>
            </div>
          </div>
        </div>
        <div class="right tip-wrapper">
          <div class="wrapper">
            <div class="tip-text-up">
              <span>点击右边</span>
            </div>
            <div class="tip arrow-right"></div>
            <div class="tip-text">
              <span>下一页</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <menu-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"
              :fontSizeList="fontSizeList"
              :defaultFontSize="defaultFontSize"
              @setFontSize="setFontSize"
              :themeList="themeList"
              :defaultTheme="defaultTheme"
              @setTheme="setTheme"
              :bookAvailable="bookAvailable"
              @onProgressChange="onProgressChange"
              :navigation="navigation"
              @jumpTo="jumpTo"
              :parentProgress="progress"
              ref="menuBar"></menu-bar>
  </div>
</template>

<script>
import TitleBar from "./TitleBar";
import MenuBar from "./MenuBar";
import Epub from "epubjs";
export default {
  name: "Ebook",
  components: {
    TitleBar,
    MenuBar
  },
  data () {
    return {
      waiting: 2,
      ifTitleAndMenuShow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgb(241, 236, 226)"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#ceeaba"
            }
          }
        }
      ],
      defaultTheme: 0,
      // 图书是否可以用状态
      bookAvailable: false,
      navigation: {},
      progress: 0,
      bookInfo: [
        { bookUrl: "./static/baiyexing.epub", bookId: 0 },
        { bookUrl: "./static/shisheng.epub", bookId: 1 },
        { bookUrl: "./static/eyi.epub", bookId: 2 },
        { bookUrl: "./static/mimi.epub", bookId: 3 },
        { bookUrl: "./static/xianyirenxdexiansheng.epub", bookId: 4 },
        { bookUrl: "./static/huanye.epub", bookId: 5 },
        { bookUrl: "./static/shengnvdejiushu.epub", bookId: 6 }
      ]
    };
  },
  methods: {
    toggleMaskAndRead () {
      this.waiting = 1;
    },
    showProgress () {
      // 获取当前的位置信息
      const currentLocation = this.rendition.currentLocation();
      // 获取当前位置的进度百分比
      this.progress = this.bookAvailable
        ? this.locations.percentageFromCfi(currentLocation.start.cfi)
        : 0;
      // 转化成0-100的数字
      this.progress = Math.round(this.progress * 100);
    },
    // 根据链接跳转目录
    jumpTo (href) {
      this.rendition.display(href).then(() => {
        this.showProgress();
      });
      this.hideTitleAndMenu();
    },
    hideTitleAndMenu () {
      this.ifTitleAndMenuShow = false;
      this.$refs.menuBar.hideSetting();
      this.$refs.menuBar.hideContent();
    },
    // progress 进度条的数值 (0-100)
    onProgressChange (progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    setTheme (index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    registerTheme () {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    },
    toggleTitleAndMenu () {
      if (!this.bookAvailable) {
        return;
      }
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
      if (!this.ifTitleAndMenuShow) {
        // 父组件调用子组件的方法,需要在组件上添加ref="menuBar"属性
        this.$refs.menuBar.hideSetting();
      }
    },
    prevPage () {
      if (this.rendition && this.bookAvailable) {
        this.rendition.prev().then(() => {
          this.showProgress();
        });
      }
    },
    nextPage () {
      if (this.rendition && this.bookAvailable) {
        // this.rendition.next()
        this.rendition.next().then(() => {
          this.showProgress();
        });
      }
    },
    // 选择书籍
    selectBook (choose) {
      return new Epub(choose);
    },
    // 电子书的解析和渲染
    showEpub () {
      // 生成Book
      // this.book = new Epub(DOWNLOAD_URL)
      this.book = this.selectBook(this.bookInfo[this.$route.params.id].bookUrl);
      console.log(this.book)
      // console.log(this.book)
      // 生成Rendition,通过Book.renderTo
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      // 通过Rendition.display
      this.rendition.display();
      // 获取Theme对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      // 此函数定义在子组件中
      this.setFontSize(this.defaultFontSize);
      // 主题注册
      this.registerTheme();
      // 主题设置
      this.setTheme(this.defaultTheme);
      // 获取epubjs的钩子函数
      this.book.ready
        .then(() => {
          return this.book.locations.generate();
        })
        .then(result => {
          this.navigation = this.book.navigation;
          // console.log(this.navigation);
          this.locations = this.book.locations;
          this.bookAvailable = true;
          this.waiting = 3;
        });
    }
  },
  computed: {},
  mounted () {
    this.showEpub();
    // console.log(this.$route.params.id);
  }
};
</script>
<style lang='scss' scoped>
@import "../../assets/styles/global";
@import "../../assets/styles/heart";
.wechat-read-ebook {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .read-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
    .mask-tip {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      font-size: 10px;
      color: #fff;
      background: rgba(51, 51, 51, 0.8);
      .tip-wrapper {
        .wrapper {
          position: relative;
          top: 42%;
          text-align: center;
          .tip {
            width: 50px;
            height: 50px;
            margin: 0 auto;
            background-size: 50px 50px;
            background-repeat: no-repeat;
          }
          .tip-text-up {
            margin-bottom: px2rem(10);
          }
          .tip-text {
            margin-top: px2rem(10);
          }
        }
      }
      .left {
        flex: 0 0 px2rem(100);
        .wrapper {
          .arrow-left {
            background-image: url("../../assets/arrow-left.png");
          }
        }
      }
      .center {
        flex: 1;
        .wrapper {
          .tap {
            background-image: url("../../assets/tap.png");
          }
        }
      }
      .right {
        flex: 0 0 px2rem(100);
        .wrapper {
          .arrow-right {
            background-image: url("../../assets/arrow-right.png");
          }
        }
      }
    }
  }
}
</style>
