"use client";

export function EmberField() {
  return (
    <div aria-hidden="true" className="ember-field">
      {Array.from({ length: 28 }, (_, i) => (
        <i key={i} style={{ "--i": i } as React.CSSProperties} />
      ))}
    </div>
  );
}
