function initInterceptor() {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
        try {
            // ✅ Tùy chọn: ghi log request
            console.log('📤 Request:', args[0], args[1]);

            const response = await originalFetch(...args);

            // ✅ Tùy chọn: ghi log response
            console.log('📥 Response:', response);

            // ✅ Nếu HTTP status là lỗi, thì throw để xử lý luôn
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status} - ${errorText}`);
            }

            return response;
        } catch (error) {
            console.error('❌ Fetch Error:', error);
            throw error; // cần throw lại để bên gọi biết có lỗi
        }
    };
}