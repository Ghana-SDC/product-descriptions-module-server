import React from 'react'
import Enzyme from 'enzyme'
import { shallow, mount, render } from 'enzyme';
import App from '../App.jsx'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })


describe('App component', () => {
  
  it('should render the component', () => {
    expect(shallow(<App />).find('#parent-container').exists()).toBe(true)
  })

  it('should render the title', () => {
    expect(shallow(<App />).find('#title-container').exists()).toBe(true)
  })

  it('should render the manufacturer name', () => {
    expect(shallow(<App />).find('#manufacturer-container').exists()).toBe(true)
  })

  it('should render the price', () => {
    expect(shallow(<App />).find('#price-container').exists()).toBe(true)
  })

  it('should render the seller', () => {
    expect(shallow(<App />).find('#soldby-container').exists()).toBe(true)
  })

  it('should render the description', () => {
    expect(shallow(<App />).find('#description-container').exists()).toBe(true)
  })
})