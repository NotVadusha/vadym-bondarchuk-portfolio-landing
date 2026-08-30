import { Rich } from "@/components/Rich";

export function SectionHead({
  tag,
  title,
  aside,
}: {
  tag: string;
  title?: string;
  aside?: string;
}) {
  return (
    <div className="sec-head rv">
      <div>
        <span className="tagchip">
          <Rich text={tag} />
        </span>
        {title && <h2>{title}</h2>}
      </div>
      {aside && <div className="aside">{aside}</div>}
    </div>
  );
}
