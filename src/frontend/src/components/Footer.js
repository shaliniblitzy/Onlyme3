import React from 'react'; // ^18.0.0

/**
 * Footer Component
 * 
 * A stateless React function component that renders the application footer.
 * Displays a minimal copyright notice and can be extended with additional 
 * information or links in the future. This component aligns with the 
 * technical specification's focus on backend and educational clarity 
 * while providing a consistent UI element for the Node.js tutorial app.
 * 
 * @returns {JSX.Element} A semantic <footer> element containing a copyright notice
 */
const Footer = () => {
  return (
    <footer className="app-footer">
      <small>© 2024 Node.js Hello Tutorial</small>
      
      {/* 
        Placeholder for future extensibility:
        - Additional links (About, Contact, Documentation)
        - Version information
        - Social media links
        - License information
      */}
    </footer>
  );
};

export { Footer };