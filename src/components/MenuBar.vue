<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper"
      :class="{'hide-box-shadow':ifSettingShow}"
      v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper">
          <div class="icon-menu icon" @click="showContent"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-progress icon" @click="showSetting(2)"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-bright icon" @click="showSetting(1)"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-a icon" @click="showSetting(0)">A</div>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper"
      v-show="ifSettingShow">
        <div class="setting-font-size" v-if="showTag === 0">
          <div class="preview" :style="{fontSize:
          fontSizeList[0].fontSize + 'px'}">A</div>
          <div class="select">
            <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index"
              @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="point-wrapper">
                <div class="point"
                v-show="defaultFontSize
                === item.fontSize">
                  <div class="small-point">

                  </div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>
          <div class="preview" :style="{fontSize:
          fontSizeList[fontSizeList.length - 1]
          .fontSize + 'px'}">A</div>
        </div>
        <div class="setting-theme" v-else-if="showTag === 1">
          <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index"
              @click="setTheme(index)">
            <div class="preview" :style="{background: item.style.body.background}"
            :class="{'no-border': item.style.body.background !== '#fff'}"></div>
            <div class="text" :class="{'selected': index === defaultTheme}">{{item.name}}</div>
          </div>
        </div>
        <div class="setting-progress" v-else-if="showTag === 2">
          <div class="progress-wrapper">
            <input class="progress" :style="styles"
                                    type="range"
                                    max="100"
                                    min="0"
                                    step="1"
                                    @change="onProgressChange($event.target.value)"
                                    @input="onProgressInput($event.target.value)"
                                    :value="progress"
                                    :disabled="!bookAvailable"
                                    ref="progress">
            <div class="text-wrapper">
            <span>{{bookAvailable ? progress  + '%' : '加载中...'}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <content-view :ifShowContent="ifShowContent"
                  v-show="ifShowContent"
                  :navigation="navigation"
                  :bookAvailable="bookAvailable"
                  @jumpTo="jumpTo"></content-view>
    <transition name="fade">
      <div class="content-mask"
            v-show="ifShowContent"
            @click="hideContent"></div>
    </transition>
  </div>
</template>

<script>
import ContentView from '@/components/Content'
export default {
  name: 'MenuBar',
  components: {
    ContentView
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: {
      type: Boolean,
      default: false
    },
    navigation: Object,
    parentProgress: Number
  },
  data () {
    return {
      ifSettingShow: false,
      showTag: 0,
      ifShowContent: false,
      progress: 0
    }
  },
  computed: {
    styles () {
      var style = {
        backgroundSize: `${this.progress}% 100%`
      }
      return style
    }
  },
  watch: {
    parentProgress: {
      handler: function (val, oldVal) {
        this.progress = val
      },
      deep: true
    }
  },
  methods: {
    jumpTo (target) {
      this.$emit('jumpTo', target)
    },
    // 进度条拖动事件
    onProgressInput (progress) {
      this.progress = progress
    },
    // 进度条松手事件，跳转到相应进度
    onProgressChange (progress) {
      this.$emit('onProgressChange', progress)
    },
    setTheme (index) {
      // 使用父组件的setTheme方法
      this.$emit('setTheme', index)
    },
    showSetting (tag) {
      this.ifSettingShow = true
      this.showTag = tag
    },
    showContent () {
      this.ifShowContent = true
    },
    hideContent () {
      this.ifShowContent = false
    },
    hideSetting () {
      this.ifSettingShow = false
    },
    setFontSize (fontSize) {
      // 传到父组件去使用
      this.$emit('setFontSize', fontSize)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../assets/styles/global';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }
  .setting-wrapper {
    z-index: 101;
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    height: px2rem(60);
    background-color: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-font-size {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }

            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              background-color: white;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4)
              rgba(0, 0, 0, .15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                background: black;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
    .setting-theme {
      display: flex;
      height: 100%;
      .setting-theme-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.no-border {
            border: none;
          }
        }
        .text {
          flex: 0 0 px2rem(20);
          font-size: px2rem(14);
          color: #ccc;
          @include center;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(30);
        box-sizing: border-box;
        .progress {
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#999, #999)
            no-repeat, rgb(241, 239, 239);
          background-size: 0 100%;
          &:focus {
            outline: none;
          }
          &::-webkit-slide-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: white;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
            border: px2rem(1) solid #ddd;
          }
        }
        .text-wrapper {
          position: absolute;
          width: px2rem(60);
          height: px2rem(20);
          font-size: px2rem(12);
          bottom: 0;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }
  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, .8);
  }
}

</style>
