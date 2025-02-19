package com.kosmo.kkomoadopt.dto;

import com.kosmo.kkomoadopt.enums.PostCategory;

import java.time.LocalDateTime;

public record CommunityMypageDTO (
        String postUid,
        Integer postId,
        PostCategory postCategory,
        String postTitle,
        LocalDateTime postCreatedAt,
        String userId,
        Integer postViewCount
){
}
