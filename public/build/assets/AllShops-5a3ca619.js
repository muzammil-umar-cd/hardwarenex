import{S as _}from"./ShopBox-4b0247a5.js";import{_ as q,f as l,o as i,g as h,h as t,w as r,i as f,t as $,F as P,k as v,v as C,l as B}from"./app-97598bb6.js";const w={head:{title:"All Shops"},data:()=>({loading:!0,totalPages:1,allCategories:[],allBrands:[],allShops:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],queryParam:{page:1,categoryId:null,brandId:null},selectedCategoryId:"",selectedBrandId:""}),components:{ShopBox:_},computed:{},methods:{async getBrands(){const e=await this.call_api("get","all-brands");e.data.success&&(this.allBrands=e.data.data,this.selectedBrandId=this.allBrands.some(a=>a.id==this.$route.query.brandId)?this.allBrands.find(a=>a.id==this.$route.query.brandId).id:null,this.selectedBrandId=this.$i18n.t("select"))},async getCategories(){const e=await this.call_api("get","categories/first-level");e.data.success&&(this.allCategories=e.data.data,this.selectedCategoryId=this.allCategories.some(a=>a.id==this.$route.query.categoryId)?this.allCategories.find(a=>a.id==this.$route.query.categoryId).id:null,this.selectedCategoryId=this.$i18n.t("select"))},categoryChange(e){this.queryParam.categoryId=e,this.queryParam.page=1,this.$router.push({query:{...this.$route.query,categoryId:this.queryParam.categoryId,page:this.queryParam.page}}).catch(()=>{}),this.getShops({categoryId:e})},brandChange(e){this.queryParam.brandId=e,this.$router.push({query:{...this.$route.query,brandId:this.queryParam.brandId,page:this.queryParam.page}}).catch(()=>{}),this.getShops({brandId:e})},pageSwitch(e){this.$router.push({query:{...this.$route.query,page:this.queryParam.page}}).catch(()=>{}),this.getShops({page:e})},async getShops(e){this.loading=!0;let a={...this.queryParam,...e},o="all-shops?";o+=`&page=${this.queryParam.page}`,o+=a.categoryId?`&category_id=${a.categoryId}`:"",o+=a.brandId?`&brand_id=${a.brandId}`:"";const d=await this.call_api("get",o);d.data.success&&(this.allShops=d.data.data,this.totalPages=d.data.meta.last_page,this.queryParam.page=d.data.meta.current_page,this.loading=!1)}},created(){this.selectedCategoryId=this.$i18n.t("select"),this.selectedBrandId=this.$i18n.t("select"),this.getCategories(),this.getBrands(),this.queryParam.page=this.$route.query.page||this.queryParam.page,this.queryParam.brandId=this.$route.query.brandId||this.queryParam.brandId,this.queryParam.categoryId=this.$route.query.categoryId||this.queryParam.categoryId,this.getShops({page:this.queryParam.page,brandId:this.queryParam.brandId,categoryId:this.queryParam.categoryId})}},S={class:"fs-21"},V={key:0,class:"text-center"};function k(e,a,o,d,U,u){const p=l("banner"),n=l("v-col"),c=l("v-autocomplete"),g=l("v-row"),m=l("shop-box"),y=l("v-pagination"),b=l("v-container");return i(),h("div",null,[t(p,{loading:!1,banner:e.$store.getters["app/banners"].all_shops_page,class:"mb-5"},null,8,["banner"]),t(b,{class:"py-6"},{default:r(()=>[t(g,{align:"center",class:"mb-3"},{default:r(()=>[t(n,{cols:"12",sm:""},{default:r(()=>[f("h1",S,$(e.$t("all_shops")),1)]),_:1}),t(n,{cols:"6",sm:"auto"},{default:r(()=>[t(c,{modelValue:e.selectedCategoryId,"onUpdate:modelValue":[a[0]||(a[0]=s=>e.selectedCategoryId=s),u.categoryChange],items:e.allCategories,"item-title":"name","item-value":"id","menu-props":{offsetY:!0},"clear-icon":"las la-times fs-14","append-inner-icon":"las la-angle-down fs-14",placeholder:e.$t("sort_by_category"),label:e.$t("sort_by_category"),hint:e.$t("sort_by_category"),"no-data-text":e.$t("no_data_available"),density:"compact",flat:"",solo:"",variant:"outlined","hide-details":"",clearable:""},null,8,["modelValue","items","placeholder","label","hint","no-data-text","onUpdate:modelValue"])]),_:1}),t(n,{cols:"6",sm:"auto"},{default:r(()=>[t(c,{modelValue:e.selectedBrandId,"onUpdate:modelValue":[a[1]||(a[1]=s=>e.selectedBrandId=s),u.brandChange],items:e.allBrands,"item-title":"name","item-value":"id","menu-props":{offsetY:!0},"clear-icon":"las la-times fs-14","append-inner-icon":"las la-angle-down fs-14",placeholder:e.$t("sort_by_brand"),label:e.$t("sort_by_brand"),hint:e.$t("sort_by_brand"),"no-data-text":e.$t("no_data_available"),density:"compact",flat:"",solo:"",variant:"outlined","hide-details":"",clearable:""},null,8,["modelValue","items","placeholder","label","hint","no-data-text","onUpdate:modelValue"])]),_:1})]),_:1}),t(g,{class:"row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"},{default:r(()=>[(i(!0),h(P,null,v(e.allShops,(s,I)=>(i(),C(n,{key:I},{default:r(()=>[t(m,{"shop-details":s,"is-loading":e.loading},null,8,["shop-details","is-loading"])]),_:2},1024))),128))]),_:1}),e.totalPages>1?(i(),h("div",V,[t(y,{modelValue:e.queryParam.page,"onUpdate:modelValue":[a[2]||(a[2]=s=>e.queryParam.page=s),u.pageSwitch],class:"my-4",length:e.totalPages,"prev-icon":"las la-angle-left","next-icon":"las la-angle-right","total-visible":7,elevation:"0"},null,8,["modelValue","length","onUpdate:modelValue"])])):B("",!0)]),_:1})])}const F=q(w,[["render",k]]);export{F as default};