import React, { useEffect } from "react";
import styled from "styled-components";
import { properties } from "../data/mockData";
import PropertyCard from "../components/property/PropertyCard";

const OtherPopularPropertiesPageContainer = styled.div`
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

const OtherPopularPropertiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const otherPopularProperties = properties
    .filter(
      (p) =>
        p.province !== "서울" &&
        p.province !== "부산" &&
        p.province !== "제주도"
    )
    .sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Sort by rating descending

  return (
    <OtherPopularPropertiesPageContainer>
      <Title>그 외 인기 숙소</Title>
      {otherPopularProperties.length > 0 && (
        <PropertyCount>
          {otherPopularProperties.length < 100
            ? `숙소 ${otherPopularProperties.length}개`
            : `숙소 ${
                Math.floor(otherPopularProperties.length / 100) * 100
              }개 이상`}
        </PropertyCount>
      )}
      {otherPopularProperties.length > 0 ? (
        <GridWrapper>
          <PropertyGrid>
            {otherPopularProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </PropertyGrid>
        </GridWrapper>
      ) : (
        <NoResults>숙소를 찾을 수 없습니다.</NoResults>
      )}
    </OtherPopularPropertiesPageContainer>
  );
};

export default OtherPopularPropertiesPage;
