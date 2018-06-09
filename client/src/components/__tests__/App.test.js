import React from 'react'
import Enzyme from 'enzyme'
import { shallow, mount, render } from 'enzyme';
import App from '../App.jsx'
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() })


describe('App component', () => {
  
  it('should render the component', () => {
    expect(shallow(<App />).find('#parent-container').exists()).toBe(true)
  })

  it('renders matching the last snapshot', () => {
    const tree = renderer
      .create(<App />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

})