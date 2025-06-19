package poly.edu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.edu.entity.Review;
import poly.edu.repository.ReviewRepository;

import poly.edu.dto.ReviewDTO;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService  {
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Override
	public ReviewDTO saveReview(ReviewDTO reviewDTO) {
		Review review = convertToEntity(reviewDTO);
		review = reviewRepository.save(review);
		return convertToDTO(review);
	}
	
	@Override
    public List<ReviewDTO> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Double getAverageRating(Long productId) {
        List<Review> reviews = reviewRepository.findByProductId(productId);
        return reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    private Review convertToEntity(ReviewDTO dto) {
        Review review = new Review();
        review.setProductId(dto.getProductId());
        review.setRating(dto.getRating());
        review.setComment(dto.getComment());
        // Add image handling if needed
        return review;
    }

    private ReviewDTO convertToDTO(Review entity) {
        ReviewDTO dto = new ReviewDTO();
        dto.setId(entity.getId());
        dto.setProductId(entity.getProductId());
        dto.setRating(entity.getRating());
        dto.setComment(entity.getComment());
        // Add image handling if needed
        return dto;
    }

}
