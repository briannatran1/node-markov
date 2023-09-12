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

    // !this.words[i + 1]
    const choices = {};

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
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    //this.chains
  }
}
let machine = new MarkovMachine("The cat in the hat. The cat is the hat.");

module.exports = {
  MarkovMachine,
};