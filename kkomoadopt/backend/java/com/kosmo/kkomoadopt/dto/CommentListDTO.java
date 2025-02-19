package com.kosmo.kkomoadopt.dto;

import com.kosmo.kkomoadopt.enums.PostCategory;

import java.time.LocalDateTime;

public record CommentListDTO(
        String commentId,
        String commentContent,
        LocalDateTime commentCreatedAt,
        String postUid,
        String nickname,
        Boolean isDeleted,
        String commentDelReason
//        PostCategory postCategory
) {
}
