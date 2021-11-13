<template>
  <div class="main-container" ref="main">
    <ProgressIndicator
      id="wheel"
      :class="{ hidden: scrolled < 0.8 || scrolled > 7 }"
      :current="scrolled"
    ></ProgressIndicator>
    <div class="bg-container">
      <img src="@img/bg.jpg" alt="" class="bg" />
      <img src="@img/bg.jpg" alt="" class="bg" />
      <img src="@img/bg.jpg" alt="" class="bg" />
    </div>
    <div class="blackbg" :class="{ show: scrolled >= 7 }"></div>
    <div class="screen" id="s0">
      <video src="@video/1.mp4" autoplay muted playsinline @pause="videoPlaying = false"></video>
      <transition>
        <img src="@img/title.jpg" alt="" v-if="!videoPlaying" id="title" />
      </transition>
      <transition>
        <div class="prompt" v-if="!videoPlaying" @click="scrollTo(1)">
          <span>向下滑动来了解</span>
          <img src="@img/down.svg" />
        </div>
      </transition>
    </div>
    <div class="screen" id="s1">
      <transition name="move1" mode="out-in">
        <div class="left" v-if="scrolled >= 0.2 && scrolled <= 1.7">
          <FilmRoll
            :sIndex="0"
            :items="['s1_v0', 's1_v1', 's1_v2', 's1_v3']"
            :show-detail="showDetail[0]"
            :width="filmrollWidth"
            :height="filmrollHeight"
            :outer-width="0.46875 * screenWidth"
            style="transform: translateX(-120px)"
            @slideChange="handleSlideChange($event)"
          ></FilmRoll>
          <span class="des" :class="{ hidden: showDetail[0] }">
            {{ description[`s1_v${swiperIndex[0]}`] || "缺少介绍" }}
          </span>
        </div>
        <div class="left" v-else></div>
      </transition>
      <div class="right">
        <h2 class="gray">电影的诞生</h2>
        <p>
          早在1829年，比利时著名物理学家约瑟夫普拉多发现：当一个物体在人的眼前消失后，该物体的形象还会在人的视网膜上滞留一段时间，这一发现，被称之为“视象暂留原理”。普拉多根据此原理于1832年发明了“诡盘”。“诡盘”能使被描画在锯齿形的硬纸盘上的画片因运动而活动起来，而且能使视觉上产生的活动画面分解为各种不同的形象。“诡盘”的出现，标志着电影的发明进入到了科学实验阶段。1834年，美国人霍尔纳的“活动视盘”试验成功；1853年，奥地利的冯乌却梯奥斯将军在上述的发明基础上，运用幻灯，放映了原始的动画片。
        </p>
        <!-- <a rel="ar" href="/渲染出图.usdz">a</a> -->
        <ClassicButton @click="showDetail[0] = !showDetail[0]">{{
          showDetail[0] ? "返回视频" : "了解更多"
        }}</ClassicButton>
      </div>
      <div class="transition" style="bottom: 0; right: 60px">
        <img src="@img/projector1.png" alt="" id="proj1" />
      </div>
    </div>
    <div class="screen" id="s2" style="overflow-x: hidden">
      <div class="left">
        <h2 class="gray">无声电影</h2>
        <p>
          无声电影（或称默片）是没有任何配音、配乐或与画面协调的声音的电影。默片技术发明于1860年左近，但在1880至1900年期间，当单卷电影的制作已经变得容易时，默片仍然算是新奇的东西。把电影影像与声音配合的想法，几乎是与电影本身俱生的；但由于技术上的困难，在1920年代末以前，大部分电影都是默片。可是默片的影像等同共通的语言；默片年代，亦被称为“银幕年代”。
        </p>
        <ClassicButton @click="showDetail[1] = !showDetail[1]">{{
          showDetail[1] ? "返回视频" : "了解更多"
        }}</ClassicButton>
      </div>
      <transition name="move2" mode="out-in">
        <div class="right" v-if="scrolled >= 1.2 && scrolled <= 2.3">
          <div class="rotatable" :class="{ rotate: !showDetail[1] }">
            <FilmRoll
              :sIndex="1"
              :items="['s2_v0']"
              :show-detail="showDetail[1]"
              :width="filmrollWidth"
              :height="filmrollHeight"
              :outer-width="filmrollOuterWidth"
              :innerTranslate="-90"
              style="transform: translateX(-140px)"
              @slideChange="handleSlideChange($event)"
            ></FilmRoll>
            <span class="des" :class="{ hidden: showDetail[1] }">
              {{ description[`s2_v${swiperIndex[1]}`] || "缺少介绍" }}
            </span>
          </div>
        </div>
        <div class="right" v-else></div>
      </transition>
    </div>
    <div class="screen" id="s3">
      <div class="left">
        <div class="rotatable" :class="{ rotate: !showDetail[2] && !audioGame.isShow }" v-if="!s3rollStyle.fixed">
          <FilmRoll
            :sIndex="2"
            :items="['s3_v0', 's3_v1']"
            :show-detail="showDetail[2]"
            :width="filmrollWidth"
            :height="filmrollHeight"
            :outer-width="filmrollOuterWidth"
            :audio-game="audioGame"
            style="transform: translateX(-120px)"
            @slideChange="handleSlideChange($event)"
            @playbackfinish="audioGame.isPlaying = false"
          ></FilmRoll>
          <span class="des" v-if="!audioGame.isShow" :class="{ hidden: showDetail[2] }">
            {{ description[`s3_v${swiperIndex[2]}`] || "缺少介绍" }}
          </span>
          <div v-if="audioGame.isShow" class="buttons">
            <ClassicButton @click="audioGame.isRecording = true">
              <span
                class="icon"
                :class="!audioGame.isRecording || audioGame.isPaused ? 'icon-record' : 'icon-recording'"
              ></span>
              {{ !audioGame.isRecording || audioGame.isPaused ? "录制" : "录制中" }}
            </ClassicButton>
            <template v-if="audioGame.isRecording">
              <ClassicButton @click="audioGame.isPaused = !audioGame.isPaused">
                <span class="icon" :class="audioGame.isPaused ? 'icon-play' : 'icon-pause'"></span>
                {{ audioGame.isPaused ? "继续" : "暂停" }}
              </ClassicButton>
              <ClassicButton
                @click="
                  audioGame.isRecording = false;
                  audioGame.isPaused = false;
                "
              >
                <span class="icon icon-stop"></span>
                结束
              </ClassicButton>
            </template>
            <template v-else>
              <ClassicButton @click="audioGame.isPlaying = !audioGame.isPlaying">
                <span class="icon" :class="audioGame.isPlaying ? 'icon-pause' : 'icon-play'"></span>
                {{ audioGame.isPlaying ? "停止" : "播放" }}
              </ClassicButton>
            </template>
          </div>
        </div>
        <!-- 可移动的部分 -->
        <div
          v-else
          class="rotate"
          @mousewheel="animations4($event)"
          :style="{
            position: s3rollStyle.fixed ? 'fixed' : 'relative',
            left: s3rollStyle.left + 'px',
            top: s3rollStyle.top + 'px',
            width: s3rollStyle.fixed ? 'unset' : '100%',
            transform: `translateY(${s3rollStyle.translateY}%) translateZ(0) rotate(${s3rollStyle.rotate}deg) scale(${s3rollStyle.scale})`,
            transformOrigin: s3rollStyle.fixed ? 'center center' : '',
          }"
        >
          <FilmRoll
            :sIndex="3"
            :items="['s4_v0', 's4_v1']"
            :dualContent="true"
            :extraItems="['s4_v0', 's4_v1']"
            :clip="clip"
            :width="s3rollStyle.width"
            :height="s3rollStyle.height"
            :outer-width="s3rollStyle.outerWidth"
            :innerTranslate="s3rollStyle.innerTranslate"
            :style="{ transform: 'translateX(' + s3rollStyle.translateX + 'px)' }"
            @slideChange="handleSlideChange($event)"
          ></FilmRoll>
        </div>
      </div>
      <div class="right">
        <h3>{{ audioGame.isShow ? "体验一下" : "第一次变革" }}</h3>
        <h2 class="gray">{{ audioGame.isShow ? "在胶卷上记录声音" : "有声电影" }}</h2>
        <p v-if="audioGame.isShow">
          早期的电影依靠光学录放音(optical sound recording)。以感光材料为媒介记录声音。<br />
          ①传声器把空气中的声音转换为相应的模拟电信号，或者说是把传声器上振膜的机械能转变为电能。<br />
          ②录音放大器把传声器输出的模拟电信号不失真地提高到可以应用程度。<br />③光调制器把放大器输出的电信号转换为光
          信号以控制声带底片上的曝光量。当声带底片通过光调制器的光刃时，不同位置上得到对应于电信号的曝光量，使声音信号记录到胶片上。
        </p>
        <p v-else>
          电影从无声到有声，经历了一个巨大的转变过程。
          早期的有声电影是用放映机和留声机同时工作来发声的，1926年8月6日，世界第一部有声短片《唐璜》使用
          “维他风”Vitaphone唱片重放影片音乐。
          1927年华纳推出《爵士歌王》，不仅有音乐，还加入了一部分对白，被看作是电影史上第一部有声片。
        </p>
        <div class="buttons">
          <ClassicButton @click="showDetail[2] = !showDetail[2]" v-if="!audioGame.isShow">{{
            showDetail[2] ? "返回视频" : "了解更多"
          }}</ClassicButton>
          <ClassicButton @click="audioGame.isShow = !audioGame.isShow">
            {{ audioGame.isShow ? "返回视频" : "体验一下" }}
          </ClassicButton>
        </div>
      </div>
      <div class="transition" style="top: 0; left: 50px">
        <img src="@img/projector2.png" alt="" id="proj2" />
      </div>
    </div>
    <div
      class="screen"
      id="s4"
      @mousewheel="animations4($event)"
      :style="{
        position: scrolled <= 6 ? 'sticky' : '',
        paddingBottom: Math.min(scrolled - 4, 1) * 0.05 * screenHeight + 'px',
      }"
    >
      <h3>第二次变革</h3>
      <h2 :class="{ gray: wheelDelta <= this.screenHeight * 0.95 }">黑白到彩色</h2>
    </div>
    <div class="screen" id="s5" :style="{ position: scrolled <= 6 ? 'sticky' : '' }">
      <div class="left">
        <h3 :style="{ color: scrolled <= 5.5 ? '' : 'var(--darkText)' }">第一阶段</h3>
        <p>
          大概100多年前的胶片时代，最早的电影人尝试在拍摄后，手工在胶片上进行着色。电影的每一帧都需要手工绘制。特技先驱梅里埃就曾雇佣过21名女性，一帧一帧地为他影片《飞向月球》上色。在法国使用模板工艺制作的彩色胶卷被称为Pathe
          color（百代彩色），这一工艺在当时整个欧洲都在使用。
        </p>
        <!-- <ClassicButton @click="showDetail[3] = !showDetail[3]">{{
          showDetail[3] ? "返回视频" : "了解更多"
        }}</ClassicButton> -->
      </div>
      <div class="placeholder" :style="{ width: (filmrollOuterWidth + 200) * 0.8 + 'px' }"></div>
      <div class="right"></div>
    </div>
    <div class="screen" id="s6" :style="{ position: scrolled <= 6 ? 'sticky' : '' }">
      <div class="left" :style="{ opacity: scrolled <= 6 ? 0 : 1 }">
        <h3 style="color: var(--darkText)">第一阶段</h3>
        <p>
          大概100多年前的胶片时代，最早的电影人尝试在拍摄后，手工在胶片上进行着色。电影的每一帧都需要手工绘制。特技先驱梅里埃就曾雇佣过21名女性，一帧一帧地为他影片《飞向月球》上色。在法国使用模板工艺制作的彩色胶卷被称为Pathe
          color（百代彩色），这一工艺在当时整个欧洲都在使用。
        </p>
        <!-- <ClassicButton @click="showDetail[3] = !showDetail[3]">{{
          showDetail[3] ? "返回视频" : "了解更多"
        }}</ClassicButton> -->
      </div>
      <div
        class="placeholder"
        :style="{
          opacity: scrolled <= 6 ? 0 : 1,
          width: (filmrollOuterWidth + 200) * 0.8 + 'px',
        }"
      >
        <h3>第二次变革</h3>
        <h2>黑白到彩色</h2>
      </div>
      <div class="right">
        <h3>第二阶段</h3>
        <p>
          1932年，Technicolor推出了一种利用染料转印技术的三色胶片，该技术描绘了电影中最具活力，最鲜艳的色彩。在此之后，贝拉·加斯帕发明了分解胶片颜色膜成像的彩色技术，它在沃尔特迪斯尼的短片动画电影“花草树木”中首次亮相。
          1935年，美国马摩里安导演了世界上第一部大型彩色故事片《浮华世界》。
        </p>
        <!-- <ClassicButton @click="showDetail[4] = !showDetail[4]">{{
          showDetail[4] ? "返回视频" : "了解更多"
        }}</ClassicButton> -->
      </div>
    </div>
    <!-- “数字化”部分 -->
    <div class="screen modern" id="s7" :style="{ position: scrolled >= 8 ? 'relative' : 'sticky' }">
      <div>
        <h3 :style="{ color: scrolled >= 7 ? 'var(--lightText)' : 'var(--darkText)' }">第三次变革</h3>
        <h2>数字化</h2>
      </div>
    </div>
    <div class="screen modern" id="s8">
      <div class="left compact">
        <img src="@img/computer.png" alt="" />
        <div class="content">
          <transition mode="out-in">
            <ImgProcessGame id="game2" v-if="showDetail[5] == 2 && showPSGame"></ImgProcessGame>
            <video
              :src="require('@video/' + s8video[showDetail[5]] + '.mp4')"
              muted
              controls
              playsinline
              autoplay
              v-else
            ></video>
          </transition>
          <div class="controls" v-if="showDetail[5] == 2">
            <img :src="require('@img/video-' + (showPSGame ? 1 : 2) + '.png')" alt="" @click="showPSGame = false" />
            <img :src="require('@img/ps-' + (showPSGame ? 2 : 1) + '.png')" alt="" @click="showPSGame = true" />
          </div>
        </div>
      </div>
      <div class="right compact">
        <input type="radio" name="digitech" id="projection" value="0" v-model="showDetail[5]" checked />
        <label for="projection">数字放映技术</label>
        <div v-if="showDetail[5] == 0">
          <p>
            索尼公司在1980年代开始推广“电子电影摄影“的概念，这项工作收效甚微。但这早就了最早的高清视频拍摄故事片之一——Julia和Julia(1987)。
          </p>
          <p>
            《彩虹》(1996)是世界上第一部使用广泛数字后期制作技术的电影。它完全使用索尼的首台电子电影摄像机拍摄，并具有超过35分钟的数字图像处理和视觉效果，所有后期制作、音效和编辑都以数字方式完成，最后通过电子束记录仪将数字高清图像传输到35mm胶片中进行播放。
          </p>
          <p>
            《最后的广播》(1998)被认为是第一个完全在消费级数字设备上进行拍摄和编辑的电影，而且它被传输到5个美国城市的电影院并首次使用了“国际数字放映机”公司DPI制造的DLP数字电影放映机进行了放映，成为首部进行数字播放的电影之一，开拓了一条胶片拷贝以外的电影播映方式。
          </p>
        </div>
        <input type="radio" name="digitech" id="cg" value="1" v-model="showDetail[5]" />
        <label for="cg">计算机生成影像</label>
        <div v-if="showDetail[5] == 1">
          <p>
            计算机生成影像技术是完全由计算机创造出影像的计算机生成图像技术，简称CGI，即利用计算机软件创造出模拟真实场景的三维空间或电影虚拟人物，也可以对真实拍摄到的空间环境进行改进、描绘。这一技术是数字化的代表。
          </p>
          <p>
            世界上第一部完全用计算机动画制作的电影《玩具总动员》突破了数字技术在电影业中的运用限制，给电影制作开辟了一条全新的道路。
          </p>
        </div>
        <input type="radio" name="digitech" id="processing" value="2" v-model="showDetail[5]" />
        <label for="processing">数字影像处理</label>
        <div v-if="showDetail[5] == 2">
          <p>
            数字影像合成技术，是指将两个或更多的影像利用计算机图形图像学原理和方法进行叠加或组合处理，是目前拍摄数字化电影最重要的后期制作方法。
          </p>
          <p>
            蓝幕和绿幕技术就是其中的代表。演员在蓝幕、绿幕前表演，由摄影机拍摄下来，画面在电脑中处理，处理掉背景的蓝色或绿色，换上其他背景。2010年的《阿凡达》对CG和数字影像合成技术的应用达到了前所未有的高度，而且至今未被超越。
          </p>
          <p style="color: var(--lightGray); font-size: 20px">
            <Arrow color="var(--lightGray)" />
            点击Dock栏右侧的图标体验一下
          </p>
        </div>
      </div>
    </div>
    <div class="screen modern video-section" id="s9" @mousewheel="animations9($event)">
      <h2 style="z-index: 3">What's Next?</h2>
      <div id="the-text">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1202 60">
          <rect class="a text-bg" width="1202" height="60" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1202 60" class="text-mask">
            <polygon points="704.97 60 709.46 60 705.76 55.04 704.97 60" style="fill: #000" />
            <path
              d="M1158.72,34.56h1.52a2.4,2.4,0,0,0,1.76-.72,2.49,2.49,0,0,0,.72-1.84V27.52h-4Z"
              style="fill: #000"
            />
            <path
              d="M803.36,38H757.6V60H800l2.37-6.16h2.16a2,2,0,0,0,1.44-.56A1.74,1.74,0,0,0,806.4,52V41a3.15,3.15,0,0,0-3-3Zm-1.68,12.32a5.14,5.14,0,0,1-1.68,4,4.89,4.89,0,0,1-3.84,1.76h-34.4V40.4h39.92Z"
              style="fill: #000"
            />
            <path
              d="M0,0V60H37.41a7.05,7.05,0,0,1-1.89-.52,7.41,7.41,0,0,1-2.36-1.64,8.06,8.06,0,0,1-1.6-2.4,7.08,7.08,0,0,1-.6-2.88v-5.2H2.4V6.64H31V2.24H41.84v4.4H69.52v33.2a7.25,7.25,0,0,1-.6,3,7.46,7.46,0,0,1-4,4,7.34,7.34,0,0,1-2.92.6H41.84V50a2.46,2.46,0,0,0,2.56,2.56H71.12L67,60H77.94l2.62-9.68h7.92L85.78,60H88.1l1.82-5.84c.11,0,.31,0,.6,0l1-.08c.35,0,.65-.07.92-.12a2.48,2.48,0,0,0,.56-.16,2.18,2.18,0,0,0,.4-1.12V48.4H79V35.76H79V33.92h39.68v7a6,6,0,0,1-.2,1.48,13.64,13.64,0,0,1-.44,1.4,8.3,8.3,0,0,1-.72,1.32,7.26,7.26,0,0,1-.88,1.08,9,9,0,0,1-2.48,1.6,6.29,6.29,0,0,1-2.88.64h-6.88v2.88a8.58,8.58,0,0,1-.64,3.52,7.1,7.1,0,0,1-1.92,2.72,10.86,10.86,0,0,1-2.8,1.92,8.87,8.87,0,0,1-2.24.56H110.7l-2.54-9.68H116L118.7,60h40.08l3-6.56H163A2.46,2.46,0,0,0,165.52,51V46.24H155.2L165.52,33V14.88H157V7h8.48V2.08h10.24V7h9v7.92h-9v6.88h11l-11,14.16V51.6a8.46,8.46,0,0,1-.68,3.4,8.84,8.84,0,0,1-1.88,2.76,8.68,8.68,0,0,1-2.8,1.88,7.91,7.91,0,0,1-1.07.36h15.39V53a27.45,27.45,0,0,0,7-2.56,63.74,63.74,0,0,0,6.92-4.16,59.44,59.44,0,0,1-6.92-7.48,31.17,31.17,0,0,1-4.28-7.16h9.12A34.69,34.69,0,0,0,200,35.88,72.56,72.56,0,0,0,205.2,41,63.52,63.52,0,0,0,211.92,34a17.24,17.24,0,0,0,3-4.6H186.64V22.08h13.2V15.92h-13.2V8.56h13.2V2.4h9.76V8.56h14.08v7.36H209.6v6.16h14.08v7.36a24.79,24.79,0,0,1-4.08,8,56.25,56.25,0,0,1-7.92,8.8,63.74,63.74,0,0,0,6.92,4.16,27.45,27.45,0,0,0,7,2.56v7h76.8V8.64h4.8l3.68-6.4H322.8l-3.6,6.4h14.56V51.2a8.74,8.74,0,0,1-5.36,8.12A8.59,8.59,0,0,1,325,60h17.51l3.05-6.8h13.6a2.46,2.46,0,0,0,2.48-2.48V15.28H335.76l4.4-13h11.6L350,7.36h22.8v44a8.29,8.29,0,0,1-.72,3.44,9.3,9.3,0,0,1-1.92,2.8,8.68,8.68,0,0,1-2.8,1.88,8,8,0,0,1-1.71.52h11.64L393,20.08H377.84l5.84-17.6h9.92l-3.2,9.76H396l3.84-9.76,10.8-.4-4,10.16h25.28l-2.8-7.84h10.56l5.52,15.68H403.52l-1.6,4.08H442.8v7.28h-.24l.24.08a41.85,41.85,0,0,1-13.68,18,38,38,0,0,0,7.2,1.92,74.33,74.33,0,0,0,8.32.88V60h5.06l2-7.84V2.32h68.24v7a8.54,8.54,0,0,1-1.8,5.72q-1.8,2.12-6,2.12h-49.6V51.68L460.1,60H478a8.36,8.36,0,0,1-2.27-.6A8.74,8.74,0,0,1,471,54.72a8.59,8.59,0,0,1-.68-3.44V38.72h-5.68V32.48h9.52V28.32h-6.64V22.16h6.64V18.88h10.4v3.28h15.36V18.88h10.4v3.28H517v6.16h-6.64v4.16h9.44v6.24H481.92v13.2a2.41,2.41,0,0,0,.76,1.84,2.51,2.51,0,0,0,1.8.72h7.36l-2,5.52h18.06L490.8,40.72h12L506.64,45l1.92-3.28h9.68l-5.52,10.16L519.85,60H635.78l3.1-7.6V4.56L667.2,2.64v7.92l-17.92,1.36V22.16H667.2V29.6h-3.84V60h7.12l3.12-7h2.48a1.79,1.79,0,0,0,1.32-.52,1.83,1.83,0,0,0,.52-1.32V45.84h-7.36L677.92,31V14.48h-7.28V6.56h7.28V2.24h11V6.56h6.48v7.92H689v6.88h5.84L689,33V52.88a6.94,6.94,0,0,1-2,5,6.73,6.73,0,0,1-5,2.08h13.85L699,40.24h9.2l-.64,3.92,4.88,6.64V37.52H696.4v-7.2h44.24v7.2H724.08v4.16h16.56v7H724.08v4.24h16.24L737.63,60H747V31.36h62.56a7.2,7.2,0,0,1,5.32,2.24A7.4,7.4,0,0,1,817,39V52a7.91,7.91,0,0,1-.64,3.2,8.66,8.66,0,0,1-1.76,2.56A8.25,8.25,0,0,1,812,59.52a10.28,10.28,0,0,1-2,.48h49.84a7,7,0,0,1-1.89-.52,7.3,7.3,0,0,1-2.36-1.64,8.06,8.06,0,0,1-1.6-2.4,7.08,7.08,0,0,1-.6-2.88v-5.2H824.8V6.64h28.56V2.24h10.88v4.4h27.68v33.2a7.25,7.25,0,0,1-.6,3,7.81,7.81,0,0,1-1.6,2.36,7.59,7.59,0,0,1-2.4,1.6,7.37,7.37,0,0,1-2.92.6H864.24V50a2.46,2.46,0,0,0,2.56,2.56h26.72L889.4,60h10.94L903,50.32h7.92L908.18,60h2.32l1.82-5.84.6,0,1-.08c.34,0,.65-.07.92-.12a2.66,2.66,0,0,0,.56-.16,2.28,2.28,0,0,0,.4-1.12V48.4h-14.4V35.76h.08V33.92h39.68v7a6,6,0,0,1-.2,1.48c-.14.51-.28,1-.44,1.4a10.27,10.27,0,0,1-.72,1.32,7.26,7.26,0,0,1-.88,1.08,9.2,9.2,0,0,1-2.48,1.6,6.35,6.35,0,0,1-2.88.64h-6.88v2.88A8.75,8.75,0,0,1,926,54.8a7.1,7.1,0,0,1-1.92,2.72,11,11,0,0,1-2.8,1.92A8.94,8.94,0,0,1,919,60H933.1l-2.54-9.68h7.84L941.09,60H977.6V8.64h4.8l3.68-6.4H998l-3.6,6.4H1009V51.2a8.74,8.74,0,0,1-5.36,8.12,8.59,8.59,0,0,1-3.36.68h17.51l3-6.8h13.6a2.46,2.46,0,0,0,2.48-2.48V15.28H1011l4.4-13H1027l-1.76,5.12H1048v44a8.29,8.29,0,0,1-.72,3.44,9.3,9.3,0,0,1-1.92,2.8,8.79,8.79,0,0,1-2.8,1.88,8.2,8.2,0,0,1-1.71.52h12.51V49.28a45.53,45.53,0,0,0,5-3.64,39.66,39.66,0,0,0,4.32-4.28q-6.48-11-9.12-27.28h10.4c.26,1.71.58,3.33,1,4.88s.8,3,1.28,4.48.89,2.83,1.4,4.16a38.31,38.31,0,0,0,1.64,3.76,41.86,41.86,0,0,0,1.88-4.4q.84-2.33,1.56-4.8a73.78,73.78,0,0,0,2.08-11h-21.36V3H1085V11.2a67.78,67.78,0,0,1-3.28,16.24,61.66,61.66,0,0,1-6.4,13.6,34.45,34.45,0,0,0,4.48,4.72,41,41,0,0,0,5.2,3.76V60h46.24l2.64-15.44h11.44L1142.64,60h12a4.54,4.54,0,0,1-3.84-1.56,5,5,0,0,1-1.2-3V43.12h11.68V53.68c0,.53.14.84.44.92a3.15,3.15,0,0,0,.84.12h24L1184.24,60h6l-2.56-15.44h11.2L1201.52,60h.48V0ZM119.76,32.56H77.92V26.72H93.36V25H79V2.24h39.68v15.2a7.53,7.53,0,0,1-.64,3,7.93,7.93,0,0,1-1.6,2.4A6.26,6.26,0,0,1,114,24.32a6.29,6.29,0,0,1-2.88.64h-6.88v1.76h15.52ZM134,59.92H121l15-19.12h13.2Zm0-19.12H121l15-19.28h13.2Zm0-19.36H121l15-19.2h13.2ZM240,59.92H229l10-39h11Zm48,0-10-39h11l10,39Zm6.8-42.32H269.36V59.92H258.64V17.6H229V9.36h29.68v-7h10.72v7h15.2l-2.32-5.84h11.2L299,17.6Zm57.12,6.16L359.36,39H347.68l-7.44-15.28ZM609,18.56h3L609.52,3.68h6.32l1.84,10.48v-12h9.68V13.84l1.76-10.16h6.4l-2.64,14.88h2.64v5.68h-8.16V49.92h-9.68V24.24H609Zm8,7.76-1.52,23.6h-6.4l1.52-23.6ZM581.92,51.2,565,19.92h11.44L593.36,51.2Zm11.44-40.32h-33L557.68,15h5.6V59.76H552.56V23.28L535.12,51.2H523.36l25.2-40.32h-25.2V2.64h70Zm38.48,48.56H605.52a8.74,8.74,0,0,1-6.24-2.56,8.84,8.84,0,0,1-1.88-2.76,8.29,8.29,0,0,1-.68-3.4V2.8H607V49.92a2.49,2.49,0,0,0,.72,1.84,2.38,2.38,0,0,0,1.76.72h25.92Zm-2.32-9.52L628,26.32h6.4l1.52,23.6ZM740.08,19.6a8.29,8.29,0,0,1-.72,3.44,8.7,8.7,0,0,1-2,2.8,9.68,9.68,0,0,1-2.92,1.88,9.29,9.29,0,0,1-3.56.68h-33V2.4h42.16Zm73.76,2.56a6.42,6.42,0,0,1-6.48,6.48H751.12V13.84h62.72ZM817.76,11H747.2V4.88h29.28l-1-2.56H789l1,2.56h27.84Zm124.4,21.52H900.32V26.72h15.44V25H901.44V2.24h39.68v15.2a7.71,7.71,0,0,1-.64,3,7.93,7.93,0,0,1-1.6,2.4,6.33,6.33,0,0,1-2.48,1.52,6.35,6.35,0,0,1-2.88.64h-6.88v1.76h15.52ZM956.4,59.92h-13l15-19.12h13.2Zm0-19.12h-13l15-19.28h13.2Zm0-19.36h-13l15-19.2h13.2Zm70.72,2.32L1034.56,39h-11.68l-7.44-15.28Zm59.68-22h29.12a7.42,7.42,0,0,1,3.36.72,9.58,9.58,0,0,1,2.8,1.84A9.08,9.08,0,0,1,1124,7.2a8.12,8.12,0,0,1,.72,3.36v28.8h-10.24V11.28a2.4,2.4,0,0,0-.72-1.76,2.65,2.65,0,0,0-1.92-.8H1097V39.36H1086.8Zm36,58.08h-8.64a9.43,9.43,0,0,1-3.44-.72A11.22,11.22,0,0,1,1108,57.2a6.19,6.19,0,0,1-1.92-2.72,8.67,8.67,0,0,1-.72-3.44V45.68l-7.44,14.08H1086.8L1100.16,35V21h9.44V37.52l-1.28,2.4h6.48V50.24a1.89,1.89,0,0,0,.8,1.68,1.91,1.91,0,0,0,1.68.8h8.48Zm35.92-19.76h-10.88V21.92h25.76v9.44a8.46,8.46,0,0,1-.68,3.4,9,9,0,0,1-1.88,2.76,8.74,8.74,0,0,1-6.24,2.56Zm-10.88-20.4v-5.6h25.76v5.6Zm20.8,32.88-1.76-9.44h11.2l1.76,9.44Zm25.12-28.08,7.2,17h-12.32l-2.8-6.56L1182,40.08h-11.28l11-14.72-5.84-13.76h-30.56V31.76l-3.76,8.4h-10.4l3.28-7.92V6h39.12L1172,2.4h12.32l1.6,3.6h3.76l-1-3.6h10l2.64,9.2h-13l1.44,3.28.56-.8h11.36Z"
              style="fill: #000"
            />
            <path
              d="M1068.72,49.52A43.87,43.87,0,0,1,1054.25,60h29.24a45.63,45.63,0,0,1-7.25-4A37.2,37.2,0,0,1,1068.72,49.52Z"
              style="fill: #000"
            />
            <path
              d="M205.2,51.52a54.52,54.52,0,0,1-10.08,5.88,35.91,35.91,0,0,1-8.3,2.6h36.69a35.25,35.25,0,0,1-8.27-2.6A55.21,55.21,0,0,1,205.2,51.52Z"
              style="fill: #000"
            />
            <path
              d="M709.52,21.2h16.32a2.65,2.65,0,0,0,1.88-.72,2.36,2.36,0,0,0,.76-1.76v-.16h-19Z"
              style="fill: #000"
            />
            <polygon points="649.28 52.4 646.25 60 653.36 60 653.36 29.6 649.28 29.6 649.28 52.4" style="fill: #000" />
            <path
              d="M791.12,50.48a1.57,1.57,0,0,0,.48-1.28V45.52H771.84V51h18.08A1.84,1.84,0,0,0,791.12,50.48Z"
              style="fill: #000"
            />
            <rect x="912.32" y="8.96" width="17.92" height="1.92" style="fill: #000" />
            <path
              d="M419.84,54.88a64.37,64.37,0,0,1-10.4,3.44A83.81,83.81,0,0,1,400.25,60h44.39a72.31,72.31,0,0,1-13.4-1.16A39.93,39.93,0,0,1,419.84,54.88Z"
              style="fill: #000"
            />
            <rect x="709.52" y="9.28" width="18.96" height="2.88" style="fill: #000" />
            <path
              d="M802.8,22.88a1.15,1.15,0,0,0,.48-1v-2.4H761.76v3.84h40A1.41,1.41,0,0,0,802.8,22.88Z"
              style="fill: #000"
            />
            <rect x="89.92" y="8.96" width="17.92" height="1.92" style="fill: #000" />
            <path
              d="M929.84,18.64a1,1,0,0,0,.4-.88v-1H912.32V19H929A1.16,1.16,0,0,0,929.84,18.64Z"
              style="fill: #000"
            />
            <path
              d="M107.44,18.64a.93.93,0,0,0,.4-.88v-1H89.92V19h16.72A1.14,1.14,0,0,0,107.44,18.64Z"
              style="fill: #000"
            />
            <path
              d="M420,44.56A31.36,31.36,0,0,0,426.56,39a36,36,0,0,0,5.12-7.52l.08-.08L399,31.52,388,59.76l-5.4.24h14.92V51.92q3.84-.56,7.24-1.32a63.37,63.37,0,0,0,6.44-1.8,66.92,66.92,0,0,1-11.52-14.48h11A42.35,42.35,0,0,0,420,44.56Z"
              style="fill: #000"
            />
            <path d="M107.44,42.8a1,1,0,0,0,.4-.8V39.92h-18V43.2h16.8A1,1,0,0,0,107.44,42.8Z" style="fill: #000" />
            <path
              d="M509.84,11.16a1.41,1.41,0,0,0,.24-.92V8h-47.6v3.44H508.8A1.38,1.38,0,0,0,509.84,11.16Z"
              style="fill: #000"
            />
            <rect x="12.32" y="30.72" width="18.64" height="8.88" style="fill: #000" />
            <path
              d="M313.52,52.08h6.64a2.49,2.49,0,0,0,1.84-.72,2.4,2.4,0,0,0,.72-1.76V40.32h-9.2Z"
              style="fill: #000"
            />
            <rect x="313.52" y="16.56" width="9.2" height="15.92" style="fill: #000" />
            <rect x="12.32" y="14.48" width="18.64" height="8.4" style="fill: #000" />
            <path d="M988.72,52.08h6.64a2.5,2.5,0,0,0,1.84-.72,2.4,2.4,0,0,0,.72-1.76V40.32h-9.2Z" style="fill: #000" />
            <path
              d="M41.84,39.6H55.92a2.4,2.4,0,0,0,1.76-.72A2.49,2.49,0,0,0,58.4,37V30.72H41.84Z"
              style="fill: #000"
            />
            <rect x="41.84" y="14.48" width="16.56" height="8.4" style="fill: #000" />
            <path d="M929.84,42.8a1,1,0,0,0,.4-.8V39.92h-18V43.2H929A1,1,0,0,0,929.84,42.8Z" style="fill: #000" />
            <rect x="988.72" y="16.56" width="9.2" height="15.92" style="fill: #000" />
            <rect x="484.56" y="28.32" width="15.36" height="4.16" style="fill: #000" />
            <path
              d="M864.24,39.6h14.08a2.4,2.4,0,0,0,1.76-.72A2.49,2.49,0,0,0,880.8,37V30.72H864.24Z"
              style="fill: #000"
            />
            <rect x="834.72" y="30.72" width="18.64" height="8.88" style="fill: #000" />
            <rect x="864.24" y="14.48" width="16.56" height="8.4" style="fill: #000" />
            <rect x="834.72" y="14.48" width="18.64" height="8.4" style="fill: #000" />
          </svg>
        </svg>
      </div>
      <video
        src="@video/s9.mp4"
        class="iphone-video"
        style="transition: opacity 0.5s ease-out"
        autoplay
        muted
        playsinline
        loop
      ></video>
      <span class="flow-text ft-1">杜比影院</span>
      <span class="flow-text ft-2">8K</span>
      <span class="flow-text ft-3">4D</span>
      <span class="flow-text ft-4">杜比全景声</span>
      <span class="flow-text ft-5">120FPS</span>
      <span class="flow-text ft-6">IMAX</span>
      <span class="flow-text ft-7">球幕</span>
      <span class="flow-text ft-8">4K</span>
      <span class="flow-text ft-9">巨幕</span>
      <span class="flow-text ft-10">3D</span>
      <img src="@img/iPhone.png" alt="" class="iphone" style="transition: opacity 0.5s ease-out" />
    </div>
    <div class="screen modern" id="s10"></div>
    <div class="screen modern" id="s11"></div>
    <div class="screen modern" id="s12" :style="{ position: scrolled >= 12 ? 'sticky' : '' }">
      <div class="left compact"></div>
      <div class="right compact">
        <p :style="{ opacity: scrolled >= 11.2 ? 1 : 0 }">但与此同时，</p>
        <p :style="{ opacity: scrolled >= 11.4 ? 1 : 0 }">手机摄影的发展让电影级别的拍摄变得触手可及。</p>
        <p :style="{ opacity: scrolled >= 11.7 ? 1 : 0 }">电影这种大众娱乐，</p>
        <p :style="{ opacity: scrolled >= 11.9 ? 1 : 0 }">真正回到了大众身边。</p>
      </div>
    </div>
    <div
      class="screen modern"
      id="s13"
      :style="{
        '-webkit-backdrop-filter': 'blur(' + (scrolled - 12) * 20 + 'px)',
        'backdrop-filter': 'blur(' + (scrolled - 12) * 20 + 'px)',
      }"
    >
      <Timeline
        v-if="scrolled >= 11.8"
        :scrolled="scrolled"
        @scroll-to="scrollTo($event)"
        style="position: sticky; top: 0; height: 100vh; overflow: hidden"
      ></Timeline>
    </div>
  </div>
