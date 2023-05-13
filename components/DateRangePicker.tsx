import * as React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

interface DateRangeProps {
    type: string;
    value: Dayjs | string;
    onChange: (val: string)  => void;

}

export default function DateRangePicker({type, value, onChange}: DateRangeProps) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileDatePicker
          label={type}
          value={value}
          onChange={(newValue: any) => {
              onChange(newValue);
          }}
          renderInput={(params: any) => <TextField {...params} />}
        />
        {/* <DesktopDatePicker
          label="For desktop"
          value={value}
          minDate={dayjs('2017-01-01')}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}
      </Stack>
    </LocalizationProvider>
  );
}