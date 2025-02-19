package com.kosmo.kkomoadopt.dto;

import com.kosmo.kkomoadopt.enums.PostCategory;

import java.time.LocalDateTime;
import java.util.List;

public record CommunityListDTO
        (
                String postUid,
                Integer postId,
                PostCategory postCategory,
                String postTitle,
                String postContent,
                LocalDateTime postCreatedAt,
                LocalDateTime postUpdatedAt,
                List<String> postImgUrl,
                Boolean isDeleted,
                String deleteReason,
                String userId,
                Integer postViewCount,
                String postAuthor,
                List<CommentListDTO> comments

        ){ }
