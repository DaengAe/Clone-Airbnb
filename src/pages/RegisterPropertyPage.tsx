import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { provinces, citiesByProvince } from "../data/koreanAddresses";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams

const RegisterPropertyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px); /* Adjust height as needed */
  padding: 2rem;
`;

const RegisterPropertyFormWrapper = styled.div`
  background-color: white;
  padding: 2rem 3rem; /* Increased horizontal padding */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; /* Ensure padding and border are included in the width */
  &:focus {
    outline: none;
    border-color: #ff385c;
    box-shadow: 0 0 0 2px rgba(255, 56, 92, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #ff385c;
    box-shadow: 0 0 0 2px rgba(255, 56, 92, 0.2);
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

const AmenityCheckbox = styled.div`
  display: flex;
  align-items: center;
  input[type="checkbox"] {
    margin-right: 0.5rem;
    width: 1.2rem;
    height: 1.2rem;
    accent-color: #ff385c; /* Airbnb red */
  }
  label {
    font-size: 1rem;
    color: #555;
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.8rem 0;
  font-size: 1rem;
  color: #555;
  box-sizing: border-box;
  &::file-selector-button {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 25px;
    background-color: #f0f0f0;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e61e4d;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 56, 92, 0.4);
  }
`;

const ErrorMessage = styled.p`
  color: #ff385c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const PriceInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PriceButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #ff385c;
    box-shadow: 0 0 0 2px rgba(255, 56, 92, 0.2);
  }
`;

const RegisterPropertyPage: React.FC = () => {
  const [propertyName, setPropertyName] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [pricePerNight, setPricePerNight] = useState<number>(10000);
  const [numberOfBedrooms, setNumberOfBedrooms] = useState<number>(1);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState(""); // New state for optional info
  const [propertyImages, setPropertyImages] = useState<FileList | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate(); // Initialize useNavigate
  const { accommodationId } = useParams<{ accommodationId: string }>(); // Get accommodationId from URL

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login", { replace: true });
      return;
    }

    if (userRole !== "HOST") {
      alert("숙소 등록은 호스트만 가능합니다.");
      navigate("/", { replace: true }); // Redirect to homepage
      return;
    }

    // If accommodationId exists in URL, fetch details for editing
    if (accommodationId) {
      const fetchAccommodationDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/accommodations/${accommodationId}/details`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setPropertyName(data.name);
            setSelectedProvince(data.district);
            setSelectedCity(data.city);
            setDetailedAddress(data.detailAddress);
            setPricePerNight(data.pricePerNight);
            setNumberOfBedrooms(data.bedroomCount);
            setAmenities(data.amenities ? data.amenities.split(', ') : []);
            setAdditionalInfo(data.extraInfo || "");
            // photoUrls는 현재 파일 객체로 직접 설정할 수 없으므로, 여기서는 처리하지 않습니다.
            // 실제 구현에서는 이미지 URL을 보여주는 로직이 필요합니다.
          } else {
            alert("숙소 정보를 불러오는데 실패했습니다.");
            navigate("/my-accommodations", { replace: true }); // Redirect to my accommodations list
          }
        } catch (error) {
          console.error("숙소 정보 불러오기 실패:", error);
          alert("숙소 정보를 불러오는 중 오류가 발생했습니다.");
          navigate("/my-accommodations", { replace: true });
        }
      };
      fetchAccommodationDetails();
    }
  }, [accommodationId, navigate]);

  const amenitiesList = [
    "무선 인터넷",
    "주방",
    "세탁기",
    "건조기",
    "에어컨",
    "난방",
    "TV",
    "헤어드라이어",
    "다리미",
    "업무 전용 공간",
    "무료 주차",
    "수영장",
    "자쿠지",
    "바비큐 그릴",
    "야외 식사 공간",
    "화재 경보기",
    "일산화탄소 경보기",
    "구급 상자",
    "소화기",
  ];

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((amenity) => amenity !== value)
    );
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!propertyName) errors.propertyName = "숙소 이름을 입력해주세요.";
    if (!selectedProvince) errors.selectedProvince = "시/도를 선택해주세요.";
    if (!selectedCity) errors.selectedCity = "시/군/구를 선택해주세요.";
    if (!detailedAddress) errors.detailedAddress = "상세 주소를 입력해주세요.";
    if (pricePerNight < 10000)
      errors.pricePerNight = "1박당 가격은 10,000원 이상이어야 합니다.";
    if (!numberOfBedrooms) errors.numberOfBedrooms = "침실 수를 선택해주세요.";
    if (amenities.length === 0)
      errors.amenities = "편의 시설을 1개 이상 선택해주세요.";
    if (!propertyImages || propertyImages.length === 0)
      errors.propertyImages = "숙소 사진을 1장 이상 업로드해주세요.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({}); // Clear previous errors

    if (!validateForm()) {
      alert("모든 필수 정보를 올바르게 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      // This case should ideally be handled by the useEffect above
      return;
    }

    // photoUrls는 현재 파일 객체이므로, 실제 URL로 변환하거나 백엔드에서 처리할 수 있는 형태로 변경해야 합니다.
    // 여기서는 간단히 파일 이름만 보내는 것으로 가정합니다. 실제 구현에서는 파일 업로드 로직이 필요합니다.
    const photoUrls = propertyImages
      ? Array.from(propertyImages).map((file) => file.name)
      : [];

    const requestBody = {
      name: propertyName,
      city: selectedCity,
      district: selectedProvince, // 백엔드 DTO와 일치하도록 수정
      detailAddress: detailedAddress,
      pricePerNight: pricePerNight,
      bedroomCount: numberOfBedrooms,
      amenities: amenities.join(", "), // 배열을 콤마로 구분된 문자열로 변환
      extraInfo: additionalInfo,
      photoUrls: photoUrls,
    };

    const url = accommodationId
      ? `http://localhost:8080/api/accommodations/${accommodationId}`
      : "http://localhost:8080/api/accommodations/register";
    const method = accommodationId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const registeredAccommodation = await response.json(); // 등록 또는 수정된 숙소 정보 받기
        alert(
          `숙소 ${accommodationId ? "수정" : "등록"} 신청이 완료되었습니다. 운영자의 수락을 대기해주세요.`
        );
        navigate(`/accommodation-status/${registeredAccommodation.id}`); // 숙소 상태 페이지로 이동
      } else {
        const errorData = await response.json();
        alert(
          `숙소 ${accommodationId ? "수정" : "등록"} 실패: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("숙소 요청 실패:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPropertyImages(e.target.files);
    }
  };

  const handlePriceChange = (amount: number) => {
    setPricePerNight((prevPrice) => Math.max(10000, prevPrice + amount));
  };

  const handleBedroomChange = (amount: number) => {
    setNumberOfBedrooms((prevBedrooms) => Math.max(1, prevBedrooms + amount));
  };

  return (
    <RegisterPropertyPageContainer>
      <RegisterPropertyFormWrapper>
        <Title>숙소 등록하기</Title>
        <p style={{ textAlign: "left", marginBottom: "1.5rem", color: "#555" }}>
          <span style={{ color: "#ff385c", fontWeight: "bold" }}>*</span> 표시는
          필수 입력 항목입니다.
        </p>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="propertyName">
              숙소 이름 <span style={{ color: "#ff385c" }}>*</span>
            </Label>
            <Input
              type="text"
              id="propertyName"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="예: 아늑한 서울 아파트"
            />
            {formErrors.propertyName && (
              <ErrorMessage>{formErrors.propertyName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              숙소 주소 <span style={{ color: "#ff385c" }}>*</span>
            </Label>
            <Select
              id="province"
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedCity(""); // Reset city when province changes
              }}
            >
              <option value="">시/도 선택</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </Select>
            {formErrors.selectedProvince && (
              <ErrorMessage>{formErrors.selectedProvince}</ErrorMessage>
            )}

            {selectedProvince && (
              <Select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{ marginTop: "1rem" }}
              >
                <option value="">시/군/구 선택</option>
                {citiesByProvince[selectedProvince]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            )}
            {formErrors.selectedCity && (
              <ErrorMessage>{formErrors.selectedCity}</ErrorMessage>
            )}

            <Input
              type="text"
              id="detailedAddress"
              value={detailedAddress}
              onChange={(e) => setDetailedAddress(e.target.value)}
              placeholder="상세 주소 (예: 강남대로 100 ○○아파트 101동 1001호)"
              style={{ marginTop: "1rem" }}
            />
            {formErrors.detailedAddress && (
              <ErrorMessage>{formErrors.detailedAddress}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="pricePerNight">
              1박당 가격 (원) <span style={{ color: "#ff385c" }}>*</span>
            </Label>
            <PriceInputWrapper>
              <PriceButton
                type="button"
                onClick={() => handlePriceChange(-10000)}
              >
                -
              </PriceButton>
              <Input
                type="number"
                id="pricePerNight"
                value={pricePerNight}
                onChange={(e) => setPricePerNight(Number(e.target.value))}
                placeholder="예: 50000"
                min="10000"
              />
              <PriceButton
                type="button"
                onClick={() => handlePriceChange(10000)}
              >
                +
              </PriceButton>
            </PriceInputWrapper>
            {formErrors.pricePerNight && (
              <ErrorMessage>{formErrors.pricePerNight}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="numberOfBedrooms">
              침실 수 <span style={{ color: "#ff385c" }}>*</span>
            </Label>
            <PriceInputWrapper>
              <PriceButton
                type="button"
                onClick={() => handleBedroomChange(-1)}
              >
                -
              </PriceButton>
              <Input
                type="number"
                id="numberOfBedrooms"
                value={numberOfBedrooms}
                onChange={(e) => setNumberOfBedrooms(Number(e.target.value))}
                min="1"
              />
              <PriceButton type="button" onClick={() => handleBedroomChange(1)}>
                +
              </PriceButton>
            </PriceInputWrapper>
            {formErrors.numberOfBedrooms && (
              <ErrorMessage>{formErrors.numberOfBedrooms}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>
              편의 시설 <span style={{ color: "#ff385c" }}>*</span>
            </Label>
            <AmenitiesGrid>
              {amenitiesList.map((amenity) => (
                <AmenityCheckbox key={amenity}>
                  <input
                    type="checkbox"
                    id={amenity}
                    value={amenity}
                    checked={amenities.includes(amenity)}
                    onChange={handleAmenityChange}
                  />
                  <label htmlFor={amenity}>{amenity}</label>
                </AmenityCheckbox>
              ))}
            </AmenitiesGrid>
            {formErrors.amenities && (
              <ErrorMessage>{formErrors.amenities}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="propertyImages">
              숙소 사진 <span style={{ color: "#ff385c" }}>*</span>
            </Label>
            <FileInput
              type="file"
              id="propertyImages"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            {formErrors.propertyImages && (
              <ErrorMessage>{formErrors.propertyImages}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="additionalInfo">추가 숙소 정보 (선택 사항)</Label>
            <TextArea
              id="additionalInfo"
              rows={3}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="추가적인 숙소 정보나 특별한 사항을 입력해주세요."
            ></TextArea>
          </FormGroup>

          <SubmitButton type="submit">숙소 등록하기</SubmitButton>
        </form>
      </RegisterPropertyFormWrapper>
    </RegisterPropertyPageContainer>
  );
};

export default RegisterPropertyPage;
