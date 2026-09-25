import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BrandMark } from '@/components/brand-mark';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-semibold">
          <BrandMark />
          {appName}
        </span>
      ),
    },
    links: [
      { text: 'Workshop', url: '/docs/workshop' },
      { text: 'Concepts', url: '/docs/concepts' },
      { text: 'Architecture', url: '/docs/architecture' },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
