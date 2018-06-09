import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import styled from 'styled-components'

import {StockStatus, InStock, OutOfStock} from './StockStatus.jsx'

const Title = styled.h1`
  font-family: Lato;
  font-weight: bold;
  font-size: 1.0em;
  text-align: left;
  color: black;
`

export const DescriptionLink = styled.span`
  font-family: Lato;
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`

const DescriptionText = styled.span`
  font-family: Lato;
`
export const DescriptionTextBold = DescriptionText.extend`
  font-weight: bold;
`

//minimum width of whole component is 250 pixels
//does not appear to be a maximum width

//out of stock
// Temporarily out of stock. 
// Order now and we'll deliver when available. 
// We'll e-mail you with an estimated delivery date as
//  soon as we have more information. Your account will 
//  only be charged when we ship the item.


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      producttitle: '',
      manufacturer: '',
      listprice: 0,
      ourprice: 0,
      stockstatus: true,
      soldby: '',
      description: '',
      category: ''
    }
    this.fetchProductDescription = this.fetchProductDescription.bind(this)
  }

  fetchProductDescription (product) {
    let context = this
    axios.get('/api/description/Regency%20Edition%20Leather%20Loveseat')
      .then(function (response) {
        console.log('RESPONSE FROM AXIOS GET FRONT END: ', response.data)
        let itemInfo = response.data
        context.setState({
          id: itemInfo.id,
          producttitle: itemInfo.ProductTitle,
          manufacturer: itemInfo.Manufacturer,
          listprice: itemInfo.ListPrice,
          ourprice: itemInfo.OurPrice,
          stockstatus: itemInfo.StockStatus,
          soldby: itemInfo.SoldBy,
          description: itemInfo.Description,
          category: itemInfo.Category
        })
      })
      .catch(function (error) {
        console.log('ERROR IN AXIOS GET FRONT END: ', error)
      })
  }

  render () {
    return (
      <div id='parent-container'>

        <DescriptionLink>
          <div id='manufacturer-container'> {this.state.manufacturer} </div>
        </DescriptionLink>
        <Title> 
          <h1> <span id='title-container'> {this.state.producttitle} </span> </h1> 
        </Title>


        <DescriptionText>
          <div id='price-container'> Price: {(this.state.ourprice).toFixed(2)} </div>
            <div> 
              <DescriptionLink>FREE Shipping </DescriptionLink>on orders over $25 —or get <DescriptionTextBold>FREE Two-Day Shipping </DescriptionTextBold>with <DescriptionLink>Sequoia Prime</DescriptionLink>
            </div>
        </DescriptionText>

        <DescriptionText>
          <StockStatus stockStatus={this.state.stockstatus}/>
        </DescriptionText>

        <DescriptionText>
          <div id='soldby-container'> Ships from and sold by {this.state.soldby}. Gift wrap available. </div>

          <div id='description-container'> {this.state.description} </div>
        </DescriptionText>
        
        <button onClick={ this.fetchProductDescription } > Clicky </button>

      </div>
    )
  }

}

//GET /api/description/:PRODUCTNAME
//add a PUT route - e.g. if sellers want to update descriptions, not necessary on front end tho

//onComponentDidMount - fetch data
//axios call to the server
//server connects to the DB


export default App