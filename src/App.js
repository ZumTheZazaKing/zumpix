import { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar_components/Topbar';
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@mui/material/CircularProgress';

const Home = lazy(() => import('./pages/Home').then(module => ({default:module.Home})));
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({default:module.Dashboard})));
const Search = lazy(() => import('./pages/Search').then(module => ({default:module.Search})));
const Pixture = lazy(() => import('./pages/Pixture').then(module => ({default:module.Pixture})));

function App() {

  const [user, loading] = useAuthState(auth);

  useEffect(
    () => {
      if(!user)return;

      onSnapshot(doc(db,"users",auth.currentUser.uid), snapshot => {
        if(!snapshot.exists()){
            handleNewUser();
        }
      })
    },[user]
  )

  const handleNewUser = async () => {
    const userDocRef = doc(db,"users",auth.currentUser.uid);
    const userPayload = {
      name:auth.currentUser.displayName,
      avatar:auth.currentUser.photoURL,
      description:"No description yet"
    }
    await setDoc(userDocRef, userPayload);
  }

  return (
    <Router>
      <div className="App">
      {loading ? <div className="loading"><CircularProgress disableShrink size={60} thickness={5}/></div> :
        <Suspense fallback={<div className='loading'><CircularProgress disableShrink size={60} thickness={5}/></div>}>
          <Topbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/dashboard/:userId" element={<Dashboard/>}/>
              <Route path="/search/:query" element={<Search/>}/>
              <Route path="/pixture/:pixtureId" element={<Pixture/>}/>
          </Routes>
        </Suspense>}
      </div>
    </Router>
  );
}

export default App;
