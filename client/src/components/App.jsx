import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import styled from 'styled-components'

import {StockStatus, InStock} from './StockStatus.jsx'

const WidthWrapper = styled.div`
  min-width: 250px;
`

const Title = styled.h1`
  font-family: Lato;
  text-align: left;
  font-size: 21px;
  font-weight: 700;
  color: black;
  color: rgb(17, 17, 17);
  display: inline;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
`

const DescriptionText = styled.span`
  color: #111;
  font-family: Lato;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`

const DescriptionTextBox = styled.div`
  margin-top: 14px;
  color: #111;
  font-family: Lato;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
`

const MarginTopDescriptionText = DescriptionText.extend`
  margin-top: 22px;
`

export const DescriptionLink = DescriptionText.extend`
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`

const RedPrice = DescriptionText.extend`
  margin-top: 22px;
  color: #B12704;
  font-size: 17px;
  line-height: 1.255;
`

const ShippingDescriptionText = styled.div`
  font-family: Lato;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: #111;
  margin-left: 41px;
`

export const InStockText = styled.div`
font-family: Lato;
font-size: 17px;
font-weight: 400;
  margin-top: 14px;
  color: #008a00
`

export const DescriptionTextBold = DescriptionText.extend`
  font-weight: bold;
`

export const OutOfStockText = DescriptionText.extend`
  font-size: 1.25em;
  color: orange;
`

const PrimeText = DescriptionText.extend`
  color: rgb(20, 184, 229);
  font-size: 15px;
`

const LineBreak = styled.hr`
  background-color: transparent;
  display: block;
  height: 1px;
  border-width: 0;
  border-top: 1px solid #e7e7e7;
  line-height: 19px;
  margin-top: 18;
  margin-bottom: 14px;
`

const Check = styled.div`
  color: orange;
  display: inline;
  margin: none;
  font-size; 15px;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      product_title: '',
      manufacturer: '',
      list_price: 0,
      our_price: 0,
      stock_status: true,
      sold_by: '',
      description: '',
      category: ''
    }
    this.fetchProductDescription = this.fetchProductDescription.bind(this)
    this.checkProductInput = this.checkProductInput.bind(this)
  }

  componentDidMount() {
    let testValue = 1
    this.checkProductInput(testValue)
    console.log('server 1')
  }

  checkProductInput(product) {
    if (typeof product === 'string') {
      let stringEndPoint = "api/description/name/"
      this.fetchProductDescription(stringEndPoint, product)
    }
    if (typeof product === 'number') {
      let numberEndPoint = "api/description/id/"
      this.fetchProductDescription(numberEndPoint, product)
    }
  }

  fetchProductDescription (endpoint, product) {
    // console.log('w/ new')
    let context = this
    // console.log('outside axios')
    // console.log('endpoint+product-', endpoint+product)
    axios.get(endpoint + product)
      .then(function (response) {
        console.log('RESPONSE FROM AXIOS GET FRONT END: ', response.data)

        if (!response.data.product_title) {
          console.log('Returned no products')
        }

        let itemInfo = response.data
        context.setState({
          id: itemInfo.id,
          product_title: itemInfo.product_title,
          manufacturer: itemInfo.manufacturer,
          list_price: itemInfo.list_price,
          our_price: Number(itemInfo.our_price),
          stock_status: itemInfo.stock_status,
          sold_by: itemInfo.sold_by,
          description: itemInfo.description,
          category: itemInfo.category
        })
      })
      .catch(function (error) {
        console.log('ERROR IN AXIOS GET FRONT END: ', error)
      })
  }

  render () {
    return (
      <WidthWrapper id='parent-container'>

        <DescriptionLink>
          <div id='manufacturer-container'> {this.state.manufacturer} </div>
        </DescriptionLink>
        <Title> 
          <span id='title-container'> {this.state.product_title} </span>
        </Title>
        <LineBreak />


          <div id='price-container'> <DescriptionText> Price: </DescriptionText> <RedPrice> ${(this.state.our_price).toFixed(2)} </RedPrice> <span>   <Check><i class="fas fa-check"></i></Check></span><PrimeText>prime</PrimeText> </div>
            <div>
              <ShippingDescriptionText>
                <DescriptionLink>FREE Shipping </DescriptionLink>on orders over $25 —or get <DescriptionTextBold>FREE Two-Day Shipping </DescriptionTextBold>with <DescriptionLink>Sequoia Prime</DescriptionLink>
              </ShippingDescriptionText>
            </div>

        <DescriptionText>
          <StockStatus stockstatus={this.state.stock_status}/>
        </DescriptionText>

        <MarginTopDescriptionText>
          <div id='soldby-container'> Ships from and sold by {this.state.sold_by}. Gift wrap available. </div>
        </MarginTopDescriptionText>
        <DescriptionTextBox>
          <div id='description-container'> {this.state.description} </div>
        </DescriptionTextBox>
        <LineBreak />

      </WidthWrapper>
    )
  }

}

export default App