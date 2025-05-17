import {Navigate, Route, Routes} from 'react-router-dom';
import {lazy, Suspense} from 'react';

import Loader from './components/common/Loader/Loader.jsx';

import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import PrivateLayout from "./components/layout/PrivateLayout/PrivateLayout.jsx";

const Login = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const Register = lazy(() => import('./pages/RegistrationPage/RegistrationPage.jsx'));

const Main = lazy(() => import('./pages/tabs/HomeTab/HomeTab.jsx'));
const Currency = lazy(() => import('./pages/tabs/CurrencyTab/CurrencyTab.jsx'));
const Stats = lazy(() => import('./pages/tabs/StatisticsTab/StatisticsTab.jsx'));

export default function App() {
    return (
            <Suspense fallback={<Loader/>}>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicRoute/>}>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Route>

                    {/* Private Routes */}
                    <Route element={<PrivateRoute/>}>
                        <Route element={<PrivateLayout/>}>
                            <Route path="/home" element={<Main/>}/>
                            <Route path="/currency" element={<Currency/>}/>
                            <Route path="/stats" element={<Stats/>}/>
                        </Route>
                    </Route>

                    {/* Catch-all */}
                    <Route path="*" element={<Navigate to="/home"/>}/>
                </Routes>
            </Suspense>
    );
}
