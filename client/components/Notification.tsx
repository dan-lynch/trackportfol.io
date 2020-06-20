import React from 'react'
import { Alert } from '@material-ui/lab'

export type Notification = {
  show: boolean
  message?: string
  type?: 'success' | 'info' | 'warning' | 'error'
}


export type Props = {
  message?: string
  type?: 'success' | 'info' | 'warning' | 'error'
  onClose?: any
}

export default function NotificationComponent(props: Props) {
  const { message, type, onClose } = props

  return (
    <Alert severity={type} onClose={onClose}>
      {message}
    </Alert>
  )
}
