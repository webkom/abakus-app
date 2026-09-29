import type { LucideIcon, LucideProps } from 'lucide-react-native';
import { withUniwind } from 'uniwind';
import React from 'react';

const cache = new WeakMap<LucideIcon, React.ComponentType<any>>();

export function iconWithClassName<T extends LucideIcon>(
  icon: T
): React.ComponentType<LucideProps & { className?: string }> {
  let Wrapped = cache.get(icon);
  if (!Wrapped) {
    Wrapped = withUniwind(icon as unknown as React.ComponentType<any>, {
      color: {
        fromClassName: 'className',
        styleProperty: 'color',
      },
      style: {
        fromClassName: 'className',
      },
    });
    cache.set(icon, Wrapped);
  }
  return Wrapped;
}
