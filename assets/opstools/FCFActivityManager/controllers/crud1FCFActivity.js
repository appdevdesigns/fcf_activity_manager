steal(
    // List your Controller's dependencies here:
    'opstools/FCFActivityManager/controllers/CustomFilterPopup.js',
    'opstools/FCFActivityManager/models/FCFActivity.js',
    function () {
        System.import('appdev', 'dropzone').then(function () {
            steal.import('appdev/ad',
                'appdev/control/control').then(function () {


                    // Namespacing conventions:
                    // AD.Control.extend('[application].[controller]', [{ static },] {instance} );
                    AD.Control.extend('opstools.FCFActivityManager.crud1FCFActivity', {



                        init: function (element, options) {

                            this.options = options;

                            // Call parent init
                            this._super(element, options);

                            this.Model = AD.Model.get('opstools.FCFActivityManager.FCFActivity');

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

                            var ControllerName = "crud1FCFActivity";
                            this.idToolbar = ControllerName + 'Toolbar';
                            var idSearch = ControllerName + "Search";
                            this.idPagerA = ControllerName + "PagerA";
                            this.idTable = ControllerName + "Table";
                            this.idPagerB = ControllerName + "PagerB";
                            this.idForm = ControllerName + "Form";
                            this.idFormButtons = this.idForm + "Buttons";

                            this.idName = ControllerName + "idName";
                            this.idDescription = ControllerName + "idDescription";
                            this.idNameGovt = ControllerName + "idNameGovt";
                            this.idDescriptionGovt = ControllerName + "idDescriptionGovt";
                            this.idTeam = ControllerName + "idTeam";
                            this.idApprovedBy = ControllerName + "ApprovedBy";
                            this.idCreatedBy = ControllerName + "CreatedBy";
                            this.idCreatedAt = ControllerName + "CreatedAt";
                            this.idUpdatedAt = ControllerName + "UpdatedAt";

                            webix.ui({
                                view: "filter_popup",
                                id: "filter_popup"
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
                                            popup: 'filter_popup'
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
                                                { "id": "id", "header": "id", "width": 40 },
                                                // { "id": "default_image", "header": "Default Image", "editor": "text", "template": "<img src='/data/fcf/images/activities/#default_image#' class='openImage' style='max-width: 150px; max-width: 120px;' />", "width": 150 },
                                                { "id": "default_image", "header": "Default Image", "editor": "text", "css":"fcfactivitymanager-column-no-padding", "template": function(obj) { 
                                                    // var $el = '<span>null</span>';
                                                    // if (obj.default_image) {
                                                    //     $el = '<div adopimage="true" opimage-url="/data/fcf/images/activities/'+obj.default_image+'"></div>';
                                                    //     $el = $($el);
                                                    //     new AD.op.Image($el, {width:150});
                                                    // }
                                                    // return $el;

                                                    if (obj.default_image) { 
                                                        // return '<div adopimage="true" opimage-url="/data/fcf/images/activities/'+obj.default_image+'"></div>' 
                                                        // Back to displaying default scaled image:
                                                        return '<img src="/data/fcf/images/activities/'+obj.default_image+'">'
                                                    } else { 
                                                        return 'null'
                                                    } 

                                                } , "width": 150 },
                                                {
                                                    "id": "name", "header": "Name", "width": 200, "editor": "text", "filter_type": "text",
                                                    "filter_value": function (r) {
                                                        var trans = $.grep(r.translations, function (t, index) {
                                                            return t.language_code === AD.lang.currentLanguage;
                                                        });

                                                        if (trans.length > 0) {
                                                            return trans[0].activity_name + ' ' + trans[0].activity_name_govt;
                                                        }
                                                        else
                                                            return '';
                                                    },
                                                    "template": function (r) {
                                                        var trans = $.grep(r.translations, function (t, index) {
                                                            return t.language_code === AD.lang.currentLanguage;
                                                        });

                                                        if (trans.length > 0) {
                                                            var nameHtml = '<div style="height: 30px; line-height: 30px;">' + trans[0].activity_name + '</div>' +
                                                                (trans[0].activity_name_govt ? '<div style="height: 30px; line-height: 30px;"><b>Govt: </b>' + trans[0].activity_name_govt + '</div>' : '');

                                                            return nameHtml;
                                                        }
                                                        else
                                                            return '';
                                                    }
                                                },
                                                {
                                                    "id": "description", "header": "Description", "width": 180, "css": "test", "fillspace": true, "filter_type": "text",
                                                    "filter_value": function (r) {
                                                        var trans = $.grep(r.translations, function (t, index) {
                                                            return t.language_code === AD.lang.currentLanguage;
                                                        });

                                                        if (trans.length > 0) {
                                                            return trans[0].activity_description + ' ' + trans[0].activity_description_govt;
                                                        }
                                                        else
                                                            return '';
                                                    },
                                                    "template": function (r) {
                                                        var trans = $.grep(r.translations, function (t, index) {
                                                            return t.language_code === AD.lang.currentLanguage;
                                                        });

                                                        if (trans.length > 0) {
                                                            var descriptionHtml = '<div style="height: 30px; line-height: 30px;">' + trans[0].activity_description + '</div>' +
                                                                (trans[0].activity_description_govt ? '<div style="height: 30px; line-height: 30px;"><b>Govt: </b>' + trans[0].activity_description_govt + '</div>' : '');

                                                            return descriptionHtml;
                                                        }
                                                        else
                                                            return '';
                                                    }
                                                },
                                                {
                                                    "id": "status", "header": "Status", "width": 90, "filter_type": "list",
                                                    "filter_options": ['new', 'approved', 'denied', 'translated', 'ready', 'updated'],
                                                    "filter_value": function (r) {
                                                        return r.status;
                                                    },
                                                    "template": function (r) {
                                                        return r.status + (r.status === 'approved' && r.approvedBy ? '<br /> By' + r.approvedBy : '');
                                                    }
                                                },
                                                {
                                                    "id": "team", "header": "Team", "width": 140, "filter_type": "text",
                                                    "filter_value": function (r) {
                                                        return ((r.team && r.team.NameMinistryEng) ? r.team.NameMinistryEng : '');
                                                    },
                                                    "template": function (r) {
                                                        return ((r.team && r.team.NameMinistryEng) ? r.team.NameMinistryEng : '');
                                                    }
                                                },
                                                {
                                                    "id": "createdBy", "header": "Created by", "width": 200, "filter_type": "text",
                                                    "filter_value": function (r) {
                                                        return r.createdBy.NameFirstEng + ' ' + r.createdBy.NameMiddleEng + ' ' + r.createdBy.NameLastEng;
                                                    },
                                                    "template": function (r) {
                                                        return (r.createdBy.NameFirstEng ? r.createdBy.NameFirstEng + ' ' : '') +
                                                            (r.createdBy.NameMiddleEng ? r.createdBy.NameMiddleEng + ' ' : '') +
                                                            (r.createdBy.NameLastEng ? r.createdBy.NameLastEng + ' ' : '');
                                                    }
                                                },
                                                { "id": "date_start", "header": "Start date", "filter_type": "date", "format": webix.Date.dateToStr("%Y-%m-%d"), "width": 100 },
                                                { "id": "date_end", "header": "End date", "filter_type": "date", "format": webix.Date.dateToStr("%Y-%m-%d"), "width": 100 },
                                                // { "id": "createdAt", "header": "Created at", "format": webix.Date.dateToStr("%Y-%m-%d %h:%i"), "width": 150 },
                                                // { "id": "updatedAt", "header": "Updated at", "format": webix.Date.dateToStr("%Y-%m-%d %h:%i"), "width": 150, fillspace: true },

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

                                                    // $('div[view_id="'+_this.idTable+'"] div[adopimage]').each(function(indx, el){

                                                    //     new AD.op.Image(el, {width:150});
                                                    // })
                                                },


                                                onItemDblClick: function (id) {

                                                    _this.dataCollection.setCursor(id);
                                                    _this.toForm();
                                                }

                                            },

                                            onClick: {
                                                openImage: function (e, id, trg) {
                                                    var imageUrl = '/data/fcf/images/activities/' + $$(_this.idTable).getItem(id)[id.column];

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
                                                { "view": "text", "label": "Default image", "name": "default_image", "type": "text" },
                                                { "view": "text", "label": "Name", "name": "activity_name", "type": "text", "required": false, "id": _this.idName },
                                                { "view": "text", "label": "Name (Govt)", "name": "activity_name_govt", "type": "text", "required": false, "id": _this.idNameGovt },
                                                { "view": "textarea", "label": "Description", "name": "activity_description", "height": 130, "type": "text", "required": false, "id": _this.idDescription },
                                                { "view": "textarea", "label": "Description (Govt)", "name": "activity_description_govt", "height": 130, "type": "text", "required": false, "id": _this.idDescriptionGovt },
                                                { "view": "text", "label": "Status", "name": "status", "type": "text" },
                                                { "view": "datepicker", "label": "Start date", "name": "date_start", "timepicker": false },
                                                { "view": "datepicker", "label": "End date", "name": "date_end", "timepicker": false },
                                                { "view": "text", "label": "Team", "name": "team.NameMinistryEng", "required": false, "id": _this.idTeam },
                                                { "view": "text", "label": "Approved by", "name": "approvedBy", "required": false, "id": _this.idApprovedBy },
                                                { "view": "text", "label": "Created by", "name": "createdBy.NameFirstEng", "required": false, "id": _this.idCreatedBy },
                                                { "view": "datepicker", "label": "Created at", "name": "createdAt", "timepicker": true, "id": _this.idCreatedAt },
                                                { "view": "datepicker", "label": "Updated at", "name": "updatedAt", "timepicker": true, "id": _this.idUpdatedAt }
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

                                                                    // make sure we only update the following fields:
                                                                    var fieldsAllowedToUpdate = [
                                                                        'date_start', 
                                                                        'date_end', 
                                                                        'default_image', 
                                                                        'status', 
                                                                        'activity_name', 
                                                                        'activity_name_govt', 
                                                                        'activity_description', 
                                                                        'activity_description_govt' 
                                                                    ];

                                                                    // remove embedded field references:
                                                                    for (var v in values) {
                                                                        if (fieldsAllowedToUpdate.indexOf(v) == -1) {
                                                                            delete values[v];
                                                                        }
                                                                    }

                                                                    // don't send an invalid date_end value
                                                                    if (values.date_end == '') {
                                                                        delete values.date_end;
                                                                    }

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
                                                                                        _this.prepareEntry(newModel);
                                                                                        _this.data.unshift(newModel);
                                                                                        _this.toList();
                                                                                    })

                                                                            } else {
                                                                                _this.prepareEntry(model);
                                                                                _this.toList();
                                                                            }
                                                                        })

                                                                }

                                                            }
                                                        },
                                                        {
                                                            "view": "spacer",
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
                                        return (obj[label] && (obj[label].toLowerCase().indexOf(value) != -1));
                                    })
                                });

                                $$('filter_popup').registerDataTable($$(_this.idTable));
                            }); // end Webix.ready()


                            // resize after tab is shown
                            $('.crud1FCFActivity').click(function () {

                                // setImmediate() gives the DOM a chance to display the 
                                // tab contents before we calculate the sizes:
                                AD.sal.setImmediate(function () {
                                    _this.resize();
                                });

                            });

                        },


                        prepareEntry:function(l) {
                            if (l.translate) { l.translate(); }

                            // Convert to date object
                            if (l.date_start)
                                l.attr('date_start', moment(l.date_start).toDate());

                            if (l.date_end)
                                l.attr('date_end', moment(l.date_end).toDate());

                            if (l.createdAt)
                                l.attr('createdAt', moment(l.createdAt).toDate());

                            if (l.updatedAt)
                                l.attr('updatedAt', moment(l.updatedAt).toDate());
                        },


                        loadData: function () {
                            var _this = this;

                            this.Model.findAll()
                                .fail(function (err) {
                                    AD.error.log('crud1FCFActivity: Error loading Data', { error: err });
                                })
                                .then(function (list) {
                                    // make sure they are all translated.
                                    list.forEach(function (l) {

                                        _this.prepareEntry(l);

                                    });

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

                            var selectedItem = $$(this.idTable).getItem($$(this.idTable).getSelectedId());

                            if (selectedItem) {
                                var trans = $.grep(selectedItem.translations, function (t, index) {
                                    return t.language_code === AD.lang.currentLanguage;
                                });

                                if (trans.length > 0) {
                                    $$(this.idName).setValue(trans[0].activity_name);
                                    $$(this.idDescription).setValue(trans[0].activity_description);

                                    $$(this.idNameGovt).setValue(trans[0].activity_name_govt);
                                    $$(this.idDescriptionGovt).setValue(trans[0].activity_description_govt);
                                }

                                $$(this.idTeam).setValue(selectedItem.team && selectedItem.team.NameMinistryEng ? selectedItem.team.NameMinistryEng : '');

                                var createdBy = (selectedItem.createdBy.NameFirstEng ? selectedItem.createdBy.NameFirstEng + ' ' : '') +
                                    (selectedItem.createdBy.NameMiddleEng ? selectedItem.createdBy.NameMiddleEng + ' ' : '') +
                                    (selectedItem.createdBy.NameLastEng ? selectedItem.createdBy.NameLastEng + ' ' : '');
                                $$(this.idCreatedBy).setValue(createdBy);

                                // $$(this.idApprovedBy).setValue('Approved');

                                $$(this.idTeam).disable();
                                $$(this.idApprovedBy).disable();
                                $$(this.idCreatedBy).disable();
                                $$(this.idCreatedAt).disable();
                                $$(this.idUpdatedAt).disable();
                            }

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

                            var table = $("#crud1FCFActivity");
                            var width = 0;
                            if (table[0]) {
                                width = $(table[0]).parent().css('width');
                                if (width) {
                                    width = width.replace('px', '');
                                    width = parseInt(width);
                                }
                            }
                            if (width > 100) {
                                webix.toNode("crud1FCFActivity").style.width = width;
                                this.webixLayout.adjust();
                            }
                        }


                    });



                });

        });

    });