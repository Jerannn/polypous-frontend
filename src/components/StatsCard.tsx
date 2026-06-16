import type { LucideIcon } from "lucide-react";

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

type StatsCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Item variant="muted" className="max-w-56 w-full">
      <ItemContent>
        <ItemTitle className="text-muted-foreground uppercase">
          {title}
        </ItemTitle>
        <span className="text-3xl font-semibold tabular-nums">{value}</span>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemMedia variant="icon">
        <Icon />
      </ItemMedia>
    </Item>
  );
}
