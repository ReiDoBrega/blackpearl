// ==UserScript==
// @name        Blackpearl IMDB
// @version     2.0.0
// @description Template Maker
// @author      NotLaxudope
// @include     https://blackpearl.biz/forums/129/post-thread
// @include     https://blackpearl.biz/forums/172/post-thread
// @include     https://blackpearl.biz/forums/173/post-thread
// @include     https://blackpearl.biz/forums/174/post-thread
// @include     https://blackpearl.biz/forums/175/post-thread
// @include     https://blackpearl.biz/forums/176/post-thread
// @include     https://blackpearl.biz/forums/178/post-thread
// @include     https://blackpearl.biz/forums/179/post-thread
// @include     https://blackpearl.biz/forums/180/post-thread
// @include     https://blackpearl.biz/forums/181/post-thread
// @include     https://blackpearl.biz/forums/182/post-thread
// @include     https://blackpearl.biz/forums/183/post-thread
// @include     https://blackpearl.biz/forums/184/post-thread
// @include     https://blackpearl.biz/forums/187/post-thread
// @include     https://blackpearl.biz/forums/188/post-thread
// @include     https://blackpearl.biz/forums/189/post-thread
// @include     https://blackpearl.biz/forums/190/post-thread
// @include     https://blackpearl.biz/forums/193/post-thread
// @include     https://blackpearl.biz/forums/194/post-thread
// @include     https://blackpearl.biz/forums/197/post-thread
// @include     https://blackpearl.biz/forums/198/post-thread
// @include     https://blackpearl.biz/forums/199/post-thread
// @include     https://blackpearl.biz/forums/200/post-thread
// @include     https://blackpearl.biz/forums/204/post-thread
// @include     https://blackpearl.biz/forums/206/post-thread
// @include     https://blackpearl.biz/forums/208/post-thread
// @include     https://blackpearl.biz/forums/223/post-thread
// @require     https://code.jquery.com/jquery-3.4.1.min.js
// @require     https://raw.githubusercontent.com/Semantic-Org/UI-Search/master/search.js
// @require     https://raw.githubusercontent.com/Semantic-Org/UI-Api/master/api.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==
GM.getValue("APIKEY", "foo").then(value => { const APIVALUE = value
if (APIVALUE !== 'foo'){
   $("body").append ( `                                                                                                                                  \
    <div id="gmPopupContainer">                                                                                                                          \
    <form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" -->                                                                            \
        <input type="text" id="hiddenIID" value="" style="display:none">                                                                                 \
        <input type="text" id="myNumber1" value="" class="field" placeholder="Youtube Trailer Link">                                                     \
        <input type="text" id="myNumber6" value="" class="field" placeholder="Screenshot Links">                                                         \
        <input type="text" id="myNumber2" value="" class="field" placeholder="Download Link">                                                            \
        <div class="ui search">                                                                                                                          \
            <input type="text" class="prompt" id="searchID" placeholder="IMDB ID or Title">                                                              \
            <div class="results"></div>                                                                                                                  \
        </div>                                                                                                                                           \
        <div class="mediainfo">                                                                                                                          \
        <textarea rows="1" class="input" name="message" id="mediainfo" placeholder="Mediainfo"></textarea>                                               \
        </div>                                                                                                                                            \
        <p>DownCloud</p>                                                                                                                                 \
        <label class="switch">                                                                                                                           \
        <input type="checkbox"  id="Downcloud" value="Downcloud" checked></input>                                                                        \
        <span class="slider round"></span></label>                                                                                                       \
        <p>HideReact</p>                                                                                                                                 \
        <label class="switch">                                                                                                                           \
        <input type="checkbox" id="HideReact" value="HideReact" checked></input>                                                                         \
        <span class="slider round"></span>                                                                                                               \
        </label><br><br>                                                                                                                                 \
        <input type="number" id="HideReactScore" min="0" max="100" value="0"> HideReactScore                                                             \
        <input type="number" id="HidePosts" min="0" max="50" value="0"> HidePosts<br>                                                                    \
        <p id="myNumberSum">&nbsp;</p>                                                                                                                   \
        <button id="gmAddNumsBtn" type="button">Generate Template</button>                                                                               \
        <div class="divider"/>                                                                                                                           \
        <button id="gmCloseDlgBtn" type="button">Close Popup</button>                                                                                    \
    </form>                                                                                                                                              \
    </div>                                                                                                                                               \
` );
} else {
    $("body").append ( `                                                                                                                                 \
    <div id="gmPopupContainer">                                                                                                                          \
    <form>                                                                                                                                               \
        <label>Enter Your OMDB API Key, Save Key, Then Refresh the page!</label>                                                                         \
        <input type="text" id="myNumber5" value="" class="input" placeholder="Omdb API Key">                                                             \
        <button id="gmAddNumsBtn" type="button">Save Key</button>                                                                                        \
        <button id="gmCloseDlgBtn" type="button">Close Popup</button>                                                                                    \
    </form>                                                                                                                                              \
    </div>                                                                                                                                               \
` );
}
GM.getValue("APIKEY", "foo").then(value => {
    const APIKEY = value
$('.ui.search')
      .search({
        apiSettings: {
          url: `https://www.omdbapi.com/?apikey=${APIKEY}&r=JSON&s={query}`
        },
        fields: {
          results : 'Search',
          title   : 'Title',
          description : 'Year',
        },
        onSelect: function(response){
            $('#hiddenIID').val(response.imdbID);
        },
        minCharacters : 3
      })
//--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var uToob = $("#myNumber1").val ();
    var ddl = $("#myNumber2").val ();
    var IID = $("#hiddenIID").val ();
    var MEDIAINFO = $("#mediainfo").val ();
    var omdbkey = $("#myNumber5").val ();
    var screenshots = $("#myNumber6").val ();
    var hidereactscore = $("#HideReactScore").val ();
    var hideposts = $("#HidePosts").val ();
    if (omdbkey) {
       GM.setValue("APIKEY", omdbkey);
    }
    if (Downcloud.checked){
        ddl = '[DOWNCLOUD]' + ddl + '[/DOWNCLOUD]'
    }
    if (HideReact.checked){
        ddl = '[HIDEREACT=1,2,3,4,5,6]' + ddl + '[/HIDEREACT]'
    }
    if (hidereactscore !== "0"){
        ddl = `[HIDEREACTSCORE=${hidereactscore}]` + ddl + '[/HIDEREACTSCORE]'
    }
    if (hideposts !== "0"){
        ddl = `[HIDEPOSTS=${hideposts}]` + ddl + '[/HIDEPOSTS]'
    }
    if (!IID){
        IID = $("#searchID").val ();
    }
if (screenshots) {
   screenshots = screenshots.split(" ");
   var screen = `\n[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Screenshots[/b][/color][/size][/indent]\n [Spoiler='screenshots']`;
   for (var ss of screenshots) {
       screen += `[img]${ss}[/img]`;
   }
   screen += `[/Spoiler] \n`;
} else {
  screen = ""
}
if (uToob.match(/[a-z]/)) {
    var trailer = `\n[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Trailer[/b][/color][/size][/indent]\n ${uToob}`
} else {
    trailer = ""
}
GM_xmlhttpRequest({
method: "GET",
url: `http://www.omdbapi.com/?apikey=${APIKEY}&i=${IID}&plot=full&y&r=json`,
onload: function(response) {
var json = JSON.parse(response.responseText);
    var title = json.Title;
    var year = json.Year;
    var rated = json.Rated;
    var released = json.Released;
    var runtime = json.Runtime;
    var genre = json.Genre;
    var director = json.Director;
    var writer = json.Writer;
    var actors = json.Actors;
    var plot = json.Plot;
    var poster = json.Poster;
    var rating = json.imdbRating;
    var imdb_id = json.imdbID;
    var imdbvotes = json.imdbVotes;
    var production = json.Production;
    var dump = `[center][img] ${poster} [/img]
[color=rgb(250, 197, 28)][b][size=6] ${title} (${year})[/size][/b][/color]
[url=https://www.imdb.com/title/${imdb_id}][img]https://i.imgur.com/rcSipDw.png[/img][/url][size=6][b] ${rating}[/b]/10[/size]
[size=6][img]https://i.imgur.com/sEpKj3O.png[/img]${imdbvotes}[/size][/center]
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Plot[/b][/color][/size][/indent]\n\n ${plot}${trailer}${screen}
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Movie Info[/b][/color][/size][/indent]\n
[LIST][*][B]Rating: [/B]${rated}
[*][B]Genre: [/B] ${genre}
[*][B]Directed By: [/B] ${director}
[*][B]Written By: [/B] ${writer}
[*][B]Starring: [/B] ${actors}
[*][B]Release Date: [/B] ${released}
[*][B]Runtime: [/B] ${runtime}
[*][B]Production: [/B] ${production} [/LIST]
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Media Info[/b][/color][/size][/indent]\n
[spoiler='Click here to view Media Info']\n ${MEDIAINFO} \n[/spoiler]
[hr][/hr][center][size=6][color=rgb(250, 197, 28)][b]Download Link[/b][/color][/size][/center]\n
[center]${ddl}[/center]`;
    GM_setClipboard (dump);
    $(`#myNumberSum`).text (`Copied to clipboard! Just paste on Blackpearl.biz`);
}})});;})

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").hide ();
} );


