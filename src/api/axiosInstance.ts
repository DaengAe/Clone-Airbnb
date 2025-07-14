import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // 쿠키를 자동으로 포함하도록 설정
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // 요청 전에 수행할 작업 (예: 로딩 스피너 표시)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 후에 수행할 작업 (예: 로딩 스피너 숨기기)
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러 발생 시 (액세스 토큰 만료)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 리프레시 토큰으로 새로운 액세스 토큰 요청
        const response = await axiosInstance.post('/refresh'); // 서버에 /api/refresh 엔드포인트 필요
        // 새로운 액세스 토큰은 HttpOnly 쿠키로 설정되므로 클라이언트에서 별도로 저장할 필요 없음
        
        // 이전 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료되었거나 유효하지 않은 경우
        console.error('리프레시 토큰 만료 또는 유효하지 않음:', refreshError);
        // 로그인 페이지로 리다이렉트 또는 로그아웃 처리
        localStorage.removeItem('email');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
