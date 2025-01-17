package org.unical.webapp.backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class BackendConfiguration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/utente/**")
                        .allowedOrigins("http://localhost:4200") // Dominio Angular
                        .allowCredentials(true)
                        .allowedMethods("GET", "POST", "PUT", "DELETE");

                registry.addMapping("/commento/**")
                        .allowedOrigins("http://localhost:4200") // Dominio Angular
                        .allowCredentials(true)
                        .allowedMethods("GET", "POST", "PUT", "DELETE");

                registry.addMapping("/contenuto/**")
                        .allowedOrigins("http://localhost:4200") // Dominio Angular
                        .allowCredentials(true)
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}