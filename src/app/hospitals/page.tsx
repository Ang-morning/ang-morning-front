"use client";

import { Map } from "@components";
import hospitalsMap from "@/data/hospitals.json";
import { useState } from "react";

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

  // state, ref, querystring hooks
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );

  // form hooks

  // query hooks

  // calculated values
  const { hospitals } = hospitalsMap as { hospitals: Hospital[] };

  // 지도 마커 데이터 생성 (실제 좌표 사용)
  const hospitalMarkers = hospitals.map((hospital) => ({
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
  };

  const handleCallClick = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

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
            <div className="rounded-lg h-[30vh]">
              <Map
                initialLocation={[126.978, 37.5665]}
                markers={hospitalMarkers}
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
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              병원 목록 ({hospitals.length}개)
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {hospitals.map((hospital) => (
                <div
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
                      className="ml-4 bg-primary-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200"
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
          </div>
        </div>
      </div>

      {/* 선택된 병원 상세 정보 (모바일용) */}
      {selectedHospital && (
        <div className="mt-8 lg:hidden">
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-2">
              선택된 병원
            </h3>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800">
                {selectedHospital.name}
              </h4>
              <p className="text-sm text-gray-600">
                📍 {selectedHospital.state} {selectedHospital.city}
              </p>
              <p className="text-sm text-gray-600">
                {selectedHospital.address}
              </p>
              <p className="text-sm text-gray-600">
                📞 {selectedHospital.phone}
              </p>
              {selectedHospital.note && (
                <p className="text-sm text-orange-600">
                  ℹ️ {selectedHospital.note}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
