import { Metadata } from 'next';
import Image from 'next/image';

export const metadata = {
  title: 'Historien och drivkraften bakom Bidstacker',
  description:
    'Målsättningen med Bidstacker, är att effektivisera byggföretagens inköpsprocess. Förutom att allokera material åt byggföretag så tillgängliggör tjänsten även återbruksvaror, överskottspartier samt klimatsmarta lösningar för att bidra till att reducera byggmaterialhandels klimatinverkan.',
};

const BidstackerPage = () => {
  return (
    <div className="bg-gray-light text-black dark:text-white pt-[175px] pb-[100px] px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="relative">
          <h1 className="flex items-center pb-[50px] max-w-[500px] mb-2 tablet:mb-[50px]">
            Sveriges första offertinsamlingstjänst för byggmaterial.
          </h1>
          <Image
            src="/assets/svg/logistics-pana.svg"
            alt="Picture of the author"
            width={300}
            height={500}
            className="hidden tablet:flex absolute right-0 bottom-0"
          />
        </div>
        <div className="mb-20">
          <div className="flex flex-col tablet:flex-row items-center gap-6 mb-12">
            <div className="w-full flex-1">
              <div className='w-full tablet:hidden grow h-[170px] rounded-lg bg-[url("/assets/img/bidstacker-office.webp")] bg-cover bg-center' />
              <div className="hidden tablet:flex w-full">

                <Image
                  src="/assets/img/bidstacker-office.webp"
                  alt="Picture of the author"
                  width={438}
                  height={292}
                  className="rounded-lg"
                  style={{
                    clipPath:
                      'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)',
                  }}
                />

              </div>
            </div>
            <div className="flex-1">
              <h4 className="mb-6 text-lg tablet:text-2xl font-bold">Dåtid</h4>
              <p className="ml-6">
                Bidstacker grundades 2020, av Amin Smires i syfte att
                digitalisera inköpsprocessen mellan byggföretagen och
                byggvaruhandlare. Materialinköpen sköts i regel manuellt av
                hantverkare, vilket i sin tur kan leda till att bolaget går
                miste om värdefull arbetstid.
              </p>
            </div>
          </div>
          <div className="flex flex-col tablet:flex-row items-center gap-6">
            <div className="flex-1">
              <h4 className="mb-6 text-lg tablet:text-2xl font-bold">Nutid</h4>
              <p className="ml-6">
                Sedan 2021 har tjänsten tagit ytterligare form under Pär
                Henrikssons ledning i egenskap av CTO och medgrundare. Bolaget
                består sedan Oktober 2022 av 5 medarbetare. Bolagets syfte är
                att tillhandahålla en modern tjänst, som främjar för en sund och
                hållbar konkurrens inom handeln av byggmaterial.
              </p>
            </div>
            <div className="w-full flex-1 order-first tablet:order-last">
              <div className='w-full tablet:hidden grow h-[170px] rounded-lg bg-[url("/assets/img/bidstacker_breakit_2022.webp")] bg-cover bg-center' />
              <div className="hidden tablet:flex w-full">

                <Image
                  src="/assets/img/bidstacker_breakit_2022.webp"
                  alt="Picture of the author"
                  width={438}
                  height={292}
                  className="rounded-lg"
                  style={{
                    clipPath:
                      'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',
                  }}
                />

              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold tablet:text-4xl text-center mb-16">
            Vi innoverar för hållbarheten och solidariteten inom
            byggmaterialhandeln
          </h3>
          <div className="flex flex-col tablet:flex-row items-center gap-7 mb-12">
            <div className="tablet:bg-opacity-0 w-full flex tablet:w-[400px] rounded-lg">

              <Image
                src="/assets/svg/handshake.svg"
                alt="Picture of the author"
                width={125}
                height={125}
              />
              
            </div>
            <div>
              <h4 className="text-base tablet:text-xl font-bold mb-2">
                Solidaritet
              </h4>
              <p>
                Utmaningarna i byggbranschen ställer till det för många av
                byggföretagen. Därför vill vi uppmana till solidaritet inom
                materialhandeln och en ökad samverkan mellan befintliga aktörer.
                Vår mälsättning är att bevisa att det kan vara lönsamt att
                samarbeta med varandra.
              </p>
            </div>
          </div>
          <div className="flex flex-col tablet:flex-row items-center gap-7 mb-12">
            <div className="tablet:bg-opacity-0 w-full flex tablet:w-[400px] rounded-lg">

              <Image
                src="/assets/svg/lamp.svg"
                alt="Picture of the author"
                width={125}
                height={125}
              />

            </div>
            <div>
              <h4 className="text-base tablet:text-xl font-bold mb-2">
                Innovativitet
              </h4>
              <p>
                Byggföretagens inköp sköts vanligen av hantverkare och sker i
                regel manuellt, detta innebär i praktiken att inköpsprocessen
                för de allra flesta resulterar i förlorad arbetstid. Vår målbild
                är att underlätta inköpen för byggföretagen genom att erbjuda
                ett användarvänligt, effektivt, tillgängligt och
                kostnadseffektivt inköpsverktyg.
              </p>
            </div>
          </div>
          <div className="flex flex-col tablet:flex-row items-center gap-7">
            <div className="tablet:bg-opacity-0 w-full flex tablet:w-[400px] rounded-lg">

              <Image
                src="/assets/svg/recycle.svg"
                alt="Picture of the author"
                width={125}
                height={125}
              />

            </div>
            <div>
              <h4 className="text-base tablet:text-xl font-bold mb-2">
                Hållbarhet
              </h4>
              <p>
                Vi strävar efter en cirkulär och miljövänlig materialhandel. Det
                åstadkommer vi bland annat genom att främja handeln av
                återbruksmaterial och överskottspartier. På så sätt kan vi bidra
                till att kompensera varuminskningskostnader för återförsäljare
                och samtidigt öka byggföretagens lönsamhet.
              </p>
            </div>
          </div>
        </div>
        <h3 className="mt-[70px] text-center">
          Var med och skapa hållbarhet inom byggmaterialhandeln
        </h3>

        {/* <div className="max-w-[900px] mx-auto">
          <div className="bg-white dark:bg-gray-light-dark rounded-xl p-5 tablet:p-8">
            <h2 className="text-4xl my-6 text-center">🌅&nbsp;Blev till</h2>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Bidstacker grundades 2020, av Amin Smires i syfte att digitalisera
              inköpsprocessen mellan byggföretagen och byggvaruhandlare.
              Materialinköpen sköts i regel manuellt av hantverkare, vilket i
              sin tur kan leda till att bolaget går miste om värdefull
              arbetstid.
            </p>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Sedan 2021 har tjänsten tagit ytterligare form under Pär
              Henrikssons ledning i egenskap av CTO och medgrundare. Bolaget
              består sedan Oktober 2022 av 5 medarbetare. Bolagets syfte är att
              tillhandahålla en modern tjänst, som främjar för en sund och
              hållbar konkurrens inom handeln av byggmaterial.
            </p>

            <h3 className="text-4xl mt-10 mb-6 text-center">
              💚&nbsp;Vad bryr vi oss om
            </h3>

            <h4 className="text-2xl font-medium mt-6 mb-1">
              🗿&nbsp;Solidaritet
            </h4>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Utmaningarna i byggbranschen ställer till det för många av
              byggföretagen. Därför vill vi uppmana till solidaritet inom
              materialhandeln och en ökad samverkan mellan befintliga aktörer.
              Vår mälsättning är att bevisa att det kan vara lönsamt att
              samarbeta med varandra.
            </p>

            <h4 className="text-2xl font-medium mt-6 mb-1">
              🗿&nbsp;Innovativitet
            </h4>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Byggföretagens inköp sköts vanligen av hantverkare och sker i
              regel manuellt, detta innebär i praktiken att inköpsprocessen för
              de allra flesta resulterar i förlorad arbetstid. Vår målbild är
              att underlätta inköpen för byggföretagen genom att erbjuda ett
              användarvänligt, effektivt, tillgängligt och kostnadseffektivt
              inköpsverktyg.
            </p>

            <h4 className="text-2xl font-medium mt-6 mb-1">
              🗿&nbsp;Hållbarhet
            </h4>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Vi strävar efter en cirkulär och miljövänlig materialhandel. Det
              åstadkommer vi bland annat genom att främja handeln av
              återbruksmaterial och överskottspartier. På så sätt kan vi bidra
              till att kompensera varuminskningskostnader för återförsäljare och
              samtidigt öka byggföretagens lönsamhet.
            </p>

            <h4 className="text-2xl font-medium mt-6 mb-1">
              🗿&nbsp;Cirkulär ekonomi
            </h4>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Vi vill bidra till en hållbar materialhandel, därför kan
              återförsäljare besvara förfrågningar utöver de som tillkommer dem
              genom deras egna kundkrets och utanför deras geografiska omfång.
            </p>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Återförsäljare ökar därigenom omsättningen och minimerar samtidigt
              behovet för enskilda entreprenörer att tvingas avbryta pågående
              byggnationer för att allokera byggvaror.
            </p>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Vi vill förkorta antalet resor från /till brädgårdarna, genom att
              erbjuda snabba och klimatvänliga leveransalternativ.
            </p>

            <p className="text-base tablet:text-lg leading-relaxed mb-4">
              Förutom att effektivisera materialflödet så är målsättningen att
              öka omsättningen av överskottspartier och således undvika onödigt
              långtsiktigt spill.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BidstackerPage;
