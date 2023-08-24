import React from 'react'
import "./Card.css"
import { Circle, MoreHorizontal } from 'react-feather'

const Card = ( props ) => {
  return (
    <div className='card'>
        <div className='card-top'>
            <p className='card-title'>{props.ticket.id}</p>
            <img src='profile.png' className='profile-pic' alt='profile-pic'/>
        </div>
        <div className='card-middle'>
            <p className='card-desc bold'>
                {props.ticket.title}
            </p>
        </div>
        <div className='card-bottom'>
            <div className='component-1 pointer'>
                <MoreHorizontal className='icon'/>
            </div>
            <div className='component-2 pointer'>
                <Circle  className='icon'/>
                <p>{props.ticket.tag[0]}</p>
            </div>
        </div>
    </div>
  )
}

export default Card