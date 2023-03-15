"use strict";

logToConsole();

var COMPONENTS = new Map([
  ["Add Variable", {c: "txt", id: "Add a Variable", v: [{id:"Variable Type?",
     defaults:{class:"opt",optionGroup:"vartype"},
     v:[{id:"Text"},{id:"Num"}]}
   ,{ v: " ", id: "Name", input: 1 },{ v: " ", id: "Value", input: 1 },{ c: "btn", id: "Add" }]}],
  // ["Add Number", {c: "num", id: "Number", v: [{ v: " ", id: "numinpt", input: 1 },{ c: "btn", id: "addnum" }],}],
  // ["Add Text", {c: "txt", id: "Text", v: [{ v: " ", id: "txtinpt", input: 1 },{ c: "btn", id: "addtxt" }],}],
  // ['Add "if" Condition', {"c":"btn", "v": []}]
]);

var latestcode = '{"v":[\n  \n]}\n';
var latestNumericInput = 0;
var latestName = "";

function userEvent(event) {
  if (event.t == 0) {
    // handshake
    app.display({
      cap: "UINL screen builder",
      require: { c: ["grid", "opt"] },
      style: "self_sb.css",
      value: [
        { id: "Your space" },
        {
          id: "Items to Add",
          v: [...COMPONENTS.keys()].map((x) => ({ id: x, c: "btn" })),
        },{ id: "JavaScript Code"},
        // {id:"Save", cap:"Save the JavaScript File", class:"btn"}
      ],
    });
  } else {
    // after handshake
    var itemid = event.u;
    var itemval = event.v;
    var dUpdates = [{ U: "Warning", v: null }];

    // if(itemid==='Save'){ // if user clicks Save
    //       dUpdates.push({save:['javascript.js','JavaScript Code']});
    // }else
       if (COMPONENTS.has(itemid)) {
      let preview = JSON.parse(latestcode); // parse the JSON
      //check if there is already code, if not create empty
      // if (!preview.v || preview.v.constructor !== Array) 
        preview.v = [];

      preview.v.push(COMPONENTS.get(itemid));
      preview.id = "Your space";
      preview.i = 0;
      // uinl.df={on:{pc:[]}};
      dUpdates.push({ U: "Your space", v: null }, { add: [preview] });
    }
      if (itemid === "Name") {
        latestName = itemval;
      }
      if (itemid === "Value") {
        latestNumericInput = itemval;
      }

    if (itemid === "Add") {
      dUpdates.push({
        U: "JavaScript Code",
        add: [{ c: "txt", v: "let " + latestName + " = " + latestNumericInput + ";" }],
      });
      // dUpdates.push({ U: "Your space", v: null});
    }
  }
  app.display({ Q: dUpdates });
}
