import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import styled from 'styled-components'

const Title = styled.h1`
  font-family: Lato;
  font-weight: bold;
  font-size: 1.0em;
  text-align: left;
  color: black;
`

const DescriptionLink = styled.span`
  font-family: Lato;
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`

const DescriptionText = styled.span`
  font-family: Lato;
`
const DescriptionTextBold = DescriptionText.extend`
  font-weight: bold;
`

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
      <div>

        <DescriptionLink>
          <div> {this.state.manufacturer} </div>
        </DescriptionLink>
        <Title> 
          <h1> <span> {this.state.producttitle} </span> </h1> 
        </Title>


        <DescriptionText>
          <div> Price: {(this.state.ourprice).toFixed(2)} </div>
            <div> 
              <DescriptionLink>FREE Shipping </DescriptionLink>on orders over $25 —or get <DescriptionTextBold>FREE Two-Day Shipping </DescriptionTextBold>with <DescriptionLink>Sequoia Prime</DescriptionLink>
            </div>
        </DescriptionText>



        <div> {this.state.stockstatus} </div>
        <div> {this.state.soldby} </div>
        <DescriptionText>
          <div> {this.state.description} </div>
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