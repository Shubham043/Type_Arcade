export default function ErrorPage(){
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      color: '#343a40'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404 Not Found</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <a 
        href="/" 
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.25rem',
          fontSize: '1.25rem'
        }}
      >
        Go to Home
      </a>
    </div>
  );
};