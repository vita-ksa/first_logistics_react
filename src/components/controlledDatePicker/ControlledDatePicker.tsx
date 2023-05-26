import React, { useRef } from 'react'
import DatePicker from "react-datepicker";
import { useController } from 'react-hook-form';
import { Container, Text } from './theme';
import moment from 'moment'
import { DatePickerCustomInput } from './DatePickerCustomInput';
import "react-datepicker/dist/react-datepicker.css";

export const ControlledDatePicker = ({ control, name, minDate, text, readOutside = false }: any) => {
  const { field, fieldState, formState } = useController({
    control,
    name,
  });

  const inputRef = useRef(null);

  return (
    <Container className="d-flex align-items-end w-100">
      {text && <Text>{text}</Text>}
      <DatePicker
        selected={field?.value}
        onChange={(value: any) => {
          const isValidDate = moment(value).isValid();
          if (isValidDate) {
            field.onChange(value);
          }
        }}
        selectsStart
        minDate={minDate}
        customInput={<DatePickerCustomInput ref={inputRef} {...{ fieldState, formState, name, readOutside }} />}
      />
    </Container >
  );
}

