import React from 'react';
import {Grid } from '@material-ui/core'
import FilterMenu from '../FilterMenu'
import CoinCard from '../CoinCard'
import {getCoinMarkets} from '../../api'

const INITIAL_STATE = {
  coins: [],
  vs_currency: 'eur',
  order: 'market_cap_desc',
  itemPerPage: '25',
  sparkline: false,
  page: '1',
  category: ''
}

class CoinList extends React.Component {
  constructor(props) {
    super(props)
    
    /* const [order, setOrder] = useState('market_cap_desc')
    const [category, setCategory] = useState('')
    const [itemPerPage, setItemPerPage] = useState('25')
 */
    this.state = {
      ...INITIAL_STATE
    }
  }

  getCoinDetail = (id) => {
    this.props.history.push(`/crypto-react/coins/${id}`)
  }

  fetchCoinMarket = async () => {
    const { vs_currency, order, itemPerPage, sparkline, page, category,} = this.state
    const params = {
      ...(category && {category}),
      ...(vs_currency && {vs_currency}),
      ...(itemPerPage && {itemPerPage}),
      ...(page && {page}),
      ...(order && {order}),
      ...(sparkline !== undefined && {sparkline})
    }
    const res = await getCoinMarkets(params)
    this.setState({coins: res.data})
  }

  componentDidMount() {
    this.fetchCoinMarket()
  }

  handleChange = (e) => {
    const {value, name} = e.target;
    this.setState(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  resetFilters = () => {
    this.setState(INITIAL_STATE, () => {
      this.fetchCoinMarket()
    })
  }


  render() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FilterMenu
            handleChange={this.handleChange} 
            order={this.state.order}
            category={this.state.category}
            itemPerPage={this.state.itemPerPage}
            fetchCoin={this.fetchCoinMarket}
            resetFilters={this.resetFilters}
            />
        </Grid>
        {
          this.state.coins.map( (coin)=> {
            return (
              <Grid item xs={12} md={6} lg={4}>
              <CoinCard  {...coin} key={coin.id} getCoinDetail ={this.getCoinDetail}/>
              </Grid>
            )
            
          })
        }
    </Grid>
    );
  }
};

export default CoinList;
