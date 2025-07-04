import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { properties } from "../data/mockData";
import PropertyCard from "../components/property/PropertyCard";

const PropertyListPageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const PropertyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  justify-content: center;
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  margin-top: 3rem;
`;

const PropertyListPage: React.FC = () => {
  const { location } = useParams<{ location: string }>();

  const filteredProperties = properties.filter(
    (property) => property.location.toLowerCase() === location?.toLowerCase()
  );

  return (
    <PropertyListPageContainer>
      <Title>{location ? `${location}의 숙소` : "모든 숙소"}</Title>
      {filteredProperties.length > 0 ? (
        <PropertyGrid>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </PropertyGrid>
      ) : (
        <NoResults>해당 지역의 숙소를 찾을 수 없습니다.</NoResults>
      )}
    </PropertyListPageContainer>
  );
};

export default PropertyListPage;
