steal(
    // List your Controller's dependencies here:
	'opstools/FCFActivityManager/controllers/CustomFilterPopup.js',
    'opstools/FCFActivities/models/ActivityImage.js',
    function () {
        System.import('appdev').then(function () {
            steal.import('appdev/ad',
                'appdev/control/control').then(function () {


					// Namespacing conventions:
					// AD.Control.extend('[application].[controller]', [{ static },] {instance} );
					AD.Control.extend('opstools.FCFActivityManager.crud1FCFActivityImages', {



						init: function (element, options) {

                            this.options = options;

                            // Call parent init
                            this._super(element, options);

                            this.Model = AD.Model.get('opstools.FCFActivities.ActivityImage');

							this.initControllers();
                            this.initDOM();
                            this.loadData();
                        },


                        initControllers: function () {

                            this.controllers = {};  // hold my controller references here.

                            var CustomFilterPopup = AD.Control.get('opstools.FCFActivityManager.CustomFilterPopup');
                            this.controllers.CustomFilterPopup = new CustomFilterPopup(this.element);
                        },


                        initDOM: function () {
                            var _this = this;

                            var ControllerName = "crud1FCFActivityImages";
                            this.idToolbar = ControllerName + 'Toolbar';
                            var idSearch = ControllerName + "Search";
                            this.idPagerA = ControllerName + "PagerA";
                            this.idTable = ControllerName + "Table";
                            this.idPagerB = ControllerName + "PagerB";
                            this.idForm = ControllerName + "Form";
                            this.idFormButtons = this.idForm + "Buttons";

                            this.idUploadedBy = this.idForm + "UploadedBy";

                            webix.ui({
                                view: "filter_popup",
                                id: "activity_images_filter_popup"
                            }).hide();

                            webix.ready(function () {

                                var lblList = AD.lang.label.getLabel('webix.common.list') || 'List*';
                                var lblNew = AD.lang.label.getLabel('webix.common.new') || 'New*';
                                var lblFilter = AD.lang.label.getLabel('webix.common.filter') || 'Filter*';
                                var lblCancel = AD.lang.label.getLabel('webix.common.cancel') || 'Cancel*';
                                var lblSave = AD.lang.label.getLabel('webix.common.save') || 'Save*';


                                var toolbar1 = {
                                    id: _this.idToolbar,
                                    "view": "toolbar",
                                    "css": "highlighted_header header3",
                                    "paddingX": 5,
                                    "paddingY": 5,
                                    "height": 40,
                                    "cols": [
                                        {
                                            view: "button",
                                            icon: "list",
                                            type: "icon",
                                            width: 80,
                                            label: lblList,
                                            batch: 'form',
                                            click: function () {

                                                var lblConfirm = AD.lang.label.getLabel('webix.common.confirmSwitchToList') || '*Switch to List without saving any changes?';

                                                webix.confirm({

													text: lblConfirm,

													callback: function (result) {

														if (result) {

															_this.toList();
														}
													}
                                                });

                                                return false;
                                            }
                                        },
                                        {
                                            view: "button",
                                            width: 80,
                                            icon: "plus",
                                            type: "icon",
                                            label: lblNew,
                                            batch: 'list',
                                            click: function () {

                                                $$(_this.idTable).clearSelection();     // visual 
                                                _this.dataCollection.setCursor(null);   // no data selected

                                                $$(_this.idForm).clear();

                                                _this.toForm();
                                            }
                                        },
                                        {
                                            view: "button",
                                            width: 80,
                                            icon: "filter",
                                            type: "icon",
                                            label: lblFilter,
                                            batch: 'list',
											popup: 'activity_images_filter_popup'
                                        },
                                        {
                                            view: "search",
                                            id: idSearch,
                                            keyPressTimeout: 100,
                                            batch: 'list'
                                        },
                                        {
                                            view: "pager",
                                            id: _this.idPagerA,
                                            template: "{common.prev()} {common.pages()} {common.next()}",
                                            size: 15,
                                            group: 5,
                                            batch: 'list'
                                        }
                                    ]
                                };


                                _this.webixLayout = webix.ui({
                                    container: ControllerName,
                                    "rows": [
                                        toolbar1,
                                        {
                                            view: "datatable",
                                            id: _this.idTable,
                                            pager: _this.idPagerA,
											rowHeight: 100,
                                            columns: [
                                                { "id": "activity", "header": "Activity", "width": 70 },
                                                { "id": "image", "header": "Image", "editor": "text", "template": function(obj) {

                                                	if (obj.image) {
                                                		return '<div adopimage="true" opimage-url="'+obj.image+'"></div>';
                                                	} else {
                                                		return "null";
                                                	}
                                                }, "width": 150 },
                                                { "id": "caption", "header": "Caption", "editor": "text", "filter_type": "text", "fillspace": true },
                                                { "id": "caption_govt", "header": "Caption (Govt)", "editor": "text", "filter_type": "text","fillspace": true },
                                                { "id": "date", "header": "Date", "filter_type": "date","width": 100 },
                                                { "id": "uploadedBy", "header": "Uploaded by", "template": "#displayName#", "filter_type": "text", "filter_value": function(r) { return r.displayName; }, "width": 140 },

                                                // { id:"copy",  header:"" , width:40, css:{"text-align":"center"}, template:function(obj) { return "<div class='clone fa fa-copy fa-2 offset-9 rbac-role-list-clone' role-id='"+obj.id+"'  ></div>"; } } ,
                                                { id: "trash", header: "", width: 40, css: { "text-align": "center" }, template: "<span class='trash'>{common.trashIcon()}</span>" }
                                            ],

                                            select: "row",
                                            yCount: 15,
                                            scrollY: false,
                                            scrollX: false,
                                            navigation: "true",

                                            on: {

                                                // onAfterEditStop: function(state, editor, ignoreUpdate){

                                                //     if(state.value != state.old){
                                                //         webix.message("Cell value was changed");
                                                //         var model = _this.dataCollection.AD.getModel(editor.row);
                                                //         model.attr(editor.column, state.value);
                                                //         model.save()
                                                //         .fail(function(err){
                                                //             AD.error.log('RBAC:Roles:onAfterEditStop(): error updating action', { error:err, model:model.attr(), editor:editor });
                                                //         })
                                                //         .then(function(){
                                                //             webix.message("Model value was changed");
                                                //         })

                                                //     }  
                                                // },
                                                onAfterRender:function(){

                                                    $('div[view_id="'+_this.idTable+'"] div[adopimage]').each(function(indx, el){

                                                        new AD.op.Image(el, {width:150});
                                                    })
                                                },


                                                onItemClick: function (id) {

                                                    _this.dataCollection.setCursor(id);
                                                    _this.toForm();
                                                }

                                            },

                                            onClick: {
												openImage: function (e, id, trg) {
													var imageUrl = $$(_this.idTable).getItem(id)[id.column];

													webix.ui({
														id: "image_popup",
														view: "window",
														position: "center",
														head: {
															view: "toolbar", cols: [
																{ view: "label", label: id.column + ' image' },
																{ view: "button", label: "X", width: 70, click: ("$$('image_popup').close();") }
															]
														},
														body: {
															template: '<img src="' + imageUrl + '" width="680" />'
														},
														modal: true,
														resize: true,
														height: 500,
														width: 700,
													}).show();

													return false;
												},
												trash: function (e, id) {

													var model = _this.dataCollection.AD.getModel(id);
													var lblConfirm = AD.lang.label.getLabel('webix.common.confirmDelete', [model.getLabel()]) || '*Remove : ' + model.getLabel();
													webix.confirm({

														text: lblConfirm,

														callback: function (result) {

															if (result) {

																_this.dataCollection.AD.destroyModel(id)
																	.fail(function (err) {
																		AD.error.log('Error destroying entry.', { error: err, role: role, id: id, other: 'crud1PermissionRole' });
																	})
																	.then(function (oldData) {

																		// _this.dom.roleForm.hide();

																	});
															}
														}
													});

													return false;
												}
                                            }
										},
										{
											view: "pager",
											id: _this.idPagerB,
											template: "{common.prev()} {common.pages()} {common.next()}",
											size: 15,
											group: 5
										},

										//// Begin Form

										{
											view: "form",
											id: _this.idForm,
											type: "line",
											elementsConfig: {
												labelPosition: "top",
												//                                on:{ onchange:function(newv, oldv){  
												//                                        webix.message("Value changed from: "+oldv+" to: "+newv);
												//                                }}
											},
											elements: [
												{ "view": "text", "label": "Activity", "name": "activity" },
												{ "view": "text", "label": "Image", "name": "image", "type": "text" },
												{ "view": "text", "label": "Caption", "name": "caption", "type": "text" },
												{ "view": "text", "label": "Caption (Govt)", "name": "caption_govt", "type": "text" },
												{ "view": "datepicker", "label": "Date", "name": "date", "timepicker": false },
												{ "view": "text", "label": "Uploaded by", "name": "displayName", "id": _this.idUploadedBy }
												// {
												//     view:   "text",
												//     label:  "Role Label",
												//     name:   "role_label",
												//     type:   "text"
												// },
												// {
												//     view:   "text",
												//     label:  "Role Description",
												//     name:   "role_description",
												//     type:   "text"
												// }

											],
											rules: {

												// role_label: webix.rules.isNotEmpty,
												// role_description: webix.rules.isNotEmpty
											}
										},
										{
											id: _this.idFormButtons,
											"type": "line",
											"rows": [
												{
													"type": "line",
													"cols": [
														{
															"view": "button",
															"label": lblCancel,
															"width": 80,
															click: function () {

																_this.toList();

															}
														},
														/*
														{
															"view": "button",
															"label": "Edit",
															"width": 80,
															click: function (){
																	$("toolbar1").showBatch("batch3");
																	$("addFormView").hide();
																	$("addFormEdit").show();
																	this.hide();
																	$("$button1").show()
																  
															}
														},
														*/
														{
															"view": "button",
															"label": lblSave,
															"width": 80,
															click: function () {

																var isAdd = false;

																var form = $$(_this.idForm);
																if (form.validate()) {

																	// if an update, then there is a current model
																	var model = _this.dataCollection.AD.currModel();
																	if (model == null) {

																		// else this is a create operation:
																		model = new _this.Model();
																		isAdd = true;
																	}
																	var values = form.getValues();

																	model.attr(values);
																	model.save()
																		.fail(function (err) {
																			if (!AD.op.WebixForm.isValidationError(err, form)) {
																				AD.error.log('Error saving current model ()', { error: err, values: values });
																			}
																		})
																		.then(function (newData) {
																			if (isAdd) {

																				// the new model obj doesn't have the fully populated data
																				// like a new read would, so perform a lookup and store that:
																				_this.Model.findOne({ id: newData.getID() })
																					.fail(function (err) {
																						AD.error.log('Error looking up new model:', { error: err, newData: newData, id: newData.getID() })
																					})
																					.then(function (newModel) {
																						if (newModel.translate) { newModel.translate(); }
																						_this.data.unshift(newModel);
																						_this.toList();
																					})

																			} else {
																				_this.toList();
																			}
																		})

																}

															}
														},
														{
															"view": "spacer"
														}
													]
												}
											]
										}

                                        //// end form


                                    ]
                                });

								_this.toList();


								$$(_this.idPagerA).clone($$(_this.idPagerB));

								$$(idSearch).attachEvent("onTimedKeyPress", function () {
									//get user input value
									var value = this.getValue().toLowerCase();

									$$(_this.idTable).filter(function (obj) {
										var label = _this.Model.fieldLabel;
										return obj[label].toLowerCase().indexOf(value) != -1;
									})
								});

								$$('activity_images_filter_popup').registerDataTable($$(_this.idTable));

							}); // end Webix.ready()


							// resize after tab is shown
							$('.crud1FCFActivityImages').click(function () {

								// setImmediate() gives the DOM a chance to display the 
								// tab contents before we calculate the sizes:
								AD.sal.setImmediate(function () {
									_this.resize();
								});

							});

						},


						loadData: function () {
							var _this = this;

							this.Model.findAll()
								.fail(function (err) {
									AD.error.log('crud1FCFActivityImages: Error loading Data', { error: err });
								})
								.then(function (list) {
									// make sure they are all translated.
									list.forEach(function (l) {
										if (l.translate) { l.translate(); }
									})
									_this.data = list;
									_this.dataCollection = AD.op.WebixDataCollection(list);
									webix.ready(function () {

										$$(_this.idTable).data.sync(_this.dataCollection);
										$$(_this.idForm).bind(_this.dataCollection);

									});

								});
						},

						toList: function () {
							$$(this.idToolbar).showBatch('list');
							$$(this.idForm).hide();
							$$(this.idFormButtons).hide();

							$$(this.idTable).show();
							$$(this.idPagerA).show();
							$$(this.idPagerB).show();
						},

						toForm: function () {
							$$(this.idToolbar).showBatch('form');

							var form = $$(this.idForm);
							form.clearValidation();

							form.show();

							$$(this.idFormButtons).show();

							$$(this.idUploadedBy).disable();

							$$(this.idTable).hide();
							$$(this.idPagerA).hide();
							$$(this.idPagerB).hide();
						},


						// modelCreate:function(attrs) {
						//     var _this = this;
						//     var dfd = AD.sal.Deferred();

						//     this.Model.create(attrs)
						//     .fail(function(err){
						//         AD.error.log('Error creating new model.', {error:err, attrs:attrs});
						//         dfd.reject();
						//     })
						//     .then(function(data){

						//         // now do a full find for this entry, so we have all the filled out info:
						//         this.Model.findOne({ id:data[this.Model.fieldId] })
						//         .fail(function(err){
						//             AD.error.log('Error looking up new model instance.', {error:err, model:data});
						//             dfd.reject();
						//         })
						//         .then(function(newModel){

						//             // console.log('... new cloned Role:', newRole);
						//             newModel.translate();

						//             dfd.resolve(newModel);
						//         });

						//     });

						//     return dfd;
						// },


						resize: function (data) {

							var table = $("#crud1FCFActivityImages");
							var width = 0;
							if (table[0]) {
								width = $(table[0]).parent().css('width');
								if (width) {
									width = width.replace('px', '');
									width = parseInt(width);
								}
							}
							if (width > 100) {
								webix.toNode("crud1FCFActivityImages").style.width = width;
								this.webixLayout.adjust();
							}
						}


					});



				});

        });

    });