"use strict";

logToConsole();

let COMPONENTS = new Map([
  ["➕\n New File", {c: "btn", cap:" New File",id: "btn_newfile",}],
  ["📁\n Open File", {c: "win", cap:"", closeable: 1,modal:1, id: "Open File", 
                    v:["Select the '.JSON' file you want to load:", {id:"myfile", cap:"",c:"file",accepts:"text"},
                        { c: "btn", id: "btn_openfile", cap:"Open"}]}],
  ["❓\n Help", {c: "btn", cap:" New File",id: "btn_help",}],
]);

let latestcode = '{"v":[\n  \n]}\n';
let jscode, newcode = "";
let inpt_addtxt_name, inpt_addtxt_value, inpt_print_value, inpt_addnum_name, inpt_addnum_value, filecontent;
let code = {screens:[],functions:{home:{vars:[], commands:[]}}};

  app.start(event=>{app.display({
      cap: "TouchDev Homepage (draft 1)", require: { c: ["grid", "opt"] }, style: "frontpage.css",
      value: [
        { id: "Options", cap:"", v: [{c:"btn",
            id:"Menu", cap: "⚙️",
            ctx:{toggle:1, v:[
            "This is a context menu",
            {c:"opt",id:"Select Me"},
            {c:"btn",id:"Menu Option 1"},
            {c:"btn",id:"Menu Option 2"},
            {c:"btn",id:"Menu Option 3"}
            ]}}, {c:"btn",
            id:"Profile", cap: "👤",
            ctx:{toggle:1, v:[
            "This is a context menu",
            {c:"opt",id:"Select Me"},
            {c:"btn",id:"Menu Option 1"},
            {c:"btn",id:"Menu Option 2"},
            {c:"btn",id:"Menu Option 3"}
            ]}}]
        },
         {id:"TouchDev", cap:"", v:["TouchDev"]},
        { id: "Get Started", v: [...COMPONENTS.keys()].map((x) => ({ id: x, c: "btn" }))},
        {id:"Recent", cap:"\n\n\nRecent Files", v:["No Recent Files"]},
      ]
    });
  });

  //app.event({u:''}, event=>{});
  // NEW FORMAT IS THIS ↑


  app.event({}, event=>{
    if (event.u === "➕\n New File") { window.location.href = "index.html";} 
    else if (event.u === "📁\n Open File") { window.location.href = "index2.html";} 
    else if (event.u === "❓\n Help") { window.location.href = "help.html";}
    else if (event.u === "myfile") { filecontent = event.v;}
    
  });

  // list of things to work with
  //  - making the window closable once the user clicks on the add button
  
  
