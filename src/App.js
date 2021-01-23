import Header from './components/Header';
import InfoContainer from './components/InfoContainer';
import Map from './components/Map';
import { Card, CardContent } from '@material-ui/core';

import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app__statsmap">
        <Header />
        <div className="app__stats">
          <InfoContainer title="Coronavirus Cases" cases={1232} total={20000} />
          <InfoContainer title="Recovered" cases={12352} total={3500} />
          <InfoContainer title="Deaths" cases={12323} total={45000} />
        </div>
        <Map />
      </div>
      <div className="app__countriesgraph">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            <h3>Worldwide New Cases</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
