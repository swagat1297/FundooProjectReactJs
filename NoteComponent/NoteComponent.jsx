import React, { useEffect } from 'react';
import TitleCard from "../takeANote/takeANote";
import DisplayNotes from '../display-notes/displayNotes';
const NoteService = require("../../services/notes_service");
const Note = (props) =>{
    const [notes, setNote] = React.useState([]);
    useEffect(() => {
        // if(isMount){
        //   getAllNotes();
        //   isMount = false;
        // }
        getAllNotes();
        console.log("useEffect1");
      }, []);
      const getAllNotes = () => {
        NoteService.getNotes()
          .then((res) => {
            console.log(res.data.data.data.filter((ele) => !ele.isDeleted && !ele.isArchived));
            let notesData = res.data.data.data.filter((ele) => !ele.isDeleted && !ele.isArchived);
            setNote(notesData);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    return(
        <>
        <TitleCard getAllNotes = {getAllNotes}/>
        <DisplayNotes note= {notes} callGetAllNotes ={getAllNotes} isToggleView={props.isToggleView}/>
        </>
    )
}

export default Note;