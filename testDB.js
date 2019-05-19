

// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.
let id = 1;
// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db
let columns = 'uinqe_IdNum, EngTxt, trans_txt';
let english_txt = "home";
let other_language_txt = "khana";
const cmdStr = 'INSERT INTO Flashcards ('+columns+') VALUES(' +id+", "+english_txt+", "+other_language_txt+')';
id++;
console.log(cmdStr);
//const cmdStr = 'CREATE TABLE Flashcards (uinqe_IdNum INT, EngTxt TEXT, trans_txt TEXT, shownCount INT, ansCorreclyCount VARCHAR(100))';


db.run(cmdStr,tableCreationCallback);

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("sotring error",err);
    } else {
	console.log("data  stored");
	db.close();
    }
}