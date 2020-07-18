import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  )
}
