<template>
    <div v-if="showModal" class="modal-overlay" id="custom-order-modal">
      <div class="modal-content">
        <button @click="closeModal" class="close-button">×</button>
        <form @submit.prevent="submitForm">
          <h3>Modal Form</h3>
          <input type="text" v-model="formData.name" placeholder="Enter your name" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            hihi
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
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
  </style>
  