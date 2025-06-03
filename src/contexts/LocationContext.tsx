"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Coordinates = [number, number]; // [longitude, latitude]

interface LocationContextType {
  userLocation: Coordinates | null;
  hasUserLocation: boolean;
  locationError: string | null;
  isLoadingLocation: boolean;
}

interface LocationProviderProps {
  children: ReactNode;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

function LocationProvider(props: LocationProviderProps) {
  // prop destruction
  const { children } = props;

  // lib hooks

  // state, ref, querystring hooks
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [hasUserLocation, setHasUserLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // form hooks

  // query hooks

  // calculated values

  // effects
  useEffect(() => {
    const getCurrentLocation = () => {
      setIsLoadingLocation(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: Coordinates = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          setUserLocation(coords);
          setHasUserLocation(true);
          setIsLoadingLocation(false);
        },
        (error) => {
          let errorMessage = "위치를 가져올 수 없습니다.";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "위치 접근 권한이 거부되었습니다.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "위치 정보를 사용할 수 없습니다.";
              break;
            case error.TIMEOUT:
              errorMessage = "위치 요청 시간이 초과되었습니다.";
              break;
          }

          setLocationError(errorMessage);
          setHasUserLocation(false);
          setIsLoadingLocation(false);

          // 기본값으로 서울 설정
          setUserLocation([126.978, 37.5665]);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000, // 5분 캐시
        }
      );
    };

    getCurrentLocation();
  }, []);

  // handlers

  const contextValue: LocationContextType = {
    userLocation,
    hasUserLocation,
    locationError,
    isLoadingLocation,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
}

function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}

export { LocationProvider, useLocation };
