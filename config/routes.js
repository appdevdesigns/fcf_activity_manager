/**
 * Routes
 *
 * Use this file to add any module specific routes to the main Sails
 * route object.
 */


module.exports = {


  /*

  '/': {
    view: 'user/signup'
  },
  '/': 'fcf_activity_manager/PluginController.inbox',
  '/': {
    controller: 'fcf_activity_manager/PluginController',
    action: 'inbox'
  },
  'post /signup': 'fcf_activity_manager/PluginController.signup',
  'get /*(^.*)' : 'fcf_activity_manager/PluginController.profile'

  */
  'post /fcf_acitivity_mananger/requesttranslation/:id':'fcf_activity_manager/FCFActivityController.requestTranslation',


};

