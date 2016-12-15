steal(
	'opstools/FCFActivityManager/models/base/FCFActivity.js',
	function() {
        System.import('appdev').then(function() {
			steal.import('appdev/model/model').then(function() {

				// Namespacing conventions:
				// AD.Model.extend('[application].[Model]', {static}, {instance} );  --> Object
				AD.Model.extend('opstools.FCFActivityManager.FCFActivity', {
					/*
							findAll: 'GET /fcf_activity_manager/fcfactivity',
							findOne: 'GET /fcf_activity_manager/fcfactivity/{id}',
							create:  'POST /fcf_activity_manager/fcfactivity',
							update:  'PUT /fcf_activity_manager/fcfactivity/{id}',
							destroy: 'DELETE /fcf_activity_manager/fcfactivity/{id}',
							describe: function() {},   // returns an object describing the Model definition
							fieldId: 'id',             // which field is the ID
							fieldLabel:'activity_name'      // which field is considered the Label
					*/
				}, {
						/*
								// Already Defined:
								model: function() {},   // returns the Model Class for an instance
								getID: function() {},   // returns the unique ID of this row
								getLabel: function() {} // returns the defined label value
						*/
					});

			});
		});
	});