import hospitals from "@/data/hospitals.json";

export default function HospitalsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">앵무새 전문 병원</h1>

      <div className="space-y-6">
        {hospitals.hospitals.map((hospital) => (
          <div key={hospital.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{hospital.name}</h2>
            <div className="space-y-2 text-gray-600">
              <p>주소: {hospital.address}</p>
              <p>전화번호: {hospital.phoneNumber}</p>
              <p>진료시간: {hospital.operatingHours}</p>
              <p className="mt-2">{hospital.description}</p>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">제공 서비스</h3>
              <div className="flex gap-2">
                {hospital.services.map((service) => (
                  <span
                    key={service}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            {/* 지도 섹션은 나중에 구현 */}
            <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">지도가 여기에 표시됩니다</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
