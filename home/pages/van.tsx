import Link from "next/link";
import Explanation from "../components/explanation";
import Layout from "../components/layout";
import Marker from "../components/marker";

const Page = () => (
  <Layout darkLogo="primary">
    <Marker element="h1">Van jó újságírás</Marker>

    <Marker element="h2">A jó újságírás a rossz újságírás ellentéte.</Marker>

    <Explanation>
      „A média hatalmáról való beszéd sokszor eltúlzott, és elsősorban
      politikusok szeretik emlegetni. A médiának valójában nincs szüksége
      nagyobb hatalomra és szabadságra, mint amennyi egy közrendőrnek van, aki
      leint egy gyorsan hajtó magas rangú állami vezetőt és hatalmában áll
      büntetést kiszabni rá, esetleg azt mondani, hogy „engem nem érdekel, ki
      maga, itt akkor is csak ötvennel lehet menni”. Azaz a saját feladata
      körében van hatalma döntést hozni, tisztségekre, befolyásra való tekintet
      nélkül. (Egy demokrácia minőségét valószínűleg jól lehetne mérni az ilyen
      esetben visszavonulót fújó vagy a büntetést így is kiszabó rendőrök
      arányán – egy ilyen statisztika valószínűleg igen elszomorító képet
      mutatna.) Ez nem nagy hatalom, épp csak annyi, amennyi alapvetően
      szükséges mindenki számára a saját munkája minőségi végzéséhez. Kell
      azonban hozzá az ezt garantáló jogszabályok mellett a rendőrség – ideális
      esetben létező – függetlensége és testületi integritása, és az egyén
      számára a tudat, hogy nem érheti retorzió, ha a szakmája szabályai szerint
      jár el, mert mellette állnak a jogszabályok, a kollégái és a társadalom
      ítélete is. Ennyire van szüksége a sajtónak is.
    </Explanation>

    <Explanation>
      Az elfogultság persze nem száz százalékig szűrhető ki az újságírói
      munkából. Egyáltalán nem mindegy azonban, hogy végül mennyi marad belőle.
    </Explanation>

    <Marker element="h2">Olyan ez, mint az ivóvízben lévő arzén.</Marker>

    <Explanation>
      Magyarországon köztudomásúan szinten mindenhol tartalmaz az ivóvíz
      valamennyi arzént, Csongrád megyében a legtöbbet. Nem mindegy azonban,
      hogy mennyi arzén van a vízben. Az egészségügyi határérték (egyébként 0,01
      mg/L) alatt a fogyasztása nem jelent egészségügyi kockázatot.
    </Explanation>

    <Marker element="h2">
      A sajtó elfogultsága is ilyen: teljes egészében nem szüntethető meg, de
      szabályokkal az egészségügyi határérték alatt tartható.
    </Marker>

    <Explanation>
      A függetlenség nem azt jelenti, hogy nem gondolunk semmit a világról.
      Jelenti viszont azt, hogy személyes érdekeinket és meggyőződéseinket
      alárendeljük egy adott szakma szabályainak és ethoszának. Álláspontunkat,
      javaslatainkat, gondolatainkat, ítéleteinket nem érdekek, hanem átlátható
      normarendszer szerint alakítjuk ki. Az újságírás szakmai szabályai
      nagyrészt arra irányulnak, hogy a mindenkiben meglévő személyes
      elfogultságokat, kulturális, szociológiai, hitbéli meghatározottságokat
      minél inkább kiszűrje és a tények próbájának vesse alá. Ilyen szabály a
      tények ellenőrzése, a tények és a vélemények elválasztásának elve, az
      egyenlő mérce alkalmazása, minden releváns fél meghallgatása.
    </Explanation>

    <Explanation>
      Visszautalva a hasonlatra a közrendőrről: hogy a gyorshajtás gyorshajtás
      legyen, függetlenül attól, hogy ismert politikus, csinos nő, udvariatlan
      bunkó vagy kedvelt szomszédunk követte-e el.
    </Explanation>

    <Explanation>
      Ahogy vannak jó rendőrök, úgy vannak jó újságírók is. Akik jó újságírás
      művelnek.
    </Explanation>

    <Marker element="h1">
      Milyen a jó újságírás? <Link href="/milyen">Katt ide.</Link>
    </Marker>
  </Layout>
);

export default Page;
