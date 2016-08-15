define([], function(){
	return {
		

		dataView: "<div>"+
									"<h4><span id=\"<%= data.get('id') %>\" class=\"headline\"><%= data.get('news_title')  %></span></h4>"+
									"<div class='news-body' style=''><%= data.get('news_content') %></div>"+
									"<div class='ents' style=''>"+
										"<h5>Entities to update:</h5>"+
										"<ul class = \"true-ents list list-inline list-unstyled\">"+
									    "<% _.each(data.get('entities'), function(ent) { %>"+
									    	"<% if(ent.is_salient) { %>"+
									    		"<li data-url='https://en.wikipedia.org/wiki/<%=  ent.entity.split(' ').join('_') %>' class=\"\" style=\"padding:5px;\"><button class=\"ent-specifier btn-danger btn btn-xs\"><%= ent.entity %></button></li>"+
									    	"<% }%>"+
										  "<% }); %>"+
										"</ul>"+
										"<h5>Other Entities:</h5>"+
										"<ul class = \"false-ents list list-inline list-unstyled\">"+
									    "<% _.each(data.get('entities'), function(ent) { %>"+
									    	"<% if(!ent.is_salient) { %>"+
									    		"<li class=\"\" style=\"padding:5px;\"><button class=\"ent-specifier btn-default btn-xs\"><%= ent.entity %></button></li>"+
									    	"<% }%>"+
										  "<% }); %>"+
										"</ul>"+
									"</div>"+
								"</div>"															
		
	};
});