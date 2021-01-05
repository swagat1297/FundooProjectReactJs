import React from "react";
import PhotoSizeSelectActualOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActualOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "../displayIcons/displayIcons.scss";
const NoteService = require("../../services/notes_service");

export default class DisplayIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      anchorE1color: null,
      color: null,
    };
    console.log(props);
  }
  handleClick = (event) => {
    
    console.log(event.currentTarget);
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget,
    });
  };

  handleClickColor = (event) => {
    console.log(event.currentTarget);
    this.setState({
      ...this.state,
      anchorE1color: event.currentTarget,
    });
  };

  deleteNote = () => {
    console.log("delete is calling");
    this.handleClose();
    

    let obj = {
      isDeleted: true,
      noteIdList: [this.props.note.id],
    };
    NoteService.trashNotes(obj)
      .then((res) => {
        this.props.getAllNotes();
        console.log(res, "node deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  colorNote = () => {
    console.log("delete is calling");
    this.handleClose();

    let obj = {
      color: this.state.color,
      noteIdList: [this.props.note.id],
    };
    NoteService.trashNotes(obj)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleColorChange = (value) =>{
    this.handleClose();
    console.log(value)
    this.setState({
      ...this.state,
      color: value,
    })
    this.colorNote();
  }
  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
      anchorE1color: null,
    });
  };
  render() {
    const cardcolor = {
      background: this.state.color,
    }
    return (
      <div className="options3">
        <div className="icons3">
          <div className="icon-option3">
            <AddAlertOutlinedIcon fontSize="small" />
          </div>
          <div className="icon-option3">
            <PersonAddOutlinedIcon fontSize="small" />
          </div>
          <div className="icon-option3">
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClickColor}
            >
              <ColorLensOutlinedIcon fontSize="small" />
            </IconButton>
          </div>
          <div className="icon-option3">
            <PhotoSizeSelectActualOutlinedIcon fontSize="small" />
          </div>
          <div className="icon-option3">
            <InboxIcon fontSize="small" />
          </div>
          <div className="icon-optiondelete3">
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
              // onClick={this.handleColorChange("#FFFFFF")}
              // name={note.noteIdList}
            >
              <MoreVertOutlinedIcon fontSize="small" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={(this.handleClose, this.deleteNote)}>
                delete
              </MenuItem>
            </Menu>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorE1color}
              keepMounted
              open={Boolean(this.state.anchorE1color)}
              onClose={this.handleClose}
            >
              {/* <MenuItem onClick={this.handleClose}> */}
                <div className="color-pallets" >
                  <div className="color-row">
                    <div className="white-pallet" onClick={()=> this.handleColorChange("#fffff")} ></div>
                    <div className="salmon-pallet"></div>
                    <div className="orange-pallet"></div>
                    <div className="yellow-pallet"></div>
                  </div>
                  <div className="color-row">
                    <div className="green-pallet"></div>
                    <div className="teal-pallet"></div>
                    <div className="blue-pallet"></div>
                    <div className="aqua-pallet"></div>
                  </div>
                  <div className="color-row">
                    <div className="purple-pallet"></div>
                    <div className="pink-pallet"></div>
                    <div className="red-pallet"></div>
                    <div className="gray-pallet"></div>
                  </div>
                </div>
              {/* </MenuItem> */}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}
