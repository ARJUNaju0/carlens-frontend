import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token =
                localStorage.getItem("access");

            if (token) {
                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 (Unauthorized) and we haven't retried yet, and it's not a login or refresh request
        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/accounts/login/") &&
            !originalRequest.url?.includes("/token/refresh/")
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh");
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // Call the token refresh endpoint using a fresh axios instance to avoid interceptor recursion
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/accounts/token/refresh/`,
                    { refresh: refreshToken }
                );

                const newAccessToken = response.data.access;
                localStorage.setItem("access", newAccessToken);

                // Update the Authorization header and retry the original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed, logging out:", refreshError);
                if (typeof window !== "undefined") {
                    const { useAuthStore } = await import("@/store/auth-store");
                    useAuthStore.getState().logout();
                    window.location.href = "/login";
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;