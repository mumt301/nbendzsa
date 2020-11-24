const apiKey = "61f7c4d093e0e20e383f339bc97f405e";
var bios = [];
var imgs = [];
var counter = 0;

function queryArtist() {
        let params = (new URL(document.location)).searchParams;
        if (params.has('artistName', 'trackName')) {
            let artistName = params.get('artistName');
            let trackName = params.get('trackName');
            console.log(artistName, trackName);

            let queryURL = "http://ws.audioscrobbler.com/2.0" + "?method=" + "track.getSimilar" + "&track="+ trackName + "&artist=" + artistName + "&api_key=" + apiKey;
            console.log(queryURL);
            httpGet(queryURL, getRecsAndImage);
        }
    }

    function httpGet(theURL, cbFunction) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theURL);
        xmlHttp.send();

        xmlHttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                cbFunction(this); 
            }
        };
    }

    function getRecsAndImage(xhttp) {
        let retrievedData = xhttp.responseXML;
        console.log(retrievedData);
        for(var i=0; i<5; i++) {
            let trackName = retrievedData.getElementsByTagName("name") [i*2].innerHTML;
            let artistName= retrievedData.getElementsByTagName("name") [i*2+1].innerHTML;
            console.log(trackName);
            console.log(artistName);

            let queryURL2 = "https://ws.audioscrobbler.com/2.0/" + "?method=" + "track.getInfo" + "&track=" + trackName + "&artist=" + artistName + "&api_key=" + apiKey;
            httpGet(queryURL2, getBiosAndImages);
        }
    }
    
    function getBiosAndImages(xhttp) {

        let retrievedData2 = xhttp.responseXML;
        console.log(retrievedData2);

        let title = retrievedData2.getElementsByTagName("name")[0].innerHTML;
        let artist = retrievedData2.getElementsByTagName("name")[1].innerHTML;
        let info = retrievedData2.getElementsByTagName("content")[0].innerHTML;
        let imageURL = retrievedData2.getElementsByTagName("image")[3].innerHTML;
        console.log(title, info, imageURL);

        let infobox = document.getElementById("bioContainer");
        let header = document.createElement('h');
        header.innerHTML = title + ' written by ' + artist;
        infobox.appendChild(header);

        let bio = document.createElement("p");
        bio.innerHTML = info
        infobox.appendChild(bio);

        let infobox1 = document.getElementById("bioContainer");
        let image = document.createElement("img");
        image.src = imageURL;
        infobox1.appendChild(image);

        let infobox2 = document.getElementById("bioContainer");
        let gap = document.createElement("br");
        infobox2.appendChild(gap);

        let infobox3 = document.getElementById("bioContainer");
        let gap2 = document.createElement("br");
        infobox3.appendChild(gap2);
    }
    window.onload = queryArtist; 