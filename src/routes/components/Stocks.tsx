import * as React from 'react'
import { Dispatch, bindActionCreators, Action } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RouteConfig } from 'react-router-config'
import { StocksPage } from '../../pages/StocksPage'
import { Restaurants, IRestaurant } from '../../api/restaurants'
import { Stocks, IQuery as IStocksQuery, IStock } from '../../api/stocks'
import { IState } from '../../reducer'
import { IData as IRestaurants } from '../../modules/restaurants'
import { fetchStocks, fetchStocksReceive, resetStocks } from '../../modules/stocks'
import { IRouteContext } from '../'

export interface IProps extends RouteComponentProps<void> {
  route?: RouteConfig;
  stocks: IRestaurants;
  loaded: boolean;
  fetchStocks: Function;
  resetStocks: Function;
}

export class StocksRoute extends React.Component<IProps> {
  public static getInitialAction = async ({ req, query }: IRouteContext) => {
    const _req: any = req
    const token: string = _req.universalCookies.get('__t')

    const stocks: IStock[] | Error = await Stocks.getList(query as IStocksQuery, token).catch((error: Error) => error)

    if (stocks instanceof Error) {
      const error = stocks
      return fetchStocksReceive(error as Error)
    }

    const id: string = stocks.map((s: IStock) => s.restaurant_id).join(',')
    const restaurants: IRestaurant[] | Error = await Restaurants.getList({ id }).catch((error: Error) => error)

    return fetchStocksReceive(restaurants)
  }

  componentDidMount(): void {
    if (this.props.loaded === false) {
      this.props.fetchStocks()
      
    }
  }

  componentWillUnmount(): void {
    if (this.props.loaded === false) {
      this.props.resetStocks()
    }
  }

  render(): JSX.Element {
    return (
      <StocksPage
        stocks={this.props.stocks}
        stocksLoaded={this.props.loaded}
      />
    )
  }
}

export default connect(
  (state: IState) => ({
    stocks: state.stocks.data as IRestaurants,
    loaded: state.stocks.loaded,
  }),
  (dispatch: Dispatch) => bindActionCreators({
    fetchStocks,
    resetStocks,
  }, dispatch)
)(StocksRoute)
