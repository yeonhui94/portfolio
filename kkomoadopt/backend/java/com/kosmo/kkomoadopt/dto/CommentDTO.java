package com.kosmo.kkomoadopt.dto;

import java.time.LocalDateTime;

public record CommentDTO(
        String commentId,
        String commentContent,
        String postUid,
        String userId,
        String commentDelReason
) {
    public void setUserId(String sessionUserId) {
    }
}
