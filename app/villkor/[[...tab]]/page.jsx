import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ params, searchParams }) {
    if (params.tab[0] === 'anvandarvillkor') {
        return {
            title: 'BIDSTACKER – Läs mer om våra användarvillkor',
            description: 'Bidstackers användarvillkor finns till för att säkerställa att användare som använder sig av tjänsten får en behaglig upplevelse. Information om användarens rättigheter och förpliktelser, återfinns i våra användarvillkor.'
          }
    }
    if (params.tab[0] === 'integritetspolicy') {
        return {
            title: 'BIDSTACKER – Lär mer om vår GDPR & Integritetspolicy',
            description: 'Bidstacker värnar om att respektera användares rättigheter, här kan ni få information om hur vi hanterar användares uppgifter samt hur ni kontaktar oss i ärende av vår uppgiftshantering.'
          }
    }
};

const paths = [
    'anvandarvillkor',
    'integritetspolicy'
]

export default function ArticleVillkor({ params }) {

    return <>
    <div className="bg-gray-light dark:bg-gray-dark text-black dark:text-white pt-[175px] pb-[100px] px-4">
        
        <h2 className="pb-8 leading-normal">Villkor</h2>

        <div className="max-w-[900px] mx-auto">
            <ul className="flex justify-center pt-2 w-full mt-2">
                <li
                    className={`px-2 tablet:px-8 text-base tablet:text-lg py-2 rounded-t-xl cursor-pointer ${
                    params.tab[0] === 'anvandarvillkor' &&
                    'text-[#F9B300] bg-white dark:bg-gray-light-dark font-semibold'
                    }`}
                >
                    <Link href="/villkor/anvandarvillkor">
                        <span>Användarvillkor</span>
                    </Link>
                </li>
                <li
                    className={`px-2 tablet:px-8 text-base tablet:text-lg py-2 rounded-t-xl cursor-pointer ${
                    params.tab[0] === 'integritetspolicy' &&
                    'text-[#F9B300] bg-white dark:bg-gray-light-dark font-semibold'
                    }`}
                >   
                    <Link href="/villkor/integritetspolicy">
                        <span>Integritetspolicy</span>
                    </Link>
                </li>
            </ul>
        </div>
        
        <div className="flex flex-row max-w-[900px] mx-auto desktop:items-start justify-center py-12 bg-white dark:bg-gray-dark rounded-t-xl overflow-hidden p-5 tablet:p-8">
            <div className="container flex flex-col w-full">
                
                {params.tab[0] === 'anvandarvillkor' && <VillkorContent />}
                {params.tab[0] === 'integritetspolicy' && <PolicyContent />}
                
            </div>
        </div>
        </div>
    </>
}

