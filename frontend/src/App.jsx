import Navbar from './components/Navbar';
import { Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

import { useEffect } from 'react';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';


const App = () => {
  const {authUser,checkAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser) {
    return <div className="flex justify-center items-center h-screen">
      <Loader classname = "size-10 animate-spin" />
    </div>
  }
  return (<div>

    <Navbar />
    <Router>
      <Route path="/" component={authUser ? <HomePage/>: <Navigate to="/login"/>} />
      <Route path="/signup" component={!authUser ? <SignUpPage/>: <Navigate to="/"/>} />
      <Route path="/login" component={!authUser ? <LoginPage/ >: <Navigate to="/"/>} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/profile" component={authUser ? <ProfilePage/>: <Navigate to="/login"/>} />
    </Router>
  </div>
  );
};

export default App;