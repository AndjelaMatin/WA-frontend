<template>
  <div class="container">
    <section class="about-section">
      <h1 class="main-title">NAŠA SLATKA PRIČA</h1>
      <div class="content-block">
        <h4 class="section-title">Tko smo mi?</h4>
        <p>
          Mjesto gdje strast prema slatkim kreacijama dobiva svoj digitalni dom!
          Mi smo tim entuzijastičnih ljubitelja slastica koji su odlučili
          olakšati proces dijeljenja i čuvanja omiljenih recepata za slastice.
          Sa našom aplikacijom za unos recepata, želimo vas inspirirati da
          otkrijete nove slatke avanture, dijelite svoje specijalitete sa
          zajednicom, i organizirate svoje omiljene slatke recepte na jednom
          mjestu.
        </p>
        <p>
          Uzbuđeni smo što možemo biti dio vašeg slatkog putovanja i radujemo se
          dijeljenju ukusnih recepata za slastice i slatkih kulinarskih priča.
          Pridružite nam se i zajedno stvorimo slatku zajednicu koja slavi ljubav
          prema slatkim uživanjima!
        </p>
      </div>

      <div class="content-block">
        <h4 class="section-title">Što radimo?</h4>
        <p>
          Kreiramo platformu za dijeljenje i pohranjivanje recepata slastica
          kako biste mogli otkriti nove ukusne ideje, dijeliti svoje omiljene
          recepte i organizirati svoju kulinarsku kolekciju slatkih čarolija na
          jednom mjestu.
        </p>
      </div>

      <div class="content-block">
        <h4 class="section-title">Kako se pridružiti?</h4>
        <p>
          Pridružiti se može svatko jer to je lako! Prijavi se ako već imaš
          kreiran profil ili se registriraj ako nam se još nisi pridružio.
          Zajedno stvorimo slatku zajednicu koja slavi ljubav prema slatkim
          uživanjima. Dodajte svoje najdraže slatke recepte, dijelite svoje
          iskustvo i uživajte u kulinarskim avanturama koje donosi naša
          platforma.
        </p>
      </div>

      <div class="content-block">
        <h4 class="section-title">Dodaj nove recepte</h4>
        <p>
          Neovisno o tome jeste li iskusni u pripremi poslastica ili tek početnik,
          naša platforma je dizajnirana da bude pristupačna i jednostavna za
          korištenje. Unesite svoje omiljene slatke recepte, dodajte sastojke i
          korake, a zatim ih dijelite sa svijetom ili čuvajte privatno za svoje
          osobne kolekcije slatkih čarolija.
        </p>
      </div>

      <h2 class="footer-title">P.S. Hvala Vam što ste dio naše slatke avanture!</h2>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fbf5e5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.main-title {
  font-size: 36px;
  color: #2a231f;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffe9c6;
  border-radius: 8px;
}

.content-block {
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  color: #444;
  text-align: center;
  margin-bottom: 10px;
  border-bottom: 2px solid #ffe9c6;
  display: inline-block;
  padding: 5px 15px;
}

p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  text-align: justify;
  margin: 0 10px;
}

.footer-title {
  font-size: 20px;
  color: #2a231f;
  text-align: center;
  margin-top: 30px;
  padding: 10px;
  background-color: #ffe9c6;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .main-title {
    font-size: 28px;
  }

  .section-title {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }
}
</style>
