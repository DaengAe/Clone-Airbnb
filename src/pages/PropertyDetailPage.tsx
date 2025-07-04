
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { properties } from '../data/mockData';

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
  font-size: 1rem;
  margin-bottom: 0.8rem; /* Adjusted margin */
  color: #555;
`;

const GuestFavoriteTag = styled.div`
  background-color: #ff385c;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-left: 1rem;
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
  const property = properties.find((p) => p.id === parseInt(id || ''));

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <DetailPageContainer>
      <Title>{property.title}
        {property.rating && property.rating >= 4.9 && (
          <GuestFavoriteTag>게스트 선호</GuestFavoriteTag>
        )}
      </Title>
      <Location>{property.city}, {property.province}</Location>
      <Image src={property.image} alt={property.title} />
      <Description>{property.description}</Description>
      <DetailItem>가격: ₩{property.price.toLocaleString()} / 1박</DetailItem>
      {property.rating && <DetailItem>평점: {property.rating.toFixed(1)}</DetailItem>}
      <DetailItem>등록일: {new Date(property.createdAt).toLocaleDateString()}</DetailItem>

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
