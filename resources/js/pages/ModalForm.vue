<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
  
        <!-- Close Button -->
        <a class="close-modal" @click="closeModal">
          <svg viewBox="0 0 20 20">
            <path fill="#000000" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
          </svg>
        </a>
  
        <!-- Modal Content -->
        <div class="modal-content">
          <h3>Some content here</h3>
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
  @media only screen and (min-width: 40em) {
  .modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    visibility: hidden;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1), visibility 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .modal-overlay.active {
    opacity: 1;
    visibility: visible;
  }
}
/**
 * Modal
 */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  background-color: #fff;
  width: 600px;
  max-width: 75rem;
  min-height: 20rem;
  padding: 1rem;
  border-radius: 3px;
  opacity: 0;
  overflow-y: auto;
  visibility: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  transform: scale(1.2);
  transition: all 0.6s cubic-bezier(0.55, 0, 0.1, 1);
}
.modal .close-modal {
  position: absolute;
  cursor: pointer;
  top: 5px;
  right: 15px;
  opacity: 0;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1), transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  transition-delay: 0.3s;
}
.modal .close-modal svg {
  width: 1.75em;
  height: 1.75em;
}
.modal .modal-content {
  opacity: 0;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1);
  transition-delay: 0.3s;
}
.modal.active {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}
.modal.active .modal-content {
  opacity: 1;
}
.modal.active .close-modal {
  transform: translateY(10px);
  opacity: 1;
}

/**
 * Mobile styling
 */
@media only screen and (max-width: 39.9375em) {
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    border-radius: 0;
    transform: scale(1.1);
    padding: 0 !important;
  }

  .close-modal {
    right: 20px !important;
  }
}
  </style>
  