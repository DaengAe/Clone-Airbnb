import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Property } from "../../types"; // Import Property interface

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
  font-size: 1.5rem;
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
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Location = styled.p`
  margin: 0.2rem 0;
  color: #717171;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  margin: 0.4rem 0 0 0;
  font-weight: 500;
  font-size: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
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
        {property.rating && property.rating >= 4.9 && (
          <GuestFavoriteTag>게스트 선호</GuestFavoriteTag>
        )}
        <HeartIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            style={{
              fill: "rgba(0, 0, 0, 0.5)",
              height: "24px",
              width: "24px",
              stroke: "white",
              strokeWidth: "2",
            }}
          >
            <path d="m16 28c7-4.733 14-10 14-17a6.98 6.98 0 0 0 -7-7c-1.8 0-3.58 1.167-4.14 2.167h-5.72c-.56-1-2.34-2.167-4.14-2.167a6.98 6.98 0 0 0 -7 7c0 7 7 12.267 14 17z" />
          </svg>
        </HeartIcon>
      </CardImageContainer>
      <CardContent>
        <Title>{property.title}</Title>
        <Location>{property.city}, {property.province}</Location>
        {property.rating && (
          <Rating>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              style={{ fill: "#ff385c", height: "16px", width: "16px" }}
            >
              <path d="m15.81 1.34a2 2 0 0 1 3.38 0l4.36 8.84 9.76 1.42a2 2 0 0 1 1.11 3.41l-7.06 6.88.67 9.72a2 2 0 0 1 -2.9 2.11l-8.73-4.59-8.73 4.59a2 2 0 0 1 -2.9-2.11l.67-9.72-7.06-6.88a2 2 0 0 1 1.11-3.41l9.76-1.42z" />
            </svg>{" "}
            {property.rating.toFixed(1)} {/* 별점 표시 */}
          </Rating>
        )}
        <Price>₩{property.price.toLocaleString()} / 1박</Price>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
