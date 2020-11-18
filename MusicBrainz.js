function queryArtist() {
    let params = (new URL(document.location)).searchParams;
    if (params.has('artist')) {
        let artistName = params.get('artist');
        console.log(artistName);
        
        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName;
        console.log(queryURL);
        httpGet(queryURL, getMBID);
    }
}
function httpGet(theURL, cbFunction) {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open("GET", theURL);
                xmlHttp.send();

                xmlHttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        cbFunction(this);
                    }
                };
            }
function getMBID(xhttp) {
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData);
    let artistData = retrievedData.getElementsByTagName('artist') [0];
    let artistMBID = artistData.id;
    console.log(artistMBID);
    let artistName = artistData.getElementsByTagName('name') [0].innerHTML;
    
    let mbBaseURL = "https://musicbrainz.org/ws/2/";
    let mbResource2 = "release-group?artist=";
    let mbResource3 = "&limit=500"
    let queryURL2 = mbBaseURL + mbResource2 + artistMBID + mbResource3;
    console.log(queryURL2);
        
    httpGet(queryURL2, getAlbums)
}
function getAlbums(xhttp) {
    let retrievedData = xhttp.responseXML;
    console.log(retrievedData);
    let releaseList = retrievedData.getElementsByTagName('release-group');
    let placeholder = document.getElementById('placeholder');
                let tableHTML = 
                
                `
                <table>
                    <tr>
                        <th>Album Name</th>
                        <th>Released in:</th>
                    </tr>
                `; 
    for (row = 0; row < releaseList.length; row++) {
        let albumData = releaseList[row];
        let albumName = albumData.getElementsByTagName('title')[0].innerHTML;
        let albumDate = albumData.getElementsByTagName('first-release-date')[0].innerHTML; 
        console.log(albumName, albumDate) ;
            tableHTML += 
             `
             <tr>
            <td>${albumName}</td>
            <td>${albumDate}</td>
            </tr>
            `;  
    }
    tableHTML += `</table>`; placeholder.innerHTML = tableHTML;   
}
 window.onload = queryArtist;