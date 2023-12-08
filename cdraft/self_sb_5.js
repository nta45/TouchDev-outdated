"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["Add a Text Variable", {c: "win", modal:1, closeable: 1, id: "Add a Variable", 
                    v: [{ v: "", id: "inpt_addtxt_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addtxt_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addtextvar", cap:"Add" }]}],
  ["Add a Number Variable", {c: "win", closeable: 1, modal:1,id: "Add a num Variable", 
                    v: [{ v: "", id: "inpt_addnum_name", cap:"Name", input: 1 },{ v: "", id: "inpt_addnum_value", cap:"Value", input: 1 },
                        { c: "btn", id: "btn_addnumvar", cap:"Add" }]}],
  ["Add Text to Display", {c: "win", closeable: 1,modal:1, id: "Add text to display", 
                    v: [{ v: "", id: "inpt_print_value", cap:"Text to Display ↓", input: 1 }, 
                    "If you want to print a variable you've already set, type the name of the variable",
                        { c: "btn", id:"btn_println", cap: "Print" }]}],
  ["Save JSON File", {c: "win", closeable: 1,modal:1,id: "Download the JSON File?", 
                    v:["Are you sure you want to download the JSON file?",
                        { c: "btn", id: "btn_savejsfile", cap:"Yes"}]}],
  ["Load JSON File", {c: "win", closeable: 1,modal:1, id: "Load the JSON File?", 
                    v:["Select the JSON file you want to load?", {id:"myfile", cap:"",c:"file",accepts:"text"},
                        { c: "btn", id: "btn_loadejsfile", cap:"Open"}]}],
  // link to index2.html
  // ["Open Prototype 1", {c: "win", closeable: 1,modal:1, id: "Open Prototype 1", 
  //                   v:[{ c: "btn", id: "prot1", cap:"Open"}]}] 
]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode, newcode = "";
let inpt_addtxt_name, inpt_addtxt_value, inpt_print_value, inpt_addnum_name, inpt_addnum_value;
let filecontent, inpt_edit_name, inpt_edit_value;

