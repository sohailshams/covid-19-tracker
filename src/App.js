import './App.css';
import Header from './components/Header';
import InfoContainer from './components/InfoContainer';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app__stats">
        <InfoContainer title="Coronavirus Cases" cases={1232} total={20000} />
        <InfoContainer title="Recovered" cases={12352} total={3500} />
        <InfoContainer title="Deaths" cases={12323} total={45000} />
      </div>
    </div>
  );
}

export default App;
