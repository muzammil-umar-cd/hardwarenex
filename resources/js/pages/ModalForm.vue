<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <button @click="closeModal">Close</button>
        <div>
          <!-- Modal content here -->
          <h2>Modal Header</h2>
          <p>Modal content...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean, // Show modal based on this prop
    },
    methods: {
      closeModal() {
        this.$emit('close'); // Emit event to close modal
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999; /* Ensure modal is on top */
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 50%;
    max-width: 600px;
  }
  
  button {
    margin-bottom: 20px;
  }
  </style>
  