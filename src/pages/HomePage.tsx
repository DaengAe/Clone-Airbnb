import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropertyCard from "../components/property/PropertyCard";
import ScrollablePropertyGrid from "../components/property/ScrollablePropertyGrid"; // Import the new component
import { properties } from "../data/mockData";

const HomePageContainer = styled.div`
  padding: 2rem 4rem;
  max-width: 1600px; /* 7 cards (200px each) + 6 gaps (2rem each) = 1592px. Set to 1600px for comfortable fit. */
  margin: 0 auto; /* Center the container */
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }

  svg {
    margin-left: 0.5rem;
  }
`;

const HomePage: React.FC = () => {
  const seoulProperties = properties
    .filter((p) => p.location.includes("Seoul"))
    .slice(0, 10);
  const busanProperties = properties
    .filter((p) => p.location.includes("Busan"))
    .slice(0, 10);
  const jejuProperties = properties
    .filter((p) => p.location.includes("Jeju Island"))
    .slice(0, 10);
  const otherPopularProperties = properties
    .filter(
      (p) =>
        !p.location.includes("Seoul") &&
        !p.location.includes("Busan") &&
        !p.location.includes("Jeju Island")
    )
    .slice(0, 10);
  const recentlyAddedProperties = properties.slice(40, 50); // Assuming last 10 are recently added

  return (
    <HomePageContainer>
      <Section>
        <SectionTitle>
          <Link to="/properties/seoul">서울의 인기 숙소</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </SectionTitle>
        <ScrollablePropertyGrid>
          {seoulProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ScrollablePropertyGrid>
      </Section>

      <Section>
        <SectionTitle>
          <Link to="/properties/busan">부산의 인기 숙소</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </SectionTitle>
        <ScrollablePropertyGrid>
          {busanProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ScrollablePropertyGrid>
      </Section>

      <Section>
        <SectionTitle>
          <Link to="/properties/jeju island">제주도의 인기 숙소</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </SectionTitle>
        <ScrollablePropertyGrid>
          {jejuProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ScrollablePropertyGrid>
      </Section>

      <Section>
        <SectionTitle>
          <a href="#">그 외 인기 숙소</a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </SectionTitle>
        <ScrollablePropertyGrid>
          {otherPopularProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ScrollablePropertyGrid>
      </Section>

      <Section>
        <SectionTitle>
          <a href="#">새롭게 등록된 숙소</a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </SectionTitle>
        <ScrollablePropertyGrid>
          {recentlyAddedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </ScrollablePropertyGrid>
      </Section>
    </HomePageContainer>
  );
};

export default HomePage;
