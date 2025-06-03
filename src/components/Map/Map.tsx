"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "@/contexts";

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
  centerLocation,
  markers,
  selectedMarkerId,
  onMarkerClick,
}: {
  initialLocation?: Coordinates;
  centerLocation?: Coordinates;
  markers?: Marker[];
  selectedMarkerId?: string;
  onMarkerClick?: (markerId: string) => void;
}) {
  // prop destruction

  // lib hooks
  const { userLocation, hasUserLocation } = useLocation();

  // state, ref, querystring hooks
  const mapRef = useRef<NaverMap>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowsRef = useRef<Record<string, naver.maps.InfoWindow>>({});
  const myLocationMarkerRef = useRef<naver.maps.Marker | null>(null);
  const [loc, setLoc] = useState<Coordinates>(
    initialLocation ?? [127.1058342, 37.359708]
  );

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    if (userLocation) {
      setLoc(userLocation);
    } else if (initialLocation) {
      setLoc(initialLocation);
    }
  }, [userLocation, initialLocation]);

  // centerLocation이 변경되면 지도 중심점 이동
  useEffect(() => {
    if (centerLocation && mapRef.current) {
      const newCenter = new window.naver.maps.LatLng(
        centerLocation[1],
        centerLocation[0]
      );
      mapRef.current.setCenter(newCenter);
      mapRef.current.setZoom(16); // 포커스 시 줌 레벨 증가
    }
  }, [centerLocation]);

  // selectedMarkerId가 변경되면 해당 마커의 info window 열기
  useEffect(() => {
    if (selectedMarkerId && mapRef.current) {
      // 모든 info window 닫기
      Object.values(infoWindowsRef.current).forEach((infoWindow) => {
        infoWindow.close();
      });

      // 선택된 마커의 info window 열기
      const targetInfoWindow = infoWindowsRef.current[selectedMarkerId];
      if (targetInfoWindow) {
        const targetMarker = markersRef.current.find(
          (marker) =>
            marker.getTitle() ===
            markers?.find((m) => m.id === selectedMarkerId)?.title
        );
        if (targetMarker) {
          targetInfoWindow.open(mapRef.current, targetMarker);
        }
      }
    }
  }, [selectedMarkerId, markers]);

  // handlers
  const initializeMap = useCallback(() => {
    if (!window.naver || !window.naver.maps) return;

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
    infoWindowsRef.current = {};

    // 내 위치 마커 제거 (이전 마커가 있다면)
    if (myLocationMarkerRef.current) {
      myLocationMarkerRef.current.setMap(null);
      myLocationMarkerRef.current = null;
    }

    // Info window 닫기 함수를 전역으로 등록
    (
      window as unknown as { closeInfoWindow: (id: string) => void }
    ).closeInfoWindow = (id: string) => {
      if (id === "my-location") {
        // 내 위치 info window 직접 닫기
        const myLocationInfoWindow = infoWindowsRef.current["my-location"];
        if (myLocationInfoWindow) {
          myLocationInfoWindow.close();
        }
      } else {
        // 특정 마커의 info window 닫기
        const targetInfoWindow = infoWindowsRef.current[id];
        if (targetInfoWindow) {
          targetInfoWindow.close();
        }
      }
    };

    // 내 위치 마커 추가 (위치를 알고 있는 경우)
    if (hasUserLocation && userLocation) {
      const myLocationMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          userLocation[1],
          userLocation[0]
        ),
        map: map,
        title: "내 위치",
        icon: {
          content: `
            <div style="
              width: 16px; 
              height: 16px; 
              background-color: #4285f4; 
              border: 3px solid white; 
              border-radius: 50%; 
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              position: relative;
            ">
              <div style="
                width: 30px; 
                height: 30px; 
                background-color: rgba(66, 133, 244, 0.2); 
                border-radius: 50%; 
                position: absolute; 
                top: -10px; 
                left: -10px;
                animation: pulse 2s infinite;
              "></div>
            </div>
            <style>
              @keyframes pulse {
                0% { transform: scale(0.8); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
              }
            </style>
          `,
          anchor: new window.naver.maps.Point(11, 11),
        },
      });

      myLocationMarkerRef.current = myLocationMarker;

      // 내 위치 마커 클릭 시 정보창 표시
      const myLocationInfoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 10px; position: relative; min-width: 150px;" class="custom-infowindow" id="my-location-infowindow">
            <button 
              onclick="window.closeInfoWindow('my-location')"
              style="
                position: absolute;
                top: 5px;
                right: 5px;
                background: none;
                border: none;
                font-size: 14px;
                cursor: pointer;
                color: #666;
                width: 18px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s;
              "
              onmouseover="this.style.backgroundColor='#f0f0f0'"
              onmouseout="this.style.backgroundColor='transparent'"
              title="닫기"
            >
              ✕
            </button>
            <div style="font-family: sans-serif;">
              <h3 style="font-size: 14px; font-weight: bold; margin: 0 0 8px 0; color: #4285f4;">📍 내 위치</h3>
              <p style="font-size: 12px; color: #666; margin: 0;">현재 계신 위치입니다</p>
            </div>
          </div>
        `,
      });

      // 내 위치 정보창을 전역 참조에 저장 (특별한 키로)
      infoWindowsRef.current["my-location"] = myLocationInfoWindow;

      window.naver.maps.Event.addListener(myLocationMarker, "click", () => {
        // 모든 info window 닫기
        Object.values(infoWindowsRef.current).forEach((iw) => iw.close());

        // 내 위치 info window 열기
        myLocationInfoWindow.open(map, myLocationMarker);
      });
    }

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
            content: `
              <div style="padding: 10px; position: relative; min-width: 200px;" class="custom-infowindow" id="infowindow-${markerData.id}">
                <button 
                  onclick="window.closeInfoWindow('${markerData.id}')"
                  style="
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: none;
                    border: none;
                    font-size: 16px;
                    cursor: pointer;
                    color: #666;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background-color 0.2s;
                  "
                  onmouseover="this.style.backgroundColor='#f0f0f0'"
                  onmouseout="this.style.backgroundColor='transparent'"
                  title="닫기"
                >
                  ✕
                </button>
                ${markerData.content}
              </div>
            `,
          });

          // info window를 Map에 저장
          infoWindowsRef.current[markerData.id] = infoWindow;

          window.naver.maps.Event.addListener(marker, "click", () => {
            // 모든 info window 닫기
            Object.values(infoWindowsRef.current).forEach((iw) => iw.close());

            // 클릭한 마커의 info window 열기
            infoWindowsRef.current[markerData.id].open(map, marker);

            // 부모 컴포넌트에 마커 클릭 이벤트 전달
            if (onMarkerClick) {
              onMarkerClick(markerData.id);
            }
          });
        } else {
          // content가 없어도 클릭 이벤트는 전달
          window.naver.maps.Event.addListener(marker, "click", () => {
            if (onMarkerClick) {
              onMarkerClick(markerData.id);
            }
          });
        }

        markersRef.current.push(marker);
      });
    }
  }, [loc, markers, onMarkerClick, hasUserLocation, userLocation]);

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
