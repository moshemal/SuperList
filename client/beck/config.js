/**
 * Created by moshemal on 4/20/15.
 */


define(function(){
  requirejs.config({
    baseUrl: "./",
    deps: ['NOT_FOR_USE/mainBeckup'],//['main'],
    shim: {
    	kendo: ['jquery'],
    },
    paths: {
      jquery:   "vendors/jquery/dist/jquery",
      kendo:    "vendors/kendo-ui/src/js/kendo.ui.core",
      text:     "vendors/text/text"
    }
  });
});