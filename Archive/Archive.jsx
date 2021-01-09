import React from "react";
import DisplayNotes from '../display-notes/displayNotes';
import TitleCard from "../takeANote/takeANote";
const NoteService = require("../../services/notes_service");

export default class ArchiveNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      allNotes: [],
      anchorEl: null,
      update: false,
      updateNote: {},
    };
  }
 
  openDialog = (note) =>{
    console.log("openDialog");
    this.setState({
      ...this.state,
      update: true,
      updateNote: note
    })
  }
  closeDialog = () =>{
    this.setState({
      ...this.state,
      update: false,
      updateNote: {}
    })
  }
  componentDidMount() {
    this.getArchiveNotes();
  }
  getArchiveNotes = () => {
    NoteService.getArchiveNote()
      .then((res) => {
        console.log(res, "Archive is calling");

        // this.notes = res.data.data.data;
        this.setState({
          ...this.state,
          allNotes: [...res.data.data.data]
        },() => {
          console.log(this.state);
        });
       
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
        <>
        <TitleCard getAllNotes = {this.getArchiveNotes} />
     <DisplayNotes note= {this.state.allNotes} callGetAllNotes ={this.getArchiveNotes} isToggleView={this.props.isToggleView} />
     </>
    );
  }
}
