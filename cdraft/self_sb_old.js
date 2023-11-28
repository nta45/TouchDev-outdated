"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["Add a Text Variable", {c: "txt", id: "Add a Variable", 
                    v: [{ v: " ", id: "inpt1", cap:"Name", input: 1 },{ v: " ", id: "inpt2", cap:"Value", input: 1 },
                        { c: "btn", id: "add1", cap:"Add" }]}],
  ["Add a Number Variable", {c: "txt", id: "Add a Variable", 
                    v: [{ v: " ", id: "inpt4", cap:"Name", input: 1 },{ v: " ", id: "inpt5", cap:"Value", input: 1 },
                        { c: "btn", id: "add4", cap:"Add" }]}],
  ["Add Text to Display", {c: "txt", id: "Add Text to Display", 
                    v: [{ v: " ", id: "inpt3", cap:"Text to Display ↓", input: 1 }, 
                    "If you want to print a variable you've already set, type the name of the variable",
                        { c: "btn", id:"add2", cap: "Add" }]}],
  ["Save JavaScript File", {c: "txt", id: "Download the JavaScript File?", 
                    v:["Are you sure you want to download the JavaScript file?",
                        { c: "btn", id: "add3", cap:"Yes"}]}]
]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode = "";
let inpt1, inpt2, inpt3, inpt4, inpt5;

function userEvent(event) {
  if (event.t == 0) { // at handshake 
    app.display({
      cap: "JavaScript TouchDev (in-progress)", require: { c: ["grid", "opt"] }, style: "self_sb.css",
      value: [
        { id: "Your space"},
        { id: "Things to Do", v: [...COMPONENTS.keys()].map((x) => ({ id: x, c: "btn" }))},
        { id: "JavaScript Code"}
      ]
    });
  } else { // for events other than handshake
    let itemid = event.u;
    let itemval = event.v;
    let dUpdates = [{ U: "Warning", v: null }];

    if (COMPONENTS.has(itemid)) { // if any of the "do" actions are clicked
      let preview = JSON.parse(latestcode); // the next 5 lines populate the 'Your space' Board
      preview.v.push(COMPONENTS.get(itemid));
      preview.id = "Your space";
      preview.i = 0;
      dUpdates.push({ U: "Your space", v: null }, { add: [preview] });
    } 
    else if (itemid === "inpt1") { inpt1 = itemval;} 
    else if (itemid === "inpt2") { inpt2 = itemval;}
    else if (itemid === "inpt3") { inpt3 = itemval;}
    else if (itemid === "inpt4") { inpt4 = itemval;}
    else if (itemid === "inpt5") { if (Number.isFinite(inpt5)) inpt5 = itemval; else{dUpdates.push({U:'Your space',add:[{id:'Warning',v:'Please enter a valid number.'}]});inpt5 = 0}}
    else if (itemid === "add3") { // if save button clicked
      dUpdates.push({save:['javascript.js',jscode]});
    }
    else if (itemid === "add1") { // if add text variable
      dUpdates.push({U: "JavaScript Code",add: [{ c: "txt", v: "let " + inpt1.trim() + " = \"" + inpt2.trim() + "\";" }]});
      jscode += ("let " + inpt1.trim() + " = \"" + inpt2.trim() + "\";");
      let preview = JSON.parse('{"v":[\n  \n]}\n'); // the next 5 lines clear the 'Your space' Board
      preview.v.push(COMPONENTS.get(itemid));
      preview.id = "Your space";
      preview.i = 0;
      dUpdates.push({U:"Your space", v:null },{add:[preview]});
    }
    else if (itemid === "add4") { // if add num variable
      dUpdates.push({U: "JavaScript Code",add: [{ c: "txt", v: "let " + inpt4.trim() + " = " + inpt5.trim() + ";" }]});
      jscode += ("let " + inpt4.trim() + " = " + inpt5.trim() + ";");
      let preview = JSON.parse('{"v":[\n  \n]}\n'); // the next 5 lines clear the 'Your space' Board
      preview.v.push(COMPONENTS.get(itemid));
      preview.id = "Your space";
      preview.i = 0;
      dUpdates.push({U:"Your space", v:null },{add:[preview]});
    }
    else if (itemid === "add2") { // if add print statement
      dUpdates.push({U:"JavaScript Code", add:[{ c: "txt", v: "console.log(" + inpt3.trim() + ");"}]});
      jscode += ("console.log(" + inpt3.trim() + ");");
      let preview = JSON.parse('{"v":[\n  \n]}\n'); // the next 5 lines clear the 'Your space' Board
      preview.v.push(COMPONENTS.get(itemid));
      preview.id = "Your space";
      preview.i = 0;
      dUpdates.push({U:"Your space", v:null },{add: [preview] });
    }
    
    app.display({ Q: dUpdates });
  }
  
}