<template>
    <div class="white pa-5 rounded">
        <v-form  v-on:submit.prevent="addNewAddress()" autocomplete="chrome-off">
            <div class="row"> 
                <div class="col-md-4">
                    <div class="form-group">
                        <input 
                            :placeholder="$t('email_address')"
                            type="email"
                            v-model="form.email_address"
                            hide-details="auto"
                            required
                            class="form-control"
                        >
                        <p v-for="error of v$.form.email_address.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <input 
                            :placeholder="$t('full_name')"
                            type="text"
                            v-model="form.full_name"
                            hide-details="auto"
                            required
                            class="form-control"
                        >
                        <p v-for="error of v$.form.full_name.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>                    
                <div class="col-md-4">
                    <div class="form-group">
                        <input 
                            :placeholder="$t('phone_number')"
                            type="number"
                            v-model="form.phone"
                            hide-details="auto"
                            required
                            class="form-control"
                        >
                        <p v-for="error of v$.form.phone.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <textarea
                            :label="$t('address')"
                            v-model="form.address"
                            hide-details="auto"
                            rows="1"
                            required
                            no-resize
                            class="form-control"
                        ></textarea>
                        <p v-for="error of v$.form.address.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <select 
                            v-model="form.country" 
                            class="form-control"
                            :placeholder="$t('select_country')"
                            @change="countryChanged"
                        >
                            <option value="" disabled>Select a Country</option>
                            <option 
                                v-for="country in countries" 
                                :key="country.id" 
                                :value="country.id"
                            >
                                {{ country.name }}
                            </option>
                        </select>

                        <p v-for="error of v$.form.country.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <select 
                            v-model="form.state" 
                            class="form-control"
                            :placeholder="statePlaceholer"
                            @change="stateChanged"
                        >
                            <option value="" disabled>Select a State</option>
                            <option 
                                v-for="state in filteredStates" 
                                :key="state.id" 
                                :value="state.id"
                            >
                                {{ state.name }}
                            </option>
                        </select>

                        <p v-for="error of v$.form.state.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <select 
                            v-model="form.city" 
                            class="form-control"
                            :placeholder="cityPlaceholer"
                            @change="handleCityChange"
                        >
                            <option value="" disabled>Select a City</option>
                            <option 
                                v-for="city in filteredCities" 
                                :key="city.id" 
                                :value="city.id"
                            >
                                {{ city.name }}
                            </option>
                        </select>
                        <p v-for="error of v$.form.city.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <input 
                            :placeholder="$t('postal_code')"
                            type="text"
                            v-model="form.postal_code"
                            hide-details="auto"
                            required
                            class="form-control"
                        >
                        <p v-for="error of v$.form.postal_code.$errors" :key="error.$uid" class="text-red">
                            {{error.$message }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="text-right mt-4">
                <!-- <v-btn text @click="closeDialog" elevation="0" class="mr-2">{{ $t('cancel') }}</v-btn> -->
                <v-btn
                    v-if="!is_empty_obj(oldAddress)"
                    elevation="0"
                    type="submit"
                    color="primary"
                    @click="updateAddress"
                    :loading="adding"
                    :disabled="adding"
                >{{ $t('update') }}</v-btn>
                <!-- <v-btn
                    v-else
                    elevation="0"
                    type="submit"
                    color="primary"
                    @click="addNewAddress"
                    :loading="adding"
                    :disabled="adding"
                >{{ $t('add_new') }}</v-btn> -->
            </div>
        </v-form>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from "@vuelidate/validators";
import { mapActions, mapMutations } from "vuex";
export default {
    props: {
        show: { type: Boolean, required: true, default: false },
        oldAddress: { type: Object, default: () => {} }
    },
    data: () => ({
        adding: false,
        countriesLoaded: false,
        countries: [],
        filteredStates: [],
        filteredCities: [],
        v$: useVuelidate(),
        form:{
            id: null,
            full_name: "",
            email_address: "",
            address: "",
            postal_code: "",
            country: "",
            state: "",
            city: "",
            phone: "",
        }
    }),
    validations: {
        form: {
            full_name: { required },
            email_address: { required },
            address: { required },
            postal_code: { required },
            country: { required },
            state: { required },
            city: { required },
            phone: { required },
        }
    },
    watch: {
        oldAddress(newVal, oldVal){
            if(newVal && !this.is_empty_obj(newVal)){
                this.processOldAddress(newVal)        
            }else{
                this.resetData()                
            }
        },
    },
    computed: {
        statePlaceholer(){
            return this.$i18n.t("select_a_state")
        },
        cityPlaceholer(){
            return this.$i18n.t("select_a_city")
        },
        isVisible: {
            get: function(){
                return this.show
            },
            set: function(newValue){}
        },

    },
    created(){
        this.fetchCountries();
    },
    methods: {
        ...mapActions("address",[
            "addAddress",
        ]),
        ...mapMutations("address",[
            "setAddresses"
        ]),
        async fetchCountries(){
            if(!this.countriesLoaded){
                const res = await this.call_api("get", "all-countries");
                if(res.data.success){
                    this.countriesLoaded = true
                    this.countries = res.data.data
                }
            }
        },
        async countryChanged(countryid){
            const res = await this.call_api("get", `states/${this.form.country}`);

            if(res.data.success){
                this.filteredStates = res.data.data
                this.form.state = ""
                this.form.city = ""
                this.filteredCities = []
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: 'red'
                });
            }
        },
        async stateChanged(stateid){
            const res = await this.call_api("get", `cities/${this.form.state}`);
            if(res.data.success){
                this.filteredCities = res.data.data
                this.form.city = ""
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: 'red'
                });
            }
        },
        async addNewAddress(){
         
            // Prevents form submitting if it has error
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

            this.adding = true;
            const res = await this.call_api("post", "address/create",this.form);
            if(res.data.success){
                this.addAddress(res.data.data)
                this.snack({ message: res.data.message });
                this.resetData();
                this.closeDialog();                
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: "red"
                });
            }
            this.adding = false;
        },
        async updateAddress(){
            // Prevents form submitting if it has error
            const isFormCorrect = await this.v$.$validate();
            if (!isFormCorrect) return;


            this.adding = true;
            const res = await this.call_api("post", `address/update`,this.form);
            if(res.data.success){
                this.setAddresses(res.data.data)
                this.snack({ message: res.data.message });
                this.closeDialog();                
            }else{
                this.snack({
                    message: this.$i18n.t("something_went_wrong"),
                    color: "red"
                });
            }
            this.adding = false;
        },
        resetData(){
            this.form.id = null;
            this.full_name = "";
            this.email_address = "";
            this.form.address = "";
            this.form.postal_code = "";
            this.form.country = "";
            this.form.state = "";
            this.form.city = "";
            this.form.phone = "";

            this.v$.form.$reset();
        },
        async processOldAddress(oldVal){
            let oldAddress = { ...oldVal }

            this.form.id = oldAddress.id;
            this.full_name = oldAddress.full_name;
            this.email_address = oldAddress.email_address;
            this.form.address = oldAddress.address;
            this.form.postal_code = oldAddress.postal_code;
            this.form.phone = oldAddress.phone;

            //find selected country and filter states
            let selectedCountry = this.countries.find(country => country.name === oldAddress.country)
            this.form.country = selectedCountry.id;
            await this.countryChanged(selectedCountry.id)

            //find selected state and filter cities
            let selectedState = this.filteredStates.find(state => state.name === oldAddress.state)
            this.form.state = selectedState.id;
            await this.stateChanged(selectedState.id)

            //find selected city
            let selectedCity = this.filteredCities.find(city => city.name === oldAddress.city)
            this.form.city = selectedCity.id;

        },
        closeDialog(){
            this.isVisible = false
            this.$emit('close')
        }
    }
}
</script>

