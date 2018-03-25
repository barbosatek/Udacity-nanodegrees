// Encapsulates the Card object, its interaction with the DOM and state
const Card = function(cardNode, value) {
    cardNode.children[0].className = value;
   
    return {
     state: new CardState(value),
     node: cardNode,
     closeCard: function() {
      cardNode.classList.remove("open");
      cardNode.classList.remove("show");
      this.state.isOpened = false;
     },
     open: function() {
      cardNode.classList.add("open");
      cardNode.classList.add("show");
      this.state.isOpened = true;
     },
     match: function() {
      cardNode.classList.add("match");
      this.state.isMatched = true;
     },
     unmatch: function() {
      cardNode.classList.remove("match");
      this.state.isMatched = false;
     },
     isMatched: function() {
      return cardNode.classList.contains("match");
     },
     isOpened: function() {
      return cardNode.classList.contains("open");
     },
     getValue: function() {
      return cardNode.children[0].className
     },
     setValue: function(value) {
      cardNode.children[0].className = value;
      this.state.value = value;
     },
     restoreFromState: function(state) {
      if (state.isMatched) {
       this.match();
      } else {
       this.unmatch();
      }
   
      if (state.isOpened) {
       this.open();
      } else {
       this.closeCard();
      }
   
      this.state.id = state.id;
      this.state.value = state.value;
      cardNode.children[0].className = state.value;
     }
    }
   }