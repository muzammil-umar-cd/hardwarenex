import{_ as h,H as y,I as v,f as o,o as n,g as t,h as s,w as r,F as u,k as _,v as f,i as B,t as k,K as F}from"./app-e5b4530f.js";import{S as q}from"./ShopBannerSectionTwo-af4c5109.js";import{G as V,P as $}from"./grid-63a0eefd.js";import{C as D}from"./CouponBox-45c2cc40.js";const A={components:{Swiper:y,SwiperSlide:v},props:{isLoading:{type:Boolean,required:!0,default:!0},banners:{type:Array,required:!0,default:[]}},data:()=>({carouselOption:{slidesPerView:3,spaceBetween:20,breakpoints:{0:{slidesPerView:1,spaceBetween:0},599:{slidesPerView:1,spaceBetween:0},960:{slidesPerView:2,spaceBetween:20},1264:{slidesPerView:3,spaceBetween:20},1904:{slidesPerView:3,spaceBetween:20}}}})},I={class:""};function T(e,w,i,m,g,P){const c=o("banner"),l=o("swiper-slide"),d=o("swiper");return n(),t("div",I,[s(d,{class:"mb-4","slides-per-view":e.carouselOption.slidesPerView,"space-between":e.carouselOption.spaceBetween},{default:r(()=>[(n(!0),t(u,null,_(i.banners,(p,a)=>(n(),f(l,{key:a,class:""},{default:r(()=>[s(c,{loading:i.isLoading,banner:p},null,8,["loading","banner"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","space-between"])])}const H=h(A,[["render",T]]),N={components:{Swiper:y,SwiperSlide:v},props:{isLoading:{type:Boolean,required:!0,default:!0},banners:{type:Array,required:!0,default:[]}},data:()=>({carouselOption:{slidesPerView:2,spaceBetween:20,breakpoints:{0:{slidesPerView:1,spaceBetween:0},599:{slidesPerView:1,spaceBetween:0},960:{slidesPerView:2,spaceBetween:20},1264:{slidesPerView:2,spaceBetween:20},1904:{slidesPerView:2,spaceBetween:20}}}})},G={class:""};function R(e,w,i,m,g,P){const c=o("banner"),l=o("swiper-slide"),d=o("swiper");return n(),t("div",G,[s(d,{class:"mb-4","slides-per-view":e.carouselOption.slidesPerView,"space-between":e.carouselOption.spaceBetween,breakpoints:e.carouselOption.breakpoints},{default:r(()=>[(n(!0),t(u,null,_(i.banners,(p,a)=>(n(),f(l,{key:a,class:""},{default:r(()=>[s(c,{loading:i.isLoading,banner:p},null,8,["loading","banner"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","space-between","breakpoints"])])}const j=h(N,[["render",R]]);const E={components:{Swiper:y,SwiperSlide:v},props:{isLoading:{type:Boolean,required:!0,default:!0},products:{type:Array,required:!0,default:[]}},data:()=>({carouselOption:{slidesPerView:6,spaceBetween:20,breakpoints:{0:{slidesPerView:2,spaceBetween:12},599:{slidesPerView:4,spaceBetween:16},960:{slidesPerView:4,spaceBetween:20},1264:{slidesPerView:5,spaceBetween:20},1904:{slidesPerView:6,spaceBetween:20}}}})},K={class:"mb-4"},z={key:0},J={key:1};function M(e,w,i,m,g,P){const c=o("v-skeleton-loader"),l=o("swiper-slide"),d=o("swiper"),p=o("product-box");return n(),t("div",null,[B("h2",K,k(e.$t("best_rated")),1),i.isLoading?(n(),t("div",z,[s(d,{ref:"c1",class:"",options:e.carouselOption},{default:r(()=>[(n(),t(u,null,_(8,a=>s(l,{key:a,class:""},{default:r(()=>[s(c,{type:"image",height:"310"})]),_:2},1024)),64))]),_:1},8,["options"])])):(n(),t("div",J,[s(d,{ref:"c2","slides-per-view":e.carouselOption.slidesPerView,"space-between":e.carouselOption.spaceBetween,breakpoints:e.carouselOption.breakpoints},{default:r(()=>[(n(!0),t(u,null,_(i.products,(a,b)=>(n(),f(l,{key:b,class:""},{default:r(()=>[s(p,{"product-details":a,"is-loading":i.isLoading},null,8,["product-details","is-loading"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","space-between","breakpoints"])]))])}const Q=h(E,[["render",M],["__scopeId","data-v-310e7b08"]]);const U={components:{Swiper:y,SwiperSlide:v},setup(){return{modules:[V,$]}},props:{isLoading:{type:Boolean,required:!0,default:!0},products:{type:Array,required:!0,default:[]}},data:()=>({carouselOption:{slidesPerColumn:2,slidesPerColumnFill:"row",slidesPerView:3,spaceBetween:20,breakpoints:{0:{slidesPerView:1,spaceBetween:12,slidesPerColumn:2,slidesPerColumnFill:"row"},599:{slidesPerView:2,spaceBetween:16,slidesPerColumn:2,slidesPerColumnFill:"row"},960:{slidesPerView:2,spaceBetween:20,slidesPerColumn:2,slidesPerColumnFill:"row"},1264:{slidesPerView:3,spaceBetween:20,slidesPerColumn:2,slidesPerColumnFill:"row"},1904:{slidesPerView:3,spaceBetween:20,slidesPerColumn:2,slidesPerColumnFill:"row"}}}})},W={class:""},X={class:"mb-4"},Y={key:0},Z={key:1};function x(e,w,i,m,g,P){const c=o("v-skeleton-loader"),l=o("swiper-slide"),d=o("swiper"),p=o("product-box");return n(),t("div",W,[B("h2",X,k(e.$t("best_selling")),1),i.isLoading?(n(),t("div",Y,[s(d,{ref:"c1",class:"",options:e.carouselOption},{default:r(()=>[(n(),t(u,null,_(8,a=>s(l,{key:a,class:""},{default:r(()=>[s(c,{type:"image",height:"186"})]),_:2},1024)),64))]),_:1},8,["options"])])):(n(),t("div",Z,[s(d,{ref:"c2","slides-per-view":e.carouselOption.slidesPerView,grid:{fill:"row",rows:2},"space-between":e.carouselOption.spaceBetween,breakpoints:e.carouselOption.breakpoints,modules:m.modules},{default:r(()=>[(n(!0),t(u,null,_(i.products,(a,b)=>(n(),f(l,{key:b,class:""},{default:r(()=>[s(p,{"product-details":a,"is-loading":i.isLoading,"box-style":"three"},null,8,["product-details","is-loading"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","space-between","breakpoints","modules"])]))])}const ee=h(U,[["render",x],["__scopeId","data-v-705ceb53"]]),se={components:{CouponBox:D,Swiper:y,SwiperSlide:v},props:{isLoading:{type:Boolean,required:!0,default:!0},coupons:{type:Array,required:!0,default:[]}},data:()=>({carouselOption:{slidesPerView:3,spaceBetween:20,breakpoints:{0:{slidesPerView:1,spaceBetween:0},599:{slidesPerView:1,spaceBetween:0},960:{slidesPerView:2,spaceBetween:20},1264:{slidesPerView:3,spaceBetween:20},1904:{slidesPerView:3,spaceBetween:20}}}})},oe={class:""},ne={class:"mb-4"};function te(e,w,i,m,g,P){const c=o("coupon-box"),l=o("swiper-slide"),d=o("swiper");return n(),t("div",oe,[B("h2",ne,k(e.$t("coupons")),1),s(d,{class:"mb-4","slides-per-view":e.carouselOption.slidesPerView,"space-between":e.carouselOption.spaceBetween},{default:r(()=>[(n(!0),t(u,null,_(i.coupons,(p,a)=>(n(),f(l,{key:a,class:""},{default:r(()=>[s(c,{"is-loading":i.isLoading,"coupon-details":p},null,8,["is-loading","coupon-details"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","space-between"])])}const ie=h(se,[["render",te]]);const ae={components:{Swiper:y,SwiperSlide:v},props:{isLoading:{type:Boolean,required:!0,default:!0},products:{type:Array,required:!0,default:[]}},data:()=>({carouselOption:{slidesPerView:6,spaceBetween:20,breakpoints:{0:{slidesPerView:2,spaceBetween:12},599:{slidesPerView:4,spaceBetween:16},960:{slidesPerView:4,spaceBetween:20},1264:{slidesPerView:5,spaceBetween:20},1904:{slidesPerView:6,spaceBetween:20}}}})},re={class:"mb-4"},le={key:0},de={key:1};function ce(e,w,i,m,g,P){const c=o("v-skeleton-loader"),l=o("swiper-slide"),d=o("swiper"),p=o("product-box");return n(),t("div",null,[B("h2",re,k(e.$t("featured_products")),1),i.isLoading?(n(),t("div",le,[s(d,{ref:"c1",class:"",options:e.carouselOption},{default:r(()=>[(n(),t(u,null,_(8,a=>s(l,{key:a,class:""},{default:r(()=>[s(c,{type:"image",height:"310"})]),_:2},1024)),64))]),_:1},8,["options"])])):(n(),t("div",de,[s(d,{ref:"c2",class:"","slides-per-view":e.carouselOption.slidesPerView,"space-between":e.carouselOption.spaceBetween,breakpoints:e.carouselOption.breakpoints},{default:r(()=>[(n(!0),t(u,null,_(i.products,(a,b)=>(n(),f(l,{key:b,class:""},{default:r(()=>[s(p,{"product-details":a,"is-loading":i.isLoading},null,8,["product-details","is-loading"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","space-between","breakpoints"])]))])}const pe=h(ae,[["render",ce],["__scopeId","data-v-697cda39"]]);const ue={components:{Swiper:y,SwiperSlide:v},setup(){return{modules:[V,$]}},props:{isLoading:{type:Boolean,required:!0,default:!0},products:{type:Array,required:!0,default:[]}},data:()=>({carouselOption:{slidesPerColumn:2,slidesPerColumnFill:"row",slidesPerView:3,spaceBetween:20,breakpoints:{0:{slidesPerView:1,spaceBetween:12,slidesPerColumn:2,slidesPerColumnFill:"row"},599:{slidesPerView:2,spaceBetween:16,slidesPerColumn:2,slidesPerColumnFill:"row"},960:{slidesPerView:2,spaceBetween:20,slidesPerColumn:2,slidesPerColumnFill:"row"},1264:{slidesPerView:3,spaceBetween:20,slidesPerColumn:2,slidesPerColumnFill:"row"},1904:{slidesPerView:3,spaceBetween:20,slidesPerColumn:2,slidesPerColumnFill:"row"}}}})},_e={class:""},we={class:"mb-4"},me={key:0},be={key:1};function he(e,w,i,m,g,P){const c=o("v-skeleton-loader"),l=o("swiper-slide"),d=o("swiper"),p=o("product-box");return n(),t("div",_e,[B("h2",we,k(e.$t("new_arrival")),1),i.isLoading?(n(),t("div",me,[s(d,{ref:"c1",class:"",options:e.carouselOption},{default:r(()=>[(n(),t(u,null,_(8,a=>s(l,{key:a,class:""},{default:r(()=>[s(c,{type:"image",height:"186"})]),_:2},1024)),64))]),_:1},8,["options"])])):(n(),t("div",be,[s(d,{ref:"c2","slides-per-view":e.carouselOption.slidesPerView,grid:{fill:"row",rows:2},"space-between":e.carouselOption.spaceBetween,breakpoints:e.carouselOption.breakpoints,modules:m.modules},{default:r(()=>[(n(!0),t(u,null,_(i.products,(a,b)=>(n(),f(l,{key:b,class:""},{default:r(()=>[s(p,{"product-details":a,"is-loading":i.isLoading,"box-style":"three"},null,8,["product-details","is-loading"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","space-between","breakpoints","modules"])]))])}const fe=h(ue,[["render",he],["__scopeId","data-v-a7f7f6a2"]]),ge={components:{ShopFeaturedProduct:pe,ShopBannerSectionOne:H,ShopBannerSectionTwo:q,ShopBannerSectionThree:j,ShopNewProducts:fe,ShopBestRatedProducts:Q,ShopBestSellingProducts:ee,ShopCouponSection:ie},data:()=>({metaTitle:"",loading:!0,shopDetails:{featured_products:{data:[]},new_arrival_products:{data:[]},best_rated_products:{data:[]},best_selling_products:{data:[]},latest_coupons:{data:[{},{},{}]},banner_section_one:[{},{},{}],banner_section_two:[{}],banner_section_three:[{},{}],banner_section_four:[{}]},carouselOption:{slidesPerView:1}}),watch:{metaTitle(e){this.updateHead(e)}},methods:{updateHead(e){F({title:e})}},async created(){const e=await this.call_api("get",`shop/${this.$route.params.slug}/home`);e.data.success&&(this.shopDetails=e.data.data,this.loading=!1,this.metaTitle=this.$route.params.slug)}},Pe={class:"fw-700 fs-21"};function Be(e,w,i,m,g,P){const c=o("shop-featured-product"),l=o("shop-banner-section-one"),d=o("shop-new-products"),p=o("shop-coupon-section"),a=o("shop-banner-section-two"),b=o("shop-best-rated-products"),O=o("shop-banner-section-three"),C=o("shop-best-selling-products"),S=o("router-link"),L=o("v-container");return n(),f(L,{class:"py-9"},{default:r(()=>[s(c,{class:"mb-5",products:e.shopDetails.featured_products.data,"is-loading":e.loading},null,8,["products","is-loading"]),s(l,{class:"mb-5",banners:e.shopDetails.banner_section_one,"is-loading":e.loading},null,8,["banners","is-loading"]),s(d,{class:"mb-5",products:e.shopDetails.new_arrival_products.data,"is-loading":e.loading},null,8,["products","is-loading"]),s(p,{class:"mb-5",coupons:e.shopDetails.latest_coupons.data,"is-loading":e.loading},null,8,["coupons","is-loading"]),s(a,{class:"mb-5",banners:e.shopDetails.banner_section_two,"is-loading":e.loading},null,8,["banners","is-loading"]),s(b,{class:"mb-5",products:e.shopDetails.best_rated_products.data,"is-loading":e.loading},null,8,["products","is-loading"]),s(O,{class:"mb-5",banners:e.shopDetails.banner_section_three,"is-loading":e.loading},null,8,["banners","is-loading"]),s(C,{class:"mb-5",products:e.shopDetails.best_selling_products.data,"is-loading":e.loading},null,8,["products","is-loading"]),s(a,{class:"mb-5",banners:e.shopDetails.banner_section_four,"is-loading":e.loading},null,8,["banners","is-loading"]),s(S,{class:"border rounded border-primary bg-soft-primary d-flex justify-center align-center text-reset pa-9",to:{name:"ShopProducts",params:{slug:e.$route.params.slug}}},{default:r(()=>[B("span",Pe,k(e.$t("view_all_products_of_this_shop")),1),w[0]||(w[0]=B("i",{class:"la la-arrow-right la-2x ms-2"},null,-1))]),_:1},8,["to"])]),_:1})}const $e=h(ge,[["render",Be]]);export{$e as default};