import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import {DescriptionTextBold, DescriptionLink} from './App.jsx'

export function StockStatus (props) {
  console.log('props in stockstatus', props)
  if (props.stockStatus === true) {
    return <InStock />
  } else {
    return <OutOfStock />
  }
}

export function InStock() {
  let time = new Date(Date.now())
  let hours = time.getHours()
  let minutes = 60 - time.getMinutes()

  let date = new Date();
  let dd = date.getDate() + 2;
  let weekDay = date.getDay() + 2;
  let mm = date.getMonth();

  if (hours => 12) {
    hours = hours - 12
    dd = dd + 1
    weekDay = weekDay + 1
  }

  let timeTil = 24 - hours

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
    return <div>Want it {weekDay + ' ' + mm + ' ' + dd}? Order now and choose Two-Day Shipping at checkout.</div>
  }
  else if (hours === 0) {
    return <div>Want it {weekDay + ' ' + mm + ' ' + dd}? Order within {minutes} minutes and choose Two-Day Shipping at checkout.</div>
  }
  else if (minutes === 0) {
    return <div>Want it {weekDay + ' ' + mm + ' ' + dd}? Order within {timeTil} hours and choose Two-Day Shipping at checkout.</div>
  }
  else if (hours === 1 && minutes === 1) {
    return <div>Want it {weekDay + ' ' + mm + ' ' + dd}? Order within {timeTil} hour and {minutes} minute and choose Two-Day Shipping at checkout.</div>
  }
  else if (hours === 1) {
    return <div>Want it {weekDay + ' ' + mm + ' ' + dd}? Order within {minutes} minute and choose Two-Day Shipping at checkout.</div>
  }
  else if (minutes === 1) {
    return <div>Want it {weekDay + ' ' + mm + ' ' + dd}? Order within {timeTil} hour and choose Two-Day Shipping at checkout.</div>
  } 
  else { 
    return <div> <DescriptionTextBold> Want it {weekDay + ' ' + mm + ' ' + dd}? </DescriptionTextBold> Order within {timeTil} hours and {minutes} minutes and choose <DescriptionTextBold>Two-Day Shipping</DescriptionTextBold> at checkout. <DescriptionLink>Details</DescriptionLink> </div>
  }
}

export function OutOfStock() {
  return 'Temporarily out of stock. Order now and we\'ll deliver when available. We\'ll e-mail you with an estimated delivery date as soon as we have more information. Your account will only be charged when we ship the item.'
}