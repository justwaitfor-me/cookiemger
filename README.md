# Cookie Manager

justwait cookiemger is a lightweight cookie consent manager that helps you comply with cookie laws by providing users with options to accept or reject cookies. It is designed to enhance user experience while ensuring transparency regarding cookie usage.

## Features

- Customizable cookie consent widget
- Supports dark and light themes
- User preferences are stored in cookies
- Easy integration into any web project

## Installation

To use the cookie consent manager, simply include the `cookies.js` or `cookies.min.js` file in your HTML:

```html
<script src="path/to/cookies.js"></script>
```
or for production:
```html
<script src="path/to/cookies.min.js"></script>
```

## Usage

After including the script, the cookie consent widget will automatically appear on your website when the DOM is fully loaded. You can customize its appearance and behavior through the configuration options in the script.

### Configuration Options

You can modify the following configuration options in the `cookies.js` file:

- `position`: The position of the cookie consent widget on the screen (e.g., 'right-bottom', 'left-bottom', 'right-top', 'left-top', 'center').
- `theme`: The theme of the widget ('auto', 'dark', or 'light').
- `showCustomize`: Boolean value to show or hide the customize button.
- `message`: The message displayed in the widget.
- `acceptText`: The text for the accept button.
- `denyText`: The text for the deny button.
- `customizeText`: The text for the customize button.
- `title`: The title of the cookie preferences modal.
- `requiredText`: The message indicating that required cookies cannot be disabled.
- `primaryColor`: The primary color used in the widget.
- `borderRadius`: The border radius of the widget.
- `githubUrl`: The URL to the project's GitHub repository.

## Example

Here is a simple example of how to use the cookie consent manager:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cookie Consent Example</title>
    <script src="path/to/cookies.js"></script>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is an example of a website using the cookie consent manager.</p>
</body>
</html>
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.