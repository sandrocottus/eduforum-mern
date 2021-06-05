import React, { Fragment, useState } from 'react'
import {
    Fab,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'

const CreatePost = ({ addPost }) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
        setTitle('')
        setText('')
    }
    const handleSubmit = () => {
        addPost({ title, text })
        handleClose()
    }
    return (
        <Fragment>
            <div style={addStyle}>
                <Fab
                    onClick={() => setOpen(true)}
                    size="medium"
                    color="primary"
                    aria-label="new_thread"
                >
                    <Add />
                </Fab>
            </div>
            <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
                <DialogTitle>New Thread</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="title"
                        label="Post Title"
                        variant="outlined"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="text"
                        label="Post Body"
                        multiline
                        rows={10}
                        variant="outlined"
                        onChange={e => setText(e.target.value)}
                        value={text}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        Sumbit
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const addStyle = {
  float: "right",
  margin: "13px",
};

CreatePost.propTypes = {
    addPost: PropTypes.func.isRequired
}
export default connect(null, { addPost })( CreatePost )