const VillkorContent = () => {

    return (<>
        <h1 className="text-4xl leading-snug">Allmänna Regler & Villkor.</h1>
        <small>Villkoren uppdaterades senast; 10 feb, 2023.</small>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow">1. Allmänt</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 1.1 FIRMAN</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker ägs och förvaltas av firman: 891126-9051 som tillhandahåller en B2B-portal för inköp av byggvaror samt tillhörande leveranser och kringtjänster på webbplatsen (”www.bidstacker.se, www.bidstacker.com”).</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 1.2 TJÄNSTEN</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker (”Tjänsten”) gör det möjligt för anslutna företag och offentliga verksamheter (”beställare”) att erhålla offerter från anslutna återförsäljare på de förfrågningarna som dem lämnar till Bidstacker. Informationen som en användare via en förfrågan eller på något annat sätt förmedlar inom ramen för användningen av tjänsten kan tillfalla tredje part (”återförsäljare”).</p>
            <p className="text-lg mt-4 pl-5">Anslutna Återförsäljare som erhållit rätten att använda tjänsten genom ingående av avtal med Bidstacker, får lämna offerter till Beställare som begärt detta. Det är inte tillåtet för en Återförsäljare att uppmana en Beställare att kommunicera utanför tjänsten, Återförsäljare som bryter mot detta villkor kommer med omedelbar verkan att stängas av från tjänsten, uteslutningen kan omfatta endast företaget eller om bolaget är del av koncern; intresse/, -syster/, -dotter/ eller -moderbolag. Användare som bryter mot ovannämnda villkoret kan även komma att krävas på skadeståndsersättning.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 1.3 BESTÄLLAREN</h2>
            <p className="text-lg mt-4 pl-5">Att registrera ett konto på Bidstacker är kostnadsfritt, tjänsten är dock begränsad till den funktionalitet som Bidstacker förbehåller sig rätten att närsomhelst ändra. En användare med ett registrerat konto benämns som (”beställare”).
Utökad funktionalitet, liksom särskilda funktioner kan av Bidstacker erhållas mot en extra kostnad. Avgifte, kostnader kan variera och ändras beroende på tjänst.
</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 1.4 ANVÄNDARENS FÖRPLIKTELSER</h2>
            <p className="text-lg mt-4 pl-5">En Beställare är inte förpliktad att fullgöra ett köp när den lämnar en förfrågan, däremot förpliktas sig användare att slutföra sina avtalsförpliktelser vid händelse av en accepterad offert som lämnats av en Återförsäljare. Bidstacker kan komma att liksom är aktuellt vid överträdelser av kap 1, § 1.2, utesluta användare också vid kontraktsbrott mot annan användare, tredje part eller samarbetsparter till Bidstacker. Vid prövningen av sådana fall tas särskild hänsyn till kontraktsbrottets art, och andra omkringliggande omständigheter.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 1.5 PARTERNAS FÖRHÅLLANDEN</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker agerar ej huvudman, återförsäljare eller annat i förhållandet mellan (”beställare”) och (”återförsäljare”), tjänsten underlättar endast kontakten mellan parterna. Bidstacker är inte heller någon part i något avtal gällande försäljning eller köp av varor och tjänster.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 1.6 VAD SOM FÖLJER AV ACCEPTERADE VILLKOR</h2>
            <p className="text-lg mt-4 pl-5">Den som fullgjort en registrering av ett konto på Bidstacker.se förbinder sig att efterleva och ej bryta mot Bidstacker:s användarvillkor.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">2. Användning av tjänsten</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.1 ÄNDRINGAR AV AVTALSVILLKOR</h2>
            <p className="text-lg mt-4 pl-5">Beställare och Återförsäljare har som nämnts i tidigare kapital i detta avtal valt att förbinda sig samt följa våra användarvillkor. Vidare förväntas Beställare och Återförsäljare att även fullfölja övriga avtalsvillkor som Bidstacker närsomhelst reserverar sig rätten att uppdatera, varpå det åligger på nyttjaren av tjänsten att informera sig om gällande villkor och regler.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.2 MISSBRUK AV TJÄNSTEN</h2>
            <p className="text-lg mt-4 pl-5">Tjänsten får ej missbrukas i syfta att bedriva olaglig verksamhet eller verksamhet som strider mot gällande svenska eller Eu-rättsliga lagar, regler och domar. Beställare och Återförsäljare förpliktar sig att uppträda på ett vårdat samt förståndigt sätt.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.3 STÖTANDE MATERIAL</h2>
            <p className="text-lg mt-4 pl-5">Detta medför att material som kan uppfattas som stötande eller kränkande ej får publiceras. Material som flaggats som stötande eller kränkande kan komma att raderas utan förvarning av Bidstacker.  Beställare och Återförsäljare hindras genom detta avtal att på något sätt agera illojalt mot Bidstacker och/eller Tjänsten/tjänsterna Bidstacker förmedlar samt bedriver.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.3 SABOTAGEFÖRSÖK</h2>
            <p className="text-lg mt-4 pl-5">Alla typer av försök till sabotage genom att med avsiktligt eller med uppsåt försöka kringgå, bryta, manipulera eller annat sätt påverka Tjänsten:s säkerhetsspärrar är förbjudna. Det är även strikt förbjudet att otillbörligen bruka någon annans användarkonto, eller på något annat sätt sabotera för Beställare, Återförsäljare eller Bidstacker. Spridning av virus samt andra skadlig kod är likaså förbjudet, försök att missbruka tjänsten kan föranleda skadeståndsanspråk.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.4 INFORMATIONSHANTERING</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker förbehåller sig rätten att helt efter eget gottfinnande bruka informationen som Beställare samt Återförsäljare valt att publicera i Tjänsten, exempelvis i form av recensioner av produkter, Återförsäljare eller annat material. Bidstacker förbehåller sig även rätten att hindra att publicera, redigera eller radera innehåll som Bidstacker tillhandahåller av en Beställare eller Återförsäljare. Som nämns i § 2.2 är ej publiceringen av stötande eller annat kränkande material tillåtet och kan därför komma att utan förvarning anmälas eller/och raderas samt leda till avstängning.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.5 BRUKARENS SKADESTÅNDSSKYLDIGHET</h2>
            <p className="text-lg mt-4 pl-5">I de fall material eller information som publiceras av en Beställare eller Återförsäljare på Bidstacker skulle kunna föranleda skadeståndsskyldighet för Bidstacker är Beställare eller Återförsäljare förpliktade att hålla Bidstacker skadelös för krav från tredje man och/eller för den uppkomna skadan.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.6 AVSTÄNGNINGAR</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker förbehåller sig helt rätten att efter eget gottfinnande blockera och/eller stänga av Beställare eller Återförsäljare som bryter mot svensk lag eller på något annat sätt strider mot Bidstacker:s uppsatta villkor och regler.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 2.7 ANVÄNDARENS KONTOANSVAR</h2>
            <p className="text-lg mt-4 pl-5">Beställare eller Återförsäljare förpliktar sig att skydda erhållna kontouppgifter (användarnamn samt lösenord), samt att ej låta obehöriga nyttja kontot. Beställare och Återförsäljare hålls ansvariga för all form av användning av Tjänsten som sker genom dennes konto.</p>
        </article>
        
        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">3. Kontaktuppgifter, kreditupplysning, omdömen m.m.</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 3.1 HANTERINGEN AV KÄNSLIGA UPPGIFTER</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker förbehåller sig rätten att behandla en Beställare och Återförsäljares uppgifter samt annan information som kan inhämtas av dessa användare genom bidstacker.se. Uppgifter som publiceras på bidstacker.se kan komma att överlämnas till Återförsäljare samt tredje part. Syftet med detta kan bero, på att det är nödvändigt på grund av att vi skall kunna fullfölja våra förpliktelser mot användaren eller eventuella myndigheter. Vänligen kontakta oss för mer information om hur vår personuppgiftspolicy.</p>
        </article>
        <article className="mt-7">
            <h2 className="text-xl text-left">§ 3.2 KREDITUPPLYSNINGAR</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker kan under avtalstiden med användaren inhämta kreditupplysning avseende användaren. Detta kan ske återkommande.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 3.3 Användarrecensioner</h2>
            <p className="text-lg mt-4 pl-5">Såväl beställare, återförsäljare samt åkerier ges alternativet att kommentera publicera användaromdömen på hemsidan ” bidstacker.se” eller ”bidstacker.com”. Recensionerna publicerar på webbplatsen, och finns tillgänglig för såväl beställare, återförsäljare och åkerier. Användare går med på att recensioner tillgängliggörs för andra, samt att information om dennes kreditvärdighet kan delas med andra användare. Användaren uppmärksammas härmed om att såväl Bidstacker såsom dess användare, samarbetspartners i vissa fall kan behöva upprätta kontakt genom de uppgifterna som uppgetts av användaren.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">4. Tillgängliggörande av tjänsten</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 4.1</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker kan ej göras ansvarig för tjänsten tillgänglighet. Skulle mot förmodan webbsidan: ”bidstacker.se” eller ”bidstacker.com” drabbas av fel eller endast vara delvis funktionellt, till följd av exempelvis server eller andra hårdvarudefekter, yttre angrepp eller externa omständigheter har användare ej rätt till ersättning.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 4.2</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker ingår ej som part i avtal som upprättas vid försäljning eller införskaffande av byggvaror eller andra tjänster. Bidstacker bär inte något ansvar vid en potentiellt tvist som kan komma att uppstå mellan användare, exempelvis vid tvister som grundar sig i produkt, leverans eller andra former av fel alternativt avtalsbrott.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 4.3</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker kan ej hållas ansvarigt för det material som publiceras på webbplatsen av användarna, detsamma gäller uppgifter och information som tillgängliggjorts på tjänsten. Bidstacker kan heller ej hållas ansvarigt för förlust av data.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">5. Begränsning av ansvar</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 5.1</h2>
            <p className="text-lg mt-4 pl-5">Vid tvistemål kan en part inte hållas ansvarig för, exempelvis förluster, skador eller förseningar som uppstått till följd av omständigheter som hen, varken rimligen eller skäligen kunnat räknat med och samt följden varit av sådant slag att parten ej skäligen kan förväntas ha förutsett, förebyggt eller undvikit följden (så kallat, Force majeure).</p>
            <p lassName="text-lg mt-4 pl-5">Vid sådana fall åligger det part som, vill åberopa befrielsegrunderna som just nämnts, att snarast möjligt skriftligen meddela motparten härom. Utöver detta skall den åberopande parten också meddela motparten när omständigheten eventuellt  upphör.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 5.2</h2>
            <p className="text-lg mt-4 pl-5">En parts totala skadeståndsskyldighet begränsas till en summa av 50 000 kronor/räkenskapsår. Partens skyldighet och ansvar begränsas till; direkta skador som hen eventuellt förorsakar annan part. Parten ansvarar ej för så kallade indirekta förluster, såsom exempelvis förlorade vinster. Därutöver föreligger ej skyldighet eller ansvar för motparters ersättningsskyldigheter som uppstår mot eventuella tredje män, med undantag för fall som träffas av § 2.5 samt § 6-4. Vad som just redogjorts, gäller däremot ej eventuell ersättningsskyldighet, som föranleds av § 2.5 samt § 6.4, eller ifall parten handlat vårdslöst eller med uppsåt eller varit ond tro.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 5.3</h2>
            <p className="text-lg mt-4 pl-5">Part förväntas, att utan dröjsmål och senaste inom 6 månader, från och med part uppmärksammats om eller rimligen kan tänkas känt till skadan, framställa sitt anspråk på skadeanstånd, för att rättigheten ej skall gå förlorad.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">6. Immateriella rättigheterna</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 6.1</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker inklusive dess licensgivare, innehar fullständiga rättigheter, såväl immateriella rättigheter för tjänsten, såsom eventuella implementerade program, grafisk design, andra varumärken, sigill eller kännetecken.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 6.2</h2>
            <p className="text-lg mt-4 pl-5">-Beställare/, -återförsäljare/ och åkerianvändare, upplåtes en icke exklusiv rätt att bruka tjänsterna som tillhandahållits vid i deras respektive verksamheter.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 6.3</h2>
            <p className="text-lg mt-4 pl-5">Användarens rätt att nyttja tjänsten, innefattar inte under några omständigheter att Bidstackers upphovsrätt eller andra immateriella rättigheter övergår eller överlåts till Användaren. Det är ej tillåtet för Användare utöver vad, Bidstacker skriftligen medgivit, på något sätt nyttja, kopier, ändra, förvanska eller genom andra sätt handskas med material som tillgängliggjorts genom Tjänsten. Användare saknar rätt att överlåta, eller till någon annan upplåta rätt till sådant material.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 6.4</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker äger rätten att bruka, textinformation, logos, bilder samt andra former av uppgifter och material som publicerats av Användare. Rätten kan övergå exempelvis vid publicering på ”bidstacker.se” eller ”bidstacker.com”. Användarens eller eventuella samarbetspartners äganderätter kvarstår och påverkas inte vad som just redogjorts.</p>
            <p className="text-lg mt-4 pl-5">Det åligger Användaren att säkerställa att material ej riskerar att medföra intrång i tredje mans eventuella immateriella rättigheter, eller ej kan komma att strida mot gällande lagar. Användare skall hålla Bidstacker, skadelöst i de fallen Användarens uppgifter eller material exempelvis förorsakat intrång i tredje mans immateriella rättigheter, eller annan tillämplig svensk lag eller EU-lagstiftning.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">7. Känsliga uppgifter och sekretess</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 7.1</h2>
            <p className="text-lg mt-4 pl-5">Parter är genom detta avtal förbundna att ej för tredje man på något sätt avslöja Konfidentiella uppgifter eller information. Begreppen ”Konfidentiella uppgifter eller information” inbegriper samtliga typer av upplysningar om parter eller deras verksamhet som kan vara av konfidentiellt slag, dock med undantag för:</p>
            <p className="text-lg mt-4 pl-5">1) En upplysning, som kommit till allmän kännedom eller kan komma att bli allmänt känd på ett lagenligt sätt, eller ett sätt som kan ses som ett brott eller stridande mot innehållet i Bidstackers Användarvillkor eller andra regler;</p>
            <p className="text-lg mt-4 pl-5">a) Information eller upplysningar, som en part har möjlighet att bevisa eller intyga att parten redan haft kännedom om innan informationen delgivits av motparter, alternativt;</p>
            <p className="text-lg mt-4 pl-5">b) En upplysning, som parten tilldelats alternativt riskerar att tilldelas från eventuell tredje man, och som ej strider mot användarvillkoren i detta avtal.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 7.2</h2>
            <p className="text-lg mt-4 pl-5">Parter skall ej tolka bestämmelsen i § 7.1, som ett eventuellt hinder från att tvingas delge Konfidentiell Information i fallen det föreligger giltig, lagenlig grund eller på grund av ett beslut som fattas av en domstol alternativt, myndighet.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 7.3</h2>
            <p className="text-lg mt-4 pl-5">Det är tillåtet för en part att delge konfidentiell information, med bolag som ingår i samma koncern, eller vid undantagsfall om det skulle visa sig krävas vid fullgörandet av avtalsskyldigheten som följer av Bidstackers Användarvillkor. Den eventuellt mottagande parten, tillåts endast att lämna ut sådan Konfidentiell information som just nämnts, till styrelseledamöter, anställda, underentreprenörer samt konsulter för ändamålen som ursprungligen låg till grund för att informationen utelämnats till denne. Eventuellt mottagande part, hålls ansvarig för att ytterligare potentiella mottagare underrättas om bestämmelserna som följder av 7:e avsnittet i detta avtal.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 7.4</h2>
            <p className="text-lg mt-4 pl-5">Den som mottagit Konfidentiell Information, tillåts enbart att bruka informationen eller uppgifterna i den omfattningen som är tillåtet enligt ändamålet som avsågs av utelämnaren vid utelämnande av den Konfidentiella Informationen.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 7.5</h2>
            <p className="text-lg mt-4 pl-5">Vad som följer i denna punkt, medför ej några hinder för Bidstacker att disponera över uppgifter eller upplysningar som avser Tjänsten eller Bidstackers verksamhet i övrigt.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 7.6</h2>
            <p className="text-lg mt-4 pl-5">Sekretessbestämmelserna som anges i 7:e avsnittet, gäller i minst (4) år efter det att Användaren har upphört att använda Tjänsten.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">8. Uppsägningar samt ändringar av Tjänsten.</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 8.1</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker kan kontinuerligt komma att förändra tjänsten. Bidstacker förbehåller sig rätten att närsomhelst utöka eller ta bort funktioner i tjänsten alternativt helt välja att avbryta tillhandahållandet av tjänsten.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 8.2</h2>
            <p className="text-lg mt-4 pl-5">Användaren är berättigad att närsomhelst välja att upphöra med användandet av tjänsten. Bidstacker kan vidare utan hinder upphöra med tillgängliggörandet av tjänsten alternativt införa begränsningar avseende användningen.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 8.3</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker äger rätt att stänga av eller exkludera användare från tjänsten, i de fall en användare efter inskickad förfrågan:</p>
            <p className="text-lg mt-4 pl-5">1) efter upprepade tillfällen ej slutför någon order, eller;
