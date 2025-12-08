import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'STRONA GŁÓWNA', href: getPermalink('/') },
    { text: 'PORTFOLIO', href: getPermalink('/portfolio') },
    { text: 'OFERTA', href: getPermalink('/oferta') },
    { text: 'FAQ', href: getPermalink('/faq') },
    { text: 'ALBUMY', href: getPermalink('/albumy') },
    { text: 'KONTAKT', href: getPermalink('/kontakt') },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: 'Nawigacja',
      links: [
        { text: 'Strona główna', href: getPermalink('/') },
        { text: 'Portfolio', href: getPermalink('/portfolio') },
        { text: 'Oferta', href: getPermalink('/oferta') },
        { text: 'FAQ', href: getPermalink('/faq') },
        { text: 'Albumy', href: getPermalink('/albumy') },
        { text: 'Kontakt', href: getPermalink('/kontakt') },
      ],
    },
    {
      title: 'Usługi',
      links: [
        { text: 'Fotografia studniówkowa', href: getPermalink('/oferta/fotograf-na-studniowke') },
        { text: 'Imprezy firmowe', href: getPermalink('/oferta/fotograf-na-konferencje-krakow') },
        { text: 'Koncerty i eventy', href: getPermalink('/oferta/fotograf-klubowy-koncertowy-krakow') },
        { text: 'Urodziny i przyjęcia', href: getPermalink('/oferta/fotograf-na-urodziny-krakow') },
        { text: 'Fotografia ślubna', href: getPermalink('/oferta/fotograf-slubny-krakow') },
        { text: 'Zdjęcia live', href: getPermalink('/oferta') },
        { text: 'Wideoreportaż', href: getPermalink('/oferta') },
      ],
    },
    {
      title: 'Kontakt',
      links: [
        { text: 'Telefon: +48 885 195 599', href: 'tel:+48885195599' },
        { text: 'Email: info@imprezowyfotograf.pl', href: 'mailto:info@imprezowyfotograf.pl' },
        { text: 'Formularz kontaktowy', href: getPermalink('/kontakt') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Polityka prywatności', href: getPermalink('/privacy') },
    { text: 'Regulamin', href: getPermalink('/terms') },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
  ],
  footNote: `
    © 2024 ImprezowyFotograf.pl - Wszystkie prawa zastrzeżone
  `,
};
