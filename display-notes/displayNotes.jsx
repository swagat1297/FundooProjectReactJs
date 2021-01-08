import React from "react";
import "./displayNote.scss";
import { StylesProvider } from "@material-ui/core/styles";

import pinIcon from "../../asset/image/push_pin-black-18dp.svg";
import DisplayIcons from "../displayIcons/displayIcons";
import UpdateNote from "../updateKeep/updateKeep";

export default class DisplayNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.note,
      allNotes: [],
      anchorEl: null,
      update: false,
      updateNote: {},
    };
  }
  callGetAllNoteschild = () =>{
    this.props.callGetAllNotes();
  }
  getArchiveNotes = () =>{
    this.props.callGetAllNotesArchive();
  }
   
  // componentDidUpdate(prevProps){
  //   openDialog()
  // }
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

  render() {
    return (
      <div className="displayNote">
        {this.props.note && this.props.note.map((card) => (
          <div className={this.props.isToggleView ? "userClickToggle" : "user"} style={{backgroundColor: card.color}}>
            {
              <StylesProvider>
                <div className="outer-container3">
                  <div className="input-titl3">
                    <div
                      className="text-fields"
                      
                    >
                      <div className="title3" onClick={(e) =>this.openDialog(card)}>
                        {card.title}
                        <img src={pinIcon} />
                      </div>
                      <div className="description">{card.description}</div>
                    </div>
                    <DisplayIcons note={card} getAllNotes={this.callGetAllNoteschild} getArchiveNotes={this.getArchiveNotes}/>
                  </div>
                </div>
              </StylesProvider>
            }
          </div>
        ))}
        <UpdateNote updateValue = {this.state.update} note={this.state.updateNote} closeDialog = {this.closeDialog} getAllNotes={this.callGetAllNoteschild}/>
      </div>
    );
  }
}
