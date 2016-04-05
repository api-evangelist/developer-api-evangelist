function APIJSONGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount,$includeToggle)
	{
	$thisslug = $includeName.toLowerCase();
	$thisslug = $thisslug.replace(" ", "-");

	html = '<li style="float: left; width: 33%;">';
  html = html + '<a href="' + $includeUrl + '" style="color: #000; font-size: 18px; text-decoration: none;" title="' + $includeName + '"><strong>' + $includeName + '</strong></a>';
  html = html + '</li>';

	return html;
	}

function loadAPIsJSONIncludeList($apisjsonURL)
	{
	var jqxhr = $.getJSON($apisjsonURL, function(apisJSON) {
		$MasterAPISJSON = apisJSON;
		buildAPIsJSONIncludeList(apisJSON);
		document.getElementById("jsonBrowser").style.display='';
		});
  }

function buildAPIsJSONIncludeList(apisJSON)
	{
	$apisJSONName = apisJSON['name'];
 	$apisJSONDesc = apisJSON['description'];

	$html = "<h1>" + $apisJSONName + "</h1>";
	$html = $html + "<p>" + $apisJSONDesc + "</p>";
	$('#includeHeader').append($html);

 	$apisJSONLogo = apisJSON['image'];
 	$apisJSONURL = apisJSON['url'];
  apisJSONTags = apisJSON['tags'];
  apisJSONIncludes = apisJSON['include'];
  apisJSONMaintainers = apisJSON['maintainers'];

  howmanyincludes = apisJSONIncludes.length;

  if(howmanyincludes>0)
  	{
		$includecount = 0;
		$includeToggle = 0;
    $.each(apisJSONIncludes, function(apiKey, apiVal) {
     		$includeName = apiVal['name'];
     	 	$includeRootUrl = apiVal['url'];
     	 	$includeUrl = $includeRootUrl.replace("apis.json","");
        $html = APIJSONGetIncludeListing($includeName,$includeRootUrl,$includeUrl,$includecount,$includeToggle);
        $('#includeListing').append($html);
		 	 	$includecount++;
				if($includeToggle == 0 ) { $includeToggle = 1; } else if( $includeToggle == 1 ) { $includeToggle = 2; } else if($includeToggle == 2 ) { $includeToggle = 3; } else { $includeToggle = 0; }
			});
		}
	}
