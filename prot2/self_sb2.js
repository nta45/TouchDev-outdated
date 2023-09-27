"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["Modules", {c: "win", closeable: 1, modal:1, id: "Add a Variable", 
                    v: [{ v: "", id: "inpt_addtxt_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addtxt_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addtextvar", cap:"Add" }]}],
  ["Print", {c: "win", closeable: 1,modal:1, id: "Add text to display...", 
                    v: [{ v: "", id: "inpt_print_value", cap:"Text to Display ↓", input: 1 }, 
                    "If you want to print a variable you've already set, type the name of the variable",
                        { c: "btn", id:"btn_println", cap: "Print" }]}],
  ["Add a Number Variable", {c: "win", closeable: 1, modal:1,id: "Add a num Variable", 
                    v: [{ v: "", id: "inpt_addnum_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addnum_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addnumvar", cap:"Add" }]}],
  
  ["Save JSON File", {c: "win", closeable: 1,modal:1,id: "Download the JSON File?", 
                    v:["Are you sure you want to download the JSON file?",
                        { c: "btn", id: "btn_savejsfile", cap:"Yes"}]}],
  ["Load JSON File", {c: "win", closeable: 1,modal:1, id: "Load the JSON File?", 
                    v:["Select the JSON file you want to load?", {id:"myfile", cap:"",c:"file",accepts:"text"},
                        { c: "btn", id: "btn_loadejsfile", cap:"Open"}]}],
]);

let MENUBUTTON = new Map([
     
  ]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode, newcode = "";
let inpt_addtxt_name, inpt_addtxt_value, inpt_print_value, inpt_addnum_name, inpt_addnum_value, filecontent;
let code = {screens:[],functions:{home:{vars:[], commands:[]}}};

  app.start(event=>{app.display({
      cap: "Prototype 1 (Summer Research)", require: { c: ["grid", "opt"] }, style: "self_sb2.css",
      value: [
        { id: "Your space"},
        { id: "Options", cap:"", v: [{c:"btn",
            id:"Menu",
            ctx:{toggle:1, v:[
            "This is a context menu",
            {c:"opt",id:"Select Me"},
            {c:"btn",id:"Menu Option 1"},
            {c:"btn",id:"Menu Option 2"},
            {c:"btn",id:"Menu Option 3"}
            ]}}]
        },
        { id: "Options 1", cap:"", v: [
          {c:"btn", id:"A", ctx:{toggle:1, v:[]}},
          {c:"btn", id:"B", ctx:{toggle:1, v:[]}},
          {c:"btn", id:"C", ctx:{toggle:1, v:[]}}]},
        { id: "Options 2", cap:"", v: [
          {c:"btn", id:"X", ctx:{toggle:1, v:[]}},
          {c:"btn", id:"Y", ctx:{toggle:1, v:[]}},
          {c:"btn", id:"Z", ctx:{toggle:1, v:[]}}]},
        { id: "Things to Do", v: [...COMPONENTS.keys()].map((x) => ({ id: x, c: "btn" }))},
      ]
    });
  });

  //app.event({u:''}, event=>{});
  // NEW FORMAT IS THIS ↑


  app.event({}, event=>{
    if (COMPONENTS.has(event.u) && event.v===true) {
      app.display({queue:[{add:[COMPONENTS.get(event.u)]}]});
    }
    // else if (MENUBUTTON.has(event.u) && event.v===true) {
    //     app.display({queue:[{add:[MENUBUTTON.get(event.u)]}]});
    //   }
    else if (event.u === "inpt_addtxt_name") { inpt_addtxt_name = event.v;} 
    else if (event.u === "inpt_addtxt_value") { inpt_addtxt_value = event.v;}
    else if (event.u === "inpt_print_value") { inpt_print_value = event.v;}
    else if (event.u === "inpt_addnum_name") { inpt_addnum_name = event.v;}
    else if (event.u === "inpt_addnum_value") { inpt_addnum_value = Number(event.v);}
    else if (event.u === "myfile") { filecontent = event.v;}
    else if (event.u === "btn_savejsfile") { 
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
      let savablecode = JSON.stringify(code);
      app.display({save:['javascript.json', savablecode]});
    }
    
    else if (event.u === "btn_addtextvar") {
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
    else if (event.u === "btn_addnumvar") {
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
        app.display({add:[{c: "win", closeable: 1, modal:1, v: ["Please enter a number in the value field."]}]});
      }
    }
    else if (event.u === "btn_println") {
      code.functions.home.commands.push({type:"print",value:inpt_print_value.trim()});
      app.display({U:"Your space", v:[]});
    }
    else if (event.u === "btn_loadejsfile") {
      if (event.v != undefined) {
        let filestin = JSON.parse(filecontent);
        for(const element of filestin.functions.home.vars) {
          if (element.type === "text") {
            newcode += ("let " + element.name + " = \"" + element.value + "\";" + "\n");
          } else {
            newcode += ("let " + element.name + " = " + element.value + ";" + "\n");
          }
        }
        for(const element of filestin.functions.home.commands) {
          if (element.type === "print") {
            newcode += ("console.log(\"" + element.value + "\");" + "\n");
          }
        }
        app.display({U:"Your space", add:[newcode]});
      }
    }
    
      if(newcode!== ""){app.display({U:"Your space", v:[newcode]});}else{app.display({U:"Your space", v:[]});}
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

  // list of things to work with
  //  - making the window closable once the user clicks on the add button
  
  
