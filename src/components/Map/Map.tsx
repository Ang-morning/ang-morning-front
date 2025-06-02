"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const mapId = "naver-map";

type NaverMap = naver.maps.Map;
type Lng = number;
type Lat = number;
type Coordinates = [Lng, Lat];

type Marker = {
  id: string;
  coordinates: Coordinates;
  title?: string;
  content?: string;
};

function Map({
  initialLocation,
  markers,
}: {
  initialLocation?: Coordinates;
  markers?: Marker[];
}) {
  // prop destruction

  // lib hooks

  // state, ref, querystring hooks
  const mapRef = useRef<NaverMap>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const [loc, setLoc] = useState<Coordinates>(
    initialLocation ?? [127.1058342, 37.359708]
  );

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoc([position.coords.longitude, position.coords.latitude]);
      },
      () => {
        setLoc([126.978, 37.5665]);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  // handlers
  const initializeMap = useCallback(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(loc[1], loc[0]),
      zoom: 15,
      scaleControl: true,
      mapDataControl: true,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    const map = new window.naver.maps.Map(mapId, mapOptions);
    mapRef.current = map;

    // 기존 마커들 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새로운 마커들 추가
    if (markers && markers.length > 0) {
      markers.forEach((markerData) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            markerData.coordinates[1],
            markerData.coordinates[0]
          ),
          map: map,
          title: markerData.title || "",
        });

        // 마커에 정보창 추가 (content가 있는 경우)
        if (markerData.content) {
          const infoWindow = new window.naver.maps.InfoWindow({
            content: `<div style="padding: 10px;">${markerData.content}</div>`,
          });

          window.naver.maps.Event.addListener(marker, "click", () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });
        }

        markersRef.current.push(marker);
      });
    }
  }, [loc, markers]);

  // 네이버 클라이언트 ID (임시로 하드코딩, 나중에 환경변수로 변경 필요)
  const naverClientId = "x87hzw0avw";

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${naverClientId}`}
        onReady={initializeMap}
        onError={(e) => {
          console.log("Naver Maps API load error:", e);
        }}
      ></Script>
      <div id={mapId} style={{ width: "100%", height: "100%" }} />
    </>
  );
}

export { Map };