</template>

<script>
import ProgressIndicator from "./components/ProgressIndicator.vue";
import FilmRoll from "./components/FilmRoll.vue";
import ClassicButton from "./components/ClassicButton.vue";
import Arrow from "./components/Arrow.vue";
import ImgProcessGame from "./components/ImgProcessGame.vue";
import Timeline from "./components/Timeline.vue";

export default {
  name: "App",
  components: {
    ProgressIndicator,
    FilmRoll,
    ClassicButton,
    ImgProcessGame,
    Arrow,
    Timeline,
  },
  data() {
    return {
      scrolled: 0,
      scrollLock: false,
      rAFLock: false,
      wheelDelta: 0,
      clip: 0,
      videoPlaying: true,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      resizeTimeout: null,
      showDetail: [false, false, false, false, false, 0],
      swiperIndex: [0, 0, 0, 0],
      audioGame: {
        isShow: false,
        isPlaying: false,
        isRecording: false,
        isPaused: false,
      },
      showPSGame: false,
      description: require("./assets/description.json"),
      s3rollStyle: {
        fixed: false,
        left: 0,
        top: 0,
        width: 600,
        outerWidth: 1000,
        height: 450,
        translateX: -120,
        translateY: 10,
        rotate: -10,
        innerTranslate: 50,
        scale: 1,
      },
      s8video: ["The Last Broadcast Trailer", "Toy Story 1  Trailer", "green screen"],
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (!this.rAFLock) {
        this.scrolled = window.scrollY / this.screenHeight;
        console.log(this.scrolled);
        requestAnimationFrame(this.handleScroll);
        this.rAFLock = true;
      }
    });
    window.addEventListener("resize", () => {
      if (this.resizeTimeout != null) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(this.handleResize, 500);
    });
  },
  computed: {
    filmrollWidth() {
      return this.screenWidth * 0.3125;
    },
    filmrollHeight() {
      return (this.filmrollWidth * 3) / 4;
    },
    filmrollOuterWidth() {
      return 0.52 * this.screenWidth;
    },
  },
  methods: {
    handleResize() {
      this.screenHeight = document.documentElement.clientHeight;
      this.screenWidth = document.documentElement.clientWidth;
    },
    handleSlideChange(e) {
      // console.log(e);
      this.swiperIndex[e.sIndex] = e.activeIndex;
    },
    scrollTo(index) {
      window.scrollTo({
        top: index * this.screenHeight,
        behavior: "smooth",
      });
    },
    handleScroll() {
      const scrolled = this.scrolled;
      if (scrolled <= 3) {
        if (this.s3rollStyle.fixed) {
          this.s3rollStyle = {
            fixed: false,
            left: 0,
            top: 180,
            width: 600,
            outerWidth: 1000,
            height: 450,
            translateX: -120,
            translateY: 10,
            rotate: -10,
            innerTranslate: 50,
            scale: 1,
          };
        }
      } else if (scrolled <= 8) {
        if (scrolled >= 4 && this.wheelDelta <= this.screenHeight) {
          this.scrollLock = true;
          this.wheelDelta = 0;
          this.clip = 0;
        }
        this.animations3();
      } else if (scrolled >= 8.5 && scrolled <= 9) {
        let flowTexts = document.querySelectorAll(".flow-text");
        flowTexts.forEach((ele, index) => {
          ele.style.animationName = `getin${index + 1}`;
        });
      }
      if (this.scrolled > 9) {
        let scrolled = this.scrolled - 9;
        let $theText = document.querySelector("#the-text");
        let $TextBg = document.querySelector(".text-bg");
        let flowTexts = document.querySelectorAll(".flow-text");
        $theText.style.height = $theText.style.width =
          (document.documentElement.clientWidth * 20 * (scrolled * scrolled * scrolled)) / 20.13 + "px";
        $theText.style.width = $theText.style.width =
          document.documentElement.clientWidth * 20 * (scrolled * scrolled * scrolled) + "px";
        if (scrolled >= 0.5) {
          $TextBg.style.opacity = (1 - scrolled) / 0.5;
          for (let flowText of flowTexts) {
            flowText.style.visibility = "hidden";
          }
        } else {
          $TextBg.style.opacity = 1;
          for (let flowText of flowTexts) {
            flowText.style.visibility = "visible";
          }
        }
        if (scrolled >= 0.95) {
          $theText.style.opacity = (1 - scrolled) / 0.05;
        } else {
          $theText.style.opacity = 1;
        }
      }
      if (this.scrolled > 10) {
        let $video = document.querySelector(".iphone-video");
        let $iphone = document.querySelector(".iphone");
        $iphone.style.visibility = "visible";
        let scrolled = this.scrolled - 10;
        scrolled = (scrolled * 4) / 3;
        if (scrolled > 1) scrolled = 1;
        // console.log("me" + scrolled);
        $video.style.width = 540 + (1920 - 540) * Math.pow(1 - scrolled, 3) + "px";
        $iphone.style.width = 1020 + (3700 - 1020) * Math.pow(1 - scrolled, 3) + "px";
        if (this.scrolled > 11) {
          scrolled = this.scrolled - 11;
          scrolled = (scrolled * 4) / 3;
          if (scrolled > 1) scrolled = 1;
          $video.style.left = `${35 + (50 - 35) * Math.pow(1 - scrolled, 3)}%`;
          $iphone.style.left = `${35 + (50 - 35) * Math.pow(1 - scrolled, 3)}%`;
        }
        if (this.scrolled >= 12.3) {
          $video.pause();
        }
      }
      this.rAFLock = false;
    },
    animations3() {
      if (this.scrolled <= 6) {
        let percent1 = this.scrolled >= 4 ? 1 : this.scrolled - 3;
        let percent2 = Math.max(0, Math.min(this.scrolled - 4, 1));
        this.s3rollStyle = {
          outerWidth: this.filmrollOuterWidth + 200 * percent1,
          left: ((this.screenWidth - (this.filmrollOuterWidth + 200)) / 2) * percent1,
          top: 180 - (180 - (this.screenHeight - this.filmrollHeight - 390) / 2.2) * percent1,
          width: this.filmrollWidth + 360 * percent1,
          height: this.filmrollHeight + 270 * percent1,
          rotate: -10 + 10 * percent1,
          fixed: true,
          translateX: -120 + 120 * percent1,
          translateY: -10 + 10 * percent1,
          innerTranslate: 50 - 50 * percent1,
          scale: 1 - 0.2 * percent2,
        };
      } else if (this.scrolled <= 7.3) {
        this.s3rollStyle.top =
          (this.screenHeight - this.filmrollHeight - 400) / 2.2 - (window.scrollY - this.screenHeight * 6);
      }
    },
    animations4(e) {
      if (this.scrollLock) {
        e.preventDefault();
        this.wheelDelta += e.deltaY;
        let percent = this.wheelDelta / this.screenHeight;
        console.log(percent);
        this.clip = percent / 0.95;
        if (percent < 0 || percent >= 1) {
          this.scrollLock = false;
          if (percent < 0) {
            this.clip = 0;
          }
        }
      }
    },
    animations9(e) {
      if (this.scrollLock) {
        e.preventDefault();
      } else {
        //
      }
    },
  },
};
</script>

