# 📁 Структура проєкту

## /src

### 🔌 api — запити до backend (axios, fetch)
- `userApi.js` — запити по користувачу
- `transactionApi.js` — запити по транзакціях
- `authApi.js` — реєстрація, логін, логаут
- `currencyApi.js` — запити до Monobank API

### ⚙️ app — конфігурація redux store, persistor
- `store.js` — створення Redux store + redux-persist
- `rootReducer.js` — комбінування редюсерів

### 🎨 assets
- `fonts/` — шрифти
- `images/` — лого, іконки, дефолтні картинки

### 🧩 components — загальні UI компоненти

#### 🔘 common — кнопки, інпути, лоадери, модалки
- `Button.jsx`
- `Input.jsx`
- `Modal.jsx`
- `Loader.jsx`
- `ProgressBar.jsx`

#### 🔐 auth — реєстрація та логін
- `RegistrationForm.jsx`
- `LoginForm.jsx`

#### 📐 layout — компоненти обгортки сторінок
- `UserAccountLayout.jsx`
- `Header.jsx`
- `Sidebar.jsx`
- `Navigation.jsx`
- `Balance.jsx`
- `Currency.jsx`

#### 💰 transactions — робота з транзакціями
- `TransactionsList.jsx`
- `TransactionsItem.jsx`
- `ButtonAddTransaction.jsx`
- `ModalAddTransaction.jsx`
- `AddTransactionForm.jsx`
- `ModalEditTransaction.jsx`
- `EditTransactionForm.jsx`

### 🌟 features — Redux логіка для фіч

#### 🔐 auth
- `authSlice.js`
- `authOperations.js`
- `authSelectors.js`

#### 👤 user
- `userSlice.js`
- `userOperations.js`
- `userSelectors.js`

#### 💳 transactions
- `transactionsSlice.js`
- `transactionsOperations.js`
- `transactionsSelectors.js`

#### 💱 currency
- `currencySlice.js`
- `currencyOperations.js`
- `currencySelectors.js`

### 🧪 hooks
- `useAuth.js` — кастомний хук авторизації

### 📄 pages — сторінки маршрутизації
- `RegistrationPage.jsx` — `/register`
- `LoginPage.jsx` — `/login`
- `HomeTab.jsx` — `/`
- `StatisticsTab.jsx` — `/statistics`
- `CurrencyTab.jsx` — `/currency` (для мобілки)
- `NotFoundPage.jsx` — 404

### 🧭 routes — маршрутизація
- `PrivateRoute.jsx`
- `PublicRoute.jsx`
- `AppRoutes.jsx` — огляд маршрутизації

### 🎨 styles — глобальні стилі
- `variables.module.scss` — змінні (кольори, шрифти, відступи)
- `globals.scss` — глобальні стилі, ресети, шрифти
- `mixins.scss` — SCSS міксіни

### 🧰 utils — утиліти, константи, валідації
- `validationSchemas.js` — yup схеми валідації
- `constants.js` — константи (типи транзакцій тощо)
- `helpers.js` — обробка дат, форматування

### 📌 Головні файли
- `App.jsx`
- `index.js`
