const counter = document.querySelector("[data-tally-amount]");
const add = document.querySelector("[data-increase-button]");
const subtract = document.querySelector("[data-decrease-button]");
const reset = document.querySelector("[data-reset-button]");
const resetMessage = document.querySelector("[data-reset-message]");

// Shows reset message for 1.5 secs then hides it.
const showResetMessage = () => {
    resetMessage.style.display = "block";
    setTimeout(() => {
        resetMessage.style.display = "none";
    }, 1500);
}

class TallyCounter {
    constructor(total){
        this.total = total;
    }

    add(){
        this.total += 1;
        return this;
    }

    subtract(){
        this.total -= 1;
        return this;
    }

    get display() {
        return this.total;
    }

    get reset () {
        return this.total = 0;
    }
}


// Create a new instance
const tallyCounter = new TallyCounter(0);



add.addEventListener("click", () => {
    tallyCounter.add();
    counter.textContent = tallyCounter.display;
});

subtract.addEventListener("click", () => {
    tallyCounter.subtract();
    counter.textContent = tallyCounter.display;  
});

reset.addEventListener("click", () => {
    if(tallyCounter.total !== 0){
      counter.textContent =  tallyCounter.reset;
      showResetMessage();
    } else {
      throw new Error("Cannot reset when counter is already 0")
    }
});

