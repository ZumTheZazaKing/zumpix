import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home').then(module => ({default:module.Home})));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
