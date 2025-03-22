// /src/pages/HomePage.jsx (לדוגמה)
import { Helmet } from 'react-helmet-async';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>מערכת ברים כספית | דף הבית</title>
        <meta name="description" content="מערכת ניהול ברים כספית - דף הבית" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" />
      </Helmet>
      {/* תוכן הדף */}
    </>
  );
}

export default HomePage;
