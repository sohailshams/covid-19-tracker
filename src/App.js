import InfoContainer from './components/InfoContainer';
import Map from './components/Map';
import Table from './components/Table';
import Graph from './components/Graph';
import { sortData, statPrettier } from './utils';
import {
  Card,
  CardContent,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCounties] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          // restructuring of data by looping over the data came from the request
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          let sortedData = sortData(data);
          setTableData(sortedData);
          setMapCounties(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        // kboul help me to dynamically center the map to selected country
        // https://stackoverflow.com/users/4929531/kboul

        const {
          countryInfo: { lat, long },
        } = data;
        setMapCenter({ lat, lng: long });

        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__statsmap">
        <div className="app__header">
          <h1 className="app__title">Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoContainer
            isRed
            active={casesType == 'cases'}
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus Cases"
            cases={statPrettier(countryInfo.todayCases)}
            total={statPrettier(countryInfo.cases)}
          />
          <InfoContainer
            isGreen
            active={casesType == 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            cases={statPrettier(countryInfo.todayRecovered)}
            total={statPrettier(countryInfo.recovered)}
          />
          <InfoContainer
            isOrange
            active={casesType == 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            cases={statPrettier(countryInfo.todayDeaths)}
            total={statPrettier(countryInfo.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__countriesgraph">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
            <Graph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
