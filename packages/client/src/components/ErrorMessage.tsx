import { Typography, TypographyProps } from '@mui/material'

export interface ErrorMessageProps extends TypographyProps {
  text: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  return (
    <Typography color='error' variant='body1'>
      {text}
    </Typography>
  )
}

export default ErrorMessage
