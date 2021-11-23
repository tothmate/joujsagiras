import React from "react";
import Link from "next/link";
import styles from "./menu.module.scss";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <nav>
        <MenuItem href="/">Jó újságírás . hu</MenuItem>
      </nav>
      <nav>
        <MenuItem href="/van">Van.</MenuItem>
        <MenuItem href="/milyen">Milyen?</MenuItem>
        <MenuItem href="/hopp">Értékelj!</MenuItem>
      </nav>
    </div>
  );
}

function MenuItem(props: { href: string; children: React.ReactNode }) {
  return (
    <Link href={props.href}>
      <a className={styles.menuItem}>{props.children}</a>
    </Link>
  );
}
