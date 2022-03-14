<p align='center'>
  <img src='./src/assets/img/hero_logo.png' alt='Vue3-boilerplate'/>
</p>

<h4 align='center'>
Rick & Morty Explorator
</h4>

<hr/>

## Stack used

- ⚡️ [Vue 3](https://github.com/vuejs/vue-next), [Vite 2](https://github.com/vitejs/vite)

- 🗂 [VueRouter](https://router.vuejs.org/)

- 🛒 [VueX 4](https://vuex.vuejs.org/)

- 🎨 [Windi CSS](https://github.com/windicss/windicss)

- 😃 [Iconify](https://iconify.design/)

- 🌍 [I18n ready](https://github.com/antfu/vite-plugin-md)

- 📦 [Components auto importing](https://github.com/antfu/vite-plugin-components)

- 📋 [TypeScript](https://v3.vuejs.org/guide/typescript-support.html#typescript-support)

<hr/>

## Installation Steps

### Clone to local

```bash
git clone https://github.com/GueganVictor/test-rick-and-morty.git
cd test-rick-and-morty
npm i
```

### Launch the project

```bash
npm run dev
```

<hr/>

## Routes

### /characters

This page contains a basic list of the first 20 characters.
You have the ability to filter characters by name and status as well as navigate between the pages since it uses pagination.

### /characters/:id

This page displays all the information about a specific character retrieved from the id in the URL.

<hr/>

## Bonus feature - Accessilibity

- i18n, the project uses i18n in order to display text in multiple languages. Most of the text has been translated expect for a few characters attributes like type, location, etc.
- Navigation by keyboard, in order to maximise accessibility, the whole site is navigable by keyboard (Tab and Maj+Tab).
- Dark mode, to ease colors on the eye, you have the ability to choose between a light and a dark theme. Suit yourself !
