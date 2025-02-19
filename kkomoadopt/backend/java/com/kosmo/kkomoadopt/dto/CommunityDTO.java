package com.kosmo.kkomoadopt.dto;


import com.kosmo.kkomoadopt.enums.PostCategory;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class CommunityDTO{
    private String postUid;
    private PostCategory postCategory;
    private String postTitle;
    private String postContent;
    private Boolean isDeleted;
    private String deleteReason;
    private String userId;
    private String postAuthor;
    private String postId;
}
