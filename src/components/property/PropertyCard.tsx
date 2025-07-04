import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Property } from "../../types"; // Import Property interface
import { FaStar, FaRegHeart } from "react-icons/fa"; // Import icons for star and heart

interface PropertyCardProps {
  property: Property;
  cardWidth?: string; // Optional prop to control card width
}

const Card = styled(Link)<{ cardWidth?: string }>`
  text-decoration: none;
  color: inherit;
  display: block;
  flex-shrink: 0; /* Prevent cards from shrinking */
  width: ${(props) => props.cardWidth || "200px"}; /* Use prop or default */
  scroll-snap-align: start; /* Align to the start of the scroll container */
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  border-radius: 12px;
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
  cursor: pointer;
  color: white; /* Heart icon color */
  font-size: 1.5rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* For better visibility */
`;

const GuestFavoriteTag = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: white;
  color: #222;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
`;

const CardContent = styled.div`
  padding-top: 0.8rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem; /* Slightly larger font for title */
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Location = styled.p`
  margin: 0.2rem 0;
  color: #717171;
  font-size: 1rem; /* Slightly larger font for location */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  margin: 0.4rem 0 0 0;
  font-weight: 600;
  font-size: 1.05rem; /* Slightly larger font for price */
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem; /* Slightly larger font for rating */
  font-weight: 500;

  svg {
    margin-right: 0.2rem;
    color: #ff385c;
  }
`;

const PropertyCard: React.FC<PropertyCardProps> = ({ property, cardWidth }) => {
  return (
    <Card to={`/property/${property.id}`} cardWidth={cardWidth}>
      <CardImageContainer>
        <CardImage src={property.image} alt={property.title} />
        {property.isGuestFavorite && (
          <GuestFavoriteTag>게스트 선호</GuestFavoriteTag>
        )}
        <HeartIcon>
          <FaRegHeart /> {/* 빈 하트 아이콘 */}
        </HeartIcon>
      </CardImageContainer>
      <CardContent>
        <Title>{property.title}</Title>
        <Location>{property.location}</Location>
        {property.rating && (
          <Rating>
            <FaStar /> {property.rating.toFixed(1)} {/* 별점 표시 */}
          </Rating>
        )}
        <Price>{property.price.toLocaleString()}</Price>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
