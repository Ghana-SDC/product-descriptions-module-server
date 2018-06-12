import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import {DescriptionTextBold, DescriptionLink, OutOfStockText, InStockText} from './App.jsx'

export function StockStatus (props) {
  console.log('props in stockstatus', props)
  if (props.stockStatus === true) {
    return <InStock />
  } else {
    return <OutOfStock />
  }
}

export function InStock() {
  let date = new Date(Date.now());
  let dd = date.getDate() + 2;
  let weekDay = date.getDay() + 2;
  let mm = date.getMonth();
    //edge case

  let hours = date.getHours()
  console.log('1st hours', hours)
  let minutes = 60 - date.getMinutes()

  if (minutes === 60) {
      minutes = 0
    } else {
      hours = hours + 1
    }

  let timeTil;

  if (hours > 14) {
    dd = dd + 1
    weekDay = weekDay + 1
    timeTil = (-1 * (hours - 24)) + 2 + 12
  } else {
    timeTil = 14 - hours
  }

  if (weekDay > 6) {
    weekDay = weekDay - 7
  }

  if (weekDay === 0) { weekDay = 'Sunday'}
  if (weekDay === 1) { weekDay = 'Monday'}
  if (weekDay === 2) { weekDay = 'Tuesday'}
  if (weekDay === 3) { weekDay = 'Wednesday'}
  if (weekDay === 4) { weekDay = 'Thursday'}
  if (weekDay === 5) { weekDay = 'Friday'}
  if (weekDay === 6) { weekDay = 'Saturday'}

  if (mm === 0) { mm = 'January'}
  if (mm === 1) { mm = 'February'}
  if (mm === 2) { mm = 'March'}
  if (mm === 3) { mm = 'April'}
  if (mm === 4) { mm = 'May'}
  if (mm === 5) { mm = 'June'}
  if (mm === 6) { mm = 'July'}
  if (mm === 7) { mm = 'August'}
  if (mm === 8) { mm = 'September'}
  if (mm === 9) { mm = 'October'}
  if (mm === 10) { mm = 'November'}
  if (mm === 11) { mm = 'December'}

  if (hours === 0 && minutes === 0) {
    return <div> <div> <InStockText>In Stock.</InStockText> </div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order now and choose <DescriptionTextBold>Two-Day Shipping </DescriptionTextBold>at checkout.</div>
  }
  else if (hours === 0) {
    return <div> <div> <InStockText>In Stock.</InStockText> </div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order within {minutes} minutes and choose <DescriptionTextBold>Two-Day Shipping </DescriptionTextBold>at checkout. <DescriptionLink>Details</DescriptionLink></div>
  }
  else if (minutes === 0) {
    return <div> <div> <InStockText>In Stock.</InStockText> </div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order within {timeTil} hours and choose <DescriptionTextBold>Two-Day Shipping </DescriptionTextBold>at checkout. <DescriptionLink>Details</DescriptionLink></div>
  }
  else if (hours === 1 && minutes === 1) {
    return <div> <div> <InStockText>In Stock.</InStockText> </div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order within {timeTil} hour and {minutes} minute and choose <DescriptionTextBold>Two-Day Shipping </DescriptionTextBold>at checkout. <DescriptionLink>Details</DescriptionLink></div>
  }
  else if (hours === 1) {
    return <div> <div> <InStockText>In Stock.</InStockText> </div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order within {timeTil} hour and {minutes} minutes and choose <DescriptionTextBold>Two-Day Shipping </DescriptionTextBold>at checkout. <DescriptionLink>Details</DescriptionLink></div>
  }
  else if (minutes === 1) {
    return <div> <div> <InStockText>In Stock.</InStockText> </div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order within {timeTil} hour and choose <DescriptionTextBold>Two-Day Shipping </DescriptionTextBold>at checkout. <DescriptionLink>Details</DescriptionLink></div>
  } 
  else { 
    return <div> <div> <InStockText>In Stock.</InStockText> </div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order within {timeTil} hours and {minutes} minutes and choose <DescriptionTextBold>Two-Day Shipping</DescriptionTextBold> at checkout. <DescriptionLink>Details</DescriptionLink> </div>
  }
}

export function OutOfStock() {
  return <div> <OutOfStockText>Temporarily out of stock.</OutOfStockText> Order now and we\'ll deliver when available. We\'ll e-mail you with an estimated delivery date as soon as we have more information. Your account will only be charged when we ship the item. </div>
}