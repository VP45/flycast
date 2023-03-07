import styled from 'styled-components';
import Paris from '../assets/destinations/paris.jpg'
import Cairo from '../assets/destinations/cairo.jpg'
import NewYork from '../assets/destinations/newyork.jpg'
import Cancun from '../assets/destinations/cancun.jpg'
import HongKong from '../assets/destinations/hongkong.jpg'


const imgDict = {
    'paris.jpg': Paris.src,
    'cairo.jpg': Cairo.src,
    'newyork.jpg': NewYork.src,
    'cancun.jpg': Cancun.src,
    'hongkong.jpg': HongKong.src,
}
export const CardsContainer = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 1500px;
  display: flex;
  padding-bottom: 100px;

  @media only screen and (max-width: 992px){
    padding-bottom: 40px;
    margin-bottom: -40px;
    padding-top: 20px;
    margin-top: 30px;
    overflow-y: auto;
    overflow-x: scroll;
    white-space: nowrap;

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`
export const CardSpacer = styled.div`
  margin: 8px;
  width: 20%;
  height: 480px;

  transform: translateY(${props => props.offset}px);

  @media only screen and (max-width: 992px){
    padding: 0 8px;
    margin: 0;
    flex-shrink: 0;
    width: 250px;
    height: 400px;
    transform: none;
    box-sizing: content-box;

    &:first-child{
      padding-left: 16px;
    }

    &:last-child{
      padding-right: 16px;
    }
  }
`

export const Card = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-image: ${props => props.image ? `url(${imgDict[props.image]})` : `url(https://source.unsplash.com/random/600×900/?beach)`};

  background-size: cover;
  background-position: center;

  border-radius: 8px;
  transition: all 0.3s ease;

  &>h4{
    text-align: center;
    font-size: 42px;
    font-weight: 700;
    color: #fff;
    transition: opacity 0.3s ease;
  }

  &:hover{
    box-shadow: rgba(79, 90, 109, 0.3) 0px 5px 25px 0px;

    h4{
      opacity: 0.65;
    }
  }
`