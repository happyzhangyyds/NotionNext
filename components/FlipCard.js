import React, { useState } from 'react'

/**
 * 翻转组件
 * @param {*} props
 * @returns
 */
export default function FlipCard(props) {
  const [isFlipped, setIsFlipped] = useState(false)

  function handleCardFlip() {
    setIsFlipped(!isFlipped)
  }

  return (
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} >
            <div className={`flip-card-front ${props.className || ''}`} onMouseEnter={handleCardFlip}>
                {props.frontContent}
            </div>
            <div className={`flip-card-back ${props.className || ''}`} onMouseOut={handleCardFlip}>
                {props.backContent}
            </div>
            <style jsx>{`
          .flip-card {
            width: auto;
            height: auto;
            display: inline-block;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.2s;
          }
          
          .flip-card-front,
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
          }
          
          .flip-card-front {
            z-index: 2;
            transform: rotateY(0);
            background-color: #f1f1f1;
          }
          
          .flip-card-back {
            transform: rotateY(180deg);
            background-color: #888;
          }
          
          .flip-card.flipped {
            transform: rotateY(180deg);
          }
        `}</style>
        </div>
  )
}
