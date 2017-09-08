
/**
 * FCFActivityController
 *
 * @description :: Server-side logic for managing Fcfactivities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    _config: {
        model: "fcfactivity", // all lowercase model name
        actions: true,
        shortcuts: true,
        rest: true
    },

    requestTranslation: function(req, resp) {
	var values = req.allParams();
        ADCore.queue.publish('opsportal.translation.create', values);
	ADCore.comm.success(resp, {});
    }
	
};

