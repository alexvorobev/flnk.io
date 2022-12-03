import { Pane } from 'evergreen-ui';
import styled from 'styled-components';

export const RangePickerWrapper = styled(Pane)`
  display: flex;
  align-items: center;
  font-size: 12px;
  border: 1px solid #c2c4d6;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    border-color: #8f95b2;
    background-color: #fafbff;
  }

  .react-calendar {
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 0 1px rgb(67 90 111 / 30%), 0 8px 10px -4px rgb(67 90 111 / 47%);
  }

  .react-daterange-picker__wrapper {
    display: flex;
    font-size: 12px;
    gap: 8px;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    border: 0;
  }

  .react-daterange-picker__button {
    height: 100%;
    padding: 0;

    &:hover {
      color: #3366ff;
    }
  }

  .react-daterange-picker__inputGroup {
    display: flex;
  }

  .react-daterange-picker__inputGroup__input:invalid {
    background-color: inherit;
  }

  .react-daterange-picker__calendar-button {
    padding-right: 0;
  }

  .react-calendar__tile {
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    padding: 0;

    &:hover {
      background-color: #f9fafc;
      color: #3366ff;
    }
  }

  .react-calendar__tile--now {
    background-color: #52bd95 !important;
    color: #fff !important;

    &:hover {
      background-color: #52bd95 !important;
      color: #fff !important;
    }
  }

  .react-calendar__tile--hover {
    border-radius: 0px;
  }

  .react-calendar__tile--hoverStart,
  .react-calendar__tile--hoverStart:hover {
    background-color: #e6e6e6;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--hoverStart {
    border-radius: 4px 0 0 4px;
  }

  .react-calendar__tile--hoverEnd,
  .react-calendar__tile--hoverEnd:hover {
    background-color: #e6e6e6;
  }

  .react-calendar__tile--rangeEnd,
  .react-calendar__tile--hoverEnd {
    border-radius: 0 4px 4px 0;
  }

  .react-calendar__tile--rangeStart.react-calendar__tile--rangeEnd {
    border-radius: 4px;
  }

  .react-calendar__tile--active {
    background-color: #3366ff;
    color: #fff;
    border-radius: 0px;

    &:hover {
      background-color: #3366ff;
      color: #fff;

      abbr {
        color: inherit;
      }
    }
  }

  .react-daterange-picker__calendar {
    width: 296px;
  }
`;
