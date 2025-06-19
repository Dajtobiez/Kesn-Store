package poly.edu.service;

import poly.edu.dto.ReviewDTO;
import java.util.List;

public interface ReviewService {
	ReviewDTO saveReview(ReviewDTO reviewDTO);
    List<ReviewDTO> getReviewsByProductId(Long productId);
    Double getAverageRating(Long productId);
    void deleteReview(Long id);
}
