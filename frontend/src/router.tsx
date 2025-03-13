import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import AuthLayout from './layouts/AuthLayouts'
import AppLayout from './layouts/AppLayout'
import TotaLinkView from './views/TotaLinkView'
import ProfileView from './views/ProfileView'

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>

                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<TotaLinkView />} />
                    <Route path='profile' element={<ProfileView />} />
                </Route>
            </Routes >
        </BrowserRouter >
    )

}