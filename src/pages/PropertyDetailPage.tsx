import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { properties } from "../data/mockData";

const DetailPageContainer = styled.div`
  padding: 2rem;
  max-width: 1000px; /* Increased max-width */
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem; /* Adjusted margin */
`;

const Location = styled.p`
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 1rem; /* Adjusted margin */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem; /* Adjusted margin */
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem; /* Added margin */
`;

const DetailItem = styled.p`
  font-size: 1.2rem; /* Increased font size */
  margin-bottom: 0.8rem; /* Adjusted margin */
  color: #555;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  svg {
    color: #ff385c;
    margin-right: 0.1rem;
    font-size: 1.2rem;
  }
`;

const GuestFavoriteBlock = styled.div`
  background-color: #ff385c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  width: fit-content;
`;

const RatingBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

const AmenitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 2rem; /* Added margin */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
`;

const AmenityItem = styled.li`
  font-size: 0.9rem;
  color: #333;
`;

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === parseInt(id || ""));

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <DetailPageContainer>
      <Title>{property.title}</Title>
      <Location>
        {property.city}, {property.province}
      </Location>
      {property.rating && property.rating >= 4.9 && (
        <GuestFavoriteBlock>게스트 선호</GuestFavoriteBlock>
      )}
      <Image src={property.image} alt={property.title} />
      {property.rating && (
        <RatingBlock>
          <DetailItem>평점: {property.rating.toFixed(1)}</DetailItem>
          <StarRating>
            {Array.from({ length: Math.floor(property.rating) }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                style={{ fill: "#ff385c", height: "16px", width: "16px" }}
              >
                <path d="m15.81 1.34a2 2 0 0 1 3.38 0l4.36 8.84 9.76 1.42a2 2 0 0 1 1.11 3.41l-7.06 6.88.67 9.72a2 2 0 0 1 -2.9 2.11l-8.73-4.59-8.73 4.59a2 2 0 0 1 -2.9-2.11l.67-9.72-7.06-6.88a2 2 0 0 1 1.11-3.41l9.76-1.42z" />
              </svg>
            ))}
            {property.rating % 1 !== 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                style={{ fill: "#ff385c", height: "16px", width: "16px" }}
              >
                <path d="M16 2.8l2.4 4.8 5.3 0.8 -3.8 3.7 0.9 5.2 -4.8 -2.5 -4.8 2.5 0.9 -5.2 -3.8 -3.7 5.3 -0.8zM16 0.5l-4.9 9.9 -10.9 1.6 7.9 7.7 -1.9 11 9.8 -5.2 9.8 5.2 -1.9 -11 7.9 -7.7 -10.9 -1.6z" />
              </svg>
            )}
          </StarRating>
        </RatingBlock>
      )}
      <Description>{property.description}</Description>
      <DetailItem>가격: ₩{property.price.toLocaleString()} / 1박</DetailItem>
      <DetailItem>
        등록일: {new Date(property.createdAt).toLocaleDateString()}
      </DetailItem>

      {property.amenities && property.amenities.length > 0 && (
        <>
          <h2>편의시설</h2>
          <AmenitiesList>
            {property.amenities.map((amenity, index) => (
              <AmenityItem key={index}>{amenity}</AmenityItem>
            ))}
          </AmenitiesList>
        </>
      )}
    </DetailPageContainer>
  );
};
export default PropertyDetailPage;
