package com.kosmo.pitchplay.entity;

import com.kosmo.pitchplay.enums.NoticeType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(
        name = "notice",
        indexes = {
                @Index(name = "idx_notice_type", columnList = "notice_type") // notice_type에 인덱스 추가
        })

public class Notice {

    /**
     * 공지사항 엔티티 클래스
     * - 공지사항과 자주 묻는 질문 데이터를 저장
     */


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String noticeId; // UUID로 고유 식별자 생성


    // 공지사항, 자주묻는 질문 나누기
    @Enumerated(EnumType.STRING) // Enum을 String으로 매핑
    @Column(name = "notice_type", nullable = false)
    private NoticeType noticeType;


    //제목
    @Column(name = "notice_title", nullable = false, length = 255)
    private String title;


    //글
    @Lob
    @Column(name = "notice_content", nullable = false, columnDefinition = "LONGTEXT")
    private String noticeContent;
    //columnDefinition = "text" 는 @Lob과 충돌 가능성이 있어서 Lob사용선택 후 columnDefinition = "text" 사용하지 않았습니다.


    //작성자
    @Column(name = "author_user_uid" , nullable = true)
    private String authorUserUid;


    //작성일
    @Column(name = "create_at", nullable = false, updatable = false)
    private LocalDateTime createAt;


    //처리상태 하드코딩 --db에 안넣음
    @Transient
    private final String status = "해당없음";


    @PrePersist
    public void prePersist(){
        this.createAt = LocalDateTime.now();
    }

}