//--- CSS styles make it work...
GM_addStyle ( "                                                   \
    @media screen and (min-width: 300px) {                        \
      #gmPopupContainer {                                         \
            position:               fixed;                        \
            bottom:                 0;                            \
            right:                  0;                            \
            padding:                1em;                          \
            width:                  320px;                        \
            background:             #42464D;                      \
            border:                 1px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
        }                                                         \
      /* Divide Buttons */                                        \
      .divider{                                                   \
            width:                  8px;                          \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      /* Buttons */                                               \
      button {                                                    \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              16px;                         \
            font-weight:            400;                          \
            padding:                8px;                          \
            margin:                 0px 5px 0px 0px;              \
            cursor:                 pointer;                      \
            outline:                none;                         \
            border:                 none;                         \
            border-radius:          10px;                         \
        }                                                         \
      /* Reactscore & Posts */                                    \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* Imdb search */                                           \
      input[id=searchID]{                                         \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      input[id=searchID]:focus {                                  \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* utoob & screens & DL */                                  \
      .field {                                                    \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      .field:focus {                                              \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      /* match all inputs to background*/                         \
      input{                                                      \
            background:             transparent;                  \
            color:                  white;                        \
      }                                                           \
      /* Start Rounded sliders Checkboxes */                      \
      p {                                                         \
            margin-top:             5px;                          \
            margin-bottom:          5px;                          \
      }                                                           \
      .switch {                                                   \
            position:               relative;                     \
            display:                inline-block;                 \
            width:                  42px;                         \
            height:                 17px;                         \
      }                                                           \
      .switch input {                                             \
            opacity:                0;                            \
            width:                  0;                            \
            height:                 0;                            \
      }                                                           \
      .slider {                                                   \
            position:               absolute;                     \
            cursor:                 pointer;                      \
            top:                    0;                            \
            left:                   0;                            \
            right:                  0;                            \
            bottom:                 0;                            \
            background-color:       #ccc;                         \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      .slider:before {                                            \
            position:               absolute;                     \
            content:                '';                           \
            height:                 13px;                         \
            width:                  13px;                         \
            left:                   2px;                          \
            bottom:                 2px;                          \
            background-color:       #42464D;                      \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      input:checked + .slider {                                   \
            background-color:       #4caf50;                      \
      }                                                           \
      input:focus + .slider {                                     \
            box-shadow:             0 0 1px #4caf50;              \
      }                                                           \
      input:checked + .slider:before {                            \
            -webkit-transform:      translateX(26px);             \
            -ms-transform:          translateX(26px);             \
            transform:              translateX(26px);             \
      }                                                           \
      .slider.round {                                             \
            border-radius:          34px;                         \
      }                                                           \
      .slider.round:before {                                      \
            border-radius:          50%;                          \
      }                                                           \
      /* End Rounded sliders Checkboxes */                        \
}                                                                 \
    @media screen and (min-width: 768px) {                        \
      #gmPopupContainer {                                         \
            position:               fixed;                        \
            bottom:                 0;                            \
            right:                  0;                            \
            padding:                2em;                          \
            width:                  350px;                        \
            background:             #42464D;                      \
            border:                 3px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
      }                                                           \
      .divider{                                                   \
            width:                  8px;                          \
            height:                 auto;                         \
            display:                inline-block;                 \
      }                                                           \
      button {                                                    \
            background-color:       #4caf50;                      \
            color:                  white;                        \
            text-align:             center;                       \
            text-decoration:        none;                         \
            display:                inline-block;                 \
            font-size:              16px;                         \
            font-weight:            400;                          \
            padding:                8px;                          \
            margin:                 0px 5px 0px 0px;              \
            cursor:                 pointer;                      \
            outline:                none;                         \
            border:                 none;                         \
            border-radius:          10px;                         \
        }                                                         \
      input[type=number]{                                         \
            border-bottom:          2px solid teal;               \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      input[id=searchID]{                                         \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      input[id=searchID]:focus {                                  \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      .field {                                                    \
            font-family:            inherit;                      \
            width:                  100%;                         \
            border:                 0;                            \
            border-bottom:          2px solid #9b9b9b;            \
            outline:                0;                            \
            font-size:              1.3rem;                       \
            color:                  white;                        \
            padding:                7px 0;                        \
            background:             transparent;                  \
            transition:             border-color 0.2s;            \
      }                                                           \
      .field:focus {                                              \
            padding-bottom:         6px;                          \
            border-bottom:          2px solid teal;               \
            font-weight:            700;                          \
            border-width:           3px;                          \
            border-image: linear-gradient(to right, #11998e,#38ef7d);\
            border-image-slice:     1;                            \
      }                                                           \
      input{                                                      \
            background:             transparent;                  \
            color:                  white;                        \
      }                                                           \
      p {                                                         \
            margin-top:             5px;                          \
            margin-bottom:          5px;                          \
      }                                                           \
      .switch {                                                   \
            position:               relative;                     \
            display:                inline-block;                 \
            width:                  42px;                         \
            height:                 17px;                         \
      }                                                           \
      .switch input {                                             \
            opacity:                0;                            \
            width:                  0;                            \
            height:                 0;                            \
      }                                                           \
      .slider {                                                   \
            position:               absolute;                     \
            cursor:                 pointer;                      \
            top:                    0;                            \
            left:                   0;                            \
            right:                  0;                            \
            bottom:                 0;                            \
            background-color:       #ccc;                         \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      .slider:before {                                            \
            position:               absolute;                     \
            content:                '';                           \
            height:                 13px;                         \
            width:                  13px;                         \
            left:                   2px;                          \
            bottom:                 2px;                          \
            background-color:       #42464D;                      \
            -webkit-transition:     .4s;                          \
            transition:             .4s;                          \
      }                                                           \
      input:checked + .slider {                                   \
            background-color:       #4caf50;                      \
      }                                                           \
      input:focus + .slider {                                     \
            box-shadow:             0 0 1px #4caf50;              \
      }                                                           \
      input:checked + .slider:before {                            \
            -webkit-transform:      translateX(26px);             \
            -ms-transform:          translateX(26px);             \
            transform:              translateX(26px);             \
      }                                                           \
      /* Rounded sliders */                                       \
      .slider.round {                                             \
            border-radius:          34px;                         \
      }                                                           \
      .slider.round:before {                                      \
            border-radius:          50%;                          \
      }                                                           \
}                                                                 \
")});
