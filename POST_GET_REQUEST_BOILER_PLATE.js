/* VERSION: 1.0 08/02/2017 */
  var http = new XMLHttpRequest(); // New request object
  var url = "/userland/quizjs.php";
var isTimer = 0;

/* Remove all occurances of tok from s; */
function stripVar(s,tok) {
     var i,j,t,sLen=s.length,tokLen=tok.length,s2;if(!tokLen||!sLen){return s;}for(i=0;i<=sLen-tokLen;i++){j=0;while(j<tokLen&&s[i+j]==tok[j]){j++;}
if(j==tokLen){s2='';if(i>0){s2=s.substr(0,i);} t=sLen-i-tokLen;for(j=0;j<t;j++){s2=s2+s[i+tokLen+j];}sLen=sLen-tokLen;s=s2;i--;}}return s;
}

/* 
 *  Send POST or GET Request and Params to this function
 *  Arg3(callback) is function to send SERVER REPLY to
 *
 *  requestType 1 == GET; 2 == POST; 
*/
function sendRequest(params, requestType, callback ) {
  if( requestType == 1 ) { http.open("GET", url+"?"+params, true); }
  else { http.open("POST", url, true); }

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.setRequestHeader("Content-length", params.length);
  http.setRequestHeader("Connection", "close");

  http.onreadystatechange = function() { // call a functio nwhen the state changes
    if( http.readyState == 4 && http.status == 200 ) {
	// return (http.responseText);
	       callback( http.responseText );
 	       // http.responseText
    }
  }
  if( requestType == 1 ) { http.send(null); }
  else { http.send(params); }

}

/* Do something after request returns with value; */
function Initialize_cb(http_cb) {

}

/* Send a request and await answer from server in *_cb(http_cb); */
function Initialize() {
  var params = "INIT=1";
  sendRequest( params, 1, Initialize_cb );
}

document.addEventListener('DOMContentLoaded', function () {
  Initialize();
  document.getElementById('submitAnswer').addEventListener('click', function(event){
	  event.preventDefault(); });
});
