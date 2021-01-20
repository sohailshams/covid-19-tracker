import React, { useState } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';

function Header() {
  const [countries, setCountries] = useState(['usa', 'uk']);

  return (
    <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value="abc">
          {countries.map((country) => (
            <MenuItem value="{country}">{country}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
