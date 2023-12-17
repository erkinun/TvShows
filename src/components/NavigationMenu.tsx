import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
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
          <NavigationMenuContent className="opacity-90">
            <NavigationMenuList>
              <ul className="flex flex-col gap-4 w-screen pt-4 pb-4">
                <NavigationMenuItem>
                  <MenuLink href="/" sub="Today's TV">
                    Home
                  </MenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <MenuLink
                    href="/lists"
                    sub="Manage your favorites, watch lists"
                  >
                    Lists
                  </MenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <MenuLink href="/share" sub="Share your lists with others">
                    Share
                  </MenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <MenuLink href="/Profile" sub="Set your username">
                    Profile
                  </MenuLink>
                </NavigationMenuItem>
              </ul>
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const MenuLink = ({ href, ...props }: { href: string; sub: string }) => {
  console.log({ props });
  const linkChildren = (
    <div className="flex gap-2 items-center ">
      <div className="text-lg">{props.children}</div>
      <div className="text-sm text-gray-300">{props.sub}</div>
    </div>
  );
  return <Link to={href}>{linkChildren}</Link>;
};
