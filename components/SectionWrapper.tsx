"use client";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
}

export default function SectionWrapper({
  children,
  className = "",
  id,
  as: Tag = "section",
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </Tag>
  );
}
