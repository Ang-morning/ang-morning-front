// Node.js 환경용 - 네이버 클라우드 플랫폼 Geocoding API
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const NAVER_CLIENT_ID = "x87hzw0avw";
const NAVER_CLIENT_SECRET = "Hhefz7HAyEFDWjnPJU83zkuNLqhNnEmOz42PsyB6";

// 주소를 좌표로 변환 (Geocoding)
async function geocode(address) {
  try {
    const response = await fetch(
      `https://maps.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(
        address
      )}`,
      {
        method: "GET",
        headers: {
          "X-NCP-APIGW-API-KEY-ID": NAVER_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": NAVER_CLIENT_SECRET,
        },
      }
    );

    if (!response.ok) {
      console.log("ERROR", response.status, response.statusText);
      return null;
    }

    const data = await response.json();

    if (data.addresses && data.addresses.length > 0) {
      const result = data.addresses[0];
      return {
        latitude: Number(result.y),
        longitude: Number(result.x),
        address: result.roadAddress || result.jibunAddress,
      };
    } else {
      console.log("검색 결과가 없습니다:", address);
      return null;
    }
  } catch (error) {
    console.error("Geocoding 오류:", error);
    return null;
  }
}

// 병원 데이터에 좌표 추가하는 함수
async function updateHospitalsWithCoordinates() {
  try {
    // hospitals.json 파일 읽기
    const hospitalJsonPath = path.join(
      __dirname,
      "src",
      "data",
      "hospitals.json"
    );
    const jsonData = fs.readFileSync(hospitalJsonPath, "utf8");
    const data = JSON.parse(jsonData);

    console.log(`총 ${data.hospitals.length}개 병원의 좌표를 가져오는 중...`);

    const updatedHospitals = [];

    for (let i = 0; i < data.hospitals.length; i++) {
      const hospital = data.hospitals[i];
      console.log(
        `${i + 1}/${data.hospitals.length} - ${hospital.name} 처리 중...`
      );

      const coords = await geocode(hospital.address);

      if (coords) {
        updatedHospitals.push({
          ...hospital,
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        console.log(
          `✅ ${hospital.name}: ${coords.latitude}, ${coords.longitude}`
        );
      } else {
        // 좌표를 찾지 못한 경우에도 원본 데이터는 유지
        updatedHospitals.push({
          ...hospital,
          latitude: null,
          longitude: null,
        });
        console.log(`❌ ${hospital.name}: 좌표를 찾을 수 없음`);
      }

      // API 호출 간격 조절 (0.5초 대기)
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // 업데이트된 데이터 구조
    const updatedData = {
      hospitals: updatedHospitals,
    };

    // 결과를 새 파일로 저장
    const outputPath = path.join(
      __dirname,
      "src",
      "data",
      "hospitals_with_coords.json"
    );
    fs.writeFileSync(outputPath, JSON.stringify(updatedData, null, 2), "utf8");

    console.log("=== 처리 완료 ===");
    console.log(`📁 결과가 저장되었습니다: ${outputPath}`);
    console.log(
      `✅ 성공: ${updatedHospitals.filter((h) => h.latitude !== null).length}개`
    );
    console.log(
      `❌ 실패: ${updatedHospitals.filter((h) => h.latitude === null).length}개`
    );

    // 기존 파일도 백업 후 업데이트
    const backupPath = path.join(
      __dirname,
      "src",
      "data",
      "hospitals_backup.json"
    );
    fs.writeFileSync(backupPath, jsonData, "utf8");
    console.log(`📋 원본 파일 백업: ${backupPath}`);

    // 원본 파일 업데이트
    fs.writeFileSync(
      hospitalJsonPath,
      JSON.stringify(updatedData, null, 2),
      "utf8"
    );
    console.log(`🔄 원본 파일 업데이트: ${hospitalJsonPath}`);

    return updatedData;
  } catch (error) {
    console.error("병원 데이터 업데이트 오류:", error);
    return null;
  }
}

(async () => {
  console.log("=== Node.js 환경에서 병원 좌표 처리 시작 ===");
  await updateHospitalsWithCoordinates();
})();
