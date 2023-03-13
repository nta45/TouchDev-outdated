"use strict"

logToConsole();

var COMPONENTS = new Map([ 
    ['Add Number', {"c":"num","id":"Number","v":[{v:0, "id": "input", input:1},{"c":"btn", "id": "Add"}]}],
    // ['Add "if" Condition', {"c":"btn", "v": []}]
]);

var latestcode = '{"v":[\n  \n]}\n';
var newcode = '{"v":[\n  \n]}\n';

function userEvent(event){
    if(event.t==0){ // handshake
        app.display({
            cap:'UINL screen builder',
            require:{c:['grid','opt']},
            style:'self_sb.css',
            value: [
                {id:'Your space'},
                {id:"Items to Add", v:[...COMPONENTS.keys()].map(x=>({id:x, c:'btn'}))},
            ]
        })
    } else{ // after handshake 
        var itemid = event.u;
        var itemval = event.v;
        var dUpdates = [{U:'Warning', v:null}];

        if(COMPONENTS.has(itemid)){
            let preview=JSON.parse(latestcode); // parse the JSON
            //check if there is already code, if not create empty
            if(!preview.v || preview.v.constructor!==Array)preview.v=[];
            
            preview.v.push(COMPONENTS.get(itemid));
            latestcode=JSON.stringify(preview,null,2);
            // displayUpdates.push({U:'UINLcode',v:lastValidUINLcode});
            preview.id='Your space';
            preview.i=1;
            // uinl.df={on:{pc:[]}};
            dUpdates.push({U:'Your space',v:null},{add:[preview]});
        }
        if(itemid==='Add'){
            dUpdates.push({U:'Your space', add:[{"c":"txt","v":"number = " + itemval}]});
        }
        app.display({Q:dUpdates});
    }
}
