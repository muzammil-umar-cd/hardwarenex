import{u as k,a as n,b as A,d as D,_ as U,f as m,o as d,v,w as h,i,h as r,t as o,g as l,k as u,F as c,p as $,j as S}from"./app-41758bad.js";const F={props:{show:{type:Boolean,required:!0,default:!1},oldAddress:{type:Object,default:()=>{}}},data:()=>({adding:!1,countriesLoaded:!1,countries:[],filteredStates:[],filteredCities:[],v$:k(),form:{id:null,address:"",postal_code:"",country:"",state:"",city:"",phone:""}}),validations:{form:{address:{required:n},postal_code:{required:n},country:{required:n},state:{required:n},city:{required:n},phone:{required:n}}},watch:{oldAddress(e,t){e&&!this.is_empty_obj(e)?this.processOldAddress(e):this.resetData()}},computed:{statePlaceholer(){return this.$i18n.t("select_a_state")},cityPlaceholer(){return this.$i18n.t("select_a_city")},isVisible:{get:function(){return this.show},set:function(e){}}},created(){this.fetchCountries()},methods:{...A("address",["addAddress"]),...D("address",["setAddresses"]),async fetchCountries(){if(!this.countriesLoaded){const e=await this.call_api("get","all-countries");e.data.success&&(this.countriesLoaded=!0,this.countries=e.data.data)}},async countryChanged(e){const t=await this.call_api("get",`states/${this.form.country}`);t.data.success?(this.filteredStates=t.data.data,this.form.state="",this.form.city="",this.filteredCities=[]):this.snack({message:this.$i18n.t("something_went_wrong"),color:"red"})},async stateChanged(e){const t=await this.call_api("get",`cities/${this.form.state}`);t.data.success?(this.filteredCities=t.data.data,this.form.city=""):this.snack({message:this.$i18n.t("something_went_wrong"),color:"red"})},async addNewAddress(){if(!await this.v$.$validate())return;this.adding=!0;const t=await this.call_api("post","user/address/create",this.form);t.data.success?(this.addAddress(t.data.data),this.snack({message:t.data.message}),this.resetData(),this.closeDialog()):this.snack({message:this.$i18n.t("something_went_wrong"),color:"red"}),this.adding=!1},async updateAddress(){if(!await this.v$.$validate())return;this.adding=!0;const t=await this.call_api("post","user/address/update",this.form);t.data.success?(this.setAddresses(t.data.data),this.snack({message:t.data.message}),this.closeDialog()):this.snack({message:this.$i18n.t("something_went_wrong"),color:"red"}),this.adding=!1},resetData(){this.form.id=null,this.form.address="",this.form.postal_code="",this.form.country="",this.form.state="",this.form.city="",this.form.phone="",this.v$.form.$reset()},async processOldAddress(e){let t={...e};this.form.id=t.id,this.form.address=t.address,this.form.postal_code=t.postal_code,this.form.phone=t.phone;let f=this.countries.find(a=>a.name===t.country);this.form.country=f.id,await this.countryChanged(f.id);let p=this.filteredStates.find(a=>a.name===t.state);this.form.state=p.id,await this.stateChanged(p.id);let b=this.filteredCities.find(a=>a.name===t.city);this.form.city=b.id},closeDialog(){this.isVisible=!1,this.$emit("close")}}},N={class:"white pa-5 rounded"},q={class:"mb-3"},B={class:"mb-1 fs-13 fw-500"},j={class:"mb-3"},L={class:"mb-1 fs-13 fw-500"},P={class:"mb-3"},O={class:"mb-1 fs-13 fw-500"},M={class:"mb-3"},z={class:"mb-1 fs-13 fw-500"},E={class:"mb-3"},T={class:"mb-3"},G={class:"mb-1 fs-13 fw-500"},H={class:"text-right mt-4"};function I(e,t,f,p,b,a){const w=m("v-textarea"),_=m("v-text-field"),g=m("v-autocomplete"),y=m("v-btn"),C=m("v-form"),V=m("v-dialog");return d(),v(V,{modelValue:a.isVisible,"onUpdate:modelValue":t[7]||(t[7]=s=>a.isVisible=s),"max-width":"600px","onClick:outside":a.closeDialog},{default:h(()=>[i("div",N,[r(C,{onSubmit:t[6]||(t[6]=S(s=>a.addNewAddress(),["prevent"])),autocomplete:"chrome-off"},{default:h(()=>[i("div",q,[i("div",B,o(e.$t("address")),1),r(w,{label:e.$t("address"),modelValue:e.form.address,"onUpdate:modelValue":t[0]||(t[0]=s=>e.form.address=s),"hide-details":"auto",rows:"3",required:"",variant:"outlined","no-resize":""},null,8,["label","modelValue"]),(d(!0),l(c,null,u(e.v$.form.address.$errors,s=>(d(),l("p",{key:s.$uid,class:"text-red"},o(s.$message),1))),128))]),i("div",j,[i("div",L,o(e.$t("postal_code")),1),r(_,{placeholder:e.$t("postal_code"),type:"text",modelValue:e.form.postal_code,"onUpdate:modelValue":t[1]||(t[1]=s=>e.form.postal_code=s),"hide-details":"auto",required:"",variant:"outlined"},null,8,["placeholder","modelValue"]),(d(!0),l(c,null,u(e.v$.form.postal_code.$errors,s=>(d(),l("p",{key:s.$uid,class:"text-red"},o(s.$message),1))),128))]),i("div",P,[i("div",O,o(e.$t("country")),1),r(g,{modelValue:e.form.country,"onUpdate:modelValue":[t[2]||(t[2]=s=>e.form.country=s),a.countryChanged],items:e.countries,label:e.$t("select_country"),"hide-details":"auto",variant:"outlined","item-title":"name","item-value":"id",dense:"",autocomplete:"off","custom-filter":a.countryChanged},null,8,["modelValue","items","label","custom-filter","onUpdate:modelValue"]),(d(!0),l(c,null,u(e.v$.form.country.$errors,s=>(d(),l("p",{key:s.$uid,class:"text-red"},o(s.$message),1))),128))]),i("div",M,[i("div",z,o(e.$t("state")),1),r(g,{modelValue:e.form.state,"onUpdate:modelValue":[t[3]||(t[3]=s=>e.form.state=s),a.stateChanged],items:e.filteredStates,"hide-details":"auto",label:a.statePlaceholer,variant:"outlined","item-title":"name","item-value":"id",dense:""},null,8,["modelValue","items","label","onUpdate:modelValue"]),(d(!0),l(c,null,u(e.v$.form.state.$errors,s=>(d(),l("p",{key:s.$uid,class:"text-red"},o(s.$message),1))),128))]),i("div",E,[t[8]||(t[8]=i("div",{class:"mb-1 fs-13 fw-500"},"City",-1)),r(g,{modelValue:e.form.city,"onUpdate:modelValue":t[4]||(t[4]=s=>e.form.city=s),items:e.filteredCities,label:a.cityPlaceholer,"hide-details":"auto",variant:"outlined","item-title":"name","item-value":"id",dense:""},null,8,["modelValue","items","label"]),(d(!0),l(c,null,u(e.v$.form.city.$errors,s=>(d(),l("p",{key:s.$uid,class:"text-red"},o(s.$message),1))),128))]),i("div",T,[i("div",G,o(e.$t("phone_number")),1),r(_,{placeholder:e.$t("phone_number"),type:"number",modelValue:e.form.phone,"onUpdate:modelValue":t[5]||(t[5]=s=>e.form.phone=s),"hide-details":"auto",required:"",variant:"outlined"},null,8,["placeholder","modelValue"]),(d(!0),l(c,null,u(e.v$.form.phone.$errors,s=>(d(),l("p",{key:s.$uid,class:"text-red"},o(s.$message),1))),128))]),i("div",H,[r(y,{text:"",onClick:a.closeDialog,elevation:"0",class:"mr-2"},{default:h(()=>[$(o(e.$t("cancel")),1)]),_:1},8,["onClick"]),e.is_empty_obj(f.oldAddress)?(d(),v(y,{key:1,elevation:"0",type:"submit",color:"primary",onClick:a.addNewAddress,loading:e.adding,disabled:e.adding},{default:h(()=>[$(o(e.$t("add_new")),1)]),_:1},8,["onClick","loading","disabled"])):(d(),v(y,{key:0,elevation:"0",type:"submit",color:"primary",onClick:a.updateAddress,loading:e.adding,disabled:e.adding},{default:h(()=>[$(o(e.$t("update")),1)]),_:1},8,["onClick","loading","disabled"]))])]),_:1})])]),_:1},8,["modelValue","onClick:outside"])}const K=U(F,[["render",I]]);export{K as A};