"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["Add a Text Variable", {c: "bin", id: "Add a Variable", 
                    v: [{ v: " ", id: "inpt_addtxt_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addtxt_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addtextvar", cap:"Add" }]}],
  ["Add a Number Variable", {c: "bin", id: "Add a Variable", 
                    v: [{ v: " ", id: "inpt_addnum_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addnum_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addnumvar", cap:"Add" }]}],
  ["Add Text to Display", {c: "bin", id: "Add Text to Display", 
                    v: [{ v: " ", id: "inpt_print_value", cap:"Text to Display ↓", input: 1 }, 
                    "If you want to print a variable you've already set, type the name of the variable",
                        { c: "btn", id:"btn_println", cap: "Print" }]}],
  ["Save JavaScript File", {c: "bin", id: "Download the JavaScript File?", 
                    v:["Are you sure you want to download the JavaScript file?",
                        { c: "btn", id: "btn_savejsfile", cap:"Yes"}]}]
]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode = "";
let inpt_addtxt_name, inpt_addtxt_value, inpt_print_value, inpt_addnum_name, inpt_addnum_value;
let code = {screens:[],functions:{home:{vars:[], commands:[]}}};

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
    else if (itemid === "inpt_addtxt_name") { inpt_addtxt_name = itemval;} 
    else if (itemid === "inpt_addtxt_value") { inpt_addtxt_value = itemval;}
    else if (itemid === "inpt_print_value") { inpt_print_value = itemval;}
    else if (itemid === "inpt_addnum_name") { inpt_addnum_name = itemval;}
    else if (itemid === "inpt_addnum_value") { inpt_addnum_value = Number(itemval);}
    else if (itemid === "btn_savejsfile") { // if save button clicked
      for(const element of code.functions.home.vars) {
        if (element.type === "text") {
          jscode += ("let " + element.name + " = \"" + element.value + "\";");
        } else {
          jscode += ("let " + element.name + " = " + element.value + ";");
        }
      }
      for(const element of code.functions.home.commands) {
        if (element.type === "print") {
          jscode += ("console.log(\"" + element.value + "\");");
        }
      }
      dUpdates.push({save:['javascript.js',jscode]});
    }
    
    else if (itemid === "btn_addtextvar") { // if add text variable
      if (code.functions.home.vars.length === 0) {
        code.functions.home.vars.push({type:"text",name:inpt_addtxt_name.trim(),value:inpt_addtxt_value.trim()});
      } else {
        let nameFound = false;
        for (const element of code.functions.home.vars) {
          if (element.name === inpt_addtxt_name.trim()) {
            element.value = inpt_addtxt_value.trim();
            nameFound = true;
            dUpdates.push({U:"Your space", v:[]});
            break;
          } 
        }
        if(!nameFound){
            code.functions.home.vars.push({type:"text",name:inpt_addtxt_name.trim(),value:inpt_addtxt_value.trim()});
        }
        
      }
      dUpdates.push({U:"Your space", v:[]});
    }
    else if (itemid === "btn_addnumvar") { // if add num variable
      if (Number.isFinite(inpt_addnum_value)) {
        if (code.functions.home.vars.length === 0) {
          code.functions.home.vars.push({type:"number",name:inpt_addnum_name.trim(),value:inpt_addnum_value});
        } else {
          let numberFound = false;
          for (const element of code.functions.home.vars) {
          if (element.name === inpt_addnum_name.trim()) {
            element.value = inpt_addnum_value;
            numberFound = true;
            dUpdates.push({U:"Your space", v:[]});
            break;
          } 
        }
        if(!numberFound){
            code.functions.home.vars.push({type:"number",name:inpt_addnum_name.trim(),value:inpt_addnum_value});
        }}
  
      dUpdates.push({U:"Your space", v:[]});
      } 
      else{dUpdates.push({U:'Your space',add:[{id:'Warning',v:'Please enter a valid number.'}]})
      }
    }
    else if (itemid === "btn_println") { // if add print statement
      code.functions.home.commands.push({type:"print",value:inpt_print_value.trim()});
      dUpdates.push({U:"Your space", v:[]});
    }
      // clearing the javascript code board and updating with the latest values from the Code Object
      dUpdates.push({U: "JavaScript Code",v:[]});
      for(const element of code.functions.home.vars) {
        if (element.type === "text") {
          dUpdates.push({U: "JavaScript Code",add: [{ c: "txt", v: "let " + element.name + " = \"" + element.value + "\";" }]});
        } else {
          dUpdates.push({U: "JavaScript Code",add: [{ c: "txt", v: "let " + element.name + " = " + element.value + ";" }]});
        }
      }
      for(const element of code.functions.home.commands) {
        if (element.type === "print") {
          dUpdates.push({U: "JavaScript Code",add: [{ c: "txt", v: "console.log(\"" + element.value + "\");" }]});
        }
      }
    // }
    app.display({ Q: dUpdates });
    console.log(code);
  }
  
}
//work to do:
  // 1. printing a variable or input message option (maybe with a context menu option)
  // 2. 