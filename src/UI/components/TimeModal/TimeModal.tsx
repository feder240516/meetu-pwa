import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { useState } from 'react';
import Input from '../Input/Input';
import './TimeModal.scss';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import { ThemeProvider } from '@mui/material/styles'
import colorTheme from '../../common/theme/theme';

interface IProps {
  id: string;
  onChange?: (value: Date | null) => void;
}

const TimeModal: React.FC<IProps> = ({ id, onChange }) => {
  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    if (onChange) { onChange(newValue); }
  };

  return (
    <ThemeProvider theme={colorTheme}>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <MobileTimePicker
        label="Time mobile"
        inputFormat="hh:mm a"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <>
            <Input
              id={id}
              icon="schedule"
              otherProps={params.inputProps}
            />
          </>
        )}
      />
    </LocalizationProvider>
    </ThemeProvider>
  )
}

export default TimeModal;