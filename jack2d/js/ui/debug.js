/**
 * Created by Shaun on 6/17/14.
 */

jack2d('debug', ['helper', 'obj', 'proxy', 'chronoObject', 'element'],
function(helper, obj, proxy, chronoObject, element){
  'use strict';

  return obj.mixin([chronoObject, element], proxy.defer({
    print: function(id, message) {
      var contentList = (this.contentList) ? this.contentList : this.contentList = {};
      if(!contentList.hasOwnProperty(id)) {
        contentList[id] = document.createElement('div');
        this.element.appendChild(contentList[id]);
      }
      contentList[id].innerHTML = message;

      return this;
    },
    livePrint: function(callback) {
      this.onFrame(function() {
        callback(helper.call(this, this.print));
      });
      return this;
    }
  }));
});