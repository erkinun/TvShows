import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

// TODO make this beautiful
export const NavMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <HamburgerMenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuList>
              <ul className="flex flex-col gap-2 w-screen">
                <li>
                  <NavigationMenuItem>
                    <MenuLink href="/">Home</MenuLink>
                  </NavigationMenuItem>
                </li>
                <li>
                  <NavigationMenuItem>
                    <MenuLink href="/lists">Lists</MenuLink>
                  </NavigationMenuItem>
                </li>
                <li>
                  <NavigationMenuItem>
                    <MenuLink href="/share">Share</MenuLink>
                  </NavigationMenuItem>
                </li>
                <li>
                  <NavigationMenuItem>
                    <MenuLink href="/Profile">Profile</MenuLink>
                  </NavigationMenuItem>
                </li>
              </ul>
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MenuLink = ({ href, ...props }: { href: string }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link to={href}>
      <NavigationMenuLink
        className="NavigationMenuLink"
        active={isActive}
        {...props}
      />
    </Link>
  );
};
