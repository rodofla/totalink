import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayouts'
import AppLayout from './layouts/AppLayout'
import TotaLinkView from './views/TotaLinkView'
import ProfileView from './views/ProfileView'
import HandleView from './views/HandleView'
import NotFoundView from './views/NotFoundView'
import HomeView from './views/HomeView'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                {/*  Public Routes */}
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>

                {/* prefix:Admin /  Authenticated Routes */}
                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<TotaLinkView />} />
                    <Route path='profile' element={<ProfileView />} />
                </Route>

                <Route path='/:handle' element={<AuthLayout />}>
                    <Route element={<HandleView />} index={true} />
                </Route>

                {/* Home */}
                <Route path='/' element={<HomeView />} />

                {/* 404 */}
                <Route path='/404' element={<AuthLayout />}>
                    <Route element={<NotFoundView />} index={true} />
                </Route>
            </Routes >
        </BrowserRouter >
    )

}