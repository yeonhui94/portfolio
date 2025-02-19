package com.kosmo.kkomoadopt.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "comment")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "comment_id", nullable = false, length = 36)
    private String commentId;
    // 댓글번호
    @Lob
    @Column(name = "comment_content", nullable = false)
    private String commentContent;
    // 댓글컨텐츠
    @Column(name = "comment_created_at", nullable = false, updatable = false)
    private LocalDateTime commentCreatedAt;
    // 댓글작성자
    @Column(name = "comment_updated_at", nullable = false)
    private LocalDateTime commentUpdatedAt;
    //댓글업데이트날짜
    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false; // 댓글 삭제 여부를 나타내는 필드
    // 댓글 삭제 사유
    @Column(name = "comment_del_reason")
    private String commentDelReason = null;
    // 삭제여부(관리자)
    // communitypost의 post id
    @Column(name = "post_uid", nullable = false)
    private String postUid; // FK
    // 커뮤니티 글번호
    // comment 작성자
    @Column(name = "user_id", nullable = false)
    private String userId; // FK
    // 작성자
    @Override
    public String toString() {
        return "CommentEntity{" +
                "commentId='" + commentId + '\'' +
                ", commentContent='" + commentContent + '\'' +
                ", commentCreatedAt=" + commentCreatedAt +
                ", commentUpdatedAt=" + commentUpdatedAt +
                ", isDeleted=" + isDeleted +
                ", commentDelReason='" + commentDelReason + '\'' +
                ", postUid='" + postUid + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
