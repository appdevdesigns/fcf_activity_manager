steal(
	function() {
		System.import('appdev').then(function() {
			steal.import('appdev/model/model').then(function() {

				// Namespacing conventions:
				// AD.Model.Base.extend("[application].[Model]" , { static }, {instance} );  --> Object
				AD.Model.Base.extend("opstools.FCFActivityManager.FCFActivity", {
					findAll: 'GET /fcf_activity_manager/fcfactivity',
					findOne: 'GET /fcf_activity_manager/fcfactivity/{id}',
					create: 'POST /fcf_activity_manager/fcfactivity',
					update: 'PUT /fcf_activity_manager/fcfactivity/{id}',
					destroy: 'DELETE /fcf_activity_manager/fcfactivity/{id}',
					describe: function() {
						return {};
					},
					// associations:['actions', 'permissions'],
					// multilingualFields:['role_label', 'role_description'],
					// validations: {
					//     "role_label" : [ 'notEmpty' ],
					//     "role_description" : [ 'notEmpty' ]
					// },
					fieldId: 'id',
					fieldLabel: 'null'
				}, {
						// model: function() {
						//     return AD.Model.get('FcfActivityManager.FCFActivity'); //AD.models.FcfActivityManager.FCFActivity;
						// },
						// getID: function() {
						//     return this.attr(this.model().fieldId) || 'unknown id field';
						// },
						// getLabel: function() {
						//     return this.attr(this.model().fieldLabel) || 'unknown label field';
						// }
					});

			});
		});

	});