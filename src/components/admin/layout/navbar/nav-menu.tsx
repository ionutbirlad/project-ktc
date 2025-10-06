import { ComponentProps } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type NavMenuProps = ComponentProps<typeof NavigationMenu> & {
  menuItems: Record<"href" | "label", string>[];
};

export const NavMenu = ({ menuItems, ...props }: NavMenuProps) => {
  const pathname = usePathname();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {menuItems.map((menuItem) => (
          <NavigationMenuItem key={menuItem.href} asChild>
            <NavigationMenuLink href={menuItem.href}>
              <span
                className={`inline-block transition-transform duration-300 ease-out hover:scale-125 whitespace-nowrap min-w-0 ${
                  pathname === menuItem.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {menuItem.label}
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
