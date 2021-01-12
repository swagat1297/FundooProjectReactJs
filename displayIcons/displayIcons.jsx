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
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const NoteService = require("../../services/notes_service");

export default class DisplayIcons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: this.props.note.isArchived,
      anchorEl: null,
      anchorE1color: null,
      color: null,
      showTrashIcon: false,
      delete: this.props.note.isDeleted,
    };
  }
  componentDidMount(){
    console.log(this.props.showIconsTrash);
  }
  
  handleClickSetArchive = () => {
    console.log(this.state.archive);
    this.setState(
      {
        ...this.state,
        archive: !this.state.archive,
      },
      () => {
        console.log(this.state);
        this.archivedNote(this.state);
      }
    );
  };
  archivedNote = (value) => {
    console.log(value.archive, "Archive value");
    let obj = {
      isArchived: value.archive,
      noteIdList: [this.props.note.id],
    };
    NoteService.archiveNotes(obj)
      .then((res) => {
        // window.location.reload(false);
        this.props.getAllNotes();
        this.props.getArchiveNotes();
        console.log(res, "node deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
  restoreDeleteNote = () =>{
    this.setState(
      {
        ...this.state,
        delete: !this.state.delete,
      },
      () => {
        console.log(this.state);
        this.deleteNote(this.state);
      }
    );
  }
  deleteNote = (value) => {
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

  DeleteforeverNote = () => {
    let obj = {
      noteIdList: [this.props.note.id],
    };
    NoteService.deleteForever(obj)
      .then((res) => {
        this.props.getAllNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  colorNote = (value) => {
    console.log("color is calling", value);
    this.handleClose();

    let obj = {
      color: value,
      noteIdList: [this.props.note.id],
    };
    NoteService.colorNotes(obj)
      .then((res) => {
        this.props.getAllNotes();
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleColorChange = (value) => {
    this.handleClose();
    console.log(value);
    this.setState({
      ...this.state,
      color: value,
    });
    if (this.props.isUpdate) {
      this.props.changeUpdateColor(value);
    }
    this.colorNote(value);
  };
  handleClose = () => {
    this.setState({
      ...this.state,
      anchorEl: null,
      anchorE1color: null,
    });
  };
  render() {
    return (
      <div className="options3">
        {this.props.showIconsTrash ? (
          <div className="icons3">
            <div className="icon-optionTrash">
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.DeleteforeverNote}
              >
              <DeleteForeverIcon fontSize="small"/>
              </IconButton>
            </div>
            <div className="icon-optionTrash">
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.restoreDeleteNote}
              >
              <RestoreFromTrashIcon fontSize="small"/>
              </IconButton>
            </div>
          </div>
        ) : (
          <div className="icons3">
            {" "}
            <div className="icon-option3">
              <AddAlertOutlinedIcon fontSize="small" />
            </div>
            <div className="icon-option3">
              <PersonAddOutlinedIcon fontSize="small" />
            </div>
            <div className="icon-option3">
              <ColorLensOutlinedIcon fontSize="small" />
            </div>
            <div className="icon-option3">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.handleClickColor}
              >
                <PhotoSizeSelectActualOutlinedIcon fontSize="small" />
              </IconButton>
            </div>
            <div className="icon-option3">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={this.handleClickSetArchive}
              >
                <InboxIcon fontSize="small" />
              </IconButton>
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
                <MenuItem onClick={(this.handleClose, this.restoreDeleteNote)}>
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
                <div className="color-pallets">
                  <div className="color-row">
                    <div
                      className="white-pallet"
                      onClick={() => this.handleColorChange("#FFFFFF")}
                    ></div>
                    <div
                      className="salmon-pallet"
                      onClick={() => this.handleColorChange("#fa8072")}
                    ></div>
                    <div
                      className="orange-pallet"
                      onClick={() => this.handleColorChange("#FF9900")}
                    ></div>
                    <div
                      className="yellow-pallet"
                      onClick={() => this.handleColorChange("#FFFF64")}
                    ></div>
                  </div>
                  <div className="color-row">
                    <div
                      className="green-pallet"
                      onClick={() => this.handleColorChange("#66FF66")}
                    ></div>
                    <div
                      className="teal-pallet"
                      onClick={() => this.handleColorChange("#008080")}
                    ></div>
                    <div
                      className="blue-pallet"
                      onClick={() => this.handleColorChange("#2F5FFF")}
                    ></div>
                    <div
                      className="aqua-pallet"
                      onClick={() => this.handleColorChange("#00FFFF")}
                    ></div>
                  </div>
                  <div className="color-row">
                    <div
                      className="purple-pallet"
                      onClick={() => this.handleColorChange("#9B2C9B")}
                    ></div>
                    <div
                      className="pink-pallet"
                      onClick={() => this.handleColorChange("#FFC0CB")}
                    ></div>
                    <div
                      className="red-pallet"
                      onClick={() => this.handleColorChange("#FF1A06")}
                    ></div>
                    <div
                      className="gray-pallet"
                      onClick={() => this.handleColorChange("#808080")}
                    ></div>
                  </div>
                </div>
              </Menu>
            </div>
          </div>
        )}
      </div>
    );
  }
}
