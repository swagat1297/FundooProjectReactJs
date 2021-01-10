const axios = require('./axios_service.js');
var config = require('../config/config');
class NoteService{
    addnotes(value){
        let url = config.url + 'notes/addNotes'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.post(url, value, true, token);
    }
    getNotes(){
        let url = config.url + 'notes/getNotesList'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.get(url, token);
    }
    trashNotes(value){
        let url = config.url + 'notes/trashNotes'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.post(url, value, true, token); 
    }
    updateNotes(value){
        let url = config.url + 'notes/updateNotes'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.post(url, value, true, token);
    }
    colorNotes(value){
        let url = config.url + 'notes/changesColorNotes'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.post(url, value, true, token);
    }
    getArchiveNote(){
        let url = config.url + 'notes/getArchiveNotesList'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.get(url, token);
    }
    archiveNotes(value){
        let url = config.url + 'notes/archiveNotes'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.post(url, value, true, token);
    }
    getTrashNote(){
        let url = config.url + 'notes/getTrashNotesList'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.get(url, token);
    }
    deleteForever(value){
        let url = config.url + 'notes/deleteForeverNotes'
        let token = {
            headers: {
                'Authorization': localStorage.getItem("token")
            }
        }
        return axios.post(url, value, true, token);
    }
    
}
module.exports = new NoteService();
