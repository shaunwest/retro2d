/**
 * Created by Shaun on 6/7/14.
 */

jack2d('chronoObject', ['helper', 'chrono'], function(helper, chrono) {
  'use strict';

  return {
    onFrame: function(func) {
      this.chronoId = chrono.register(helper.call(this, func), this.chronoId);
      return this;
    }
  };
});