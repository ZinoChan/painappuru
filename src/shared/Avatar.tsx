import { User } from 'lucide-react';
import Image from 'next/image';

type Props = {
  src?: string | null;
  alt?: string | null;
  size: 'sm' | 'md' | 'xs';
};

export default function Avatar({ src, alt, size }: Props) {
  let width = 98;
  let height = 98;
  if (size == 'sm') {
    width = 32;
    height = 32;
  }
  if (size == 'xs') {
    width = 24;
    height = 24;
  }
  return (
    <>
      {src != null ? (
        <Image
          src={src}
          width={width}
          height={height}
          className='rounded-full'
          alt={alt ?? 'user'}
        />
      ) : (
        <div
          style={{ width, height }}
          data-testid='avatar-placeholder'
          className='rounded-full bg-primary-1 text-dark-1'
        >
          <User />
        </div>
      )}
    </>
  );
}
