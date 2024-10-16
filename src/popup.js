class Popup {
    constructor({
      modalId,
      contentTitle = '',
      formAction = null,   // URL to which the form will be submitted
      formMethod = 'POST', // HTTP method for form submission
      formHTML = '',       // New: Custom HTML for the form
      onSuccess = null,    // Callback function for successful form submission
      width = '80%',
      height = 'auto',
      zIndex = '1',
      modalBackgroundColor = 'rgba(0, 0, 0, 0.5)',
      contentBackgroundColor = '#fff',
      closeButtonVisible = true,
      closeButtonColor = '#aaa',
      overlayClickClose = true,
      customClass = '',
      openAnimation = null,
    }) {
      this.modalId = modalId;
      this.contentTitle = contentTitle;
      this.formAction = formAction;
      this.formMethod = formMethod;
      this.formHTML = formHTML;  // Storing the custom HTML
      this.onSuccess = onSuccess;
      this.width = width;
      this.height = height;
      this.zIndex = zIndex;
      this.modalBackgroundColor = modalBackgroundColor;
      this.contentBackgroundColor = contentBackgroundColor;
      this.closeButtonVisible = closeButtonVisible;
      this.closeButtonColor = closeButtonColor;
      this.overlayClickClose = overlayClickClose;
      this.customClass = customClass;
      this.openAnimation = openAnimation;
  
      this.initPopup();
    }
  
    initPopup() {
      // Create the modal structure
      this.modal = document.createElement('div');
      this.modal.id = this.modalId;
      this.modal.className = `popup-modal ${this.customClass}`;
      this.modal.style.zIndex = this.zIndex;
      this.modal.style.backgroundColor = this.modalBackgroundColor;
  
      const modalContent = document.createElement('div');
      modalContent.className = 'popup-modal-content';
      modalContent.style.width = this.width;
      modalContent.style.height = this.height;
      modalContent.style.backgroundColor = this.contentBackgroundColor;
  
      // Title
      const titleElement = document.createElement('h2');
      titleElement.innerHTML = this.contentTitle;
  
      // Form
      this.formElement = document.createElement('form');
      this.formElement.action = this.formAction || '#';
      this.formElement.method = this.formMethod;
      this.formElement.onsubmit = (e) => this.submitForm(e);  // Bind submit function
  
      // Insert the user-provided HTML into the form
      this.formElement.innerHTML = this.formHTML;
  
      // Submit Button (Optional: Add if not provided by the user)
      const submitButtonExists = this.formHTML.includes('type="submit"');
      if (!submitButtonExists) {
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerHTML = 'Submit';
        this.formElement.appendChild(submitButton);
      }
  
      modalContent.appendChild(titleElement);
      modalContent.appendChild(this.formElement);
  
      // Close Button
      if (this.closeButtonVisible) {
        const closeButton = document.createElement('span');
        closeButton.className = 'popup-close';
        closeButton.innerHTML = '&times;';
        closeButton.style.color = this.closeButtonColor;
        closeButton.onclick = () => this.closePopup();
        modalContent.appendChild(closeButton);
      }
  
      this.modal.appendChild(modalContent);
      document.body.appendChild(this.modal);
  
      // Outside click to close
      if (this.overlayClickClose) {
        this.modal.onclick = (event) => {
          if (event.target === this.modal) {
            this.closePopup();
          }
        };
      }
    }
  
    async submitForm(e) {
      e.preventDefault(); // Prevent default form submission
  
      const formData = new FormData(this.formElement);
  
      try {
        const response = await fetch(this.formAction, {
          method: this.formMethod,
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json(); // Assuming the response is JSON
  
          // Call the success callback if provided
          if (this.onSuccess) {
            this.onSuccess(result);
          }
  
          // Optional: Close the popup upon successful form submission
          this.closePopup();
        } else {
          console.error('Form submission failed', response);
          alert('Form submission failed. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting the form', error);
        alert('An error occurred while submitting the form.');
      }
    }
  
    showPopup() {
      this.modal.style.display = 'block';
  
      if (this.openAnimation === 'fade') {
        this.modal.style.opacity = '0';
        setTimeout(() => {
          this.modal.style.opacity = '1';
        }, 10);
      }
    }
  
    closePopup() {
      this.modal.style.display = 'none';
    }
  }
  
  export default Popup;
  