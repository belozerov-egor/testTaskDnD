import {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hook/hook";
import {controlThunks} from "../reducers/controlReducer";
import {styled} from "styled-components";

export const ControlBlock = memo(() => {
    const control = useAppSelector((state) => state.control);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(controlThunks.getControlValues());
        const interval = setInterval(() => {
            dispatch(controlThunks.getControlValues());
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Control currentValue={control.currentValue} max={control.maxValue} min={control.minValue}>
            <CurrentBlock>
                <span className="price">Цена</span>
                <div>{control.currentValue}</div>
                <span>руб./кВт*ч</span>
            </CurrentBlock>
            <div className='footerBlock'>
                <span>5 руб./кВт*ч</span>
                <span>План</span>
            </div>
        </Control>
    );
});
type ControlBlockType = {
    currentValue: number
    min: number
    max: number
}
const Control = styled.div<ControlBlockType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  height: 400px;
  background-color: ${(props) => props.currentValue <= props.min
          ? 'red'
          : props.currentValue <= 4.5
                  ? 'orange'
                  : props.currentValue >= props.max
                          ? 'limegreen'
                          : '#FFF'};
  border-radius: 50%;
  overflow: hidden;
  @media (max-width: 850px) {
    width: 300px;
    height: 300px;
  }

  .price {
    color: #005FB8;
  }

  & span {
    font-weight: 400;
  }

  .footerBlock {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background: #005fb8;
    color: #FFFFFF;
    font-size: 30px;
    width: 100%;
    height: 100px;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    @media (max-width: 850px) {
      height: 70px;
      font-size: 20px;
    }
  }

`;


const CurrentBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-top: 60px;

  div {
    margin-top: -20px;
    margin-bottom: -30px;
    font-size: 90px;
    font-weight: 400;
    @media (max-width: 850px) {
      font-size: 75px;
    }
  }

  & span {
    font-size: 35px;
    font-weight: 400;
    @media (max-width: 850px) {
      font-size: 20px;
    }
  }

`
