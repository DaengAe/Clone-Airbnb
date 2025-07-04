export interface Property {
  id: number;
  image: string;
  title: string;
  country: string;
  province: string;
  city: string;
  price: number;
  rating?: number; // 별점은 선택적일 수 있으므로 '?'를 붙였습니다.
  isGuestFavorite?: boolean; // 이 부분을 추가해야 합니다. (선택적)
  createdAt: string; // ISO 8601 형식의 날짜 문자열
  description: string; // 숙소 상세 설명
  amenities: string[]; // 편의시설 목록
}
