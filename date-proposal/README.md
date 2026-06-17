# Date Proposal Web App 🌹

A charming, interactive, and beautifully animated multi-step web application designed to ask someone on a date. It playfully captures their availability and cuisine preferences, and finally sends an automated email notification with the details.

**Live Demo:** [https://date-proposal-rose.vercel.app/](https://date-proposal-rose.vercel.app/)

## ✨ Features

- **Playful Interactions**: The "No" button on the first page actively runs away from the cursor, ensuring they can only say "Yes"!
- **Multi-Step Flow**: Smoothly guides the user through the proposal, capturing reaction, scheduling, and cuisine choices.
- **Rich Aesthetics**: Premium glassmorphism design, vibrant gradients, and elegant typography (Playfair Display & Outfit).
- **Email Notification**: Uses [EmailJS](https://www.emailjs.com/) to securely send the proposal details directly from the frontend—no backend required.
- **Celebration Effects**: Massive confetti explosion upon successful submission.

## 🛠️ Tech Stack

This project is built purely with:
- **Vanilla HTML5**
- **Vanilla CSS3** (CSS variables, flexbox, animations)
- **Vanilla JavaScript** (DOM manipulation, event listeners)

Because it uses no build tools or frameworks, it is incredibly lightweight, blazing fast, and extremely easy to host.

## 🚀 Usage & Local Setup

Since this is a vanilla web application, you do not need Node.js or any build scripts. 

1. **Clone the repository** (or download the files).
2. **Open `index.html`** directly in any web browser to view the app locally.

### Configuring EmailJS

If you want the app to actually send emails to your inbox when someone completes the form:

1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Add an **Email Service** (e.g., connect your Gmail) to get your `SERVICE_ID`.
3. Create an **Email Template** to get your `TEMPLATE_ID`. You can use these variables in your template:
   - `{{to_email}}` (The email address the user types in)
   - `{{date}}`
   - `{{time}}`
   - `{{cuisine}}`
4. Go to **Account > API Keys** to find your `PUBLIC_KEY`.
5. Open `script.js` and locate the `submitProposal()` function (around line 120). Replace the keys:
   ```javascript
   const serviceID = 'YOUR_SERVICE_ID';
   const templateID = 'YOUR_TEMPLATE_ID';
   // ...
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
6. **Uncomment the sending block** inside the `setTimeout` function in `script.js` to enable the actual API call.

## 📦 Deployment

This project is perfectly suited for free, static hosting platforms like Vercel, Netlify, or GitHub Pages. Simply link your GitHub repository to your preferred provider, and it will deploy the `index.html` file automatically.
