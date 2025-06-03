"use client";

import { Map } from "@components";
import hospitalsMap from "@/data/hospitals.json";
import { useState, useMemo, useRef } from "react";
import { useLocation } from "@/contexts";

// 병원 데이터 타입 정의
interface Hospital {
  id: number;
  state: string;
  city: string;
  name: string;
  phone: string;
  address: string;
  note: string;
  zipCode?: string;
  latitude: number;
  longitude: number;
}

export default function HospitalsPage() {
  // prop destruction

  // lib hooks
  const { userLocation, isLoadingLocation } = useLocation();

  // state, ref, querystring hooks
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>();
  const hospitalListRef = useRef<HTMLDivElement>(null);

  // form hooks

  // query hooks

  // calculated values
  const { hospitals } = hospitalsMap as { hospitals: Hospital[] };

  // 고유한 state 목록 추출 (가나다순 정렬)
  const uniqueStates = useMemo(() => {
    const states = [...new Set(hospitals.map((hospital) => hospital.state))];
    return states.sort();
  }, [hospitals]);

  // 선택된 state에 따른 고유한 city 목록 추출 (가나다순 정렬)
  const uniqueCities = useMemo(() => {
    if (!selectedState) return [];
    const cities = [
      ...new Set(
        hospitals
          .filter((hospital) => hospital.state === selectedState)
          .map((hospital) => hospital.city)
      ),
    ];
    return cities.sort();
  }, [hospitals, selectedState]);

  // 필터링된 병원 목록
  const filteredHospitals = useMemo(() => {
    let filtered = hospitals;

    // 검색어 필터링
    if (searchKeyword.trim()) {
      filtered = filtered.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // state 필터링
    if (selectedState) {
      filtered = filtered.filter(
        (hospital) => hospital.state === selectedState
      );
    }

    // city 필터링
    if (selectedCity) {
      filtered = filtered.filter((hospital) => hospital.city === selectedCity);
    }

    // 가나다순 정렬
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [hospitals, searchKeyword, selectedState, selectedCity]);

  // 지도 마커 데이터 생성 (필터링된 병원만)
  const hospitalMarkers = filteredHospitals.map((hospital) => ({
    id: hospital.id.toString(),
    coordinates: [hospital.longitude, hospital.latitude] as [number, number],
    title: hospital.name,
    content: `
      <div class="font-sans">
        <h3 class="font-bold text-sm mb-1">${hospital.name}</h3>
        <p class="text-xs text-gray-600 mb-1">${hospital.address}</p>
        <p class="text-xs text-blue-600">${hospital.phone}</p>
        ${
          hospital.note
            ? `<p class="text-xs text-orange-600 mt-1">${hospital.note}</p>`
            : ""
        }
      </div>
    `,
  }));

  // effects

  // handlers
  const handleHospitalClick = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    // 지도 중심점을 클릭한 병원 위치로 이동
    setMapCenter([hospital.longitude, hospital.latitude]);
  };

  const handleMarkerClick = (markerId: string) => {
    // 마커 ID로 병원 찾기
    const hospital = filteredHospitals.find(
      (h) => h.id.toString() === markerId
    );
    if (hospital) {
      setSelectedHospital(hospital);

      // 해당 병원 항목으로 스크롤 (리스트 컨테이너 내에서만)
      const hospitalElement = document.getElementById(
        `hospital-${hospital.id}`
      );
      const listContainer = hospitalListRef.current;
      if (hospitalElement && listContainer) {
        const containerRect = listContainer.getBoundingClientRect();
        const elementRect = hospitalElement.getBoundingClientRect();
        const scrollTop = listContainer.scrollTop;

        // 요소가 컨테이너 중앙에 오도록 스크롤 위치 계산
        const targetScrollTop =
          scrollTop +
          (elementRect.top - containerRect.top) -
          containerRect.height / 2 +
          elementRect.height / 2;

        listContainer.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    }
  };

  const handleCallClick = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity(""); // state 변경 시 city 초기화
  };

  const handleSearchClear = () => {
    setSearchKeyword("");
    setSelectedState("");
    setSelectedCity("");
  };

  // 로딩 중이면 로딩 표시
  if (isLoadingLocation) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">위치 정보를 가져오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          앵무새 전문 병원 찾기
        </h1>
        <p className="text-gray-600">
          전국의 앵무새를 진료하는 동물병원 정보를 확인하세요
        </p>
      </div>

      <div className="space-y-8">
        {/* 지도 섹션 */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">병원 위치</h2>
            <div className="rounded-lg h-[40vh]">
              <Map
                initialLocation={userLocation || [126.978, 37.5665]}
                centerLocation={mapCenter}
                markers={hospitalMarkers}
                selectedMarkerId={selectedHospital?.id.toString()}
                onMarkerClick={handleMarkerClick}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              마커를 클릭하면 병원 정보를 확인할 수 있습니다
            </p>
          </div>
        </div>

        {/* 병원 리스트 섹션 */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-gray-800">
                병원 목록 ({filteredHospitals.length}개)
              </h2>

              {/* 간단한 검색/필터 UI */}
              <div className="flex flex-col sm:flex-row gap-3 lg:max-w-2xl">
                {/* 초기화 버튼 */}
                {(searchKeyword || selectedState || selectedCity) && (
                  <button
                    onClick={handleSearchClear}
                    className="px-3 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium whitespace-nowrap cursor-pointer"
                  >
                    초기화
                  </button>
                )}
                {/* 검색창 */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="병원명 검색..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none cursor-text"
                  />
                  {searchKeyword && (
                    <button
                      onClick={() => setSearchKeyword("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* 지역 필터 */}
                <div className="flex gap-2">
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none cursor-pointer"
                  >
                    <option value="">전체 지역</option>
                    {uniqueStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="">전체 시/군</option>
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {filteredHospitals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-3">
                  검색 조건에 맞는 병원이 없습니다.
                </p>
                <button
                  onClick={handleSearchClear}
                  className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer"
                >
                  검색 조건 초기화
                </button>
              </div>
            ) : (
              <div
                className="space-y-3 max-h-96 overflow-y-auto"
                ref={hospitalListRef}
              >
                {filteredHospitals.map((hospital) => (
                  <div
                    id={`hospital-${hospital.id}`}
                    key={hospital.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedHospital?.id === hospital.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleHospitalClick(hospital)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {hospital.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          📍 {hospital.state} {hospital.city}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                          {hospital.address}
                        </p>
                        {hospital.note && (
                          <span className="inline-block text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            {hospital.note}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCallClick(hospital.phone);
                        }}
                        className="ml-4 bg-primary-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200 cursor-pointer"
                      >
                        📞 전화
                      </button>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-500">{hospital.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
