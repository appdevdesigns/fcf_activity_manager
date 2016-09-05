/**
 * This file specifies any default Ops Portal Tool Definitions 
 * provided by this modlue.
 *  
 */
module.exports = [

    { 
        key:'adroit.activityManager', 
        permissions:'fcf.activitymanager.view', 
        icon:'fa-sticky-note-o', 
        controller: 'FCFActivityManager',
        label: 'Adroit Activity Manager',
        // context:'opsportal',
        isController:true, 
        options:{}, 
        version:'0' 
    }

];
