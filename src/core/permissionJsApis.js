/**
 * Created by xiangwenwen on 2017/3/27.
 */

//@flow

import ship from 'weex-dingtalk-runtime';

export default function permissionJsApis(cb: Function,jsApisConfig:?Object, errorCb: ?Function){
  if (!jsApisConfig){
    ship.ready(function(){
      cb(null);
    });
    return;
  }
  ship.ready(function(){
    const permission = ship.apis.runtime.permission;
    let apisConf = jsApisConfig ? jsApisConfig : {};
    let errCb = errorCb ? errorCb : null;
    apisConf.onSuccess = function(response){
      cb(null, response);
    };
    apisConf.onFail = function(error){
      if (typeof errCb === 'function'){
        errCb(error);
      } else {
        cb(error, null);
      }
    };
    permission.requestJsApis(apisConf);
  });
}
