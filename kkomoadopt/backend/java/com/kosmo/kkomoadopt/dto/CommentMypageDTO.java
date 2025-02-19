package com.kosmo.kkomoadopt.dto;

import java.time.LocalDateTime;

public record CommentMypageDTO(
        String commentId,
        String commentContent,
        LocalDateTime commentCreatedAt,
        Boolean isDeleted,
        String postUid,
        String userId
) {
}