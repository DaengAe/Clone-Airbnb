import React, { useEffect } from "react";
import styled from "styled-components";
import { properties } from "../data/mockData";
import PropertyCard from "../components/property/PropertyCard";

const RecentlyAddedPropertiesPageContainer = styled.div`
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
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 2rem;
  justify-content: center;
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #555;
  margin-top: 3rem;
`;

const PropertyCount = styled.p`
  font-size: 1rem;
  color: #717171;
  margin-bottom: 1rem;
  text-align: left;
`;

const GridWrapper = styled.div`
  margin: 0 -1rem; /* Compensate for half of the gap on each side */
`;

const RecentlyAddedPropertiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recentlyAddedProperties = properties
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 20); // Sort by createdAt descending and take top 20

  return (
    <RecentlyAddedPropertiesPageContainer>
      <Title>새롭게 등록된 숙소</Title>
      {recentlyAddedProperties.length > 0 && (
        <PropertyCount>
          {recentlyAddedProperties.length < 100
            ? `숙소 ${recentlyAddedProperties.length}개`
            : `숙소 ${
                Math.floor(recentlyAddedProperties.length / 100) * 100
              }개 이상`}
        </PropertyCount>
      )}
      {recentlyAddedProperties.length > 0 ? (
        <GridWrapper>
          <PropertyGrid>
            {recentlyAddedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </PropertyGrid>
        </GridWrapper>
      ) : (
        <NoResults>숙소를 찾을 수 없습니다.</NoResults>
      )}
    </RecentlyAddedPropertiesPageContainer>
  );
};

export default RecentlyAddedPropertiesPage;
