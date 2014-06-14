/**
 * Created by Shaun on 5/31/14.
 */

jack2d('chrono', ['HashArray'], function(HashArray) {
  'use strict';

  var ONE_SECOND = 1000,
    wholeMultiplier = 62.5,
    tenthMultiplier = 6.25,
    targetFps,
    actualFps,
    ticks,
    running,
    elapsedSeconds,
    registeredCallbacks,
    lastRegisteredId,
    oneSecondTimerId,
    frameTimerId,
    lastUpdateTime,
    obj;

  init();

  function init() {
    reset();
    start();
    return obj;
  }

  function reset() {
    targetFps = 60;
    actualFps = 0;
    ticks = 0;
    elapsedSeconds = 0;
    lastRegisteredId = 0;
    registeredCallbacks = new HashArray();
    running = false;
    lastUpdateTime = new Date();
    return obj;
  }

  function register(callback) {
    var id = lastRegisteredId++;
    registeredCallbacks.add(id, callback);
    return id;
  }

  function unRegister(id) {
    registeredCallbacks.remove(id);
    return obj;
  }

  function requestNextFrame() {
    frameTimerId = window.requestAnimationFrame(onFrame);
  }

  function start() {
    if(!running) {
      running = true;
      oneSecondTimerId = window.setInterval(onOneSecond, ONE_SECOND);
      onFrame();
    }
    return obj;
  }

  function stop() {
    running = false;
    window.clearInterval(oneSecondTimerId);
    window.cancelAnimationFrame(frameTimerId);
    return obj;
  }

  function onFrame() {
    executeFrameCallbacks(getDeltaTime());
    tick();

    if(running) {
      requestNextFrame();
    }
  }

  function executeFrameCallbacks(deltaTime) {
    var items = registeredCallbacks.items,
      numCallbacks = items.length,
      i;
    for(i = 0; i < numCallbacks; i++) {
      items[i](deltaTime);
    }
  }

  function getDeltaTime() {
    var now = +new Date(),
      elapsed = (now - lastUpdateTime) / ONE_SECOND;

    lastUpdateTime = now;

    return elapsed;
  }

  function tick() {
    ticks++;
  }

  function onOneSecond() {
    actualFps = ticks.toString();
    ticks = 0;
    elapsedSeconds++;
  }

  function getFps() {
    return actualFps;
  }

  function getSeconds() {
    return elapsedSeconds;
  }

  function getWholeMultiplier() {
    return wholeMultiplier;
  }

  function getTenthMultiplier() {
    return tenthMultiplier;
  }

  obj = {
    init: init,
    reset: reset,
    start: start,
    stop: stop,
    register: register,
    unRegister: unRegister,
    getFps: getFps,
    getSeconds: getSeconds,
    getWholeMultiplier: getWholeMultiplier,
    getTenthMultiplier: getTenthMultiplier
  };

  return obj;
});