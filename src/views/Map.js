import React, { useEffect } from 'react';
const {kakao} = window;

export default function Map() {
    
    useEffect(() => {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.487273, 127.014678), // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
            mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
        }; 

		// 지도를 생성한다 
        var map = new kakao.maps.Map(mapContainer, mapOption); 

        // 지도에 확대 축소 컨트롤을 생성한다
		var zoomControl = new kakao.maps.ZoomControl();

        // 지도의 우측에 확대 축소 컨트롤을 추가한다
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 마커 클러스터러를 생성합니다 
        var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
            averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
            minLevel: 10 // 클러스터 할 최소 지도 레벨 
        });

        var locationData = [
            [37.484994, 127.016240, '<div style="padding: 5px">내용</div>'],
            [37.487238, 127.014574, '<div style="padding: 5px">내용2</div>'],
            [37.486082, 127.015440, '<div style="padding: 5px">내용3</div>']
        ]

        var markers = [];

        for (var i=0; i< locationData.length; i++) {
            // 지도에 마커를 생성하고 표시한다
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(locationData[i][0],locationData[i][1]), // 마커의 중심좌표
                map: map // 마커를 표시할 지도 객체
            });
            
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : locationData[i][2]
            });

            markers.push(marker);

            // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
            // 이벤트 리스너로는 클로저를 만들어 등록합니다 
            // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }

        // 클러스터러에 마커들을 추가합니다
        clusterer.addMarkers(markers);

        // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
        function makeOverListener(map, marker, infowindow) {
            return function() {
                infowindow.open(map, marker);
            };
        }

        // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
        function makeOutListener(infowindow) {
            return function() {
                infowindow.close();
            };
        }
    }, [])

    return (
        <div id='map' style={{height: "90vh"}}></div>
    )
}