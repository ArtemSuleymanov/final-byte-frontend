/src
  ├── api                         # запити до backend (axios, fetch)
  │    └── userApi.js             # запити по користувачу
  │    └── transactionApi.js      # запити по транзакціях
  │    └── authApi.js             # запити реєстрації, логіну, логауту
  │    └── currencyApi.js         # запити до Monobank API
  
  ├── app                         # конфігурація redux store, persistor
  │    ├── store.js               # створення redux store + redux-persist
  │    └── rootReducer.js         # комбінування редюсерів
  │
  ├── assets
  │    ├── fonts                  # шрифти
  │    └── images                 # лого, іконки, дефолтні картинки
  │
  ├── components                 # загальні UI компоненти
  │    ├── common                # кнопки, інпути, лоадери, модалки (перекриваються з фічами)
  │    │     ├── Button.jsx
  │    │     ├── Input.jsx
  │    │     ├── Modal.jsx
  │    │     ├── Loader.jsx
  │    │     └── ProgressBar.jsx
  │    │
  │    ├── auth                  # компоненти для реєстрації та логіну
  │    │     ├── RegistrationForm.jsx
  │    │     ├── LoginForm.jsx
  │    │
  │    ├── layout                # компоненти обгортки сторінок, заголовки, сайдбар
  │    │     ├── UserAccountLayout.jsx
  │    │     ├── Header.jsx
  │    │     ├── Sidebar.jsx
  │    │     ├── Navigation.jsx
  │    │     ├── Balance.jsx
  │    │     └── Currency.jsx
  │    │
  │    ├── transactions          # компоненти для роботи з транзакціями
  │    │     ├── TransactionsList.jsx
  │    │     ├── TransactionsItem.jsx
  │    │     ├── ButtonAddTransaction.jsx
  │    │     ├── ModalAddTransaction.jsx
  │    │     ├── AddTransactionForm.jsx
  │    │     ├── ModalEditTransaction.jsx
  │    │     └── EditTransactionForm.jsx
  │
  ├── features                  # логіка redux + thunk для фіч
  │    ├── auth
  │    │     ├── authSlice.js
  │    │     ├── authOperations.js
  │    │     └── authSelectors.js
  │    │
  │    ├── user
  │    │     ├── userSlice.js
  │    │     ├── userOperations.js
  │    │     └── userSelectors.js
  │    │
  │    ├── transactions
  │    │     ├── transactionsSlice.js
  │    │     ├── transactionsOperations.js
  │    │     └── transactionsSelectors.js
  │    │
  │    ├── currency
  │          ├── currencySlice.js
  │          ├── currencyOperations.js
  │          └── currencySelectors.js
  │
  ├── hooks                    # кастомні хуки
  │    └── useAuth.js
  │
  ├── pages                    # сторінки маршрутизації
  │    ├── RegistrationPage.jsx      # /register
  │    ├── LoginPage.jsx             # /login
  │    ├── HomeTab.jsx               # /
  │    ├── StatisticsTab.jsx         # /statistics
  │    ├── CurrencyTab.jsx           # /currency (для мобілки)
  │    └── NotFoundPage.jsx          # 404
  │
  ├── routes
  │    ├── PrivateRoute.jsx
  │    ├── PublicRoute.jsx
  │    └── AppRoutes.jsx            # огляд маршрутизації + навігації
  │
  ├── styles                   # глобальні стилі та змінні (CSS / SCSS)
  │    ├── variables.module.scss    # глобальні змінні (кольори, шрифти, відступи)
  │    ├── globals.scss             # глобальні стилі, ресети, шрифти
  │    └── mixins.scss              # міксіни SCSS
  │
  ├── utils                    # утиліти, константи, валідації
  │    ├── validationSchemas.js   # yup схеми валідації
  │    ├── constants.js            # константи (напр. типи транзакцій)
  │    └── helpers.js              # функції для обробки дат, форматування
  │
  ├── App.jsx
  └── index.js 
