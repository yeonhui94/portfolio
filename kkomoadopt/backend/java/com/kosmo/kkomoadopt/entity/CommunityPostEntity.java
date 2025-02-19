package com.kosmo.kkomoadopt.entity;

import com.kosmo.kkomoadopt.converter.PostCategoryConverter;
import com.kosmo.kkomoadopt.converter.UrlConverter;
import com.kosmo.kkomoadopt.enums.PostCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "community_post")
public class CommunityPostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "post_uid", nullable = false, length = 36)
    private String postUid;

    @Column(name = "post_id", unique = true)
    private Integer postId;

//    @Enumerated(EnumType.STRING)
    @Convert(converter = PostCategoryConverter.class)
    @Column(name = "post_category")
    private PostCategory postCategory;

    @Column(name = "post_title")
    private String postTitle;

    @Lob
    @Column(name = "post_content", columnDefinition = "text")
    private String postContent;

    @Column(name = "post_created_at", nullable = false, updatable = false)
    private LocalDateTime postCreatedAt;

    @Column(name = "post_updated_at", nullable = false)
    private LocalDateTime postUpdatedAt;

    @Convert(converter = UrlConverter.class)
    @Column(name = "post_img_url", columnDefinition = "text")
    private List<String> postImgUrl  = new ArrayList<>();

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "delete_reason")
    private String deleteReason;

    // communityPost 작성자
    @Column(name = "user_id", nullable = false)
    private String userId; // FK

    @Column(name = "post_view_count", nullable = false)
    private Integer postViewCount = 0;

    @Override
    public String toString() {
        return "CommunityPostEntity{" +
                "postUid='" + postUid + '\'' +
                ", postId=" + postId +
                ", postCategory=" + postCategory +
                ", postTitle='" + postTitle + '\'' +
                ", postContent='" + postContent + '\'' +
                ", postCreatedAt=" + postCreatedAt +
                ", postUpdatedAt=" + postUpdatedAt +
                ", postImgUrl=" + postImgUrl +
                ", isDeleted=" + isDeleted +
                ", deleteReason='" + deleteReason + '\'' +
                ", userId='" + userId + '\'' +
                ", postViewCount=" + postViewCount +
                '}';
    }
}

