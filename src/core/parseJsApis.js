/**
 * Created by xiangwenwen on 2017/3/27.
 */

//@flow

import dt_nuva from 'weex-dingtalk-require';

export default function parseJsApis(jsApis: Object) : Object{
  let apis: Object = {};
  for (let name: string in jsApis) {
    let node: Array<string> = name.split('.');
    let staging = null;
    let i: number = 0;
    let j: number = node.length;
    while (true) {
      if (!staging) {
        if (1 === j) {
          apis[node[i]] = dt_nuva.require(name);
          break;
        }
        if (apis[node[i]]){
          staging = apis[node[i]];
          i++;
          continue;
        }
        apis[node[i]] = {};
        staging = apis[node[i]];
        i++;
        continue;
      } else {
        if ((j - 1) === i) {
          staging[node[i]] = dt_nuva.require(name);
          break;
        }
        if (staging[node[i]]) {
          i++;
          continue;
        }
        staging[node[i]] = {};
        staging = staging[node[i]];
      }
      i++;
    }
  }
	return apis;
}
