# 🛡️ Secure Customer Management System - React Client

This is the Frontend client for the **Secure Customer Management System (S-SDLC Project)**. Built with React and Vite, this application provides a dynamic, responsive, and secure user interface for managing customers.

The client is designed to interact safely with our backend API, handling secure sessions and mitigating frontend-oriented attacks like Cross-Site Scripting (XSS).

*(Note: This repository contains the Frontend React application. The main Node.js/Express Secure Server and the Vulnerable Server can be found [here](https://github.com/tomernado/CompterSecurity-Server))*

## 🚀 Key Features & Security Implementations

* **Secure API Communication:** Utilizes `Axios` with a custom wrapper to ensure `withCredentials: true` is attached to requests. This allows the browser to securely send the `httpOnly` JWT cookies without exposing the token to local JavaScript.
* **State Management & Protected Routes:** Implements React Hooks (`useState`, `useEffect`) to validate user sessions upon component mounting. Sensitive UI components are only rendered after a successful validation response from the server.
* **XSS Mitigation:** Relies on React's built-in auto-escaping mechanisms to prevent script injections. (In our demonstration of the vulnerable server, we intentionally bypass this using `dangerouslySetInnerHTML` to showcase the exploit).
* **Responsive UI:** Built with **Material UI (@mui)** for a clean, accessible, and professional user experience, avoiding global CSS conflicts by using scoped styling (`makeStyles`).

## 🛠️ Tech Stack
* **Framework:** React (Vite)
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Styling & UI:** Material UI (@mui/material, @mui/styles)

## 💻 How to Run
1. Make sure the [Backend Server](https://github.com/tomernado/CompterSecurity-Server) is running locally.
2. Clone this repository: `git clone https://github.com/tomernado/CompterSecurity-Client.git`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
