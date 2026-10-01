import {SectionTile} from './icons';
import type {SectionKey} from '@/lib/site';

export default function PageHeader({
  section,
  title,
  lead,
  children,
}: {
  section: SectionKey;
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="page-header" data-section={section}>
      <SectionTile section={section} size="lg" />
      <div>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children}
      </div>
    </header>
  );
}
