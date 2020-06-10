const calculator = document.getElementById('calc-container');
let display = document.getElementById('display');

let calculate = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  },
  multiply: function(a, b) {
    return a * b;
  },
  divide: function(a, b) {
    return a / b;
  },
  operate: function(operator, a, b) {
    switch(operator) {
      case "+":
        return this.add(a, b);
      case "-":
        return this.subtract(a, b);
      case "X":
        return this.multiply(a, b);
      case "/":
        return this.divide(a, b);
    }
  }
}

let operates = {
  operate1: "",
  operate2: "",
  operator: "",
  firstOperate: function(e) {
    if(this.operate1 === "") {
      display.textContent = "";
    };
    this.operate1 += e.target.textContent;
    display.textContent += e.target.textContent;
    console.log(`operate1: ${this.operate1}`)
  },
  secondOperate: function(e) {
    this.operate2 += e.target.textContent;
    display.textContent += e.target.textContent;
    console.log(`operate2: ${this.operate2}`);
  },
  setOperator: function(e) {
    if(e.target.classList.contains('operator')) {
      this.operator = e.target.textContent;
      display.textContent += ` ${this.operator} `;
      console.log(`operator: ${this.operator}`);
    }
  },
  resetOperates: function() {
    operates.operate1 = "";
    operates.operate2 = "";
    operates.operator = "";
  }
}

let deleteNum = {
  del: function(e) {

  },
  clear: function(e) {

  }
}

calculator.addEventListener('click', e => {
  if(e.target.classList.contains('btn')) {
    if(display.textContent === "0") { display.textContent = "" };
    if(e.target.classList.contains('num') && operates.operator !== "") {
      operates.secondOperate(e);
    } else if(e.target.classList.contains('num') && operates.operator === "") {
      operates.firstOperate(e);
    } else if(e.target.classList.contains('operator') && operates.operate1 != "") {
      operates.setOperator(e);
    }
    if(e.target.textContent === "=") {
      display.textContent = calculate.operate(operates.operator, +(operates.operate1), +operates.operate2);
      operates.resetOperates();
    }
  }
});






