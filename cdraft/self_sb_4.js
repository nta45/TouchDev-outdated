"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["Add a Text Variable", {c: "win", closeable: 1, modal:1, id: "Add a Variable", 
                    v: [{ v: "", id: "inpt_addtxt_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addtxt_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addtextvar", cap:"Add" }]}],
  ["Add a Number Variable", {c: "win", closeable: 1, modal:1,id: "Add a num Variable", 
                    v: [{ v: "", id: "inpt_addnum_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addnum_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addnumvar", cap:"Add" }]}],
  ["Add Text to Display", {c: "win", closeable: 1,modal:1, id: "Add text to display...", 
                    v: [{ v: "", id: "inpt_print_value", cap:"Text to Display ↓", input: 1 }, 
                    "If you want to print a variable you've already set, type the name of the variable",
                        { c: "btn", id:"btn_println", cap: "Print" }]}],
  ["Save JSON File", {c: "win", closeable: 1,modal:1,id: "Download the JSON File?", 
                    v:["Are you sure you want to download the JSON file?",
                        { c: "btn", id: "btn_savejsfile", cap:"Yes"}]}],
  ["Load JSON File", {c: "win", closeable: 1,modal:1, id: "Load the JSON File?", 
                    v:["Select the JSON file you want to load?", {id:"myfile", cap:"",c:"file",accepts:"text"},
                        { c: "btn", id: "btn_loadejsfile", cap:"Open"}]}],
  // link to index2.html - change here
  // ["Open Prototype 1", {c: "win", closeable: 1,modal:1, id: "Open Prototype 1", 
  //                   v:[{ c: "btn", id: "prot1", cap:"Open"}]}] 
]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode, newcode = "";
let inpt_addtxt_name, inpt_addtxt_value, inpt_print_value, inpt_addnum_name, inpt_addnum_value, filecontent;
// let code = {screens:[],functions:{home:{vars:[], commands:[]}}};
// let code = {vars:[], commands:[]};
let code = {screens:[],functions:{home:{vars:[], commands:[]}}};
let intcode = [];

  app.start(event=>{app.display({
      cap: "JavaScript TouchDev (in-progress)", require: { c: ["grid", "opt"] }, style: "self_sb_3.css",
      value: [
        { id: "Your space"},
        { id: "Things to Do", v: [...COMPONENTS.keys()].map((x) => ({ id: x, c: "btn" }))},
      ]
    });
  });

  //app.event({u:''}, event=>{});
  // NEW FORMAT IS THIS ↑


  app.event({}, event => {
    if (COMPONENTS.has(event.u) && event.v===true) {
      app.display({queue:[{add:[COMPONENTS.get(event.u)]}]});
    }
    else if (event.u === "inpt_addtxt_name") { inpt_addtxt_name = event.v;} 
    else if (event.u === "prot1") { window.location.href = "index2.html";} 
    else if (event.u === "inpt_addtxt_value") { inpt_addtxt_value = event.v;}
    else if (event.u === "inpt_print_value") { inpt_print_value = event.v;}
    else if (event.u === "inpt_addnum_name") { inpt_addnum_name = event.v;}
    else if (event.u === "inpt_addnum_value") { inpt_addnum_value = Number(event.v);}
    else if (event.u === "myfile") { filecontent = event.v;}
    else if (event.u === "btn_savejsfile") { 
      app.display({save:['javascript.json', JSON.stringify(intcode)]});
    }
    
    else if (event.u === "btn_addtextvar") {
      let pushable = {var:{type:"text",name:inpt_addtxt_name.trim(),value:inpt_addtxt_value.trim()}};
      if (intcode.length === 0) {
        intcode.push(pushable);
      } else {
        let nameFound = false;
        for (const element of intcode) {
          if (element.var && element.var.name === inpt_addtxt_name.trim()) {
            element.var.value = inpt_addtxt_value.trim();
            nameFound = true;
            app.display({U:"Your space", v:[]});
            break;
          } 
        }
        if(!nameFound){
            intcode.push(pushable);
        }
        
      }
      app.display({U:"Your space", v:[]});
     }
    else if (event.u === "btn_addnumvar") {
      let pushable = {var:{type:"number",name:inpt_addnum_name.trim(),value:inpt_addnum_value}};
      if (Number.isFinite(inpt_addnum_value)) {
        if (intcode.length === 0) {
          intcode.push(pushable);
        } else {
          let numberFound = false;
          for (const element of intcode) {
            if (element.var && element.var.name === inpt_addnum_name.trim()) {
              element.var.value = inpt_addnum_value;
              numberFound = true;
              app.display({U:"Your space", v:[]});
              break;
            } 
        }
        if(!numberFound){
            intcode.push(pushable);
        }}
  
      app.display({U:"Your space", v:[]});
      } 
      else{
        app.display({add:[{c: "win", closeable: 1, modal:1, v: ["Please enter a number in the value field."]}]});
      }
    }
    else if (event.u === "btn_println") {
      intcode.push({cmd:{type:"print",value:inpt_print_value.trim()}});
      app.display({U:"Your space", v:[]});
    }
    else if (event.u === "btn_loadejsfile") {
      if (event.v != undefined) {
        let filestin = JSON.parse(filecontent);
        for(const element of filestin) {
          if (element.var && element.var.type === "text") {
            newcode += ("let " + element.var.name + " = \"" + element.var.value + "\";" + "\n");
          } else if (element.var && element.var.type === "number") {
            newcode += ("let " + element.var.name + " = " + element.var.value + ";" + "\n");
          }
          else if (element.cmd && element.cmd.type === "print") {
            newcode += ("console.log(\"" + element.cmd.value + "\");" + "\n");
          }
        }
        app.display({U:"Your space", add:[newcode]});
      }
    }
    
      if(newcode!== ""){app.display({U:"Your space", v:[newcode]});}else{app.display({U:"Your space", v:[]});}
      for(const element of intcode) {
        if (element.var && element.var.type === "text") {1
          app.display({U:"Your space",add: [{ c: "txt", v: "let " + element.var.name + " = \"" + element.var.value + "\";" }]});
        } else if ( element.var && element.var.type === "number") {
          app.display({U:"Your space",add: [{ c: "txt", v: "let " + element.var.name + " = " + element.var.value + ";" }]});
        } else if ( element.cmd && element.cmd.type === "print"){  app.display({U:"Your space",add: [{ c: "txt", v: "console.log(\"" + element.cmd.value + "\");" }]});
        
      }
      console.log("intcode: " + intcode);
    }
  });

  // list of things to work with
  //  - making the window closable once the user clicks on the add button
  
  
