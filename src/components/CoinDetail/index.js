import React, {useEffect, useState} from 'react';
import { getCoinDetail } from '../../api';
import  {useParams} from 'react-router-dom'
import {Card, CardMedia, CardContent, Typography, CardActionArea} from '@material-ui/core';

const CoinDetail = () => {

  const {coinId} = useParams()
  const [coin, setCoin] = useState()
  console.log(coinId)

  const fetchCoinDetail = async (id) => {
    const res = await getCoinDetail(id)
    console.log('res', res)
    setCoin(res.data)
  }
  useEffect(() => {
    fetchCoinDetail(coinId)
  }, [coinId])
  return (
    <div>
      <Card sx={{ maxWidth: 700 }} className="coin-card">
      <CardActionArea>
        <CardMedia
          image={coin?.image.large}
          title={coin?.name}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {coin?.name} - {coin?.symbol}
          </Typography>
          <Typography variant="h6" component="h3">
            That's an awesome crypto!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
};

export default CoinDetail;

