import { data } from "./data.js";
import { dictionar } from "./dictionar.js";

let tries = 0;
let word = "";
let guess = "";
let alphabet = "IERLAOTNUCSĂMDPGBFȚȘZVHÂÎJXK"; // ordonate dupa frecventa
const rows = data.trim().split("\n"); // newline
const dictionarWords = dictionar.trim().split("\n").map(w => w.toUpperCase()); // capitalize dictionar words

for (let row of rows) {
  let index_alpha = 0; 
  const [number, maskedWord, fullWord] = row.split(";"); // scoatem cuvintele din fisier
  word = fullWord;
  guess = maskedWord;

  let cuvintePosibile = dictionarWords.filter(w => w.length === word.length);
  cuvintePosibile = cuvintePosibile.filter(w => {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== "*" && guess[i] !== w[i]) {
        return false; // if revealed letters don’t match, filter out
      }
    }
    return true;
  });
  


  while (word !== guess) {

    // daca mai am doar o posibila varianta de cuvant, acela este
    if (cuvintePosibile.length === 1) {
      guess = cuvintePosibile[0];
      tries++;
      console.log(`Am ghicit cuvantul: ${guess} din ${tries} incercari!`);
      break; 
    }

    // daca cuvantul ghicit are deja litera nu o mai folosim
    if (guess.includes(alphabet[index_alpha])) {
      index_alpha++; 
      continue; 
    }

    // verificam din nou posibilele cuvinte
    cuvintePosibile = cuvintePosibile.filter(w => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== "*" && guess[i] !== w[i]) {
          return false; // daca cuvintele nu contin literele ghicile le eliminam
        }
      }
      return true;
    });

    console.log(cuvintePosibile)

    // verificam daca litera urmatoare exista in cuvintele posibile
    let found = false;
    for (let i = 0; i < cuvintePosibile.length; i++) {
      if (cuvintePosibile[i].includes(alphabet[index_alpha])) {
        found = true;
        break;
      }
    }

    if (!found) {
      tries++;
      console.log(`Litera ${alphabet[index_alpha]} nu este in cuvant, tries: ${tries}`);
    }

    // verificam daca litera este in cuvant
    for (let i = 0; i < word.length; i++) {
      if (guess[i] === "*") {
        if (word[i] === alphabet[index_alpha]) {
          tries++;
          guess = guess.slice(0, i) + alphabet[index_alpha] + guess.slice(i + 1);
          console.log(
            `Am adaugat litera: ${alphabet[index_alpha]}, tries: ${tries}. ${guess}`
          );
        }
      }
    }
    console.log(cuvintePosibile)
    // next letter
    index_alpha++;
  }
  console.log(`____________________`);
}

document.getElementById("tries").innerHTML = tries; // example output
