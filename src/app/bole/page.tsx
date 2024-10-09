'use client';
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

import PhotoBouquet from '@/components/ui/photo_bouquet';
import RollingBallAbstract from '@/components/ui/rolling_ball_abstract';

const transition = { duration: 1, ease: 'easeInOut', repeat: Infinity };

export default function Home() {
  const [boquetVisible, setBoquetVisible] = useState(false);
  return (
    <div className="py-10">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quaerat
        illum perspiciatis accusamus ipsam quae ad commodi inventore sed
        sapiente voluptatem ipsum expedita quasi, illo molestiae harum quis quam
        dignissimos asperiores animi officia consequatur mollitia vel
        blanditiis? Eius sit at quis id ipsam unde rerum sapiente voluptatem
        quos corporis illum pariatur in, adipisci deleniti dolorem provident
        aspernatur velit necessitatibus accusamus ea quo maxime quasi error.
        Aliquam hic minus sunt accusantium ipsam, odio nostrum modi expedita,
        cumque, ea similique voluptatem distinctio! Accusamus, numquam velit ex
        voluptas temporibus, adipisci cum aliquam voluptatem dignissimos
        quisquam amet ipsam vel quod, ducimus quam commodi repellat
        necessitatibus dolore consequuntur quas provident. Corrupti ipsam
        accusamus debitis quos reiciendis, quo, fugiat veniam mollitia quasi
        autem iure cumque harum eius dolores. Sapiente magni perferendis
        reprehenderit voluptatibus dolore, placeat nihil dolor in
        exercitationem! Neque tempora atque assumenda quibusdam error officia
        labore ex sapiente corporis illum facilis, consequatur omnis quaerat
        nisi eligendi tempore sit enim iusto ab ullam veniam vitae quidem
        nesciunt. Commodi magni cumque dolores excepturi deleniti voluptates,
        debitis et animi iste velit quae mollitia labore natus neque, possimus
        qui error autem similique, ipsa vitae totam itaque sunt? Veniam tempore
        corrupti, architecto dignissimos dolorem unde provident deleniti
        accusamus, praesentium tenetur molestias debitis minima, quia laborum
        officia alias rem minus veritatis impedit consequatur eligendi
        consequuntur? Sunt, itaque ab. Doloremque sint soluta, harum nisi illum
        sed vel alias? Id fuga facilis hic ad incidunt, exercitationem
        aspernatur sequi est accusantium perferendis omnis molestiae dolores
        doloremque voluptatem quibusdam assumenda! Culpa fugiat, quos debitis
        iusto voluptas accusantium est officia perferendis omnis, deleniti
        asperiores a rerum eaque consequuntur dolores dolorem consectetur odit
        accusamus, architecto necessitatibus. Recusandae provident fugit ab,
        molestiae cupiditate molestias, magni ullam quas nisi nemo facere quod
        at adipisci quae quasi explicabo ad sit nulla sint velit unde. Dolor
        doloribus cum, unde at architecto alias repudiandae maxime. Molestias id
        aliquid reiciendis itaque mollitia ipsa, alias, ab commodi cumque quos
        nihil, libero provident. Porro mollitia laborum similique cupiditate
        quidem quo, quos fuga voluptatibus illo eius officiis aut, placeat,
        consectetur iste ex quibusdam expedita totam numquam necessitatibus.
        Magni aperiam corrupti in, eum a provident placeat nisi ex fugit
        eveniet? Distinctio voluptate explicabo, voluptas, placeat quia tempore
        quos consequatur cupiditate, in dolorem repellendus! Exercitationem ab
        repellat unde quis velit et sapiente ex dolores, nostrum minus omnis
        veniam reiciendis eaque recusandae inventore necessitatibus quod
        voluptatibus. Quam, voluptatem deserunt eligendi possimus ipsum officia
        reiciendis, magnam obcaecati eius harum dolore mollitia velit, vero
        earum! Reiciendis saepe ipsam qui unde! Voluptates asperiores dolorum
        mollitia molestiae atque est molestias consectetur natus. Provident
        reiciendis sunt expedita. Voluptas corrupti corporis quidem consectetur.
        Excepturi ex, suscipit reprehenderit eveniet nisi illum nihil obcaecati
        et impedit cumque quo porro ipsum reiciendis aut possimus labore iste
        alias! Vero corporis laudantium assumenda dolore. Laudantium,
        necessitatibus dolores veniam fugiat delectus cupiditate dicta doloribus
        reiciendis harum, quis debitis labore a ea iusto molestias omnis enim
        tempora neque! Cumque, mollitia. Modi quod quis facere non ut iste
        maxime eaque deserunt libero! Eligendi voluptate praesentium optio fuga
        beatae nihil non reiciendis quos repellendus! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Sequi at odit enim harum veniam ipsam
        mollitia velit aliquid praesentium placeat ut, quis a error modi aut
        corrupti culpa excepturi, quae maxime, fugit ex quibusdam inventore.
        Veniam cum ex asperiores a, consequuntur debitis. Quae corporis sint
        facilis? Accusamus quis similique perspiciatis in alias sed laborum
        soluta reiciendis aspernatur, earum cum cupiditate asperiores incidunt.
        Iusto nihil dolorum laborum, amet eaque earum reprehenderit cupiditate
        deleniti voluptatem optio ullam sint. Illum deleniti corrupti similique
        pariatur temporibus. Totam necessitatibus veniam illo blanditiis rerum
        cumque dolores minus et maxime consectetur eos unde est cum dolore
        deserunt aliquam asperiores vero, aperiam expedita nulla doloremque
        provident? Doloremque id error doloribus sequi minus. Optio quisquam,
        ratione adipisci exercitationem aperiam aut error commodi magnam, ex
        inventore ut temporibus quasi. Fugiat assumenda at modi, et praesentium
        quis nostrum autem. Rerum harum architecto qui nesciunt quia quam
        delectus aliquid, incidunt fugiat minima vel quos numquam quasi, non,
        eos aspernatur tenetur cumque ex dignissimos? Quod maxime delectus
        recusandae consectetur, excepturi amet possimus omnis hic minima magnam
        provident voluptate optio necessitatibus. Voluptates facilis provident
        quidem saepe necessitatibus totam recusandae porro id ut. Earum eaque ea
        quasi culpa, sunt minus! Cum est quia aut eum perferendis excepturi
        libero, dolor deserunt nobis velit suscipit impedit quaerat distinctio
        ratione facilis autem consectetur natus sunt, aperiam doloremque maxime
        eos? Hic sint sequi deserunt a iste ipsa, autem dicta obcaecati, eos
        enim fugit molestiae laboriosam vitae? Recusandae quae commodi minus in
        tempora beatae, reprehenderit earum possimus, ipsam repellat modi.
      </p>
      <div className="h-96"></div>
      <div className="relative m-auto grid bg-gradient-to-br from-amber-300 to-zinc-50">
        <div className="absolute bottom-0 z-20 h-[80%] w-[50vw]">
          <Image
            src="/wicketsbg.svg"
            layout="fill"
            objectFit="contain"
            alt="Wickets Background"
          />
        </div>
        <div className="z-10">
          <h1 className="mt-20 text-center text-2xl font-bold">
            The Annual Cricket Fiesta by FIT
          </h1>
          <RollingBallAbstract />
        </div>
        <div className="z-30 mt-[-5rem] grid grid-cols-5 gap-5 p-2 lg:mt-[-20rem] lg:p-10 lg:px-20">
          <AnimatePresence>
            <motion.div
              className="col-span-5 p-10 xl:col-span-2"
              variants={{
                hidden: { opacity: 0, y: 200 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    duration: 1,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              layout
            >
              <motion.p>
                Welcome to the official website of FIT SIXES, the annual
                six-a-side cricket Tournament of the Faculty of Information
                Technology of University of Moratuwa. FIT SIXES is a friendly
                rivalry of cricket among the squads of undergraduates of the
                faculty and the industry giants, and underpinning a numerous
                mini-games, fun activities, and after party celebration.
                Upholding the traditions of the faculty from generation to
                generation, it is organized to strengthen the alliance between
                the undergraduates and the invited industrial partners.
              </motion.p>
              <motion.ul className="ml-10 mt-10 list-disc">
                <motion.li className="mb-1">
                  Annual six-a-side cricket tournament
                </motion.li>
                <motion.li className="mb-1">
                  FIT SIXES is a friendly rivalry of cricket
                </motion.li>
                <motion.li className="mb-1">
                  Alliance between the undergraduates and the invited industry
                  partners
                </motion.li>
              </motion.ul>
              {/* <motion.div className="h-60 lg:block hidden" /> */}
            </motion.div>
          </AnimatePresence>
          <motion.div
            className="col-span-5 content-center xl:col-span-3"
            onViewportEnter={() => setBoquetVisible(true)}
          >
            <PhotoBouquet visible={boquetVisible} />
          </motion.div>
        </div>
      </div>
      <div className="h-96"></div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, neque
        mollitia necessitatibus illum est autem iusto, nostrum odit minus
        dolorum rem quidem. Fugit, doloremque amet ab beatae cum cupiditate
        consectetur temporibus et accusantium adipisci voluptas debitis, ad
        provident facere quia incidunt rem dolorum sunt ipsam architecto
        repudiandae quibusdam. Iusto similique qui laboriosam iure harum
        obcaecati fuga maxime. Porro corporis, beatae ab expedita aperiam nam,
        architecto dolorum eum tempore, incidunt quasi. Obcaecati aperiam alias
        odit veniam illo cupiditate laborum non sit nobis qui, voluptatum
        expedita voluptatem dolorum cumque eos at architecto! Nostrum, facere!
        Vel delectus hic aliquam atque quasi, omnis, totam laboriosam dolore
        veniam similique possimus ea numquam beatae quas incidunt odit magni
        velit aut quidem provident maiores! Veritatis, sequi qui, expedita iste
        doloribus nam facere modi fugiat aut inventore nemo, error id alias
        soluta esse dignissimos consectetur est non. Fuga modi mollitia illo.
        Qui delectus labore, sit quod et odio dolorem distinctio ad ipsam nam
        totam, quia illo fugit? Nam ut neque doloribus ipsum iusto quibusdam
        excepturi quos vel, in quas incidunt vero veritatis temporibus expedita
        nemo illo placeat, perspiciatis, ratione quidem magni repellat pariatur
        non doloremque? Vero, facilis est. Provident quae aut fugiat. Voluptate
        soluta nisi beatae debitis sunt. Voluptate rem quisquam a aut totam,
        voluptatibus asperiores, laborum sunt nostrum suscipit commodi ipsum
        error. Id tempora veritatis quod magnam neque blanditiis eaque iusto
        nesciunt. Maxime explicabo, ea dolore vero eos, reiciendis velit odio
        laboriosam ducimus nulla deleniti ab cupiditate iste at. Commodi,
        quisquam hic vero omnis blanditiis error iure perspiciatis quos eos quam
        facilis quis consequuntur esse obcaecati alias odio! Libero blanditiis
        eveniet dignissimos maxime ab soluta excepturi, est recusandae
        voluptates sunt eos tenetur assumenda dolore praesentium, illo incidunt
        fugit. Officia, saepe natus minus ea aspernatur facilis unde laborum,
        illum, iusto animi soluta optio esse perspiciatis debitis repellat
        dignissimos ratione molestiae. Dicta delectus repudiandae, ea ratione
        voluptatibus repellendus facere rerum officiis dolorem, reiciendis in
        quibusdam at omnis veritatis voluptatum molestias doloribus dolores.
        Molestiae commodi incidunt nam nemo harum, soluta, hic corrupti dolores
        rerum voluptatem quibusdam iure ipsa atque velit natus reiciendis a
        officiis! Praesentium quam obcaecati ratione assumenda accusamus
        voluptatibus, ad aliquid unde libero beatae exercitationem iure
        doloremque suscipit quisquam asperiores, quas consequatur blanditiis ea
        sint. Quia laudantium enim deserunt itaque molestiae eaque ab quidem eum
        eligendi quae dicta, voluptatibus illo praesentium! Aliquam itaque odio
        nobis fuga ex minima libero! Cum sapiente commodi aliquid sit distinctio
        quisquam vitae, voluptatem ratione rerum animi dignissimos nemo aut
        eveniet facere deserunt, quae molestias corporis, error consequatur!
        Accusantium fugit, labore, quaerat, ratione nihil eos minima repellendus
        fugiat natus velit optio vel totam alias. Illo quia esse expedita
        doloremque tempore maiores voluptate commodi excepturi debitis impedit,
        hic in consequuntur porro officiis deserunt quis qui iusto ex sit eum
        nihil quisquam natus adipisci minus. Saepe ut labore cum provident quasi
        modi quia quo deleniti ex asperiores numquam, voluptates tempore enim
        eum nulla? Non officia illum eos commodi debitis vitae nulla voluptates
        error obcaecati, id quis enim, accusamus quae aspernatur, numquam
        repellendus beatae voluptatibus dignissimos odio. Ex voluptatibus
        sapiente officia nihil quaerat, minus natus alias, eligendi
        reprehenderit provident a vitae perspiciatis unde quasi exercitationem?
        Tempore, nihil. Sequi enim dignissimos exercitationem eos temporibus nam
        a, unde, quia obcaecati perspiciatis quo! Recusandae voluptate officia
        atque neque harum, totam doloribus voluptatum tempora dicta rerum
        ratione enim dignissimos aspernatur veniam! Provident, voluptatibus
        itaque in enim consectetur ad maiores adipisci placeat autem laudantium
        est inventore earum? Consectetur debitis nulla praesentium nesciunt
        reprehenderit quaerat voluptatum sed, earum recusandae, voluptas ab
        doloremque perspiciatis explicabo ullam delectus. Animi veniam iure ab
        sit quidem rerum voluptatum ea. Asperiores modi enim quo aspernatur
        sapiente dicta tempore rerum alias vel placeat ad dolorum amet corrupti
        corporis, laboriosam, blanditiis at, molestiae tenetur cum deserunt. Ab,
        possimus. Ipsam, laborum. Eum cum et autem! Omnis, quisquam at
        distinctio aliquam repudiandae, sint sit culpa vero provident, nam odit?
        Totam reprehenderit sunt ipsum minus fugit, consequuntur quis doloribus
        earum incidunt rem debitis inventore? Commodi animi odio maxime
        corporis, placeat suscipit aspernatur ea sapiente cumque velit quo
        praesentium culpa dolorum natus, ad ut recusandae beatae, eligendi eos
        odit qui dolorem perferendis inventore consectetur? Quis in ipsum,
        officiis similique, exercitationem velit ab ea assumenda, eos numquam
        aliquam reprehenderit perspiciatis. Omnis magni nesciunt repellendus
        blanditiis itaque error esse voluptas cumque ullam quo accusamus ea ut
        est, reiciendis nisi minima ab, fuga quidem? Voluptatum quibusdam magnam
        debitis commodi, similique tenetur inventore? Velit praesentium sint
        repellendus. Ratione cum ea obcaecati placeat, perferendis optio eos
        quaerat repellat quibusdam adipisci impedit! Eligendi, reiciendis
        libero! Tempora, saepe velit possimus hic modi et iste rerum. Quisquam
        placeat dolorem, ullam suscipit iste aut itaque, voluptate, aliquam
        deleniti ipsam neque. Illo, beatae. Itaque eligendi nulla corrupti?
        Repellat sit minima animi dolorem optio atque voluptatem in totam
        facilis? Accusantium laborum dolorum modi minima hic quaerat qui
        veritatis in quas voluptate asperiores porro iure possimus ad nihil,
        nemo illum, cumque quia ut exercitationem! Voluptatum hic iusto veniam
        sed ipsam dignissimos, pariatur fugit sit unde. Eum voluptas illum, est
        molestiae rem maiores dignissimos distinctio, debitis voluptatibus quae,
        non modi. Minima vitae obcaecati earum repellendus rerum laborum beatae,
        reiciendis, illo numquam dicta sequi accusamus aperiam commodi natus
        sint unde, culpa repellat enim eius! Ratione, animi, placeat nisi
        exercitationem ducimus voluptatem provident tempore, nam dicta
        consequuntur voluptatibus. Est, sapiente veritatis optio delectus iusto
        nam quam sed maxime, cupiditate id voluptas maiores aliquid quasi hic
        reiciendis voluptatum! Suscipit velit accusantium beatae, voluptate
        totam modi asperiores reiciendis nesciunt a, quod voluptas nisi quia
        explicabo? Veniam necessitatibus ipsa cupiditate iusto cum temporibus
        quos id impedit, aspernatur recusandae culpa, corporis quas veritatis!
        Facere officia omnis accusantium fugit doloremque iure quam sunt ipsa?
        Cum harum maxime maiores impedit voluptates provident optio nisi
        veritatis dolore, iure suscipit sapiente cumque facere a officiis
        magnam? Maxime, facere. Quia, adipisci? Nostrum, autem qui voluptates,
        laborum, animi aut facilis est mollitia accusantium fugiat commodi quis
        repudiandae quidem. Nostrum labore incidunt dignissimos ab aut
        architecto recusandae dolor, odit cupiditate tenetur numquam aliquid
        consequuntur, reprehenderit in, aliquam fugit totam itaque vitae
        doloribus repudiandae cum minima minus. Accusantium inventore neque
        praesentium?
      </p>
    </div>
  );
}
