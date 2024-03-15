/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {canUseDOM} from 'shared/ExecutionEnvironment';

export let passiveBrowserEventsSupported: boolean = false;

// Check if browser support events with passive listeners
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
/**
 * @foxzero-007 事件机制 这里是一个检测浏览器是否支持passive event listener的方法 这个属性主要是用来支持滚动事件优化的
 * 为true的时候会进行优化 表明当前的事件内部不会使用preventDefault来阻止滑动行为
 */
if (canUseDOM) {
  try {
    const options: {
      passive?: void,
    } = {};
    Object.defineProperty(options, 'passive', {
      get: function () {
        passiveBrowserEventsSupported = true;
      },
    });
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (e) {
    passiveBrowserEventsSupported = false;
  }
}
