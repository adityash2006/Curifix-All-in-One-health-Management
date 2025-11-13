import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="ball">
          <div className="inner">
            <div className="line" />
            <div className="line line--two" />
            <div className="oval" />
            <div className="oval oval--two" />
          </div>
        </div>
        <div className="shadow" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes rotateBall {
    0% {
      transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
    }
    50% {
      transform: rotateY(360deg) rotateX(360deg) rotateZ(0deg);
    }
    100% {
      transform: rotateY(720deg) rotateX(720deg) rotateZ(360deg);
    }
  }

  @keyframes bounceBall {
    0% {
      transform: translateY(-70px) scale(1, 1);
    }
    15% {
      transform: translateY(-56px) scale(1, 1);
    }
    45% {
      transform: translateY(70px) scale(1, 1);
    }
    50% {
      transform: translateY(73.5px) scale(1, 0.92);
    }
    55% {
      transform: translateY(70px) scale(1, 0.95);
    }
    85% {
      transform: translateY(-56px) scale(1, 1);
    }
    95% {
      transform: translateY(-70px) scale(1, 1);
    }
    100% {
      transform: translateY(-70px) scale(1, 1);
    }
  }

  .ball {
    animation-name: bounceBall;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    border-radius: 50%;
    height: 60px;
    position: relative;
    transform: translateY(-70px);
    transform-style: preserve-3d;
    width: 60px;
    z-index: 1;
  }

  .ball::before {
    background: radial-gradient(circle at 36px 20px, #ff8c16, #b35100);
    border: 2px solid #333333;
    border-radius: 50%;
    content: "";
    height: calc(100% + 6px);
    left: -6px;
    position: absolute;
    top: -3px;
    transform: translateZ(1vmin);
    width: calc(100% + 6px);
  }

  .ball .inner {
    animation-name: rotateBall;
    animation-duration: 25s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    border-radius: 50%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    width: 100%;
  }

  .ball .line::before,
  .ball .line::after {
    border: 2px solid #333333;
    border-radius: 50%;
    content: "";
    height: 99%;
    position: absolute;
    width: 99%;
  }

  .ball .line::before {
    transform: rotate3d(0, 0, 0, 0);
  }

  .ball .line::after {
    transform: rotate3d(1, 0, 0, 90deg);
  }

  .ball .line--two::before {
    transform: rotate3d(0, 0, 0, 2deg);
  }

  .ball .line--two::after {
    transform: rotate3d(1, 0, 0, 88deg);
  }

  .ball .oval::before,
  .ball .oval::after {
    border-top: 4px solid #333333;
    border-radius: 50%;
    content: "";
    height: 99%;
    position: absolute;
    width: 99%;
  }

  .ball .oval::before {
    transform: rotate3d(1, 0, 0, 45deg) translate3d(0, 0, 6px);
  }

  .ball .oval::after {
    transform: rotate3d(1, 0, 0, -45deg) translate3d(0, 0, -6px);
  }

  .ball .oval--two::before {
    transform: rotate3d(1, 0, 0, 135deg) translate3d(0, 0, -6px);
  }

  .ball .oval--two::after {
    transform: rotate3d(1, 0, 0, -135deg) translate3d(0, 0, 6px);
  }

  @keyframes bounceShadow {
    0% {
      filter: blur(3px);
      opacity: 0.6;
      transform: translateY(73px) scale(0.5, 0.5);
    }
    45% {
      filter: blur(1px);
      opacity: 0.9;
      transform: translateY(73px) scale(1, 1);
    }
    55% {
      filter: blur(1px);
      opacity: 0.9;
      transform: translateY(73px) scale(1, 1);
    }
    100% {
      filter: blur(3px);
      opacity: 0.6;
      transform: translateY(73px) scale(0.5, 0.5);
    }
  }

  .shadow {
    animation-name: bounceShadow;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    background: black;
    filter: blur(2px);
    border-radius: 50%;
    height: 6px;
    transform: translateY(73px);
    width: 54px;
  }`;

export default Loader;
