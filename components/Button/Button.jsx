import { LoadingDots } from '@/components/LoadingDots';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const Button = forwardRef(function Button(
  {
    children,
    type,
    className,
    onClick,
    size,
    variant = 'invert',
    loading,
    disabled,
  },
  ref
) {

  if (size === 'small') {
    return (
      <button
        className="flex items-center justify-center uppercase text-lg font-semibold rounded bg-orange text-white px-2 pt-1 py-2 pb-1 text-center mb-2"
        ref={ref}
        onClick={onClick}
        disabled={loading || disabled}
      >
        {loading && <LoadingDots className="" />}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      className="min-w-[220px] flex items-center justify-center uppercase text-lg font-semibold rounded bg-orange text-white py-3 text-center mb-2"
      ref={ref}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading && <LoadingDots className="" />}
      <span>{children}</span>
    </button>
  );
});

export const ButtonLink = forwardRef(function Button(
  { children, type, className, href, onClick, size, variant = 'invert' },
  ref
) {
  return (
    <span>{children}</span>
  );
});
