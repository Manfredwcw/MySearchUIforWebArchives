//"Require.js" frame is used in this js file. 
require.config({
	paths: {
		//set the path of the js documents
		bootstrap:"../js/bootstrap.min",
    	jquery: "../js/jquery-2.2.3",
    	underscore:"../js/underscore",
    	backbone:"../js/backbone",
    	scroll_function:"../js1/scroll_function"
    	
	},
	shim:{
		'underscore':{
			exports:'_'
		},
    	'backbone': {
        	deps: ['underscore', 'jquery'],
       		exports: 'Backbone'
      },
    	'bootstrap': {
    		deps: ['jquery']
	    }
    }
});

require(['bootstrap','backbone','jquery','underscore','mytemplates','scroll_function'], 
	function(Bootstrap,Backbone,$,_,mytemplates){
		console.log("hello");

    var DataListView,  
        DataView,
        DataModel,
        DataCollection,
        AppView;

    DataModel = Backbone.Model.extend({
      initialize: function(){

      }
    });

    DataCollection = Backbone.Collection.extend({
      model: DataModel,
      initialize: function(){
        
      },
      parse: function(data){
        
        return data;
      },
      url: "./json/data_1.json"
    });

    DataView = Backbone.View.extend({
      initialize: function () {
      		this.currentVersion = 0;
      },
      tagName: "li", 
      events: {    
      	"mouseenter .versions": "slide_down",
      	"mouseleave .versions": "slide_up",
      	//"click .button":"slide_toggle"
      	"click .viceitem": "changeHTML"
      },
      slide_down: function(){
      	this.$el.find(".scrollable").slideDown("slow");
      	this.$el.find(".scrollable").Scroll({ line: 1, speed: 500, timer: 3000, left: ".prev", right: ".next"});
      },
      
      slide_up: function(){
      	this.$el.find(".scrollable").slideUp("slow");
      },
      
//      slide_toggle: function(opt){
//      	this.$el.find(".scrollable").slideToggle("slow");
//      	this.$el.find(".scrollable").Scroll({ line: 1, speed: 500, timer: 3000, left: ".prev", right: ".next"});
//      },
      
      changeHTML: function(opt){
//      	var id= this.$el.attr("id");
//      	alert(this.$el.attr("id"));
//      	this.$el.parent().getElementById("1").append("111111111111111111");
      	 	
      	this.$el.parent().parent().parent().parent().parent().find(".headline").append("111111111111111111");
      	//find link of the current target and change it
      },
      
      render: function(options){
        var temp = _.template(mytemplates.dataView,{variable: 'data'})(this.model);
//        var sort= _.sortBy(temp,'id',function(num){return num});
//        sorting - get version with highest score
//        this.currentVersion = id;
        this.$el.append(temp);
        return this.$el;
      }
    });

    DataListView = Backbone.View.extend({
      initialize: function(options){
        this.collection = new DataCollection();         
      },
      tagName: "ul",
      render: function(options){
        var list = [];
        var that = this;
        
        _.each(that.collection.models,function(result){
          var options = {
            model: result
            //parentView: that
          };
          var dataView = new DataView(options);
          var temp = dataView.render({});
          that.$el.append(temp);
        });
        that.$el.attr("class","list-unstyled articles list");
        return that.$el;            
      }
    });

    AppView = Backbone.View.extend({

      initialize: function(options){
        this.stage = options.stage;
        this.components = {};
        this.setElement($(this.stage));

        var options = {
          parentView: this
        }
        this.components.dataListView = new DataListView(options);   
      },
      
      events:{
      	"click #searchbutton" : "render" 
      },
      
      render: function(){ //check the input in searchbar
      	var check = "showdatas";
      	console.log("loading");
      	if($("#textinput").val() == check ){
        	var that = this;
        	this.components.dataListView.collection.fetch().done(function(opt){
         	 var list = that.components.dataListView.render({});
         	 that.$el.find("#left").append(list); })
         	 .error(function(opt){
         	 	console.log(opt);
         	 })
         	 .fail(function(opt){
         	 
         	 	console.log(opt);
         	 });   
      	}
      	else{
      		alert("input' showdatas' and click search button!");
      	}
      }
    });

    var RightApp = new AppView({
      stage: "#stage"
    });

    window.applicationView = RightApp;
});