import{_ as u,m,f as o,o as t,g as e,i as a,t as c,v as l,w as r,F as w,k as g,h}from"./app-72fa0c97.js";const f={data:()=>({currentPage:1,totalPages:1}),computed:{...m("wishlist",["wislistLoaded","getWislistProducts"])}},v={class:"ps-lg-7 pt-4"},k={class:"fs-24 fw-700 opacity-80 mb-5 mt-3"},y={key:1,class:"text-center"};function $(s,P,B,W,b,x){const i=o("product-box"),n=o("v-col"),d=o("v-row");return t(),e("div",v,[a("h1",k,c(s.$t("my_wishlist")),1),s.getWislistProducts.length>0?(t(),l(d,{key:0,class:"row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-xl-5 gutters-10"},{default:r(()=>[(t(!0),e(w,null,g(s.getWislistProducts,(_,p)=>(t(),l(n,{key:p},{default:r(()=>[h(i,{"product-details":_,"is-loading":!s.wislistLoaded},null,8,["product-details","is-loading"])]),_:2},1024))),128))]),_:1})):(t(),e("div",y,[a("div",null,c(s.$t("no_product_wishlisted")),1)]))])}const C=u(f,[["render",$]]);export{C as default};