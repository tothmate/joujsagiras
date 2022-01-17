import React from "react";
import Link from "next/link";
import styles from "./intro.module.scss";

export default function Intro() {
  return (
    <>
      <div className={styles.intro}>
        <h1>Mi ez?</h1>
        <p>
          Mi olyan országban szeretnénk élni, ahol a jól informált társadalmi szereplők jól informált társadalmi
          döntéseket hoznak. Úgy látjuk, hogy ennek a célnak az eléréséhez különösen fontos a jó újságírás, amely
          tájékoztatja a társadalmat, teret ad vitáknak és véleményeknek, ellenőrzi a társadalomban hatalommal bírókat,
          feltárja az igazságot, láthatóvá tesz és felhangosít ügyeket, oktatja és neveli az állampolgárokat.
        </p>
        <p>
          Tegyél azért, hogy a sajtó ellássa és elláthassa a feladatát, a közéletünk higgadtabb, nyugodtabb és
          kiszámíthatóbb, az országunk pedig biztonságosabb, szebb, igazságosabb és élhetőbb legyen!
        </p>
      </div>
      <div className={styles.intro}>
        <h1>Mit tehetsz?</h1>
        <ol>
          <li>
            Ismerd meg, hogy <Link href="/milyen">milyen a jó újságírás</Link>.
          </li>
          <li>Ismerd fel, ismerd el és támogasd, ami jó!</li>
          <li>
            <Link href="/hopp">Tedd szóvá</Link> és kérd számon azt, ami rossz.
          </li>
        </ol>
      </div>
    </>
  );
}
