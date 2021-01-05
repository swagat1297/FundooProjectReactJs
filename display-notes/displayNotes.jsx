import React from "react";
import "./displayNote.scss";
import { StylesProvider } from "@material-ui/core/styles";

import pinIcon from "../../asset/image/push_pin-black-18dp.svg";
import DisplayIcons from "../displayIcons/displayIcons";
import UpdateNote from "../updateKeep/updateKeep";
const NoteService = require("../../services/notes_service");

export default class DisplayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      allNotes: [],
      anchorEl: null,
      update: false,
      updateNote: {},
    };
  }
  callGetAllNotes = () =>{
    this.getAllNotes();
  }
  openDialog = (note) =>{
    console.log("openDialog");
    this.setState({
      update: true,
      updateNote: note
    })
  }
  closeDialog = () =>{
    this.setState({
      update: false,
      updateNote: {}
    })
  }
  componentDidMount() {
    this.getAllNotes();
  }
  getAllNotes() {
    NoteService.getNotes()
      .then((res) => {
        console.log(res);
        this.notes = res["data"].data.data.filter((ele) => !ele.isDeleted);
        this.setState({
          allNotes: this.notes,
        });
        console.log(this.state.allNotes);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="displayNote">
        {this.state.allNotes.map((note) => (
          <div className="user">
            {
              <StylesProvider>
                <div className="outer-container3">
                  <div className="input-titl3">
                    <div
                      className="text-fields"
                      
                    >
                      <div className="title3" onClick={(e) =>this.openDialog(note)}>
                        {note.title}
                        <img src={pinIcon} />
                      </div>
                      <div className="description">{note.description}</div>
                    </div>
                    <DisplayIcons note={note} getAllNotes={this.callGetAllNotes} />
                  </div>
                </div>
              </StylesProvider>
            }
          </div>
        ))}
        <UpdateNote updateValue = {this.state.update} note={this.state.updateNote} closeDialog = {this.closeDialog} getAllNotes={this.callGetAllNotes}/>
      </div>
    );
  }
}
