import React from "react";
import DisplayNotes from '../display-notes/displayNotes';
const NoteService = require("../../services/notes_service");

export default class TrashNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      allNotes: [],
      anchorEl: null,
      update: false,
      updateNote: {},
      showIconsTrash: true,
    };
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
    this. getTrashNotes();
  }
  getTrashNotes = () =>{
    NoteService. getTrashNote()
      .then((res) => {
        console.log(res, "Trash is calling .filter((ele) => ele.isArchived);");

        this.notes = res["data"].data.data
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
        <>
     <DisplayNotes note= {this.state.allNotes} callGetAllNotes ={this.getTrashNotes} isToggleView={this.props.isToggleView} showIconsTrash={this.state.showIconsTrash}/>
     </>
    );
  }
}
