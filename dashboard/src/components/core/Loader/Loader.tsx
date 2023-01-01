import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  /**
   * Size of the loader
   * @default 32
   * */
  size?: number;
}

const DEFAULT_SIZE = 32;
const SPINNER_RATIO = 10;

const Wrapper = styled.div<Required<Props>>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  box-sizing: border-box;
  animation: loader-wrapper-animation 3s linear infinite;

  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
    animation: loader-container-animation 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: ${({ size }) => size}px;
      width: ${({ size }) => size}px;
      border: ${({ size }) => size / SPINNER_RATIO}px solid transparent;
      border-top: ${({ size }) => size / SPINNER_RATIO}px solid #3366ff;
      border-radius: 50%;
      box-sizing: border-box;
      z-index: 1;
      animation: loader-spinner-animation 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: ${({ size }) => size}px;
      width: ${({ size }) => size}px;
      box-sizing: border-box;
      border: ${({ size }) => size / SPINNER_RATIO}px solid #85a3ff;
      border-radius: 50%;
    }
  }

  @keyframes loader-wrapper-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loader-container-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loader-spinner-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader: FC<Props> = ({ size = DEFAULT_SIZE }) => {
  return (
    <Wrapper size={size}>
      <span />
    </Wrapper>
  );
};
