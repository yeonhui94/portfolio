package com.kosmo.kkomoadopt.config;

//import com.kosmo.kkomoadopt.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173/")  // React 앱의 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);  // 쿠키 및 세션을 허용
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // D:/temp/upload 디렉토리의 파일을 /upload 경로로 매핑
        registry.addResourceHandler("/upload/**")
                .addResourceLocations("file:///C:/temp/upload/");
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        // 로그인 인터셉터를 등록
//        registry.addInterceptor(new LoginInterceptor())
//                .addPathPatterns("/api/user/**") // 특정 경로에만 인터셉터 적용
//                .excludePathPatterns("/api/login", "/api/register"); // 로그인, 회원가입 API는 제외
//    }
}
