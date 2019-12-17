// ==UserScript==
// @name        Blackpearl IMDB
// @version     1.2.0
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
// @require     https://code.jquery.com/jquery-3.2.1.min.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

GM.getValue("APIKEY", "foo").then(value => { const APIVALUE = value
if (APIVALUE !== 'foo'){
   var omdbstyle = `style="display:none"`;
}


$("body").append ( `                                                                                                                                     \
    <div id="gmPopupContainer">                                                                                                                          \
    <form> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" -->                                                                            \
        <input type="text" id="myNumber5" value="" ${omdbstyle} class="input" placeholder="Omdb API Key">                                                \
        <input type="text" id="myNumber1" value="" class="input" placeholder="Enter Youtube Trailer Link">                                               \
        <input type="text" id="myNumber6" value="" class="input" placeholder="Enter Your Screenshot Links">                                              \
        <input type="text" id="myNumber2" value="" class="input" placeholder="Enter Download Link">                                                      \
        <input type="text" id="myNumber3" value="" class="input" placeholder="Enter IMDB ID i.e tt0416449">                                              \
        <textarea rows="1" style="width:100%;" class="input" name="message" id="myNumber4" placeholder="Enter Media INFO"></textarea>                    \
        <p id="myNumberSum">&nbsp;</p>                                                                                                                   \
        <button id="gmAddNumsBtn" class="button--primary button button--icon button--icon--login rippleButton" type="button">Generate Template</button>  \
        <button id="gmCloseDlgBtn" class="button--primary button button--icon button--icon--login rippleButton" type="button">Close popup</button>       \
    </form>                                                                                                                                              \
    </div>                                                                                                                                               \
` );


//--- Use jQuery to activate the dialog buttons.
$("#gmAddNumsBtn").click ( function () {
    var uToob   = $("#myNumber1").val ();
    var ddl   = $("#myNumber2").val ();
    var IID   = $("#myNumber3").val ();
    var MEDIAINFO = $("#myNumber4").val ();
    var omdbkey   = $("#myNumber5").val ();
    var screenshots   = $("#myNumber6").val ();
    if (omdbkey) {
       GM.setValue("APIKEY", omdbkey);
    }
GM.getValue("APIKEY", "foo").then(value => {
    const APIKEY = value
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
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Plot[/b][/color][/size][/indent]\n\n ${plot}
[hr][/hr][indent][size=6][color=rgb(250, 197, 28)][b]Trailer[/b][/color][/size][/indent]\n
${uToob}${screen}
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
[center][hidereactscore=5][hidereact=1,2,3,4,5,6][DOWNCLOUD]${ddl}[/DOWNCLOUD][/hidereact][/hidereactscore][/center]`
    GM_setClipboard (dump);
    $(`#myNumberSum`).text (`Copied to clipboard! Just paste on Blackpearl.biz`);
}});
});;})

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
            background:             #42464D;                      \
            border:                 1px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
        }                                                         \
        #gmPopupContainer button{                                 \
            cursor:                 pointer;                      \
            margin:                 1em 1em 0;                    \
            border:                 1px outset buttonface;        \
        }                                                         \
    @media screen and (min-width: 768px) {                        \
      #gmPopupContainer {                                         \
            position:               fixed;                        \
            bottom:                 0;                            \
            right:                  0;                            \
            padding:                2em;                          \
            background:             #42464D;                      \
            border:                 3px double black;             \
            border-radius:          1ex;                          \
            margin-left:            -8px;                         \
            z-index:                777;                          \
        }                                                         \
        #gmPopupContainer button{                                 \
            cursor:                 pointer;                      \
            margin:                 1em 1em 0;                    \
            border:                 1px outset buttonface;        \
        }                                                         \
    }                                                             \
" )});
