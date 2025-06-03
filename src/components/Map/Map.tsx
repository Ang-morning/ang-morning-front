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

  // state, ref, querystring hooks
  const mapRef = useRef<NaverMap>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowsRef = useRef<Record<string, naver.maps.InfoWindow>>({});
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
              <div style="padding: 10px; position: relative; min-width: 200px;" class="custom-infowindow">
                <button 
                  class="close-btn"
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

          // info window가 DOM에 추가될 때 X 버튼 이벤트 연결
          window.naver.maps.Event.addListener(infoWindow, "domready", () => {
            // 약간의 딜레이를 두어 DOM이 완전히 렌더링된 후 이벤트 연결
            setTimeout(() => {
              const closeButton = document.querySelector(
                ".custom-infowindow .close-btn"
              );
              if (closeButton) {
                closeButton.addEventListener("click", (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  infoWindow.close();
                });
              }
            }, 100);
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
  }, [loc, markers, onMarkerClick]);

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
