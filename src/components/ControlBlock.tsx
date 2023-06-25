import {memo, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hook/hook";
import {controlThunks} from "../reducers/controlReducer";
import {styled} from "styled-components";

export const ControlBlock = memo(() => {
    const control = useAppSelector((state) => state.control);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(controlThunks.getControlValues());
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Control>
            <div className='currentBlock'>
                <span>Цена</span>
                <div>{control.currentValue}</div>
                <span>руб./кВт*ч</span>
            </div>
            <div className='footerBlock'>
                <span>5 руб./кВт*ч</span>
                <span>План</span>
            </div>
        </Control>
    );
});

const Control = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  & span{
    //font-size: 40px;
    font-weight: 400;
  }
  .currentBlock{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 218px;
    font-size: 100px;
    font-weight: 400;
    div {
      margin: 0;
    }
    & span {
      margin-top: -30px;
      font-size: 30px;
      font-weight: 400;
    }
  }
  .footerBlock {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 50%;
    margin-top: 4px;
    background: #005FB8;
    div {
      margin: 0;
    }
    & span {
      font-size: 30px;
      font-weight: 300;
    }
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    width: 100%; /* добавить ширину */
  }
`;
