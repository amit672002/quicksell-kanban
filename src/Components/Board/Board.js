import React from 'react'
import "./Board.css"
import { CheckCircle, Circle, Loader, MoreHorizontal, Plus, TrendingUp, XCircle } from 'react-feather'

import Card from '../Card/Card'

const Board = ( props ) => {

    const logoReference = {
        "Backlog": <Loader className='icon'/>,
        "Todo": <Circle className='icon'/>,
        "In progress": <TrendingUp className='icon'/>,
        "Done": <CheckCircle className='icon'/>,
        "Cancelled": <XCircle className='icon'/>
    }

  return (
    <div className='board'>
        <div className='board-top'>
            <div className='board-top-left'>
                {props.groupingOption === "status" && logoReference[props.title]}
                <p className='board-title bold'>{props.title}</p>
                <span className='board-count'>{props.count}</span>
            </div>
            <div className='board-top-right'>
                <MoreHorizontal className='icon'/>
                <Plus className='icon'/>
            </div>
        </div>
        <div className='card-container'>
            {props.tickets.map((ticket) => (
                <Card ticket={ticket}/>
            ))}
        </div>
    </div>
  )
}

export default Board