import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputBase from "@material-ui/core/InputBase";
import DisplayIcons from "../displayIcons/displayIcons";
import "../updateKeep/updateKeep.scss";
const NoteService = require("../../services/notes_service");
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function UpdateNote(props) {
  const [title, setTitle] = useState(props.note.title);
  const [notes, setNotes] = useState(props.note.description);
  // setTitle(props.note.title);

  const handleClose = () => {
    props.closeDialog();
    updateNotes();
  };
  const updateNotes = ()=> {
    props.getAllNotes();
    let obj = {
      service: "advance",
      title: title,
      description: notes,
      noteId: props.note.id,
    };
    NoteService.updateNotes(obj)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
      ;
  }

  return (
    <div>
      <Dialog
        className="dialogBox"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.updateValue}
      >
        <DialogContent dividers>
          <div className="title" onChange={(e) => setTitle(e.target.value)}>
            <InputBase
            value={title}
              // placeholder= {props.note.title}
              inputProps={{ "aria-label": "Title" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <InputBase
              placeholder={props.note.description}
              inputProps={{ "aria-label": "Take note" }}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <DisplayIcons />
          <Button autoFocus onClick={handleClose} >
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
