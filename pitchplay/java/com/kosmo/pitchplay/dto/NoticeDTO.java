package com.kosmo.pitchplay.dto;

import com.kosmo.pitchplay.enums.NoticeType; // Enum import
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NoticeDTO {
    private String id; // 게시글 번호
    private NoticeType noticeType; // 카테고리 (String -> NoticeType)
    private String title; // 제목
    private String author; // 작성자
    private LocalDateTime createAt; // 작성일
    private String status; // 처리상태
    private String content; // 글
}
