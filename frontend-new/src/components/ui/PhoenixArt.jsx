export function PhoenixArt({ className = '', size = 'default' }) {
  return (
    <img className={`phoenix-art phoenix-art-${size} ${className}`} src="/fantasy-phoenix.svg" alt="FENIX phoenix emblem" />
  );
}
