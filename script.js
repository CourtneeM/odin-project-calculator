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
  operate1: [],
  operate2: [],
  operator: "",
  firstOperate: function(e) {
    if(this.operate1.length === 0) {
      display.textContent = "0";
    };
    this.operate1.push(+e.target.textContent);
    display.textContent = `${operates.operate1.join("")}`;
    console.log(`operate1: ${this.operate1}`)
  },
  secondOperate: function(e) {
    this.operate2.push(+e.target.textContent);
    display.textContent = `${operates.operate1.join("")} ${operates.operator} ${operates.operate2.join("")}`;
    console.log(`operate2: ${this.operate2}`);
  },
  setOperator: function(e) {
    if(e.target.classList.contains('operator')) {
      this.operator = e.target.textContent;
      display.textContent = `${operates.operate1.join("")} ${operates.operator}`;
      console.log(`operator: ${this.operator}`);
    }
  },
  resetOperates: function() {
    operates.operate1 = [];
    operates.operate2 = [];
    operates.operator = "";
  }
}

let deleteNum = {
  del: function() {
    if(operates.operator === "" && operates.operate2.length === 0) {
      operates.operate1.pop();
      display.textContent = `${operates.operate1.join("")}`;
    } else if(operates.operator !== "" && operates.operate2.length === 0) {
      operates.operator = "";
      display.textContent = `${operates.operate1.join("")}`;
    } else if(operates.operate1.length > 0 && operates.operator !== "") {
      operates.operate2.pop();
      display.textContent = `${operates.operate1.join("")} ${operates.operator} ${operates.operate2.join("")}`;
    }
    if(operates.operate1.length === 0) {
      display.textContent = "0";
    }
  },
  clear: function() {
    operates.resetOperates();
    display.textContent = "0";
  }
}

calculator.addEventListener('click', e => {
  if(e.target.classList.contains('btn')) {
    if(display.textContent === "0") { display.textContent = "0" };
    if(e.target.classList.contains('num') && operates.operator !== "") {
      operates.secondOperate(e);
    } else if(e.target.classList.contains('num') && operates.operator === "") {
      operates.firstOperate(e);
    } else if(e.target.classList.contains('operator') && operates.operate1 != "") {
      if(e.target.classList.contains('operator') && operates.operate2.length !== 0) {
        operates.operate1 = calculate.operate(operates.operator, +(operates.operate1.join("")), +operates.operate2.join(""));
        operates.operate1 = String(operates.operate1).split("");
        operates.operate2 = [];
      }
      operates.setOperator(e);
    }
    if(e.target.textContent === "=" && operates.operate2.length > 0) {
      display.textContent = calculate.operate(operates.operator, +(operates.operate1.join("")), +operates.operate2.join(""));
      operates.resetOperates();
    }
    if(e.target.textContent === "C") {
      deleteNum.clear();
    }
    if(e.target.textContent === "DEL") {
      deleteNum.del();
    }
  }
});