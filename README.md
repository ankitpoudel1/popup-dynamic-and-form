# Dynamic Ajax Popup

A flexible and customizable popup modal package that supports static content, form submission, and dynamic content loading via network requests. This package allows you to pass custom HTML for forms, handle AJAX-based form submissions, and execute callbacks on successful form submission.

## Features

- **Customizable Popup Content**: Define your own HTML for the popup's body, including forms, text, images, etc.
- **Form Submission via AJAX**: Submit forms within the popup using AJAX without page reloads.
- **Callback Functionality**: Execute a callback function on successful form submission.
- **Network Requests**: Load popup content dynamically from a remote URL.
- **Custom Animations and Styling**: Control the width, height, z-index, background colors, and open/close animations.

## Installation

### Using npm:

First, install the package via npm:

```bash
npm install dynamic-ajax-popup
```


## Usage

### Basic Popup with Static Content

To create a simple popup with static content:

```javascript
import Popup from 'dynamic-ajax-popup';

// Create a new instance of Popup
const myPopup = new Popup({
  modalId: 'simplePopup',
  contentTitle: 'Hello World',
  contentText: 'This is a basic static popup.',
  width: '50%',
  height: '200px',
  zIndex: '10',
  modalBackgroundColor: 'rgba(0, 0, 0, 0.7)',
  contentBackgroundColor: '#fff',
  closeButtonColor: '#ff0000',
  openAnimation: 'fade',
});

// Trigger the popup when needed
document.getElementById('openPopupButton').onclick = () => {
  myPopup.showPopup();
};
```

In your HTML:

```html
<button id="openPopupButton">Open Popup</button>
```

### Popup with Form Submission

You can add a form to your popup and handle form submission via AJAX. A callback function can be passed to handle post-submission actions.

```javascript
import Popup from 'dynamic-ajax-popup';

// Define a callback function to execute after successful form submission
function onFormSuccess(response) {
  console.log('Form submitted successfully:', response);
  alert('Thank you for submitting the form!');
}

// Create a popup with a custom form inside
const formPopup = new Popup({
  modalId: 'formPopup',
  contentTitle: 'Submit Your Details',
  formAction: 'https://your-api-url.com/submit',  // URL for form submission
  formMethod: 'POST',
  formHTML: \`
    <label for="name">Name</label>
    <input type="text" name="name" id="name" placeholder="Your Name" required>
    
    <label for="email">Email</label>
    <input type="email" name="email" id="email" placeholder="Your Email" required>
    
    <button type="submit">Submit</button>
  \`,
  onSuccess: onFormSuccess,  // Callback function after successful submission
  width: '60%',
  height: '300px',
  zIndex: '100',
  modalBackgroundColor: 'rgba(0, 0, 0, 0.7)',
  contentBackgroundColor: '#fff',
  closeButtonColor: '#ff0000',
  openAnimation: 'fade',
});

// Trigger the form popup
document.getElementById('openFormPopup').onclick = () => {
  formPopup.showPopup();
};
```

In your HTML:

```html
<button id="openFormPopup">Open Form Popup</button>
```

How to Import CSS:

To style the popup correctly, you need to import the accompanying CSS file. You can do this either in your HTML file or in your JavaScript file (if your environment supports it).

Option 1: Import in HTML
In your HTML file, include the following line in the <head> section:

```html
<link rel="stylesheet" href="./node_modules/dynamic-ajax-popup/src/popup.css">
```
Option 2: Import in JavaScript
If your environment supports it (e.g., using a bundler like Webpack), you can also import the CSS directly in your JavaScript file:

```javascript
import 'dynamic-ajax-popup/src/popup.css';
```

### Popup with Network-Fetched Content

The popup can also load content dynamically from a network request.

```javascript
import Popup from 'dynamic-ajax-popup';

// Create a popup that fetches content from a URL when opened
const networkPopup = new Popup({
  modalId: 'networkPopup',
  contentTitle: 'Loading...',
  contentText: 'Fetching content...',
  fetchUrl: 'https://jsonplaceholder.typicode.com/posts/1',  // Example API request
  width: '50%',
  height: '250px',
  zIndex: '10',
  modalBackgroundColor: 'rgba(0, 0, 0, 0.7)',
  contentBackgroundColor: '#fff',
  closeButtonColor: '#000',
  openAnimation: 'fade',
});

// Trigger the popup with network content
document.getElementById('openNetworkPopup').onclick = () => {
  networkPopup.showPopup();
};
```

In your HTML:

```html
<button id="openNetworkPopup">Open Network Content Popup</button>
```

## Popup Options

### Common Options

| Option               | Type     | Default                            | Description |
|----------------------|----------|------------------------------------|-------------|
| `modalId`            | String   | `''`                               | The unique ID for the popup modal. |
| ``contentTitle``       | String   | ``''``                               | The title of the popup. |
| ``contentText``        | String   | ``''``                               | Static content for the popup body. |
| ``formAction``         | String   | ``null``                             | The URL to which the form will be submitted. |
| ``formMethod``         | String   | ``'POST'``                           | The HTTP method for the form submission. |
| ``formHTML``           | String   | ``''``                               | The custom HTML for the form inside the popup. |
| ``onSuccess``          | Function | ``null``                             | A callback function triggered after successful form submission. |
| ``fetchUrl``           | String   | ``null``                             | The URL to fetch dynamic content from when the popup is opened. |
| ``width``              | String   | ``'80%'``                            | The width of the popup. |
| ``height``             | String   | ``'auto'``                           | The height of the popup. |
| ``zIndex``             | String   | ``'1'``                              | The z-index of the popup modal. |
| ``modalBackgroundColor`` | String | ``'rgba(0, 0, 0, 0.5)'``             | The background color of the modal overlay. |
| ``contentBackgroundColor`` | String | ``'#fff'``                         | The background color of the popup content. |
| ``closeButtonVisible`` | Boolean  | ``true``                             | Whether the close button is visible. |
| ``closeButtonColor``   | String   | ``'#aaa'``                           | The color of the close button. |
| ``overlayClickClose``  | Boolean  | ``true``                             | Whether clicking the overlay closes the popup. |
| ``openAnimation``      | String   | ``null``                             | Animation for opening the popup (e.g., ``'fade'``). |

## License

This project is licensed under the MIT License.
