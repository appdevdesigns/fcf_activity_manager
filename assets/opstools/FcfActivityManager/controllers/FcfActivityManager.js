
steal(
	// List your Controller's dependencies here:
	'opstools/FcfActivityManager/views/FcfActivityManager/FcfActivityManager.ejs',
	function() {
		System.import('appdev').then(function() {
			steal.import('appdev/ad',
				'appdev/control/control',
				'OpsPortal/classes/OpsTool',
				'site/labels/opstool-FcfActivityManager').then(function() {

					// Namespacing conventions:
					// AD.Control.OpsTool.extend('[ToolName]', [{ static },] {instance} );
					AD.Control.OpsTool.extend('FcfActivityManager', {

						init: function(element, options) {
							var self = this;
							options = AD.defaults({
								templateDOM: '/opstools/FcfActivityManager/views/FcfActivityManager/FcfActivityManager.ejs',
								resize_notification: 'FcfActivityManager.resize',
								tool: null   // the parent opsPortal Tool() object
							}, options);
							this.options = options;

							// Call parent init
							this._super(element, options);

							this.initDOM();
						},



						initDOM: function() {

							this.element.html(can.view(this.options.templateDOM, {}));

						},



						'.ad-item-add click': function($el, ev) {

							ev.preventDefault();
						}


					});

				});
		});

	});