2) hindrar leveransen genom att vägra ta emot beställda varor, eller;
3) på något annat sätt bryter mot Bidstacker allmänna villkor.
</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 8.4</h2>
            <p className="text-lg mt-4 pl-5">Utöver vad som följer av § 8.3 i de allmänna villkoren, så äger Bidstacker rätt att stänga av användare från tjänsten, ifall;</p>
            <p className="text-lg mt-4 pl-5">1) Bidstacker, eller annat av Firmans varumärken lider negativ publicitet till följd av användarens bruk av Bidstackers tjänst.</p>
            <p className="text-lg mt-4 pl-5">2) Användaren, agerat eller kan komma att agera på ett sådant sätt som kan skada Bidstackers verksamhet, tjänster, varumärken eller goda rykte.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">9. Förändringar</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§ 9.1</h2>
            <p className="text-lg mt-4 pl-5">Bidstacker äger rätt att när som helst och utan förvarning, ändra, modifiera eller göra tillägg på dessa användarvillkor. Ändringar gäller med omedelbar verkan, såvida ej annat föreskrivits i avtalet. Användare rekommenderas och förutsätts själv ta del av användarvillkoren på webbplatsen ”bidstacker.se” eller ”bidstacker.com”. Användning av tjänsten efter ändringar utfästs eller införts i tjänsten, ses som ett godkännande av de ändrade användarvillkoren.</p>
        </article>

        <h1 className="text-4xl mt-12 mb-7 dark:text-yellow leading-snug">10. Lagar och eventuella tvisteförfaranden.</h1>

        <article className="mt-7">
            <h2 className="text-xl text-left">§10.1</h2>
            <p className="text-lg mt-4 pl-5">Vid eventuella tvister, som uppstått till följd av dessa användarvillkor eller tjänsten skall främst svensk lagstiftnings gälla.</p>
        </article>

        <article className="mt-7">
            <h2 className="text-xl text-left">§10.2</h2>
            <p className="text-lg mt-4 pl-5">Samtliga tvister som har sin grund i dessa användarvillkor, dess tolkning, giltighet, omfattning, tillkomst och upphörande, samt alla därur härflytande rättsförhållanden, oavsett slag, ska slutligen prövas av svensk allmän domstol med Stockholms tingsrätt som exklusiv första instans.</p>
        </article>
        
    </>)
}

