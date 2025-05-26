import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import HRDashboard from '../components/Dashboard/HRDashboard';
import UserInputForm from '../components/UserInput/UserInputForm';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/user-input" component={UserInputForm} />
                <Route path="/admin-dashboard">
                    {user?.role === 'Admin' ? <AdminDashboard /> : <Redirect to="/login" />}
                </Route>
                <Route path="/hr-dashboard">
                    {user?.role === 'HR' ? <HRDashboard /> : <Redirect to="/login" />}
                </Route>
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
    );
};

export default AppRoutes;