const fs=require('fs');
const chalk=require('chalk');

const failure=chalk.red.inverse;
const success=chalk.green.inverse;
const titleBG=chalk.white.inverse;


const getNotes =  (title)=> {
    const notes = loadNotes();
    
    const notesToPrint= notes.find((note)=> note.title === title);

    if(notesToPrint){
        console.log(`{"title:" ${notesToPrint.title}, "body": ${notesToPrint.body}}`);
    }else{
        console.log("No Notes Found"); 
    }
}

const listNotes =  ()=> {
    const listNote=loadNotes();

    console.log(titleBG("Notes List Are"));

    listNote.forEach((note) => {
        console.log(note.title);
    });
}


const addNote=(title,body)=>{
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note)=> {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const saveNotes =  (notes)=> {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes =  ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote=(title)=>{
    // console.log("Notes Removed "+title);
    const notes = loadNotes();
    
    const notesToKeep = notes.filter( (note)=> {
        return note.title !== title
    });

    if(notes.length>notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(success('Removed Successfully'));
       
    }else{
        console.log(failure('No Note Found'));
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    getNotes:getNotes
}