// let code = {screens:[],functions:{home:{vars:[], commands:[]}}};
// let code = {vars:[], commands:[]};
// let code = {screens:[],functions:{home:{vars:[], commands:[]}}};
let intcode = [];

  app.start(event=>{app.display({
      cap: "JavaScript TouchDev (in-progress)", require: { c: ["grid", "opt"] }, style: "self_sb_5.css",
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
    else if (event.u === "inpt_edit_name") { inpt_edit_name = event.v;} 
    else if (event.u === "inpt_edit_value") { inpt_edit_value = event.v;} 
    else if (event.u === "inpt_addtxt_value") { inpt_addtxt_value = event.v;}
    else if (event.u === "inpt_print_value") { inpt_print_value = event.v;}
    else if (event.u === "inpt_addnum_name") { inpt_addnum_name = event.v;}
    else if (event.u === "inpt_addnum_value") { inpt_addnum_value = Number(event.v);}
    else if (event.u === "myfile") { filecontent = event.v;}
    else if (event.u === "btn_savejsfile") { 
      app.display({save:['javascript.json', JSON.stringify(intcode)]});
    }
    
    else if (event.u === "btn_addtextvar") {
      let pushable = {type:"LET_STATEMENT", name:inpt_addtxt_name.trim(), value:inpt_addtxt_value.trim(), variableType:"STRING"};
      if (intcode.length === 0) {
        intcode.push(pushable);
      } else {
        let nameFound = false;
        for (const element of intcode) {
          if (element.name === inpt_addtxt_name.trim()) {
            element.value = inpt_addtxt_value.trim();
            nameFound = true;
            app.display({U:"Your space", v:[]});
            break;
          } 
        }
        if(!nameFound){intcode.push(pushable);}  
      }

      app.display({queue:[{update:["Add a Variable"], v:null}]});
      app.display({U:"Your space", v:[]});
    }
    else if (event.u === "btn_addnumvar") {
      let pushable = {type:"LET_STATEMENT",name:inpt_addnum_name.trim(),value:inpt_addnum_value, variableType:"NUMBER"};
      if (Number.isFinite(inpt_addnum_value)) {
        if (intcode.length === 0) {
          intcode.push(pushable);
        } else {
          let numberFound = false;
          for (const element of intcode) {
            if (element.name === inpt_addnum_name.trim()) {
              element.value = inpt_addnum_value;
              numberFound = true;
              app.display({U:"Your space", v:[]});
              break;
            } 
        }
        if(!numberFound){
            intcode.push(pushable);
        }}
  
        app.display({queue:[{update:["Add a num Variable"], v:null}]});
        app.display({U:"Your space", v:[]});
      } 
      else{
        app.display({add:[{c: "win", closeable: 1, modal:1, v: ["Please enter a number in the value field."]}]});
      }
    }

    // WORK DONE: if variable exists, put '_ident' as a prefix; if variable doesn't exist, push as is

    else if (event.u === "btn_println") {
      for (const element of intcode) {
        if (element.name === inpt_print_value.trim()) {
          inpt_print_value = "ident_" + inpt_print_value.trim();
        } else {
          inpt_print_value = inpt_print_value.trim();
        }
      }
      intcode.push({type:"FUNCTION_CALL_STATEMENT",name:"print", args:[inpt_print_value.trim()]});
      app.display({queue:[{update:["Add text to display"], v:null}]});
      app.display({U:"Your space", v:[]});
    }
    else if (event.u === "btn_loadejsfile") {
      if (event.v != undefined) {
        let filestin = JSON.parse(filecontent);
        for(const element of filestin) {
          if (element.type == "LET_STATEMENT" && element.variabletype === "STRING") {
            newcode += ("let " + element.name + " = \"" + element.value + "\";" + "\n");
          } else if (element.type == "LET_STATEMENT" && element.variabletype === "NUMBER") {
            newcode += ("let " + element.name + " = " + element.value + ";" + "\n");
          }
          else if (element.type == "FUNCTION_CALL_STATEMENT" && element.name === "print") {
            newcode += ("console.log(\"" + element.args + "\");" + "\n");
          }
        }
        app.display({queue:[{update:["Load the JSON File?"], v:null}]});
        app.display({U:"Your space", add:[newcode]});
      }
    }
     else if (event.u.startsWith("btn_edit")) {
    //   // Display an edit interface, maybe a modal with a text input
      let currentCodeLine = parseInt(event.u.slice(-1));
      if(intcode[currentCodeLine].type == "LET_STATEMENT"){ 
      app.display({queue:[{add:[{ c: "win", closeable: 1, modal:1, id: "Edit a Variable",
        v: [{ v: intcode[currentCodeLine].name, id: "inpt_edit_name", cap:"Name", input: 1 },
        { v: intcode[currentCodeLine].value, id: "inpt_edit_value", cap:"Value", input: 1 },
            { c: "btn", id: "make_edit" + currentCodeLine, cap:"Change" }]
          /* your edit interface with currentCodeLine */ }]}]});}
          else if (intcode[currentCodeLine].type == "FUNCTION_CALL_STATEMENT"){
            app.display({queue:[{add:[{ c: "win", closeable: 1, modal:1, id: "Edit a Print",
        v: [{ v: intcode[currentCodeLine].args, id: "inpt_edit_name", cap:"Name", input: 1 },
            { c: "btn", id: "make_edit" + currentCodeLine, cap:"Change" }]
         }]}]});}
         
      }
      
     else if (event.u.startsWith("make_edit")) {
        let linenum = parseInt(event.u.slice(-1));

        console.log("Before Update: ", intcode[linenum]);

        if (typeof inpt_edit_name != 'undefined' && inpt_edit_name != intcode[linenum].name) {
          intcode[linenum].name = inpt_edit_name;
        } else if (typeof inpt_edit_value != 'undefined' &&inpt_edit_value != intcode[linenum].value){
          intcode[linenum].value = inpt_edit_value;
        }
        console.log("After Update: ", intcode[linenum]);
        app.display({queue:[{update:["Edit a Variable"], v:null}]});
        app.display({queue:[{update:["Edit a Print"], v:null}]});
        app.display({U:"Your space", v:[]});

    }
    else if (event.u.startsWith("btn_trash")) {
      let linenum = parseInt(event.u.slice(-1));
      intcode.splice(linenum,1);

      
      
      app.display({U:"Your space", v:[]});
    }
    
    
    /***** PUT SEPARATELY AS A FUNCTION CALLED CLEAR SCREEN AND ADD AGAIN *******/
      if(newcode!== ""){app.display({U:"Your space", v:[newcode]});}else{app.display({U:"Your space", v:[]});}
      intcode.forEach((element, line) => {
        let editandline = [{c: "btn", id: "btn_edit" + line, cap:"✏️"}, {c: "btn", id: "btn_trash" + line, cap:"🗑️"}, { c: "txt", v: "let " + element.name + " = \"" + element.value + "\";"}];
        
        if (element.type == "LET_STATEMENT" && element.variableType === "STRING") {  
          app.display({U:"Your space",add: [editandline]});
        } else if ( element.type == "LET_STATEMENT" && element.variableType === "NUMBER") {
          app.display({U:"Your space",add: [editandline]});
        } else if ( element.type == "FUNCTION_CALL_STATEMENT" && element.name === "print"){
          let editandprint = [{c: "btn", id: "btn_edit" + line, cap:"✏️"}, {c: "btn", id: "btn_trash" + line, cap:"🗑️"}, { c: "txt", v: "console.log(\"" + element.args + "\");"}];
          app.display({U:"Your space",add: [editandprint]});
      }
      console.log("intcode: " + intcode);
      }
    /*******************   *****/
    
  )});
/** OUTPUT FORMAT --- 
  SELF-SB-5 object shows 4 variables added as
  intcode = [
    {type:'LET_STATEMENT', name:'', value:'', variableType:'', id:''},
    {type:'LET_STATEMENT', name:'', value:'', variableType:'', id:''},
    {type:'FUNCTION_CALL_STATEMENT', name:'', args:[], id:''},
    {type:'LET_STATEMENT', name:'', value:'', variableType:'', id:''}
  ]
**/  
  
