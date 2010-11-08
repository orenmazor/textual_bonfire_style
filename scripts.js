function IncludeJavaScript(jsFile)
{
  document.write('<script type="text/javascript" src="'
    + jsFile + '"></scr' + 'ipt>'); 
}
// IncludeJavaScript("http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js");
IncludeJavaScript("jquery.min.js");

var Bonfire={
	init: function()
	{
		// evidentally the page needs a second to render first
		window.setTimeout(Bonfire.start, 25)
	},
	start: function()
	{
		body_home=$("#body_home")
		Bonfire.table=$("<tbody/>").appendTo(outer=$("<table class='bf'>"));
		body_home.append(outer);
		//remap body_home
		body_home.attr("id","container");
		Bonfire.table.attr("id","body_home");
		Bonfire.started=true;
		
		Bonfire.redrawing=true;
		Bonfire.redraw();
		Bonfire.redrawing=false;
	},
	redraw: function()
	{
		$("#container div.line").each (function(i) {
			num=this.id.replace("line","");
			num=parseInt(num);
			newMessagePostedToDisplay(num);
		});	
	},
	move_mark: function()
	{
		// look for the div mark
		mark=$("#body_home div#mark");
		if (mark.size() > 0)
		{
			mark.remove();
			$("#mymark").remove();
			// and create our own row mark
			row=$("<tr>").attr("id","mymark");
			col=$("<td colspan='2'></td>").appendTo(row);
			Bonfire.table.append(row);
		}
	}
};

$(window).load(function() { Bonfire.init(); })

// render a time stamp every 5 minutes
function render_time(time)
{
	var ts=new Date;
	if (time && time!=Bonfire.last_time && (ts.getMinutes()%5)==0)
	{
		row=$("<tr class='time'><td></td><td>" + time + "</td></tr>");
		Bonfire.table.append(row);
		Bonfire.last_time=time;
	}
}

function newMessagePostedToDisplay(lineNumber)
{
	if (!Bonfire.started) {
		// window.setTimeout( function() { newMessagePostedToDisplay(lineNumber)}, 50);
		return;
	}
	// move the mark
	if (!Bonfire.redrawing)
		Bonfire.move_mark();
	
	var newLine = $("#line" + lineNumber);
	var message=$("span.message", newLine).html();
	var nick=$("span.sender", newLine).html();
	var time=$("span.time", newLine).html();
	var p=newLine.children("p"); // this is where the myself class is set
	render_time(time);
	row=$("<tr>");
	row.attr("class", newLine.attr("class"));
	row.attr("type", newLine.attr("type"));
	// row.attr("highlight", newLine.attr("highlight"));
	if (newLine.attr("highlight")=="true")
		row.addClass("highlight")
	if (p.attr("type")=="myself")
		row.addClass("myself");
	sender=$("<td>").addClass("nick");
	if (nick && nick!=Bonfire.last_nick)
		{
			sender.html(nick);
			Bonfire.last_nick=nick;
		}
	msg=$("<td>").html(message).addClass("msg");
	row.append(sender).append(msg);
	Bonfire.table.append(row);
	// rework ids
	id=newLine.attr("id");
	newLine.attr("id",null);
	row.attr("id",id);
	newLine.remove();
	// if (message.indexOf("is listening to")!=-1)
	// {
	// 	newLine.style.display="none";
	// }
	// if (message.indexOf("Teaser profile for ")!=-1)
	// {
	// 	newLine.style.fontSize="12px";
	// 	message.style.color="#999";
	// }
}

/* The following function calls are required. Add additonal code above it. */
function on_url() { app.setUrl(event.target.innerHTML); }
function on_addr() { app.setAddr(event.target.innerHTML); }
function on_chname() { app.setChan(event.target.innerHTML); }
function on_nick() { app.setNick(event.target.parentNode.parentNode.getAttribute('nick')); }