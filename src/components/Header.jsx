import classes from "./Header.module.css";
import { AppShell, Group } from "@mantine/core";
import { useLocation } from "react-router-dom";

const links = [
  { link: "/", label: "Books Home" },
  { link: "/login", label: "Login" },
  { link: "/logout", label: "Logout" },
];

function Header() {
  // used to highlight which link we are on
  const { pathname } = useLocation();

  return (
    <AppShell.Header className={classes.header}>
      <div size="md" className={classes.inner}>
        <p>Logo</p>
        <Group gap={5} visibleFrom="xs">
          {links.map((link) => {
            return (
              <a
                key={link.label}
                href={link.link}
                className={classes.link}
                data-active={pathname === link.link || undefined}
              >
                {link.label}
              </a>
            );
          })}
        </Group>
      </div>
    </AppShell.Header>
  );
}

export default Header;
