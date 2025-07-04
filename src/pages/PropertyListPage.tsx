import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { properties } from "../data/mockData";
import PropertyCard from "../components/property/PropertyCard";
import { provinces, citiesByProvince } from "../data/koreanAddresses";

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
  margin-left: 1rem;
  text-align: left;
`;

const GridWrapper = styled.div`
  margin: 0 -1rem; /* Compensate for half of the gap on each side */
`;

const PropertyListPage: React.FC = () => {
  const { location } = useParams<{ location: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProperties = properties.filter((property) => {
    const lowerCaseLocation = location?.toLowerCase();

    if (lowerCaseLocation === undefined) {
      return false; // location이 undefined인 경우 필터링하지 않음
    }

    // Check if the location matches a province
    if (property.province.toLowerCase() === lowerCaseLocation) {
      return true;
    }

    // Check if the location matches a city within its province
    // This handles cases where city names might be duplicated across provinces
    for (const prov of provinces) {
      if (prov.toLowerCase() === lowerCaseLocation) {
        // If the location is a province, filter by province
        return property.province.toLowerCase() === lowerCaseLocation;
      } else if (
        citiesByProvince[prov] &&
        citiesByProvince[prov]
          .map((city) => city.toLowerCase())
          .includes(lowerCaseLocation)
      ) {
        // If the location is a city, filter by city and its province
        return (
          property.city.toLowerCase() === lowerCaseLocation &&
          property.province.toLowerCase() === prov.toLowerCase()
        );
      }
    }
    return false;
  });

  return (
    <PropertyListPageContainer>
      <Title>{location ? `${location}의 인기 숙소` : "모든 숙소"}</Title>
      {filteredProperties.length > 0 && (
        <PropertyCount>
          {filteredProperties.length < 100
            ? `${location}의 숙소 ${filteredProperties.length}개`
            : `${location}의 숙소 ${
                Math.floor(filteredProperties.length / 100) * 100
              }개 이상`}
        </PropertyCount>
      )}
      {filteredProperties.length > 0 ? (
        <GridWrapper>
          <PropertyGrid>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </PropertyGrid>
        </GridWrapper>
      ) : (
        <NoResults>해당 지역의 숙소를 찾을 수 없습니다.</NoResults>
      )}
    </PropertyListPageContainer>
  );
};

export default PropertyListPage;
