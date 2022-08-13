import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      className={clsxm('animate-shimmer bg-[#101624]', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(16,22,36) 0%, rgb(7,13,27) 20%, rgb(16,22,36) 40%, rgb(16,22,36) 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
