import RingLoader from 'react-spinners/RingLoader';

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <RingLoader
        loading={isLoading}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#36d7b7"
        cssOverride={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
