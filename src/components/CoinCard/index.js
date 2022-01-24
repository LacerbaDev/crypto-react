import React from 'react'
import {Card, CardMedia, CardContent, Typography, CardActionArea} from '@material-ui/core';
import './style.css'

function CoindCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }} className="coin-card" onClick={() => props.getCoinDetail(props.id)}>
      <CardActionArea>
        <CardMedia
          image={props.image}
          title={props.name}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name} - {props.symbol}
          </Typography>
          <Typography variant="h6" component="h3">
            Max daily value: {props.high_24h}<br></br> Min daily value: {props.low_24h}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CoindCard
