import CryptoList from './pages/cryptoList';
import CryptoDetail from './pages/cryptoDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from './util/constants/routes';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE_PATHS.HOME} element={<CryptoList/>}/>
          <Route path={`${ROUTE_PATHS.CRYPTO_DETAIL}/:id`} element={<CryptoDetail/>}/>

        </Routes>
      </BrowserRouter>     
    </div>
  );
}

export default App;
