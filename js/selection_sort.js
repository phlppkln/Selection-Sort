
var a, b, finished, action, fn_name, end, quick_i, shuffle_down;
var card, comparisons, swaps, operation;
var quickstep = new Array(35);


function compare(i, j)
{
	comparisons++;
	for(var n = 0; n < 10; n++)
	{
		if(n == i || n == j) { card[n].style.backgroundColor = "#FFFF99"; } else { card[n].style.backgroundColor = "#FFFFFF"; }
	}
	document.getElementById("commentary").innerHTML = "<p><strong>Comparisons: " + comparisons + "<br>Swaps: " + swaps + "</strong></p><p>Comparing " + card[i].innerHTML + " and " + card[j].innerHTML + "...</p>";
	if(eval(card[j].innerHTML) < eval(card[i].innerHTML))
	{
		document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>" + operation + " required</p>"
		return true;
	}
	else
	{
		document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>" + operation + " not required</p>"
		return false;
	}
}

function shuffle(first, last)
{
	var value = new Array(10);
	for(var i = 0; i < 10; i++)
	{
		value[i] = eval(card[i].innerHTML);
	}
	
	if(first < last)
	{
		for(i = first; i < last; i++)
		{
			card[i].innerHTML = value[i+1];
		}
	}
	else
	{
		for(i = first; i > last; i--)
		{
			card[i].innerHTML = value[i-1];
		}
	}
	swaps++;
}

function swap(i, j)
{
	swaps++;
	var temp;
	document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>Swapping " + card[i].innerHTML + " and " + card[j].innerHTML + "</p>";
	temp = eval(card[j].innerHTML);
	card[j].innerHTML = eval(card[i].innerHTML);
	card[i].innerHTML = temp;
}

function insert(n)
{
	swaps++;
	var inserted = false;
	var i = n - 1;
	document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>Inserted " + card[n].innerHTML + " into the correct position.</p>";
	var temp = eval(card[n].innerHTML);
	card[n].innerHTML = eval(card[i].innerHTML);
	card[i].style.backgroundColor = "white";
	while(!inserted)
	{
		comparisons++;
		if(i == 0 || eval(card[i-1].innerHTML) <= temp)
		{
			card[i].innerHTML = temp;
			inserted = true;
			card[i].style.backgroundColor = "#FFFF99";
		}
		else
		{
			card[i].innerHTML = eval(card[i-1].innerHTML);
			i--;
		}
	}
}

function selection()
{
	if(a == 8 && b == 9)
	{
		if(document.getElementById("interval").value == 2500)
		{
			document.getElementById("next").disabled = true;
		}
		else
		{
			clearInterval(interval);
			interval = 0;
		}
		document.getElementById("commentary").innerHTML = "<h3>The sort is complete - there were " + comparisons + " comparisons and " + swaps + " swaps.</h3>";
		b = 0;
	}
	else
	{
		if(b == 9)
		{
			a++;
			b = a + 1;
		}
		else
		{
			b++;
		}
	}
}


function next_step()
{
	if(action == 1)
	{
		if(compare(a, b))
		{ action = -1; }
		else
		{
			window[fn_name]();
		}
	}
	else
	{
		action = 1;
		if(fn_name == "insertion") { insert(b); }
		if(fn_name == "selection" || fn_name == "bubble" || fn_name == "opti_bubble") { swap(a, b); }
		if(fn_name == "quick") 
		{
			if(shuffle_down)
			{
				var temp = eval(card[b].innerHTML);
				shuffle(b, a);
				card[a].innerHTML = temp;
				document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>"+temp+" shifted to the left of the pivot.</p>";
			}
			else
			{
				var temp = eval(card[a].innerHTML);
				shuffle(a, b);
				card[b].innerHTML = temp;
				document.getElementById("commentary").innerHTML = document.getElementById("commentary").innerHTML + "<p>"+temp+" shifted to the right of the pivot.</p>";
			}
			card[a].style.backgroundColor = "white";
			card[b].style.backgroundColor = "white";
		}
		finished = false;
		window[fn_name]();
	}
}

function start_sort()
{
	if(validate()) {
		var num = document.querySelectorAll('[type~=text]');
		card = document.querySelectorAll('.card');
		for(var i=0;i<10;i++)
		{
			card[i].innerHTML = num[i].value;
			card[i].style.fontStyle = "normal";
			card[i].style.color = "black";
		}
		if(interval != 0) { clearInterval(interval); interval = 0; }
		action = 1;
		finished = true;
		comparisons = 0;
		swaps = 0;
		fn_name = document.getElementById("sort_type").value;
        //selection sort
        a = 0;
        b = 1;
        operation = "Swap";
        next_step();
		document.getElementById("next").onclick = function() { next_step(); };
		if(document.getElementById("interval").value == 2500)
		{
			document.getElementById("next").disabled = false;
		}
		else
		{
			document.getElementById("next").disabled = true;
			if(interval == 0)
			{ 
				interval = setInterval(next_step, document.getElementById("interval").value);
			}
			else
			{
				clearInterval(interval);
				interval = 0;
			}
		}
	}
}