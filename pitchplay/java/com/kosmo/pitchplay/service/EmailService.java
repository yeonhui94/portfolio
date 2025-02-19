package com.kosmo.pitchplay.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "k93305@gmail.com"; // 발신자 이메일

    // 인증번호 생성 메서드
    private Integer createNumber() {
        return (int) (Math.random() * 900000) + 100000; // 100000 ~ 999999 범위
    }

    // 인증번호 메일 생성
    public MimeMessage createMail(String mail, Integer number) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, mail);
            message.setSubject("이메일 인증");
            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + number + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body, "UTF-8", "html");
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return message;
    }

    // 인증번호 생성 및 메일 발송
    public Integer sendMail(String mail) {
        Integer number = createNumber(); // 인증번호 생성
        MimeMessage message = createMail(mail, number); // 메일 생성
        javaMailSender.send(message); // 메일 발송
        return number; // 생성된 인증번호 반환
    }
}
