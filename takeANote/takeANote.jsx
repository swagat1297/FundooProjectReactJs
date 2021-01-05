import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import BrushOutlinedIcon from "@material-ui/icons/BrushOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import "../takeANote/takeANote.scss";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import Button from "@material-ui/core/Button";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import RoomIcon from "@material-ui/icons/Room";
import pinIcon from '../../asset/image/push_pin-black-18dp.svg';
const NoteService = require('../../services/notes_service')


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  }, 
}));

export default function LayoutTextFields(props) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  let isValid;
  const onSubmit = (e) => {
    e.preventDefault();
    setIsOpen(true)

    let isValid = dashboardValidation();
    if (isValid) {
      let obj = {
        service: "advance",
        title: title,
        description: notes
      };
      NoteService
        .addnotes(obj)
        .then((res) => {
          //need to call getallnote api
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const dashboardValidation = () => {
    isValid = true;
    if (title.trim().length == 0) {
      isValid = false;
    }
    if (notes.trim().length == 0) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className={classes.root}>
      <StylesProvider>
        {isOpen ? (
          <div className="outer-container">
            <div onClick={(e) => setIsOpen(false)} className="input-title">
              <div>
                {" "}
                <InputBase
                  className={(classes.input, "searchbar")}
                  placeholder="Take a note.."
                  inputProps={{ "aria-label": "Take note" }}
                />
              </div>
              <div className="options">
                <div>
                  <CheckBoxOutlinedIcon />
                </div>
                <div className="brush-option">
                  <BrushOutlinedIcon />
                </div>
                <div>
                  <PhotoSizeSelectActualOutlinedIcon />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="outer-container2">
            <div className="input-titl2">
              <div className="text-fields">
                {" "}
                <div className="title">
                  {" "}
                  <InputBase
                    className={(classes.input, "title")}
                    placeholder="Title"
                    inputProps={{ "aria-label": "Title" }}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <img src={pinIcon} />
                  {/* <RoomIcon/> */}
                </div>
                <div>
                  <InputBase
                    className={(classes.input, "searchbar")}
                    placeholder="Take a note.."
                    inputProps={{ "aria-label": "Take note" }}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="options2">
                <div className="icons">
                  <div className="icon-option">
                    <AddAlertOutlinedIcon fontSize="small" />
                  </div>
                  <div className="icon-option">
                    <PersonAddOutlinedIcon fontSize="small" />
                  </div>
                  <div className="icon-option">
                    <ColorLensOutlinedIcon fontSize="small" />
                  </div>
                  <div className="icon-option">
                    <PhotoSizeSelectActualOutlinedIcon fontSize="small" />
                  </div>
                  <div className="icon-option">
                    <InboxIcon fontSize="small" />
                  </div>
                  <div className="icon-option">
                    <MoreVertOutlinedIcon fontSize="small" />
                  </div>
                </div>

                <div className="close-button">
                  {" "}
                  <Button onClick={(e) => onSubmit(e)} fontSize="small">
                    close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </StylesProvider>
    </div>
  );
}