const PolicyContent = () => {

    return (<>
        <p className="text-base tablet:text-lg leading-relaxed mb-4">
          Bidstacker (Firman 891126-9051) värnar om användarens personliga integritet, varför tjänsten är utformat för att säkerställa ett gott skydd vid behandling av användarens personuppgifter. Bidstacker:s integritetspolicy innehåller information om hur vi samlar in och använder användares personuppgifter. Policyn beskriver även hur vi samlar in uppgifter på ett lagligt och pålitligt sätt och den beskriver även det användaren enligt lag är berättigad till. Vid övriga frågor kring om vår policy är ni välkomna att kontakt oss genom nedanstående uppgifter, vi strävar alltid att kontinuerligt vidta nödvändiga skyddsåtgärder.
Användare kan försäkra sig om att vi vidtar åtgärder för att säkerställa att personuppgifter alltid är skyddade och att behandlingen sker i enlighet med Bidstacker:s dataskyddsregler liksom ”Firmans” egna riktlinjer och rutiner.
Vem är personuppgiftsansvarig?
          </p>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Bidstacker är personuppgiftsansvarig och kan kontaktas på följande adress:
Org nr: 891126-9051
Kontaktperson: Amin Smires
Tel: +46(0) 76-403 61 97
info@bidstacker.se
        </p>

        <h3 className="text-4xl mt-10 mb-6">
        Insamling av användares uppgifter
        </h3>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Bidstacker sparar information som användare förmedlar via tjänsten, exempelvis när hen publicerar en förfrågan om att få materialofferter eller vid prenumerationer av våra nyhetsbrev. Vi har också möjlighet att inhämta kontaktuppgifter om användare via koncernbolag, samarbetspartners eller andra databaser. 
Vilka typer av uppgifter som hanteras
Bidstacker inhämtar uppgifter för att kunna fullfölja våra åtaganden gentemot de användare som nyttjar tjänsten ”www.bidstacker.se”,”www.bidstacker.com”.
Uppgifter är alla slags uppgifter som ensamt eller i kombination med andra uppgifter kan knytas till en fysisk eller juridisk person. Uppgifterna kan exempelvis bestå av -för/ efternamn, organisationsnummer eller filer, såsom; bilder, -video/ och (eller) ljudklipp.
        </p>

        <h4 className="text-2xl font-medium mt-6 mb-1">
        Vilket är syftet med hanteringen av användaruppgifter?
        </h4>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Lagringen av uppgifter är nödvändig för att kunna leverera tjänsten för användaren.
Uppgifter som lagras kan röra sig om information eller uppgifter som inkommer genom en förfrågan, men också offerter liksom eventuella formulär eller nyhetsbrev. Bidstacker kan även i de fallen en användare ej motsatt sig denna form av marknadsföring, använda uppgifter för -kund/, marknadsanalyser eller för exempelvis att optimera tjänsten.
Närmare om dina rättigheter vid behov av rättelse, radering m.m.
        </p>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Bidstacker:s användare, är berättigade att få ut registerutdrag över vilken information som finns registrerad om denne. Användare kan även i vissa fall vara berättigade till dataportabilitet av uppgifter. Användaren har även rätt att begära att få eventuella användaruppgifter eller information, ändrade om de är bristfälliga, inkorrekta eller på annat sätt ofullständiga. Därutöver har användare rätt att begära att begränsa ytterligare behandling av uppgifter till en korrigering utförts. Användare kan under vissa förutsättningar begära att få sina användaruppgifter raderade, Bidstacker kan komma att neka en begäran. Exempelvis då uppgifterna bedöms nödvändiga för att kunna fullgöra ingångna avtal, om svensk alternativt europeisk lagstiftning, praxis eller myndigheter förordnar annat. Användare kan i vissa fall, framställa begäran om att hanteringen av uppgifter begränsas för vissa ändamål. Användare är berättigade att invända mot beslut som fattats av Bidstacker, det också möjligt om att återta sitt samtycke, invända mot automatiskt beslutsfattande, profilering, direktmarknadsföring eller också lämna era klagomål till info@bidstacker alternativt:
        </p>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        - Integritetsskyddsmyndigheten, (www.imy.se). Vi uppskattar att ni kontaktar oss i första hand.
        </p>

        <h4 className="text-2xl font-medium mt-6 mb-1">
        Hur länge uppgifterna bevaras hos Bidstacker
        </h4>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Användares uppgifter lagras och hanteras endast i den mån det krävs för att vi skall kunna fullgöra åtaganden gentemot använden, samt så länge det är nödvändigt enligt lagstiftning. Användaruppgifter eller data, kan komma att sparas för andra syften än avtalsenliga åtaganden, exempelvis för att uppfylla krav på bokföring eller andra svenska lagregleringar, vid dessa fall lagras -datan/ uppgifternas endast så länge detta är nödvändigt eller föreligger ett lagstadgat syfte. Bidstacker kan komma att spela in och lagra inkommande samtal till bolaget samt relevanta avdelningar i bolaget, kan komma att spelas in och lagras i 2 år; grundat i intresseavvägning (6.1(f) GDPR) för att möta syften och vidareutveckla interna verksamhetsområden i Sverige.
Andra uppgifter eller data, lagras så länge som det är nödvändigt för att uppfylla syftet. I de fallen användare önskar avregistrera sig från nyhetsbrev eller annan marknadsföring så kan uppgifter också vidare brukas i syfte att kunna efterleva sådan avregistreringsbegäran.
        </p>
        
        <h4 className="text-2xl font-medium mt-6 mb-1">
        Vem kan tal del av användar -uppgifter/ data?
        </h4>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Bidstacker kan behöva lämna ut, eller dela användaruppgifter med andra företag eller myndigheter. Detta kan exempelvis föranledas av ett behov av att kunna hantera användares ärenden, fakturafrågor, i marknadsföringssyfte eller för vid behov att upprätta kontakt med användare. Uppgifter och användardata kan även komma att förmedlas till underleverantörer, exempelvis; företag som Bidstacker valt att samarbeta med för att ombesörja en del av tjänsten. Dessa underleverantörer är personuppgiftsbiträden till Bidstacker.
        </p>
        
        <h4 className="text-2xl font-medium mt-6 mb-1">
        Hur vi hanterar data och annan användarinformation?
        </h4>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Tjänsten som Bidstacker tillhandahåller är utformad för att i högsta möjliga mån säkerställa att användaruppgifter behandlas inom EU/EES, våra egna IT-system finns inom EU/EES. Bidstacker kan till följd av systemmässiga underhåll tvingas att i vissa fall förmedla informationen utanför EU/ESS. Önskar ni mer information om våra personuppgiftsbiträden så ber vi er vänligen ta kontakt med oss genom ovanstående kontaktuppgifter. Bidstacker vidtar nödvändiga åtgärder vid behandling av personuppgifter, data eller annan användarinformation, oavsett om hanteringen sker inom eller utanför EU/ESS, så skall nödvändiga skyddsåtgärder tillämpas.
        </p>
        
        <h4 className="text-2xl font-medium mt-6 mb-1">
        Hur lagras och används cookies?
        </h4>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Vi tillämpar cookies på våra hemsidor. ”Cookies” är textfiler, som lagras i er enhet, (vanligtvis en webbläsare på dator, mobil eller surfplatta) i syfte att hemsidan skall känna igen er enhet. ”Cookies” kan antingen vara temporära (sessionscookies) eller permanenta, de sistnämnda sparas under längre tidsperioder medan sessionscookies endast lagras under den begränsade tiden som användare använder sig av hemsidan varpå dessa cookies sedan försvinner.
        </p>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        En cookie används för att kunna möjliggöra för användare att nyttja diverse funktioner. Cookies gör det möjligt att följa en användares surfsessioner, de cookies som följer av att använda Bidstackers tjänst, används i syfte att kunna anpassa och hantera användares användning av tjänsten som tillhandahålls på  ”www.bidstacker.se” och ”www.bidstacker.com”. Cookies kan även av Bidstacker komma att användas för att överse och webbtrafik samt användaraktivitet.
        </p>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Det är möjligt att ställa in vissa webbläsare, så att användare blir meddelade ifall enheten blir ombedd att lagra cookies. En användare kan därmed välja att antingen acceptera eller avvisa denna begäran. Vissa webbläsare erbjuder också möjligheten att avvisa alla typer av cookies. Användare bör dock uppmärksammas på att vissa delar av tjänsten eller funktioner ej då kommer att fungera.
        </p>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        Bidstacker förbehåller sig rättigheten att närsomhelst göra ändringar i denna informationen, vilket kan förorsakas av -ändrade/, nya lagregleringar eller ändringar av tjänsten. Information om nya förändringar meddelas på ”www.bidstacker.se”. Större ändringar, kan innebära att användare kontaktas direkt.
Vi förbehåller oss rätten att ändra denna informationstext från tid till annan för att återspegla ändrade lagkrav eller vår behandling. Eventuella ändringar kommer att läggas ut på denna webbplats. Vid större förändringar kommer vi att kontakta dig innan förändringarna träder i kraft.
        </p>

        <p className="text-base tablet:text-lg leading-relaxed mb-4">
        <strong>Denna integritetspolicy ändrades senast:</strong> 1 Mars 2023
        </p>
    </>)

}