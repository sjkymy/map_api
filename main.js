async function getData() {
    const url = 'https://api.odcloud.kr/api/15096996/v1/uddi:6738a90c-ec96-4245-a187-9528cea62904?page=1&perPage=10&serviceKey=3MCBWEYPV4%2BY4Un8XqdBpFBiaGQKGsEVpC1HIK1DCoHqjNlhaUGcwjBIJGDYeTaTOiG4GKJorKXpGpfNpOEjhQ%3D%3D'
    const response = await fetch(url);
    const datalist = await response.json();
    // console.log(datalist);
    const locations = datalist.data.map((spot) => [spot.오름명, spot.설명, spot.위치 ,spot.위도, spot.경도])

    console.log(locations);
    initMap(locations)
}


function initMap(locations) {    
    const map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 10,
        center: new google.maps.LatLng(33.361664, 126.5291655),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    const infowindow = new google.maps.InfoWindow();

    // let marker, i;

    //오름 위치 마크 생성
    for(let i = 0; i < locations.length; i++) {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][3], locations[i][4]),
            map: map
        });

        // 마크를 클릭하면 보여지는 정보
        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                };
            })(marker, i)
        );
    }
}

getData()