
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { properties } from '../data/mockData';

const DetailPageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Location = styled.p`
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 1.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === parseInt(id || ''));

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <DetailPageContainer>
      <Title>{property.title}</Title>
      <Location>{property.location}</Location>
      <Image src={property.image} alt={property.title} />
      <Description>
        This is a detailed description of the property. It is a beautiful and
        cozy place, perfect for your next vacation. Enjoy the stunning views and
        modern amenities.
      </Description>
    </DetailPageContainer>
  );
};

export default PropertyDetailPage;
