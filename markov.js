'use strict';

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    /**
     * for every word, go through all the text, and whenever, there is a word infront
     * that, that word will be a value inside a array of possible choices
    *
    * choices object should include keys with every word/punctuation and
    * values that is list with all of the words that were one ahead of that key
    *
    * one key will have null value, for when text ends
    *
    * once we have the complete choice obj, we return it
    *  */

    //TODO: more specific var name => chains
    const choices = {};

    //TODO: keep it simple => for...loop
    //TODO: make var for this.words
    //TODO: easier logic => look at next work and if nothing's there, set to null

    for (let [i, phrase] of this.words.entries()) {
      if (i === this.words.length - 1) {
        if (phrase in choices) {
          choices[phrase].push(null);
        }
        else {
          choices[phrase] = [null];
        }
      }
      else if (!(phrase in choices)) {
        choices[phrase] = [this.words[i + 1]];
      }
      else {
        choices[phrase].push(this.words[i + 1]);
      }
    }

    return choices;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    /**
     * call getChains function => this.chains to get random words
     * always starting with first word for input text
     * look inside chains to see if there's a key in chains that matches the first word
     * if yes, pull out arr and randomly select a word in arr
     * add random word to result string
     * result string should now start with added random word
     * random word becomes the next key in choices that we are looking for
     * look for key in choices, randomly choose another word, add random word to result string and that word becomes the focus of the next interation
     * repeat process until we hit null
     */

    //TODO: appending string => make into arr instead of creating new strings
    // can use lodash to get random word

    let randomText = '';

    //TODO: don't need var just be explicit
    const chains = this.chains;
    // let idx = 0;

    //TODO: sep of concerns => make new function to pick a random word
    let randomWord;

    while (randomWord !== null) {
      //TODO: repeating logic on line 120; 121
      if (!randomText) {
        randomWord = this.words[0];
        randomText += randomWord + ' ';
        // idx++;
      }

      if (randomText) {
        //TODO: don't need to loop every key
        for (let key in chains) {
          //TODO: can access key in obj w/o looping
          if (randomWord === key) {
            let randomWordIdx = Math.floor(
              Math.random() * chains[key].length);

            randomWord = chains[key][randomWordIdx];

            if (randomWord !== null) {
              randomText += randomWord + ' ';
            }
          }
        }
      }
    }

    return randomText;
  }
}
let machine = new MarkovMachine("The cat in the hat. The cat is the hat.");

module.exports = {
  MarkovMachine,
};