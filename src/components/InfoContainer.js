import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoContainer({ title, cases, total }) {
  return (
    <Card className="infoContainer">
      <CardContent>
        <Typography className="infoContainer__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className="infoContainer__cases">{cases}</h2>
        <Typography className="infoContainer__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoContainer;
