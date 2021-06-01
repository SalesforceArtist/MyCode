interface Record {
  call: string;
  lat: number;
  lng: number;
}

function printLocation(r: Record) {
  console.log(r.call + ': ' + r.lat + ', ' + r.lng);
}

var myObj = {call: 'kf6gpe-7', lat: 21.9749, lng: 159.3686};
printLocation(myObj);

var json = '{"call":"kf6gpe-7","lat":21.9749}';
var myOtherObj = JSON.parse(json);
printLocation(myOtherObj);

