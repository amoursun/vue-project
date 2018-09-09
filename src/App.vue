<template>
    <div id="#app">
        <app-header logo="logo" ></app-header>
        <app-nav></app-nav>
        <transition name="fade" mode="out-in">
            <router-view class="view">
            </router-view>
        </transition>
    </div>
</template>

<script>
    import Header from 'common/components/commonContainer/Header.vue';
    import Nav from 'common/components/commonContainer/Nav.vue';
    import BScroll from 'better-scroll';
    export default {
        created() {
            this.initScroll();
        },
        initScroll() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                preventDefault: false,  //暂时解决chrome中无法被动监听preventdefault
            });
        },
        components: {
            "app-header": Header,
            "app-nav": Nav
        }
    };
</script>

<style lang="less">
    .view {
        padding-top: 6.35rem;
    }
    @media screen and (min-width: 320px) {
        html, body { font-size: 12px !important; }
    }
    @media screen and (min-width: 360px) {
        html, body { font-size: 13.5px !important; }
    }
    @media screen and (min-width: 375px) {
        html, body { font-size: 14px !important; }
    }
    @media screen and (min-width: 414px) {
        html, body { font-size: 15.5px !important; }
    }
    @media screen and (min-width: 720px) {
        html, body { font-size: 27px !important; }
    }
    @media screen and (min-width: 1024px) {
        html, body { font-size: 38.4px !important; }
    }
    @media screen and (min-width: 1080px) {
        html, body { font-size: 40.5px !important; }
    }
    @media screen and (min-width: 1366px) {
        html, body { font-size: 51px !important; }
    }
    @media screen and (min-width: 1440px) {
        html, body { font-size: 54px !important; }
    }
    @media screen and (min-width: 1600px) {
        html, body { font-size: 60px !important; }
    }
    @media screen and (min-width: 1920px) {
        html, body { font-size: 72px !important; }
    }
    body, html {
        margin: 0;
        padding: 0;
    }
    /** {*/
        /*touch-action: none;*/
    /*}*/
</style>