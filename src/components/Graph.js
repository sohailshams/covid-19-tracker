import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function Graph() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>Graph</h1>
    </div>
  );
}

export default Graph;
