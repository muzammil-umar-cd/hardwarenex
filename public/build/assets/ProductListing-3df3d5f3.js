import{S as Z}from"./ShowMore-1b60d7ae.js";import{_ as A,J as L,f as m,o as s,g as l,h as o,w as i,i as a,t as n,j as V,F as p,k as y,p as B,l as v,A as H,v as g}from"./app-3db442d0.js";const R={head:{title:"Product Listing Page"},data:()=>({metaTitle:"",metaDescription:"",loading:!0,filterDrawerOpen:!1,totalProducts:0,totalPages:1,isBrandRoute:!1,queryParam:{page:1,categorySlug:null,brandIds:[],attributeValues:[],keyword:null,sortBy:"popular",minPrice:null,maxPrice:null},attributes:[],allBrands:[],rootCategories:[],parentCategory:{},currentCategory:{},childCategories:[],products:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],sortingDefault:{}}),components:{ShowMore:Z},computed:{sortingOptions(){return[{name:this.$i18n.t("most_popular"),value:"popular"},{name:this.$i18n.t("latest_first"),value:"latest"},{name:this.$i18n.t("oldest_first"),value:"oldest"},{name:this.$i18n.t("higher_price_first"),value:"highest_price"},{name:this.$i18n.t("lower_price_first"),value:"lowest_price"}]}},watch:{metaTitle(e){this.updateHead(e,this.metaDescription)},metaDescription(e){this.updateHead(this.metaTitle,e)}},methods:{updateHead(e,t){L({title:e,meta:[{name:"description",content:t}]})},pageSwitch(e){this.$router.push({query:{...this.$route.query,page:this.queryParam.page}}).catch(()=>{}),this.getList({page:e})},sortUpdate(e){if(this.queryParam.sortBy=e,this.$router.push({query:{...this.$route.query,sortBy:this.queryParam.sortBy}}).catch(()=>{}),this.getList({sortBy:e}),this.queryParam.sortBy!=="popular"){let t=this.sortingOptions.find(d=>d.value===this.queryParam.sortBy);this.sortingDefault=t}},brandChange(e){if(this.queryParam.brandIds.indexOf(e)>-1){let t=this.queryParam.brandIds.indexOf(e);this.queryParam.brandIds.splice(t,1)}else this.queryParam.brandIds.push(e);this.$router.push({query:{...this.$route.query,brandIds:this.queryParam.brandIds}}).catch(()=>{}),this.getList({})},attributeValueChange(e){if(this.queryParam.attributeValues.indexOf(e)>-1){let t=this.queryParam.attributeValues.indexOf(e);this.queryParam.attributeValues.splice(t,1)}else this.queryParam.attributeValues.push(e);this.$router.push({query:{...this.$route.query,attributeValues:this.queryParam.attributeValues}}).catch(()=>{}),this.getList({})},filterByPriceRange(){let e={};e.minPrice=this.queryParam.minPrice,e.maxPrice=this.queryParam.maxPrice,this.$router.push({query:{...this.$route.query,...e}}).catch(()=>{}),this.getList({})},toggleFilterDrawer(e){this.filterDrawerOpen=e},async getList(e){this.loading=!0;let t={...this.queryParam,...e},d="product/search?";d+=`&page=${this.queryParam.page}`,d+=t.categorySlug?`&category_slug=${t.categorySlug}`:"",d+=t.brandIds?`&brand_ids=${t.brandIds}`:"",d+=t.attributeValues?`&attribute_values=${t.attributeValues}`:"",d+=t.keyword?`&keyword=${t.keyword}`:"",d+=t.sortBy?`&sort_by=${t.sortBy}`:"",d+=t.minPrice?`&min_price=${t.minPrice}`:"",d+=t.maxPrice?`&max_price=${t.maxPrice}`:"";const u=await this.call_api("get",d);u.data.success&&(this.loading=!1,this.metaTitle=u.data.metaTitle,this.products=u.data.products.data,this.attributes=u.data.attributes.data,this.allBrands=u.data.allBrands.data,this.rootCategories=u.data.rootCategories.data,this.parentCategory=u.data.parentCategory?u.data.parentCategory:{},this.currentCategory=u.data.currentCategory?u.data.currentCategory:{},this.childCategories=u.data.childCategories?u.data.childCategories.data:[],this.totalPages=u.data.totalPage,this.totalProducts=u.data.total,this.queryParam.page=u.data.currentPage)}},created(){this.isBrandRoute=this.$route.params.brandId?!0:this.isBrandRoute,this.queryParam.categorySlug=this.$route.params.categorySlug||this.queryParam.categorySlug,this.queryParam.keyword=this.$route.params.keyword,this.queryParam.brandIds=this.$route.params.brandId||this.queryParam.brandIds,this.queryParam.page=this.$route.query.page||this.queryParam.page,this.queryParam.sortBy=this.$route.query.sortBy||this.queryParam.sortBy,this.queryParam.minPrice=this.$route.query.minPrice||this.queryParam.minPrice,this.queryParam.maxPrice=this.$route.query.maxPrice||this.queryParam.maxPrice,this.queryParam.attributeValues=this.$route.query.attributeValues||this.queryParam.attributeValues,this.sortingDefault={name:this.$i18n.t("most_popular"),value:"popular"},this.getList({page:this.queryParam.page,categorySlug:this.queryParam.categorySlug,brandIds:this.queryParam.brandIds,attributeValues:this.queryParam.attributeValues,keyword:this.queryParam.keyword,sortBy:this.queryParam.sortBy,minPrice:this.queryParam.minPrice,maxPrice:this.queryParam.maxPrice})}},T={class:"border-bottom pa-5 d-lg-none d-flex align-center"},j={class:"ms-4 fw-600 fs-14 lh-1"},F={class:"pa-5"},N={class:"mb-5"},x={class:"fw-700 fs-14 mb-4 border-bottom pb-3"},z={class:"list-unstyled ps-0"},E={class:"my-2"},J={key:0,class:"my-2"},Y={key:0,class:"las la-angle-down fs-12 me-1"},G={class:"mb-4 pt-4 border-top"},K={class:"fw-700 fs-14 mb-3"},Q={class:"d-flex align-center"},W={class:"col"},X={class:"col"},ee={class:"col col-auto"},te={key:0,class:"mb-4 pt-4 border-top"},ae={class:"fw-700 fs-14 mb-3"},se={key:0},re={class:"fw-700 fs-14 mb-3"},le={key:0},oe={class:"pt-5 ps-lg-7"},ie={class:"d-flex align-center"},ne={key:0,class:"fs-18"},ue={key:1,class:"fs-18"},de={key:2,class:"fs-18"},me={class:"opacity-60 mb-0 fs-12"},ce={class:"d-lg-none ms-auto ms-sm-0"},he={class:"fs-13 d-flex align-center opacity-80"},pe={class:"opacity-60 mx-1"},ye={class:"mb-7"},ge={key:1,class:"pa-4 text-center fs-20"},fe={key:0,class:"text-center"};function _e(e,t,d,u,Pe,h){const S=m("banner"),k=m("v-container"),_=m("router-link"),$=m("v-text-field"),D=m("v-btn"),b=m("v-checkbox"),C=m("ShowMore"),P=m("v-col"),I=m("v-select"),q=m("v-row"),U=m("product-box"),M=m("v-pagination");return s(),l("div",null,[o(k,{class:"pt-md-7 px-0 px-md-3 pb-0"},{default:i(()=>[o(S,{loading:!1,banner:e.$store.getters["app/banners"].listing_page},null,8,["banner"])]),_:1}),o(k,{class:"pt-0"},{default:i(()=>[o(q,{"no-gutters":"",align:"start"},{default:i(()=>[o(P,{cols:"auto",class:"w-lg-270px sticky-top"},{default:i(()=>[a("div",{class:H(["border-end filter-drawer ",{"open c-scrollbar overflow-y-auto":e.filterDrawerOpen}])},[a("div",T,[t[7]||(t[7]=a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"},[a("path",{id:"Path_2643","data-name":"Path 2643",d:"M20,5H18.829a3,3,0,0,0-5.659,0H4A1,1,0,0,0,4,7h9.171a3,3,0,0,0,5.659,0H20a1,1,0,0,0,0-2ZM16,7a1,1,0,1,0-1-1A1,1,0,0,0,16,7ZM3,12a1,1,0,0,1,1-1H5.171a3,3,0,0,1,5.659,0H20a1,1,0,0,1,0,2H10.829a3,3,0,0,1-5.659,0H4A1,1,0,0,1,3,12Zm5,1a1,1,0,1,0-1-1A1,1,0,0,0,8,13ZM4,17a1,1,0,0,0,0,2h9.171a3,3,0,0,0,5.659,0H20a1,1,0,0,0,0-2H18.829a3,3,0,0,0-5.659,0Zm13,1a1,1,0,1,1-1-1A1,1,0,0,1,17,18Z",transform:"translate(-3 -3)",fill:"#2a2e34","fill-rule":"evenodd"})],-1)),a("span",j,n(e.$t("filters")),1),a("button",{type:"button",onClick:t[0]||(t[0]=V(r=>h.toggleFilterDrawer(!e.filterDrawerOpen),["stop"])),class:"ms-4 fw-600 fs-20 lh-1 ms-auto"},t[6]||(t[6]=[a("i",{class:"la la-close fs-20"},null,-1)]))]),a("div",F,[a("div",N,[a("h4",x,n(e.$t("categories")),1),a("div",null,[a("ul",z,[e.is_empty_obj(e.currentCategory)?(s(!0),l(p,{key:0},y(e.rootCategories,(r,c)=>(s(),l("li",{key:c,class:"my-2"},[o(_,{to:{name:"Category",params:{categorySlug:r.slug}},class:"text-reset fs-14"},{default:i(()=>[B(n(r.name),1)]),_:2},1032,["to"])]))),128)):(s(),l(p,{key:1},[a("li",E,[o(_,{to:{name:"Shop"},class:"text-reset fs-14"},{default:i(()=>[t[8]||(t[8]=a("i",{class:"las la-angle-left fs-12 me-1"},null,-1)),a("span",null,n(e.$t("all_categories")),1)]),_:1})]),e.is_empty_obj(e.parentCategory)?v("",!0):(s(),l("li",J,[o(_,{to:{name:"Category",params:{categorySlug:e.parentCategory.slug}},class:"text-reset fs-14"},{default:i(()=>[t[9]||(t[9]=a("i",{class:"las la-angle-left fs-12 me-1"},null,-1)),a("span",null,n(e.parentCategory.name),1)]),_:1},8,["to"])])),a("li",{class:H(["my-2",{"ms-5":e.childCategories.length==0}])},[o(_,{to:{name:"Category",params:{categorySlug:e.currentCategory.slug}},class:"text-reset fs-14 fw-600"},{default:i(()=>[e.childCategories.length>0?(s(),l("i",Y)):v("",!0),a("span",null,n(e.currentCategory.name),1)]),_:1},8,["to"])],2),(s(!0),l(p,null,y(e.childCategories,(r,c)=>(s(),l("li",{class:"my-2 ms-5",key:c},[o(_,{to:{name:"Category",params:{categorySlug:r.slug}},class:"text-reset fs-14"},{default:i(()=>[a("span",null,n(r.name),1)]),_:2},1032,["to"])]))),128))],64))])])]),a("div",G,[a("h4",K,n(e.$t("price")),1),a("div",Q,[a("div",W,[o($,{variant:"plain",type:"number",class:"form-control form-control-sm min-max-field",modelValue:e.queryParam.minPrice,"onUpdate:modelValue":t[1]||(t[1]=r=>e.queryParam.minPrice=r),placeholder:e.$t("min_price"),"hide-details":""},null,8,["modelValue","placeholder"])]),t[10]||(t[10]=a("span",{class:"mx-1 col col-auto opacity-60"},"to",-1)),a("div",X,[o($,{variant:"plain",type:"number",class:"form-control form-control-sm min-max-field",modelValue:e.queryParam.maxPrice,"onUpdate:modelValue":t[2]||(t[2]=r=>e.queryParam.maxPrice=r),placeholder:e.$t("max_price"),"hide-details":""},null,8,["modelValue","placeholder"])]),a("div",ee,[o(D,{size:"small",fab:"",type:"submit",color:"primary",class:"rounded ms-2",elevation:"0",onClick:h.filterByPriceRange},{default:i(()=>[B(n(e.$t("go")),1)]),_:1},8,["onClick"])])])]),e.isBrandRoute?v("",!0):(s(),l("div",te,[a("h4",ae,n(e.$t("brands")),1),e.allBrands.length<5?(s(),l("div",se,[(s(!0),l(p,null,y(e.allBrands,(r,c)=>(s(),g(b,{"true-icon":"las la-check",class:"mt-1","hide-details":"",key:c,label:r.name,"onUpdate:modelValue":f=>h.brandChange(r.id)},null,8,["label","onUpdate:modelValue"]))),128))])):(s(),g(C,{key:1},{default:i(()=>[(s(!0),l(p,null,y(e.allBrands,(r,c)=>(s(),g(b,{"true-icon":"las la-check",class:"mt-1","hide-details":"",key:c,label:r.name,"onUpdate:modelValue":f=>h.brandChange(r.id)},null,8,["label","onUpdate:modelValue"]))),128))]),_:1}))])),(s(!0),l(p,null,y(e.attributes,(r,c)=>(s(),l("div",{class:"mb-4 pt-4 border-top",key:c},[a("h4",re,n(r.name),1),r.values.data.length<5?(s(),l("div",le,[(s(!0),l(p,null,y(r.values.data,(f,w)=>(s(),g(b,{"true-icon":"las la-check",class:"mt-1","hide-details":"",key:w,label:f.name,"onUpdate:modelValue":O=>h.attributeValueChange(f.id)},null,8,["label","onUpdate:modelValue"]))),128))])):(s(),g(C,{key:1},{default:i(()=>[(s(!0),l(p,null,y(r.values.data,(f,w)=>(s(),g(b,{"true-icon":"las la-check",class:"mt-1","hide-details":"",key:w,label:f.name,"onUpdate:modelValue":O=>h.attributeValueChange(f.id)},null,8,["label","onUpdate:modelValue"]))),128))]),_:2},1024))]))),128))])],2)]),_:1}),o(P,null,{default:i(()=>[a("div",oe,[o(q,{align:"end",class:"mb-3"},{default:i(()=>[o(P,{cols:"12",sm:""},{default:i(()=>[a("div",ie,[a("div",null,[e.queryParam.keyword?(s(),l("h1",ne,n(e.$t("search_results_for"))+' "'+n(e.queryParam.keyword)+'"',1)):e.is_empty_obj(e.currentCategory)?(s(),l("h1",de,n(e.$t("all_products")),1)):(s(),l("h1",ue,n(e.currentCategory.name),1)),a("p",me,n(e.$t("total")+" "+e.totalProducts+" "+e.$t("products_found")),1)]),a("div",ce,[a("button",{class:"ms-4 pa-2 border-gray-300 rounded border d-flex justify-center align-center",onClick:t[3]||(t[3]=V(r=>h.toggleFilterDrawer(!e.filterDrawerOpen),["stop"])),type:"button"},t[11]||(t[11]=[a("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 18 18"},[a("path",{id:"Path_2643","data-name":"Path 2643",d:"M20,5H18.829a3,3,0,0,0-5.659,0H4A1,1,0,0,0,4,7h9.171a3,3,0,0,0,5.659,0H20a1,1,0,0,0,0-2ZM16,7a1,1,0,1,0-1-1A1,1,0,0,0,16,7ZM3,12a1,1,0,0,1,1-1H5.171a3,3,0,0,1,5.659,0H20a1,1,0,0,1,0,2H10.829a3,3,0,0,1-5.659,0H4A1,1,0,0,1,3,12Zm5,1a1,1,0,1,0-1-1A1,1,0,0,0,8,13ZM4,17a1,1,0,0,0,0,2h9.171a3,3,0,0,0,5.659,0H20a1,1,0,0,0,0-2H18.829a3,3,0,0,0-5.659,0Zm13,1a1,1,0,1,1-1-1A1,1,0,0,1,17,18Z",transform:"translate(-3 -3)",fill:"#2a2e34","fill-rule":"evenodd"})],-1)]))])])]),_:1}),o(P,{cols:"12",sm:"auto"},{default:i(()=>[o(I,{modelValue:e.sortingDefault,"onUpdate:modelValue":[t[4]||(t[4]=r=>e.sortingDefault=r),h.sortUpdate],items:h.sortingOptions,"item-title":"name","item-value":"value","menu-props":{offsetY:!0},"append-inner-icon":"las la-angle-down fs-14",density:"compact",flat:"",solo:"",variant:"outlined","hide-details":""},{selection:i(({item:r})=>[a("span",he,[a("span",pe,n(e.$t("sort_by"))+":",1),a("span",null,n(r.title),1)])]),_:1},8,["modelValue","items","onUpdate:modelValue"])]),_:1})]),_:1}),a("div",ye,[e.products.length>0?(s(),g(q,{key:0,class:"row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-5 md-gutters-10"},{default:i(()=>[(s(!0),l(p,null,y(e.products,(r,c)=>(s(),g(P,{key:c},{default:i(()=>[o(U,{"product-details":r,"is-loading":e.loading},null,8,["product-details","is-loading"])]),_:2},1024))),128))]),_:1})):(s(),l("div",ge,n(e.$t("no_product_found")),1))]),e.totalPages>1?(s(),l("div",fe,[o(M,{modelValue:e.queryParam.page,"onUpdate:modelValue":[t[5]||(t[5]=r=>e.queryParam.page=r),h.pageSwitch],class:"my-4",length:e.totalPages,"prev-icon":"las la-angle-left","next-icon":"las la-angle-right","total-visible":7,elevation:"0"},null,8,["modelValue","length","onUpdate:modelValue"])])):v("",!0)])]),_:1})]),_:1})]),_:1})])}const qe=A(R,[["render",_e],["__scopeId","data-v-c1ffa60a"]]);export{qe as default};