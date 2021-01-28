import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoContainer.css';

function InfoContainer({
  title,
  cases,
  total,
  active,
  isRed,
  isOrange,
  isGreen,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoContainer ${active && 'infoContainer--selected'} ${
        isRed && 'infoContainer--red'
      } ${isOrange && 'infoContainer--orange'}`}
    >
      <CardContent>
        <Typography className="infoContainer__title" color="textSecondary">
          {title}
        </Typography>
        <h2
          className={`infoContainer__cases ${
            active & isGreen && 'infoContainer__cases--green'
          } ${active & isRed && 'infoContainer__cases--red'} ${
            active & isOrange && 'infoContainer__cases--orange'
          }`}
        >
          {cases}
        </h2>
        <Typography className="infoContainer__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoContainer;
