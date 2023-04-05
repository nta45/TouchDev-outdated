"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["Add a Text Variable", {c: "win", closeable: 1, id: "Add a Variable", 
                    v: [{ v: " ", id: "inpt_addtxt_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addtxt_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addtextvar", cap:"Add" }]}],
  ["Add a Number Variable", {c: "win", closeable: 1, id: "Add a Variable", 
                    v: [{ v: " ", id: "inpt_addnum_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addnum_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addnumvar", cap:"Add" }]}],
  ["Add Text to Display", {c: "win", closeable: 1, id: "Add Text to Display", 
                    v: [{ v: " ", id: "inpt_print_value", cap:"Text to Display ↓", input: 1 }, 
                    "If you want to print a variable you've already set, type the name of the variable",
                        { c: "btn", id:"btn_println", cap: "Print" }]}],
  ["Save JavaScript File", {c: "win", modal:1,id: "Download the JavaScript File?", 
                    v:["Are you sure you want to download the JavaScript file?",
                        { c: "btn", id: "btn_savejsfile", cap:"Yes"}]}],
  ["Load JavaScript File", {c: "win", modal:1, id: "Load the JavaScript File?", 
                    v:["Select the JavaScript file you want to lead?", {c: "txt", id: "txt_loadjsfile", cap:"File to Load:", input: 1},
                        { c: "btn", id: "btn_loadejsfile", cap:"Yes"}]}]
]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode = "";
let inpt_addtxt_name, inpt_addtxt_value, inpt_print_value, inpt_addnum_name, inpt_addnum_value;
let code = {screens:[],functions:{home:{vars:[], commands:[]}}};

  app.start(event=>{app.display({
      cap: "JavaScript TouchDev (in-progress)", require: { c: ["grid", "opt"] }, style: "self_sb.css",
      value: [
        { id: "Your space"},
        { id: "Things to Do", v: [...COMPONENTS.keys()].map((x) => ({ id: x, c: "btn" }))},
        { id: "Edit space"}
      ]
    });
  });

  //app.event({u:''}, event=>{});
  // NEW FORMAT IS THIS ↑


  app.event({}, event=>{
    if (COMPONENTS.has(event.u)) { // if any of the "do" actions are clicked
      let preview = JSON.parse(latestcode); // the next 5 lines populate the 'Your space' Board
      preview.v.push(COMPONENTS.get(event.u));
      preview.id = "Edit space";
      preview.i = 0;
      app.display({queue:[{U:"Edit space", v:null},{ add: [preview] }]});
    }
    else if (event.u === "inpt_addtxt_name") { inpt_addtxt_name = event.v;} 
    else if (event.u === "inpt_addtxt_value") { inpt_addtxt_value = event.v;}
    else if (event.u === "inpt_print_value") { inpt_print_value = event.v;}
    else if (event.u === "inpt_addnum_name") { inpt_addnum_name = event.v;}
    else if (event.u === "inpt_addnum_value") { inpt_addnum_value = Number(event.v);}
    else if (event.u === "btn_savejsfile") { // if save button clicked
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
      app.display({save:['javascript.js',jscode]});
    }
    else if (event.u === "btn_loadejsfile") { // if load button clicked
      //app.display({open:['javascript.js']});
    }
    else if (event.u === "btn_addtextvar") { // if add text variable
      if (code.functions.home.vars.length === 0) {
        code.functions.home.vars.push({type:"text",name:inpt_addtxt_name.trim(),value:inpt_addtxt_value.trim()});
      } else {
        let nameFound = false;
        for (const element of code.functions.home.vars) {
          if (element.name === inpt_addtxt_name.trim()) {
            element.value = inpt_addtxt_value.trim();
            nameFound = true;
            app.display({U:"Your space", v:[]});
            break;
          } 
        }
        if(!nameFound){
            code.functions.home.vars.push({type:"text",name:inpt_addtxt_name.trim(),value:inpt_addtxt_value.trim()});
        }
        
      }
      app.display({U:"Your space", v:[]});
    }
    else if (event.u === "btn_addnumvar") { // if add num variable
      if (Number.isFinite(inpt_addnum_value)) {
        if (code.functions.home.vars.length === 0) {
          code.functions.home.vars.push({type:"number",name:inpt_addnum_name.trim(),value:inpt_addnum_value});
        } else {
          let numberFound = false;
          for (const element of code.functions.home.vars) {
          if (element.name === inpt_addnum_name.trim()) {
            element.value = inpt_addnum_value;
            numberFound = true;
            app.display({U:"Your space", v:[]});
            break;
          } 
        }
        if(!numberFound){
            code.functions.home.vars.push({type:"number",name:inpt_addnum_name.trim(),value:inpt_addnum_value});
        }}
  
      app.display({U:"Your space", v:[]});
      } 
      else{
        app.display({U:"Your space", add:[{id:'Warning',v:'Please enter a valid number.'}]});
      }
    }
    else if (event.u === "btn_println") { // if add print statement
      code.functions.home.commands.push({type:"print",value:inpt_print_value.trim()});
      app.display({U:"Your space", v:[]});
    }

    app.display({U:"Your space", v:[]});
      for(const element of code.functions.home.vars) {
        if (element.type === "text") {
          app.display({U:"Your space",add: [{ c: "txt", v: "let " + element.name + " = \"" + element.value + "\";" }]});
        } else {
          app.display({U:"Your space",add: [{ c: "txt", v: "let " + element.name + " = " + element.value + ";" }]});
        }
      }
      for(const element of code.functions.home.commands) {
        if (element.type === "print") {
          app.display({U:"Your space",add: [{ c: "txt", v: "console.log(\"" + element.value + "\");" }]});
        }
      }
  
  });
  
      // clearing the Edit space board and updating with the latest values from the Code Object
      
    // }
//work to do:
  // 1. printing a variable or input message option (maybe with a context menu option)
  // 2. 