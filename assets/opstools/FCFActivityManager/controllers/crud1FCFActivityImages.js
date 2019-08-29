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
							this.caption = ControllerName + "caption";
							this.captionTrans = ControllerName + "captionTrans";
                            this.idFormButtons = this.idForm + "Buttons";

                            this.idUploadedBy = this.idForm + "UploadedBy";
                            this.idImage = this.idForm + "Image";
                            this.idImagePreview = this.idForm + "ImagePreview";

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
                                var lblTranslate = AD.lang.label.getLabel('webix.common.translate') || 'Request Translation*';
                                var lblTranslateCreate = AD.lang.label.getLabel('webix.common.translatecreate') || 'Translation Request Created*';
                                var lblTranslateCreateInfo = AD.lang.label.getLabel('webix.common.translatecreateinfo') || 'You can adjust the translation in the Process Translation tool.*';


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
                                        /*{
                                            view: "button",
                                            width: 80,
                                            icon: "plus",
                                            type: "icon",
                                            label: lblNew,
                                            batch: 'list',
                                            hidden: true,
                                            click: function () {

                                                $$(_this.idTable).clearSelection();     // visual 
                                                _this.dataCollection.setCursor(null);   // no data selected

                                                $$(_this.idForm).clear();

                                                _this.toForm();
                                            }
                                        },*/
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
                                            template: "{common.prev()} {common.pages()} {common.next()} Total Images: #count#",
					    css: "fcf-activity-manager-pager",
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
					    rowHeight: 140,
                                            columns: [
                                                { "id": "activity", "header": "Activity", "width": 70, "filter_type": "number", "sort":"int" },
                                                { "id": "image", "header": "Image", "editor": "text", "css": "imageCol", "template": function(obj) {

                                                	if (obj.image) {
                                                		return (
															'<div adopimage="true" opimage-url="'+obj.image+'" class="fcfactivitymanager-column-image"></div>' + 
															'<div class="fcfactivitymanager-column-image-download">' +
															'<a href="' + obj.fullImageUrl + '" download="activity_image.jpg" class="downloadImage">Download</a>' +
															'</div>');
                                                	} else {
                                                		return "null";
                                                	}
                                                }, "width": 172 },
                                                { "id": "caption", "header": "Caption", "editor": "text", "filter_type": "text", "fillspace": true, "sort":"text" },
                                                { "id": "caption_govt", "header": "Location", "editor": "text", "filter_type": "text","fillspace": true, "sort":"text" },
                                                { "id": "date", "header": "Date", "filter_type": "date","width": 100, "format": webix.Date.dateToStr("%Y-%m-%d"), "sort":"text" },
						{ "id": "status", "header": "Status", "filter_type": "text","width": 100, "sort":"text" },
						{ "id": "taggedPeople", "header": "Tagged people", "template": function(item) { return item.taggedPeopleNames.join(', '); }, "filter_type": "text", "filter_value": function(item) { return item.taggedPeopleNames.join(' '); }, "width": 140, "css": "fcfactivitymanager-column-tagged-people" },
                                                { "id": "uploadedBy", "header": "Uploaded by", "template": "#displayName#", "filter_type": "text", "filter_value": function(r) { return r.displayName; }, "width": 140, "sort":"text" },

                                                // { id:"copy",  header:"" , width:40, css:{"text-align":"center"}, template:function(obj) { return "<div class='clone fa fa-copy fa-2 offset-9 rbac-role-list-clone' role-id='"+obj.id+"'  ></div>"; } } ,
                                                { id: "trash", header: "", width: 40, css: { "text-align": "center" }, template: "<span class='trash'>{common.trashIcon()}</span>" }
                                            ],

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

												onItemClick: function(){
													return false;
												},

                                                onItemDblClick: function (id) {

                                                    _this.dataCollection.setCursor(id);
													
													AD.comm.service.get({url:'/fcf_activities/originalactivityimage/'+id})
													.fail(function(err) {
														console.error('!!!! FCFActivities: error getting /fcf_activities/originalactivityimage/', err);
													})
													.then(function(data) {

														if (data.data) {
													
															var trans = data.data;
															
															_this.toForm(trans);
															
														} else {
															console.warn('... FCFActivities: /fcf_activities/originalactivityimage/ did not find an entry!');
															_this.toForm();
														}


													});
						
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
												downloadImage: function() {
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
										{
	                                            view: "template",
	                                            id: _this.idImagePreview,
	                                            height: 300
	                                    },
										//// Begin Form
										{
											view: "form",
											id: _this.idForm,
											type: "line",
											css: 'fcfactivitymanager-edit-form',
											elementsConfig: {
												labelPosition: "top",
												//                                on:{ onchange:function(newv, oldv){  
												//                                        webix.message("Value changed from: "+oldv+" to: "+newv);
												//                                }}
											},
											elements: [
												{
													type: "space",
													cols:[
														{},
														{
															gravity: 2,
															rows:[
																{ id: _this.caption, "view": "textarea", height: 150, "label": "Caption", "name": "caption", "type": "text" },
																{ id: _this.captionTrans, "view": "textarea", height: 150, disabled:true, "label": "Translated Caption", "name": "caption_readonly", "type": "text" },
																{ "view": "text", "label": "Location", "name": "caption_govt", "type": "text" },
																{ "view": "datepicker", "label": "Date", "name": "date", "timepicker": false },
																{ "view": "richselect", "label": "Status", "name": "status", "type": "text", options:[
															        { "id":"new", "value":"New" },
															        { "id":"approved", "value":"Approved" },
															        { "id":"ready", "value":"Ready" },
																	{ "id":"denied", "value":"Denied" }
															    ] },
																{ "view": "text", "label": "Uploaded by", "name": "displayName", "id": _this.idUploadedBy },
																{ "view": "text", "disabled": true, "label": "Activity ID", "name": "activity" },
																{ "view": "text", "disabled": true, "label": "Image", "name": "image", "type": "text", "id": _this.idImage },
																{ height: 15 },
																{
																	id: _this.idFormButtons,
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
																		// {
																		// 	"view": "button",
																		// 	id: "translateButton",
																		// 	"label": lblTranslate,
																		// 	"width": 160,
																		// 	click: function () {
																		// 		var model = _this.dataCollection.AD.currModel();
																		// 		var form = $$(_this.idForm);
																		// 		var values = form.getValues();
																		// 		model.attr(values);
																		// 		_this.addToTranslate(model);
																		// 
																		// 	}
																		// },
																		{},
																		{
																			"view": "button",
																			"label": lblSave,
																			"type": "form",
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
																					
																					// Convert to YYYY-MM-DD for server storeage without timezone
																					if (values.date)
																						values.date = moment(values.date).locale('cst').format("YYYY-MM-DD");
																					
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
																								if ($$("activity_images_filter_popup")) {
																									$$("activity_images_filter_popup").filter();
																								}
																							}
																						})

																				}

																			}
																		}
																	]
																}
															]
														},
														{}
													]
												}
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

							var sixMonthsAgo = moment().subtract(5, 'months').format("YYYY-MM-DD"); 
							this.Model.findAll({ date: { '>': sixMonthsAgo }})
								.fail(function (err) {
									AD.error.log('crud1FCFActivityImages: Error loading Data', { error: err });
								})
								.then(function (list) {
									// make sure they are all translated.
									list.forEach(function (l) {
										if (l.translate) { l.translate(); }
										
										if (l.date)
			                                l.attr('date', moment(l.date).locale('cst').toDate());

										// Set full image url to image object
										l.attr('fullImageUrl', l.getFullImageUrl());
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
							$$(this.idImagePreview).hide();
							$$(this.idFormButtons).hide();

							$$(this.idTable).show();
							$$(this.idPagerA).show();
							$$(this.idPagerB).show();
						},

						addToTranslate: function (options) {
							$$("translateButton").disable();
							var request = {

							    "actionKey": "fcf.activities.translate",
							    "userID": options.displayName,
							    "callback": "fcf.activities.image.translated",
							    "reference": {"id":options.id.toString()},
						    
							    "model": "fcfactivityimagestrans",
							    "modelCond": {"fcfactivityimages":options.id.toString()},

							    "toLanguageCode": "th",

							    "menu": {
								"icon": "fa-photo",
								"action": {
								    "key": "fcf.activityapproval.updatedImage",
								    "context": "opstool-FCFActivities"
								},
								"fromLanguage": "en",
								"toLanguage": "th",
								'itemName': options.caption,
								"createdBy": options.displayName,
								"date": moment().format("MMMM D, YYYY")
							    },
							    "form": {
								"data": {
								    //"fields": options.fields,
								    //"labels": options.labels,
								    "optionalInfo": {"image": options.image}
								},
								"view": "/opstools/FCFActivities/views/FCFActivities/imageTranslation.ejs"
							    }
							}
							AD.comm.service.get({url:'/fcf_activities/originalactivityimage/'+options.id})
							.fail(function(err) {
								console.error('!!!! FCFActivities: error getting /fcf_activities/originalactivityimage/', err);
								$$("translateButton").enable();
							})
							.then(function(data) {

								if (data.data) {
							
									var trans = data.data;
									request.form.data.fields = {
										"caption": {
											"en": trans.translations.filter(function(currentValue) { return currentValue.language_code == "en" })[0].caption,
											"th": trans.translations.filter(function(currentValue) { return currentValue.language_code == "th" })[0].caption,
										},
										"caption_govt": {
											"en": trans.translations.filter(function(currentValue) { return currentValue.language_code == "en" })[0].caption_govt,
											"th": trans.translations.filter(function(currentValue) { return currentValue.language_code == "th" })[0].caption_govt,
										}
									}
									request.form.data.labels = {
										"caption": {
											"en": "Caption:",
											"th": "คำบรรยายใต้ภาพ"
										}
									}
									AD.comm.service.post({url:'/fcf_acitivity_mananger/requesttranslation/'+options.id, params:request})
									.fail(function(err) {
										console.error('!!!! FCFActivities: error getting /fcf_acitivity_mananger/requesttranslation/', err);
										$$("translateButton").enable();
									})
									.then(function(data) {
									    	webix.alert({
											title:lblTranslateCreate,
											text:lblTranslateCreateInfo
									    	});
										$$("translateButton").enable();
									});
								} else {
									console.warn('... FCFActivities: /fcf_activities/originalactivityimage/ did not find an entry!');
									$$("translateButton").enable();
								}


							});
						},

						toForm: function (trans) {
							$$(this.idToolbar).showBatch('form');

							var form = $$(this.idForm);
							form.clearValidation();

							form.show();
							
							// We are going to get the translated value of the photo caption
							// start with an empty string that we will replace if we find the translation
							var transValue = "";
							// if values are passed move forward
							if (trans) {
								// if we are using thai we want the english version otherwise just return the thai translation
								langCode = (AD.lang.currentLanguage == "th") ? "en" : "th";
								var translated = trans.translations.filter(function(currentValue) { return currentValue.language_code == langCode });
								if (translated.length > 0) {
									transValue = translated[0].caption;
								}								
							}
							
							$$(this.captionTrans).setValue(transValue);
							$$(this.captionTrans).define("label", (AD.lang.currentLanguage == "th") ? "Caption (English)" : "Caption (Thai)");
							$$(this.caption).define("label", (AD.lang.currentLanguage == "th") ? "Caption (Thai)" : "Caption (English)");
							$$(this.captionTrans).refresh();
							$$(this.caption).refresh();

							$$(this.idFormButtons).show();
							$$(this.idImagePreview).show();

							$$(this.idUploadedBy).disable();

							$$(this.idImagePreview).setHTML("<div style='background: #666; text-align: center;'><img src='" + $$(this.idImage).getValue().replace("_scaled", "_print") + "' style='height: 300px;' /></div>");

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
