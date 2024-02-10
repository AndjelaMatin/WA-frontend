export const cardsData = [
  {
      id: 1,
      title: "Mafini",
      description: "Mafini po bakinom receptu",
      image: "brownies.jpg",
      likes: 10,
      comments: 5,
      commentsText:[
        {
          id: 1,
          author: "Ana Anic",
          authorImage: "/assets/store_photo/anica.jpg",
          text: "Divan recept! Hvala ti što si ga podelila.",
          date: "2024-02-10",
        },{
          id: 10,
          author: "Stefan Stefanović",
          authorImage: "/assets/store_photo/stefan.jpg",
          text: "Obožavam ove mafine! Pravim ih već nekoliko puta i uvek su fantastični.",
          date: "2024-02-08",
        },
        {
          id: 3,
          author: "Milica Milenković",
          authorImage: "/assets/store_photo/milica.jpg",
          text: "Divan recept! Dodala sam malo cimeta i muskatnog oraščića za još bolji ukus.",
          date: "2024-02-05",
        },
        {
          id: 4,
          author: "Marko Marković",
          authorImage: "/assets/store_photo/marko.jpg",
          text: "Odličan recept! Hvala ti što si ga podelila sa svima.",
          date: "2024-02-03",
        },
        {
          id: 1,
          author: "Ana Anic",
          authorImage: "/assets/store_photo/anica.jpg",
          text: "Takve je pravila moja baka!",
          date: "2024-02-01",
        },
      ],
      servings: 12,
      ingredients: [
        "2 šolje brašna",
        "1 šolja šećera",
        "1 kašičica praška za pecivo",
        "1/2 kašičice soli",
        "1 šolja mleka",
        "1/2 šolje ulja",
        "2 jaja",
        "1 kašičica vanilin šećera",
      ],
      instructions: [
        "Zagrejte rernu na 180 stepeni.",
        "Pomešajte suve sastojke u jednoj posudi.",
        "U drugoj posudi umutite mleko, ulje, jaja i vanilu.",
        "Dodajte suve sastojke u mokre i mešajte dok ne dobijete glatko testo.",
        "Sipajte smesu u kalupe za mafine i pecite 20-25 minuta.",
      ],
      creatorId: 2,
    },
    {
      id: 2,
      title: "Čokoladni brownies",
      description: "Sočni čokoladni brownies sa orasima",
      image: "brownies.jpg",
      likes: 15,
      comments: 2,
      commentsText:[
        {
          id: 5,
          author: "Tamara Tasić",
          authorImage: "/assets/store_photo/tamara.jpg",
          text: "Fantastičan recept! Pravila sam ih za rođendan i svi su oduševljeni.",
          date: "2024-01-30",
        },
        {
          id: 6,
          author: "Teodora Teodorović",
          authorImage: "/assets/store_photo/teodora.jpg",
          text: "Jako ukusni brownie! Preporučujem svima da ih probaju.",
          date: "2024-01-28",
        },],
      servings: 16,
      ingredients: [
        "1 šolja putera",
        "2 šolje šećera",
        "4 jaja",
        "1 kašičica vanile",
        "3/4 šolje kakaa",
        "1 šolja brašna",
        "1/2 kašičice soli",
        "1 šolja iseckanih oraha",
      ],
      instructions: [
        "Rastopite puter i dodajte šećer.",
        "Umutite jaja i dodajte vanilu.",
        "Dodajte kakao, brašno, so i orase.",
        "Sipajte smesu u pleh i pecite 25-30 minuta.",
      ],
      creatorId: 3,
    },
    {
      id: 3,
      title: "Jabukova pita",
      description: "Mirisna jabukova pita sa cimetom",
      image: "brownies.jpg",
      likes: 20,
      comments: 2,
      commentsText:[
      {
        id: 7,
        author: "Nikola Nikolić",
        authorImage: "/assets/store_photo/nikola.jpg",
        text: "Baš mi se dopala! Planiram da probam i druge recepte sa tvoje stranice.",
        date: "2024-01-25",
      },
      {
        id: 8,
        author: "Jovana Jovanović",
        authorImage: "/assets/store_photo/jovana.jpg",
        text: "Savršena pita za popodnevnu užinu! Hvala ti što si podelila recept.",
        date: "2024-01-23",
      },],
      servings: 8,
      ingredients: [
        "5 jabuka, oljuštene i naseckane",
        "1/2 šolje šećera",
        "1 kašičica cimeta",
        "1 kašičica limunovog soka",
        "1 šolja brašna",
        "1/2 šolje šećera",
        "1/4 kašičice soli",
        "1/2 šolje putera, naseckanog",
      ],
      instructions: [
        "Pomešajte jabuke, šećer, cimet i limunov sok.",
        "U drugoj posudi pomešajte brašno, šećer i so.",
        "Dodajte puter i rukama umesite mrvice.",
        "Stavite jabuke u pleh, prekrijte smesom od brašna i pecite 40-45 minuta.",
      ],
      creatorId: 1,
    },
    {
      id: 4,
      title: "Tiramisu",
      description: "Italijanski desert s kafom i mascarpone sirom",
      image: "brownies.jpg",
      likes: 25,
      comments: 1,
      commentsText:[
        {
          id: 9,
          author: "Luka Lukić",
          authorImage: "/assets/store_photo/luka.jpg",
          text: "Moji prijatelji su oduševljeni ovim receptom! Definitivno ću ga ponovo praviti.",
          date: "2024-01-20",
        },
      ],
      servings: 8,
      ingredients: [
        "4 jaja",
        "150g šećera",
        "500g mascarpone sira",
        "1 šolja jake kafe, ohlađene",
        "1 pakovanje piškota",
        "Kakao u prahu za posipanje",
      ],
      instructions: [
        "Umutite jaja sa šećerom dok ne postanu penasta.",
        "Dodajte mascarpone sir i mešajte dok ne dobijete kremastu smesu.",
        "Umutite kafu i umačite piškote.",
        "Složite red piškota, red kreme, ponavljajte dok ne potrošite sastojke.",
        "Pospite kakao u prahu i ostavite u frižideru preko noći.",
      ],
      creatorId: 5,
    },
    {
      id: 5,
      title: "Tart od limuna",
      description: "Osvežavajući tart od limuna",
      image: "brownies.jpg",
      likes: 18,
      comments: 9,
      commentsText:[
        {
          id: 10,
          author: "Aleks Aleksic",
          authorImage: "/assets/store_photo/max.jpg",
          text: "Obožavam ovaj recept! Tart mi je ispao fenomenalno.",
          date: "2024-01-18",
        },
        {
          id: 11,
          author: "Ana Anic",
          authorImage: "/assets/store_photo/anica.jpg",
          text: "Takve je pravila moja baka!",
          date: "2024-01-15",
        },
        {
          id: 12,
          author: "Stefan Stefanović",
          authorImage: "/assets/store_photo/stefan.jpg",
          text: "Još jednom sam pravio ovaj tart i ponovo je fantastični!",
          date: "2024-01-13",
        },
        {
          id: 13,
          author: "Milica Milenković",
          authorImage: "/assets/store_photo/milica.jpg",
          text: "Dodala sam malo kisele pavlake u smesu i bilo je još bolje!",
          date: "2024-01-10",
        },
        {
          id: 14,
          author: "Marko Marković",
          authorImage: "/assets/store_photo/marko.jpg",
          text: "Oduševljen sam ovim receptom! Hvala ti što ga deliš s nama.",
          date: "2024-01-08",
        },
        {
          id: 15,
          author: "Tamara Tasić",
          authorImage: "/assets/store_photo/tamara.jpg",
          text: "Pravila sam s dodatkom borovnica!",
          date: "2024-01-05",
        },
        {
          id: 16,
          author: "Teodora Teodorović",
          authorImage: "/assets/store_photo/teodora.jpg",
          text: "Moji prijatelji su bili oduševljeni! Ovo je definitivno recept koji ću često koristiti.",
          date: "2024-01-03",
        },
        {
          id: 17,
          author: "Nikola Nikolić",
          authorImage: "/assets/store_photo/nikola.jpg",
          text: "Jako ukusni mafini! Dodao sam malo rendane čokolade i bili su savršeni.",
          date: "2024-01-01",
        },
        {
          id: 18,
          author: "Jovana Jovanović",
          authorImage: "/assets/store_photo/jovana.jpg",
          text: "Oduševljena sam ovim receptom! Definitivno ću ga preporučiti svojim prijateljima.",
          date: "2023-12-30",
        },
      ],
      servings: 10,
      ingredients: [
        "1 šolja brašna",
        "1/2 šolje putera",
        "1/4 šolje šećera",
        "Prstohvat soli",
        "1 kaša limunove korice",
        "Sok od 3 limuna",
        "3 jaja",
        "1 šolja šećera",
      ],
      instructions: [
        "Pomešajte brašno, puter, šećer i so da napravite testo.",
        "Utisnite testo u pleh za tart i stavite u frižider.",
        "Umutite jaja sa šećerom, dodajte limunov sok i koricu.",
        "Sipajte smesu preko testa i pecite 25-30 minuta.",
        "Poslužite ohlađeno.",
      ],
      creatorId: 6,
    },
    {
      id: 6,
      title: "Palačinke sa voćem",
      description: "Sočne palačinke sa svježim voćem",
      image: "brownies.jpg",
      likes: 22,
      comments: 0,
      servings: 6,
      ingredients: [
        "1 šolja brašna",
        "1 jaje",
        "1 šolja mleka",
        "Prstohvat soli",
        "Svježe voće po želji",
        "Šećer u prahu za posipanje",
      ],
      instructions: [
        "Pomešajte brašno, jaje, mleko i so da napravite smesu.",
        "Pecite palačinke na tiganju.",
        "Napunite palačinke svježim voćem i pospite šećerom u prahu.",
        "Uživajte u sočnom obroku!",
      ],
      creatorId: 9,
    },
    {
      id: 7,
      title: "Torta od malina",
      description: "Osvežavajuća torta od malina s kremastim filom",
      image: "brownies.jpg",
      likes: 22,
      comments: 1,
      servings: 10,
      ingredients: [
        "2 šolje brašna",
        "1 šolja šećera",
        "1 kašičica praška za pecivo",
        "Prstohvat soli",
        "1 šolja maslaca",
        "3 jaja",
        "1 kašičica vanilin šećera",
        "2 šolje malina",
        "500ml slatke pavlake",
      ],
      instructions: [
        "Umutite šećer i maslac, dodajte jaja i vanilu.",
        "Dodajte brašno, prašak za pecivo i so.",
        "Istresite smesu u pleh, stavite maline po vrhu.",
        "Pecite 40-45 minuta na 180 stepeni.",
        "Kada se ohladi, premažite slatkom pavlakom.",
      ],
      creatorId: 3,
    },
    {
      id: 8,
      title: "Čokoladni cupcakes",
      description: "Sočni čokoladni cupcakes sa kremastim filom",
      image: "brownies.jpg",
      likes: 18,
      comments: 0,
      servings: 12,
      ingredients: [
        "1 i 1/2 šolja brašna",
        "1/2 šolja kakaa",
        "1 kašičica praška za pecivo",
        "Prstohvat soli",
        "1 šolja šećera",
        "1/2 šolje ulja",
        "2 jaja",
        "1 kašičica vanile",
        "200g kisele pavlake",
        "150g čokolade za kuvanje",
        "100g putera",
        "200g kisele pavlake za fil",
      ],
      instructions: [
        "Umutite šećer, ulje, jaja i vanilu.",
        "Dodajte brašno, kakao, prašak za pecivo i so.",
        "Ugrejte pavlaku i istopite čokoladu i puter.",
        "Dodajte smesi, stavite u kalupe i pecite 20-25 minuta.",
        "Napunite cupcakes kremom od kisele pavlake.",
      ],
      creatorId: 4,
    },
    {
      id: 9,
      title: "Štrudla sa makom",
      description: "Tradiconalna štrudla sa makom i orasima",
      image: "brownies.jpg",
      likes: 25,
      comments: 0,
      servings: 8,
      ingredients: [
        "500g gotovih kora za savijače",
        "200g mlevenog maka",
        "200g mlevenih oraha",
        "150g šećera",
        "1 kašika meda",
        "150g putera",
      ],
      instructions: [
        "Pomešajte mak, orahe, šećer i med.",
        "Stavite koru, premažite rastopljenim puterom, dodajte fil.",
        "Savijte u rolat i stavite u pleh.",
        "Pecite 30-35 minuta na 180 stepeni.",
        "Pospite šećerom u prahu prije posluživanja.",
      ],
      creatorId: 7,
    },
    {
      id: 10,
      title: "Vanilin kiflice",
      description: "Mekane vanilin kiflice sa orasima",
      image: "brownies.jpg",
      likes: 30,
      comments: 0,
      servings: 20,
      ingredients: [
        "500g brašna",
        "300g putera",
        "200g mlevenih oraha",
        "1 kašičica vanilin šećera",
        "200g šećera u prahu",
      ],
      instructions: [
        "Umutite puter, dodajte šećer i vanilu.",
        "Postepeno dodajte brašno i orahe.",
        "Oblikujte kiflice i stavite ih u pleh.",
        "Pecite 15-20 minuta na 180 stepeni.",
        "Uvaljajte kiflice u šećer u prahu dok su još tople.",
      ],
      creatorId: 1,
    },
    {
      id: 11,
      title: "Cheesecake sa jagodama",
      description: "Klasični cheesecake sa sočnim jagodama",
      image: "brownies.jpg",
      likes: 28,
      comments: 0,
      servings: 12,
      ingredients: [
        "250g keksa",
        "150g putera",
        "500g kisele pavlake",
        "200g šećera",
        "1 kašičica vanilin šećera",
        "4 jaja",
        "500g kisele pavlake za fil",
        "200g jagoda",
      ],
      instructions: [
        "Sameljite kekse, dodajte otopljeni puter i utisnite smesu u pleh.",
        "Umutite kiselu pavlaku, šećer, vanilu i jaja.",
        "Istresite smesu preko podloge od keksa.",
        "Pecite 50-60 minuta na 160 stepeni.",
        "Dekorišite jagodama i ostavite u frižideru preko noći.",
      ],
      creatorId: 9,
    },  
    {
      id: 12,
      title: "Kolač od limuna",
      description: "Sveži kolač od limuna s prelivom od šećera",
      image: "brownies.jpg",
      likes: 18,
      comments: 0,
      servings: 12,
      ingredients: [
        "2 šolje brašna",
        "1 kašičica praška za pecivo",
        "Prstohvat soli",
        "1 šolja šećera",
        "1/2 šolje putera",
        "3 jaja",
        "Sok i kora od 2 limuna",
        "1 šolja mleka",
        "1 šolja šećera u prahu za preliv",
      ],
      instructions: [
        "Umutite šećer, puter i jaja.",
        "Dodajte brašno, prašak za pecivo, so, sok i koru od limuna.",
        "Smesu istresite u pleh i pecite 30-35 minuta na 180 stepeni.",
        "Pomešajte šećer u prahu s malo soka od limuna i prelijte kolač.",
      ],
      creatorId: 2,
    },
    {
      id: 13,
      title: "Palačinke sa nutelom",
      description: "Mekane palačinke punjene Nutellom",
      image: "brownies.jpg",
      likes: 22,
      comments: 0,
      servings: 10,
      ingredients: [
        "1 šolja brašna",
        "1 šolja mleka",
        "1 jaje",
        "Prstohvat soli",
        "Nutela po želji",
        "Šećer u prahu za posipanje",
      ],
      instructions: [
        "Umutite brašno, mleko, jaje i so.",
        "Ispecite tanke palačinke na tiganju.",
        "Razmažite Nutelu po palačinkama, uvijte ih i pospite šećerom u prahu.",
      ],
      creatorId: 8,
    },
    {
      id: 14,
      title: "Keks kuglice",
      description: "Jednostavne keks kuglice s kokosom",
      image: "brownies.jpg",
      likes: 25,
      comments: 0,
      servings: 20,
      ingredients: [
        "250g mlevenog keksa",
        "100g kokosa",
        "150g putera",
        "3 kašike kakaa",
        "200g šećera u prahu",
        "1 kašičica vanile",
        "3 kašike mleka",
      ],
      instructions: [
        "Pomešajte keks, kokos, kakao, šećer u prahu i vanilu.",
        "Dodajte otopljeni puter i mleko.",
        "Mesite smesu, formirajte kuglice i stavite ih u frižider.",
        "Kada se stegnu, kuglice su spremne za posluživanje.",
      ],
      creatorId: 4,
    },
    {
      id: 15,
      title: "Mango panna cotta",
      description: "Osvežavajuća panna cotta s ukusom manga",
      image: "brownies.jpg",
      likes: 28,
      comments: 0,
      servings: 8,
      ingredients: [
        "500ml slatke pavlake",
        "100g šećera",
        "2 kašičice želatina",
        "3 kašike vode",
        "1 kašičica vanilin šećera",
        "Pire od manga",
      ],
      instructions: [
        "Ugrejte slatku pavlaku s šećerom i vanilom do vrenja.",
        "Želatin potopite u vodi, a zatim dodajte u pavlaku i mešajte dok se ne otopi.",
        "Stavite panna cottu u čaše i ostavite da se ohladi.",
        "Prelijte pireom od manga i ostavite u frižideru nekoliko sati.",
      ],
      creatorId: 4,
    },
    {
      id: 16,
      title: "Krofne sa džemom",
      description: "Mekane krofne punjene voćnim džemom",
      image: "brownies.jpg",
      likes: 30,
      comments: 0,
      servings: 12,
      ingredients: [
        "500g brašna",
        "1 kesica suvog kvasca",
        "2 kašike šećera",
        "Prstohvat soli",
        "2 jaja",
        "200ml mleka",
        "50g putera",
        "Džem po želji",
      ],
      instructions: [
        "Ugrejte mleko, dodajte šećer, kvasac i ostavite da nadođe.",
        "Umutite brašno, so, jaja i dodajte nadošli kvasac.",
        "Dodajte otopljeni puter i umesite testo.",
        "Formirajte kuglice, ostavite da narastu, pa pecite u vreloj ulju.",
        "Napunite krofne voćnim džemom.",
      ],
      creatorId: 1,
    },
];