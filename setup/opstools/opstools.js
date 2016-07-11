/**
 * This file specifies any default Ops Portal Tool Definitions 
 * provided by this modlue.
 *  
 */
module.exports = [

    { 
        key:'adroit.activityManager', 
        permissions:'fcf.activitymanager.view, adcore.developer', 
        icon:'fa-sticky-note-o', 
        controller: 'FCFActivityManager',
        label: 'opp.toolFCFActivityManager',
        context:'opsportal',
        isController:true, 
        options:{}, 
        version:'0' 
    }

];
