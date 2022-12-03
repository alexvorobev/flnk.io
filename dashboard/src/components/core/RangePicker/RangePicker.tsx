import { useState, useCallback, FC } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { BsCalendar, BsTrash } from 'react-icons/bs';

import { RangePickerWrapper } from './styles';

interface Props {
  value?: [Date, Date] | null;
  onChange?: (value: [Date, Date] | null | undefined) => void;
}

export const RangePicker: FC<Props> = ({ value, onChange }) => {
  const [datesRange, onChangeRange] = useState<[Date, Date] | null>();

  const handleRangeChange = useCallback(
    (range: [Date, Date] | string | Date | null) => {
      if (range === null) {
        onChangeRange(null);
        onChange?.(null);
      }

      if (typeof range === 'object' && Array.isArray(range)) {
        onChangeRange([...range]);
        onChange?.([...range]);
      }
    },
    [onChangeRange, onChange],
  );

  return (
    <RangePickerWrapper
      height={32}
      paddingX={16}
      borderWidth={1}
      color='grey800'
      borderColor='grey800'
      background='white'
      borderRadius={4}
    >
      <DateRangePicker
        calendarIcon={<BsCalendar color='inherit' />}
        clearIcon={<BsTrash color='inherit' />}
        onChange={handleRangeChange}
        value={value ?? datesRange ?? ''}
        openCalendarOnFocus
      />
    </RangePickerWrapper>
  );
};
