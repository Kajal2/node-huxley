'use strict';

var Promise = require('bluebird');

var consts = require('../constants');
var path = require('path');
var recordTask = require('./recordTask');
var saveJSON = require('../fileOps/saveJSON');

function recordTasks(driver, JSONContent, HuxleyfileContainerPath) {
  return Promise.each(JSONContent, function(task) {
    return recordTask(driver, task)
      .then(function(actions) {
        var p = path.join(
          HuxleyfileContainerPath,
          consts.HUXLEY_FOLDER_NAME,
          task.name || task.nameOnly,
          consts.RECORD_FILE_NAME
        );
        return saveJSON(p, actions);
      });
  });
}

module.exports = recordTasks;