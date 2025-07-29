import { Heading } from "./Heading";

interface ProductListSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ProductListSection({
  title,
  children,
}: ProductListSectionProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <Heading
        level={3}
        className="text-center uppercase font-bold"
        variant="body"
      >
        {title}
      </Heading>
      <div className="w-full grid grid-cols-1 divide-y divide-navy-blue border-navy-blue border-2 rounded-3xl bg-white backdrop-blur-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}
