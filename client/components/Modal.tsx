import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

type Props = {
  open: boolean
  onClose: any
  title: string
  label: string
  titleId: string
  children: any
}

export default function Modal(props: Props) {
  const { open, onClose, title, label, titleId, children } = props
  const classes = useStyles()

  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={onClose}
      aria-labelledby={label}>
      <DialogTitle id={titleId}>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