<style lang="scss">
@import url(./assets/css/font.css);
@import url(./assets/css/theme.css);
@import url(./assets/css/transition.css);
@import url(./assets/css/icon.css);

* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
  color: var(--darkText);
}

*::-webkit-scrollbar {
  width: 0 !important;
}

.main-container {
  width: 100%;
  min-height: 500vh;
  box-sizing: border-box;
  position: relative;

  .bg-container {
    position: absolute;
    top: 100vh;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0.3;
    display: flex;
    flex-direction: column;
    z-index: -1;

    img {
      width: 100%;
      height: auto;

      &:nth-child(2n) {
        transform: rotateX(180deg);
      }
    }
  }

  .blackbg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
    transition: background-color linear 1s;

    &.show {
      background-color: var(--darkBG);
    }
  }

  #wheel {
    position: fixed;
    left: -165px;
    top: -165px;
    z-index: 1000;
    transition: left ease-out 0.7s, top ease-out 0.7s;

    &.hidden {
      left: -500px;
      top: -500px;
    }
  }

  .screen {
    position: relative;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    // border: 1px solid aqua; // 仅供定位使用
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    padding: 0 60px;
    font-family: AaMSXK;

    .left,
    .right {
      width: 40%;
      max-width: 700px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      &.compact {
        padding: 0;
      }

      .rotatable {
        transition: transform ease 0.5s;
      }
    }

    .left {
      padding-left: 60px;

      .rotatable {
        transform-origin: left bottom;
      }

      .rotate {
        transform: translateY(10%) rotate(-10deg);
        z-index: 10;
      }
    }
    .right {
      padding-right: 60px;

      .rotatable {
        transform-origin: right bottom;
      }

      .rotate {
        transform: translateY(10%) rotate(6deg);
        z-index: 10;
      }
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    h1 {
      font-family: AaMSXK;
      font-size: 200px;
    }

    h2 {
      font-family: HYZhuZiSuDaHeiW;
      font-size: 60px;
      margin-top: -14px;
      margin-bottom: 12px;
      line-height: 1.5;
      color: var(--theme);
      &.gray {
        color: var(--darkText);
      }
    }

    h3 {
      font-family: AaMSXK;
      font-size: 24px;
      color: var(--lightGray);
    }

    p {
      font-family: inherit;
      font-size: 32px;
      line-height: 42px;
      text-align: left;
    }

    .des {
      display: block;
      font-size: 20px;
      font-family: AaMSXK;
      line-height: 24px;
      color: var(--lightGray);
      opacity: 1;
      margin-top: 20px;
      max-width: 750px;
      transition: opacity ease-out 0.3s;

      &.hidden {
        opacity: 0;
      }
    }

    .transition {
      position: absolute;
      z-index: 0;
      img {
        transform: translateY(-50%);
      }

      #proj1 {
        width: 9vw;
        transform: translateY(30%) rotate(10deg);
      }

      #proj2 {
        width: 14vw;
        transform: translateY(-60%) rotate(-18deg);
      }
    }

    &.modern {
      font-family: PangMenZhengDao;
      color: var(--lightText);
      h2 {
        font-family: inherit;
      }
    }

    &#s0,
    &#s7 {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &#s0 {
      height: 100vh;
      max-height: unset;
      background-color: var(--darkBG);
      overflow: hidden;
      video,
      #title {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        object-fit: cover;
      }
      #title {
        z-index: 10;
      }
      .prompt {
        position: absolute;
        margin: 1rem 0;
        bottom: 0;
        font-size: 1rem;
        text-align: center;
        // display: none;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: move ease 6s infinite;

        span {
          color: var(--lightText);
          margin: 0.5rem;
          font-size: 0.9rem;
          letter-spacing: 2px;
        }

        img {
          width: 5.75rem;
        }

        @keyframes move {
          10%,
          50% {
            bottom: 0px;
            opacity: 1;
          }
          85% {
            bottom: 50px;
            opacity: 0;
          }
          100% {
            bottom: 0px;
            opacity: 0;
          }
        }
      }
    }

    &#s4 {
      top: 0;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;

      h2 {
        transition: color linear 0.3s;
      }
    }

    &#s5,
    &#s6 {
      // position: sticky;
      top: 0;
      .placeholder {
        padding-bottom: 5vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }
      .left,
      .right {
        flex: 1;
        align-items: center;
        h3 {
          font-size: 40px;
          color: var(--theme);
          font-family: HYZhuZiSuDaHeiW;
          transition: color linear 0.3s;
        }
      }
      .left {
        padding: 0 32px 0 0;
      }
      .right {
        padding: 0 0 0 32px;
      }
    }

    &#s7 {
      position: sticky;
      top: 0;
      h2 {
        font-size: 150px;
        line-height: 150px;
      }
      h3 {
        transition: color linear 0.5s;
      }
    }

    &#s8 {
      padding: 0;
      .left {
        position: relative;
        width: 126.27vh;
        max-width: unset;
        & > img {
          position: absolute;
          right: 0;
          bottom: 0;
          height: 83.33%;
        }
        .content {
          position: absolute;
          right: 1.3%;
          top: 18.27%;
          width: 87.2%;
          height: 63%;
          background: #000;
          #game2 {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .controls {
            position: absolute;
            bottom: 12px;
            padding: 12px 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(242, 242, 242, 0.4);
            border-radius: 20px;
            backdrop-filter: blur(20px); /*no*/
            -webkit-backdrop-filter: blur(20px); /*no*/
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            gap: 32px;
            opacity: 0;
            transition: opacity ease-out 0.3s;
            img {
              width: 32px;
              height: 32px;
              object-fit: contain;
              cursor: pointer;
            }
          }
          &:hover .controls {
            opacity: 1;
          }
        }
      }
      .right {
        flex: 1;
        padding: 0 60px;
        align-items: center;

        div {
          margin-top: 20px;
          p {
            font-size: 24px;
            line-height: 33px;
          }
        }

        input[type="radio"] {
          display: none;
        }

        label {
          display: block;
          width: 250px;
          height: 70px;
          background: var(--darkGray);
          border-radius: 35px;
          font-size: 30px;
          line-height: 70px;
          white-space: nowrap;
          margin-top: 20px;
          cursor: pointer;
        }

        input[type="radio"]:checked + label {
          background: var(--mediumGray);
          color: var(--theme);
        }
      }
    }

    &#s9 {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: sticky;
      top: 0;
      overflow: hidden;
      h2 {
        font-size: 80px;
        line-height: 100px;
        color: var(--lightText);
        z-index: 2;
      }
      #the-text {
        min-width: 1202px;
        z-index: 100;
      }
      .flow-text {
        display: block;
        position: absolute;
        font-family: SourceHanSansCN;
        font-weight: 200;
        opacity: 0;
        transform: scale(0);
        animation-timing-function: ease-out;
        animation-duration: 10s;
        animation-fill-mode: both;
        z-index: 2;
        white-space: nowrap;
        height: 1.5em;
      }
      .ft-1 {
        top: 50%;
        left: 50%;
        color: #9f9f9f;
        font-size: 88px;
        filter: blur(1px);
      }
      .ft-2 {
        bottom: 50%;
        left: 50%;
        font-size: 36px;
        color: var(--lightGray);
        filter: blur(2px);
      }
      .ft-3 {
        top: 50%;
        left: 50%;
        font-size: 64px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-4 {
        bottom: 50%;
        left: 50%;
        font-size: 32px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-5 {
        top: 50%;
        left: 50%;
        font-size: 72px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-6 {
        bottom: 50%;
        left: 50%;
        font-size: 72px;
        color: var(--lightGray);
        filter: blur(1.5px);
      }
      .ft-7 {
        bottom: 50%;
        right: 50%;
        font-size: 52px;
        color: var(--lightGray);
        filter: blur(2px);
      }
      .ft-8 {
        top: 50%;
        right: 50%;
        font-size: 52px;
        color: var(--lightGray);
        filter: blur(1px);
      }
      .ft-9 {
        bottom: 50%;
        right: 50%;
        font-size: 52px;
        color: var(--lightGray);
        filter: blur(1px);
      }
      .ft-10 {
        top: 50%;
        right: 50%;
        font-size: 128px;
        color: var(--lightGray);
        filter: blur(0.5px);
      }
      video {
        height: auto;
        max-width: 1920px;
        min-width: 540px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }
      #the-text {
        z-index: 2;
        box-shadow: 0px 0px 0px 55vh black;
      }
      .text-mask {
        fill: #000;
        z-index: 10;
        // opacity: 0.5;
      }
      img {
        position: absolute;
        width: 3500.5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -45%);
        z-index: 30;
        visibility: hidden;
      }
      .a {
        position: absolute;
        z-index: 2;
        fill: #fff;
      }
    }

    &#s12 {
      top: 0;
      .right {
        max-width: 612px;
        p {
          text-align: left;
          font-size: 64px;
          color: var(--lightText);
          line-height: 70px;
          margin: 8px;
        }
        p,
        .btn {
          transition: opacity ease-out 0.5s;
        }
      }
    }

    &#s13 {
      height: 200vh;
      padding: 0;
      border-radius: 30px 30px 0 0;
      background-color: rgba(28, 28, 28, 0.5);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
  }
}
.video-section {
  height: 300vh;
  position: relative;
}
@keyframes getin1 {
  to {
    top: 7vh;
    left: 6vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin2 {
  to {
    bottom: 12vh;
    left: 17vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin3 {
  to {
    top: 25vh;
    left: 30vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin4 {
  to {
    bottom: 25vh;
    left: 28vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin5 {
  to {
    top: 2vh;
    left: 45vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin6 {
  to {
    bottom: 8vh;
    left: 45vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin7 {
  to {
    bottom: 30vh;
    right: 35vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin8 {
  to {
    top: 15vh;
    right: 30vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin9 {
  to {
    bottom: 15vh;
    right: 20vw;
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes getin10 {
  to {
    top: 10vh;
    right: 10vw;
    opacity: 1;
    transform: scale(1);
  }
}
</style>
