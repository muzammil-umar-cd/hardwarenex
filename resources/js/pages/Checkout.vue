<template>
    <div>
      <!-- Shipping & Billing Info Form -->
      <div class="shipping-billing-form">
        <h3>{{ $i18n.t('shipping_billing_info') }}</h3>
        <form @submit.prevent="submitCheckout">
          <div>
            <label for="full_name">{{ $i18n.t('full_name') }}</label>
            <input type="text" v-model="form.full_name" required />
          </div>
  
          <div>
            <label for="email_address">{{ $i18n.t('email_address') }}</label>
            <input type="email" v-model="form.email_address" required />
          </div>
  
          <div>
            <label for="address">{{ $i18n.t('address') }}</label>
            <input type="text" v-model="form.address" required />
          </div>
  
          <div>
            <label for="postal_code">{{ $i18n.t('postal_code') }}</label>
            <input type="text" v-model="form.postal_code" required />
          </div>
  
          <div>
            <label for="country">{{ $i18n.t('country') }}</label>
            <select v-model="form.country" @change="countryChanged(form.country)" required>
              <option v-for="country in countries" :key="country.id" :value="country.id">
                {{ country.name }}
              </option>
            </select>
          </div>
  
          <div>
            <label for="state">{{ $i18n.t('state') }}</label>
            <select v-model="form.state" @change="stateChanged(form.state)" required>
              <option v-for="state in filteredStates" :key="state.id" :value="state.id">
                {{ state.name }}
              </option>
            </select>
          </div>
  
          <div>
            <label for="city">{{ $i18n.t('city') }}</label>
            <select v-model="form.city" required>
              <option v-for="city in filteredCities" :key="city.id" :value="city.id">
                {{ city.name }}
              </option>
            </select>
          </div>
  
          <div>
            <label for="phone">{{ $i18n.t('phone') }}</label>
            <input type="tel" v-model="form.phone" required />
          </div>
        </form>
      </div>
  
      <!-- Shipping Method Section -->
      <div v-if="countriesLoaded" class="shipping-method">
        <h3>{{ $i18n.t('shipping_method') }}</h3>
        <div v-for="(method, index) in shippingMethods" :key="index" class="shipping-option">
          <label>
            <input type="radio" 
              :value="method" 
              v-model="selectedShippingMethod" 
              @change="updateShippingPrice" />
            {{ method.name }} - {{ method.price | currency }}
          </label>
        </div>
  
        <!-- Display the selected shipping method and its price -->
        <div v-if="selectedShippingMethod">
          <p>{{ $i18n.t('selected_shipping_method') }}: {{ selectedShippingMethod.name }}</p>
          <p>{{ $i18n.t('price') }}: {{ selectedShippingMethod.price | currency }}</p>
        </div>
      </div>
  
      <!-- Cart Summary & Calculations -->
      <div class="cart-summary">
        <h3>{{ $i18n.t('order_summary') }}</h3>
        <div>
          <p>{{ $i18n.t('subtotal') }}: {{ subtotal | currency }}</p>
          <p>{{ $i18n.t('shipping_fee') }}: {{ shippingPrice | currency }}</p>
          <p>{{ $i18n.t('total') }}: {{ totalPrice | currency }}</p>
        </div>
      </div>
  
      <!-- Checkout Button -->
      <div>
        <button @click="submitCheckout">{{ $i18n.t('checkout') }}</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        countriesLoaded: false, // Indicates if countries are loaded
        countries: [], // List of countries
        filteredStates: [], // List of states filtered by selected country
        filteredCities: [], // List of cities filtered by selected state
        shippingMethods: [], // List of dummy shipping methods (FedEx)
        selectedShippingMethod: null, // To track the selected shipping method
        form: {
          full_name: "",
          email_address: "",
          address: "",
          postal_code: "",
          country: "",
          state: "",
          city: "",
          phone: "",
        },
        subtotal: 100.00, // Example subtotal, this should be dynamically set based on cart
        shippingPrice: 0.00, // Initial shipping price
        totalPrice: 100.00, // Total price (subtotal + shipping)
      };
    },
    methods: {
      // Fetch available countries (this should be updated with real data)
      async fetchCountries() {
        // Dummy countries list for now
        this.countries = [
          { id: 1, name: "USA" },
          { id: 2, name: "Canada" },
          { id: 3, name: "UK" },
        ];
        this.countriesLoaded = true;
      },
  
      // Fetch available states based on selected country
      async countryChanged(countryId) {
        // Dummy states for selected country
        if (countryId === 1) {
          this.filteredStates = [
            { id: 1, name: "California" },
            { id: 2, name: "Texas" },
          ];
        } else if (countryId === 2) {
          this.filteredStates = [
            { id: 3, name: "Ontario" },
            { id: 4, name: "Quebec" },
          ];
        } else {
          this.filteredStates = [];
        }
  
        this.form.state = "";
        this.form.city = "";
        this.filteredCities = [];
      },
  
      // Fetch available cities based on selected state
      async stateChanged(stateId) {
        // Dummy cities for selected state
        if (stateId === 1) {
          this.filteredCities = [
            { id: 1, name: "Los Angeles" },
            { id: 2, name: "San Francisco" },
          ];
        } else if (stateId === 3) {
          this.filteredCities = [
            { id: 3, name: "Toronto" },
            { id: 4, name: "Ottawa" },
          ];
        } else {
          this.filteredCities = [];
        }
      },
  
      // Fetch dummy shipping methods (FedEx rates) - Replace with actual API later
      async fetchShippingMethods() {
        this.shippingMethods = [
          { name: "FedEx Standard", price: 10.99 },
          { name: "FedEx Express", price: 20.99 },
          { name: "FedEx Same-Day", price: 50.99 },
        ];
      },
  
      // Update the shipping price when a shipping method is selected
      updateShippingPrice() {
        if (this.selectedShippingMethod) {
          this.shippingPrice = this.selectedShippingMethod.price;
          this.calculateTotalPrice();
        }
      },
  
      // Recalculate the total price based on shipping price
      calculateTotalPrice() {
        this.totalPrice = this.subtotal + this.shippingPrice;
      },
  
      // Handle the form submission (simply logs for now, implement actual checkout logic)
      async submitCheckout() {
        // Form validation check
        if (!this.form.full_name || !this.form.email_address || !this.form.address || !this.form.postal_code || !this.form.phone || !this.selectedShippingMethod) {
          alert('Please complete all required fields.');
          return;
        }
  
        const checkoutData = {
          shippingInfo: this.form,
          shippingMethod: this.selectedShippingMethod,
          totalPrice: this.totalPrice,
        };
  
        // Log the checkout data (can be replaced with actual API call)
        console.log("Checkout submitted with the following data:", checkoutData);
  
        // Simulate a successful checkout
        alert("Checkout successful!");
      },
    },
    async created() {
      await this.fetchCountries(); // Fetch countries when the component is created
      await this.fetchShippingMethods(); // Fetch shipping methods (dummy data)
    },
  };
  </script>
  
  <style scoped>
  .shipping-method {
    margin-top: 20px;
  }
  
  .shipping-option {
    margin-bottom: 10px;
  }
  
  .cart-summary {
    margin-top: 30px;
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #f9f9f9;
  }
  
  button {
    margin-top: 20px;
  }
  </style>
  