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

    const chains = {};
    const words = this.words;
    // easier logic => look at next word and if nothing's there, set to null

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const nextWord = words[i + 1] || null;

      if (word in chains) {
        chains[word].push(nextWord);
      }
      else {
        chains[word] = [nextWord];
      }
    }

    return chains;
  }

  /** Pick random choice from array */

  static choice(arr) {
    // sep of concerns => make new function to pick a random word
    return arr[Math.floor(Math.random() * arr.length)];
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

    // appending string => make into arr instead of creating new strings
    // can use lodash to get random word
    // can access key in obj w/o looping

    let randomText = [];
    let key = this.words[0];

    while (key !== null) {
      const { word, nextKey } = this.getOneLink(key);
      randomText.push(word);
      key = nextKey;
    }

    return randomText.join(' ');
  }

  /** Get a single link: the next word and next key */

  getOneLink(key) {
    return {
      word: key,
      nextKey: MarkovMachine.choice(this.chains[key]),
    };
  }
}

let machine = new MarkovMachine("The cat in the hat. The cat is the hat.");

module.exports = {
  MarkovMachine,
};