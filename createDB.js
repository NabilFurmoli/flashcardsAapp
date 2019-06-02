

// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db
const cmdStr = 'CREATE TABLE Flashcards (unique_IdNum INT, eng_txt TEXT, trans_txt TEXT, shownCount INT, ansCorrectlyCount INT)';
const userTable = 'CREATE TABLE Users (google_ID INT, first_name TEXT, last_name TEXT)';

db.run(cmdStr,tableCreationCallback);
db.run(userTable,tableCreationCallback);

db.close();

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
    }
}
