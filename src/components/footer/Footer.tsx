
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 2rem;
  text-align: center;
  border-top: 1px solid #ddd;
  margin-top: 2rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; 2025 Airbnb Clone. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
