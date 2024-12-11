<template>
  <div v-if="showModal" class="modal-overlay modal" :class="{ modal: true, show: isVisible }">
    <div class="modal-content">
      <button @click="closeModal" class="close-button">×</button>
      <form @submit.prevent="submitForm">
        <h3>Modal Form</h3>
        <input type="text" v-model="formData.name" placeholder="Enter your name" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        name: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitForm() {
      // Handle form submission logic
      console.log('Form Data:', this.formData);
      this.closeModal();
    },
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.close-button {
  background: transparent;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 9999; /* Make sure it's on top of other content */
}
</style>
