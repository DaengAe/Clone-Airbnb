export interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  rating?: number; // 별점은 선택적일 수 있으므로 '?'를 붙였습니다.
  isGuestFavorite?: boolean; // 이 부분을 추가해야 합니다. (선택적)
}
