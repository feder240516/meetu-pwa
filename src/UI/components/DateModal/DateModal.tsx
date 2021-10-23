import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Input from '../Input/Input';
import colorTheme from '../../common/theme/theme';
import './DateModal.scss';



interface IProps {
  id: string;
  onChange?: (value: Date | null) => void;
}

const DateModal: React.FC<IProps> = ({ id, onChange }) => {
  const [value, setValue] = useState<Date | null>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
    if (onChange) { onChange(newValue); }
  };

  return (
    <ThemeProvider theme={colorTheme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <MobileDatePicker
          label="Date mobile"
          inputFormat="DD/MMM/YYYY"
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <>
              <Input
                id={id}
                icon="calendar today"
                otherProps={params.inputProps}
              />
            </>
          )}

        />

      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default DateModal;