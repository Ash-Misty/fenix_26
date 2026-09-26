import { ArrowLeft } from 'lucide-react';
import { useEventNavigation } from './EventNavigation';

export function EventBackButton({ className = '', onBack }) {
  const { goBack, goHome } = useEventNavigation();

  return (
    <button className={`event-back-button ${className}`.trim()} type="button" onClick={onBack || goBack || goHome}>
      <ArrowLeft size={15} aria-hidden="true" />
      Back
    </button>
  );
}
