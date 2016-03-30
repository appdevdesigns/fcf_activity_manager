
steal(
	// List your Controller's dependencies here:
	'opstools/FCFActivityManager/views/FCFActivityManager/FCFActivityManager.ejs',
	        'opstools/FCFActivityManager/controllers/crud1FCFActivity.js',
    function(){
		System.import('appdev').then(function() {
			steal.import('appdev/ad',
				'appdev/control/control',
				'OpsPortal/classes/OpsTool',
				'site/labels/opstool-FCFActivityManager').then(function() {

					// Namespacing conventions:
					// AD.Control.OpsTool.extend('[ToolName]', [{ static },] {instance} );
					AD.Control.OpsTool.extend('FCFActivityManager', {

						init: function(element, options) {
							var self = this;
							options = AD.defaults({
								templateDOM: '/opstools/FCFActivityManager/views/FCFActivityManager/FCFActivityManager.ejs',
								resize_notification: 'FCFActivityManager.resize',
								tool: null   // the parent opsPortal Tool() object
							}, options);
							this.options = options;

							// Call parent init
							this._super(element, options);

							this.initDOM();
            this.initWebixCrud();
						},



						                initWebixCrud: function() {
                            var _this = this;

                            var webixCrudControllers = {
                "opstools.FCFActivityManager.crud1FCFActivity" : { el:".crud1FCFActivity", opt:{} }
                            }

                            this._crudPortals = {};

                            var initPortal = function(ref, el, options) {
                                var portalKey = ref.split('.').pop();
                                var Controller = AD.Control.get(ref);
                                _this._crudPortals[portalKey] = new Controller( el, options );
                            }

                            for(var cKey in webixCrudControllers) {
                                initPortal(cKey, webixCrudControllers[cKey].el, webixCrudControllers[cKey].opt);
                            }

                            // insert ourself into the resize() chain:
                            this._crudOldResize = this.resize;
                            this.resize = function(data){
                                _this._crudOldResize(data);

                                for (var p in _this._crudPortals) {
                                    _this._crudPortals[p].resize(data);
                                }
                            }
                        }, 

                        initDOM: function () {

							this.element.html(can.view(this.options.templateDOM, {}));

						},



						'.ad-item-add click': function($el, ev) {

							ev.preventDefault();
						}


					});

				});
		});

	});