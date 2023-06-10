import {isValidPhoneNumber} from 'react-phone-number-input'

export const validatePhoneNumber = (value: string) => {
  if (!value) {
    return 'This is required.'
  }

  // Your phone number validation logic here
  if (!isValidPhoneNumber(value)) {
    return 'Phone Number is not valid, check country code'
  }

  return true
}