<style>
h3{
    color: #df3c3f !important;
}
.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 5px;
}
.form-group{
    padding: 10px;
}
/* General Grid Setup */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.col {
  flex: 1 0 0%;
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

/* Default Columns */
.col-1 { flex: 0 0 8.333%; max-width: 8.333%; }
.col-2 { flex: 0 0 16.667%; max-width: 16.667%; }
.col-3 { flex: 0 0 25%; max-width: 25%; }
.col-4 { flex: 0 0 33.333%; max-width: 33.333%; }
.col-5 { flex: 0 0 41.667%; max-width: 41.667%; }
.col-6 { flex: 0 0 50%; max-width: 50%; }
.col-7 { flex: 0 0 58.333%; max-width: 58.333%; }
.col-8 { flex: 0 0 66.667%; max-width: 66.667%; }
.col-9 { flex: 0 0 75%; max-width: 75%; }
.col-10 { flex: 0 0 83.333%; max-width: 83.333%; }
.col-11 { flex: 0 0 91.667%; max-width: 91.667%; }
.col-12 { flex: 0 0 100%; max-width: 100%; }

/* Breakpoints for Responsive Design */

/* Small devices (≥576px) */
@media (min-width: 576px) {
  .col-sm-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-sm-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-sm-3 { flex: 0 0 25%; max-width: 25%; }
  .col-sm-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-sm-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-sm-6 { flex: 0 0 50%; max-width: 50%; }
  .col-sm-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-sm-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-sm-9 { flex: 0 0 75%; max-width: 75%; }
  .col-sm-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-sm-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-sm-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Medium devices (≥768px) */
@media (min-width: 768px) {
  .col-md-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-md-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-md-3 { flex: 0 0 25%; max-width: 25%; }
  .col-md-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-md-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-md-6 { flex: 0 0 50%; max-width: 50%; }
  .col-md-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-md-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-md-9 { flex: 0 0 75%; max-width: 75%; }
  .col-md-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-md-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-md-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Large devices (≥992px) */
@media (min-width: 992px) {
  .col-lg-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-lg-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-lg-3 { flex: 0 0 25%; max-width: 25%; }
  .col-lg-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-lg-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-lg-6 { flex: 0 0 50%; max-width: 50%; }
  .col-lg-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-lg-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-lg-9 { flex: 0 0 75%; max-width: 75%; }
  .col-lg-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-lg-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-lg-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Extra Large devices (≥1200px) */
@media (min-width: 1200px) {
  .col-xl-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-xl-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-xl-3 { flex: 0 0 25%; max-width: 25%; }
  .col-xl-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-xl-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-xl-6 { flex: 0 0 50%; max-width: 50%; }
  .col-xl-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-xl-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-xl-9 { flex: 0 0 75%; max-width: 75%; }
  .col-xl-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-xl-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-xl-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Extra Extra Large devices (≥1400px) */
@media (min-width: 1400px) {
  .col-xxl-1 { flex: 0 0 8.333%; max-width: 8.333%; }
  .col-xxl-2 { flex: 0 0 16.667%; max-width: 16.667%; }
  .col-xxl-3 { flex: 0 0 25%; max-width: 25%; }
  .col-xxl-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-xxl-5 { flex: 0 0 41.667%; max-width: 41.667%; }
  .col-xxl-6 { flex: 0 0 50%; max-width: 50%; }
  .col-xxl-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-xxl-8 { flex: 0 0 66.667%; max-width: 66.667%; }
  .col-xxl-9 { flex: 0 0 75%; max-width: 75%; }
  .col-xxl-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-xxl-11 { flex: 0 0 91.667%; max-width: 91.667%; }
  .col-xxl-12 { flex: 0 0 100%; max-width: 100%; }
}
/* Form Check Container */
.form-check {
  display: block;
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

/* Form Check Input */
.form-check-input {
  position: absolute;
  margin-top: 0.3rem;
  margin-left: -1.5rem;
  width: 1rem;
  height: 1rem;
  pointer-events: none;
  z-index: 1;
  border-radius: 0.25rem;
  background-color: #fff;
  border: 1px solid #ced4da;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.form-check-input:focus {
  outline: none;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

/* Disabled States */
.form-check-input:disabled {
  cursor: not-allowed;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

/* Form Check Label */
.form-check-label {
  margin-bottom: 0;
  font-size: 1rem;
  color: #212529;
  cursor: pointer;
}

/* Inline Checkboxes and Radio Buttons */
.form-check-inline {
  display: inline-block;
  margin-right: 1rem;
}

/* Custom Radio */
.form-check-input[type="radio"] {
  border-radius: 50%;
}

</style>
