// Encapsulates the CardDeck object and its functionality
const CarDeck = function(){
    const values = 
        ["fa fa-diamond"
        ,"fa fa-paper-plane-o"
        ,"fa fa-anchor"
        ,"fa fa-bolt"
        ,"fa fa-cube"
        ,"fa fa-anchor"
        ,"fa fa-leaf"
        ,"fa fa-bicycle"
        ,"fa fa-diamond"
        ,"fa fa-bomb"
        ,"fa fa-leaf"
        ,"fa fa-bomb"
        ,"fa fa-bolt"
        ,"fa fa-bicycle"
        ,"fa fa-paper-plane-o"
        ,"fa fa-cube"];

    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    let deckNode = document.querySelector('.deck')

    // TODO: Use documentFragment to improve perf
    let cards = values.map((x, i) => {
        let liNode = document.createElement('li'); 
        liNode.classList = 'card'

        let iNode = document.createElement('i'); 
        iNode.classList = x
        liNode.appendChild(iNode);

        deckNode.appendChild(liNode);

        return new Card(liNode, x, i)
    });

    return {
        cards: cards,
        shuffle: function(){
            let newValues = shuffle(values);
            for(let i = 0; i < values.length; i++){
                let card = this.cards[i];
                let value = newValues[i]
                card.setValue(value);
            }
        },
        restoreFromState: function(cardStates){
            for(let i = 0; i < cardStates.length; i++){
                let card = this.cards[i];
                let state = cardStates[i];
                card.restoreFromState(state);
            }
        },
        clear: function(){
            while (deckNode.firstChild) {
                deckNode.removeChild(deckNode.firstChild);
            }
        }
    }
}