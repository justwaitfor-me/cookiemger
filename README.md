# Cookie Manager v2.0

**justwait cookiemger** is a lightweight cookie consent manager designed to help websites comply with cookie regulations while providing a customizable user experience.

---

## Features

- Lightweight and easy to integrate.
- Fully customizable UI and behavior.
- Supports light, dark, and auto themes.
- Allows users to accept, reject, or customize cookie preferences.
- Stores user preferences in cookies and localStorage.

---

## Installation

### Using the CDN
Include the cookie manager in your project by adding the following script tag to your HTML file:

```html
<script src="https://content.justwaitforme.de/v2/api/static/cookies.min.js"></script>
```

### Using the Local File
Alternatively, include the local `cookies.js` file:

```html
<script src="cookies.js"></script>
```

---

## Basic Usage

Initialize the cookie manager with default settings by adding the following script:

```html
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const config = {
            position: 'right-bottom', // Widget position
            theme: 'auto', // Theme: 'light', 'dark', or 'auto'
            showCustomize: true, // Show "Customize" button
            message: 'We use cookies to enhance your experience',
            acceptText: 'Accept All',
            denyText: 'Reject',
            customizeText: 'Customize',
            title: 'Cookie Preferences',
            requiredText: 'Required cookies cannot be disabled',
            primaryColor: '#3b82f6', // Primary button color
            borderRadius: '8px' // Widget border radius
        };

        // Save the configuration to localStorage
        localStorage.setItem('cookie_config', JSON.stringify(config));
    });
</script>
```

---

## Customization

Customize the cookie manager by modifying the `config` object. Below are the available options:

| Option         | Description                                | Default Value                                |
|----------------|--------------------------------------------|---------------------------------------------|
| `position`     | Position of the widget (`right-bottom`, `left-bottom`, `right-top`, `left-top`, `center`). | `right-bottom`                              |
| `theme`        | Theme of the widget (`light`, `dark`, `auto`). | `auto`                                      |
| `showCustomize`| Whether to show the "Customize" button.    | `true`                                      |
| `message`      | Message displayed in the widget.           | `"We use cookies to enhance your experience"` |
| `acceptText`   | Text for the "Accept All" button.          | `"Accept All"`                              |
| `denyText`     | Text for the "Reject" button.              | `"Reject"`                                  |
| `customizeText`| Text for the "Customize" button.           | `"Customize"`                               |
| `title`        | Title of the customization modal.          | `"Cookie Preferences"`                      |
| `requiredText` | Text for required cookies description.     | `"Required cookies cannot be disabled"`     |
| `primaryColor` | Primary button color (e.g., `#3b82f6`).    | `#3b82f6`                                   |
| `borderRadius` | Border radius of the widget (e.g., `8px`). | `8px`                                      |

---

## Example Integration

Here’s a complete example of how to integrate the cookie manager into your website:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cookie Manager Example</title>
  <script src="https://content.justwaitforme.de/v2/api/static/cookies.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
        const config = {
            position: 'right-bottom',
            theme: 'auto',
            showCustomize: true,
            message: 'We use cookies to enhance your experience',
            acceptText: 'Accept All',
            denyText: 'Reject',
            customizeText: 'Customize',
            title: 'Cookie Preferences',
            requiredText: 'Required cookies cannot be disabled',
            primaryColor: '#3b82f6',
            borderRadius: '8px'
        };

        localStorage.setItem('cookie_config', JSON.stringify(config));
    });
  </script>
</head>
<body>
  <h1>Welcome to Cookie Manager Example</h1>
</body>
</html>
```
