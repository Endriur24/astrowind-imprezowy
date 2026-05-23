import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'STRONA GŁÓWNA', href: getPermalink('/') },
    { text: 'PORTFOLIO', href: getPermalink('/portfolio') },
    { text: 'OFERTA', href: getPermalink('/oferta') },
    { text: 'BLOG', href: getPermalink('/blog') },
    { text: 'FAQ', href: getPermalink('/faq') },
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
        { text: 'Blog', href: getPermalink('/blog') },
        { text: 'FAQ', href: getPermalink('/faq') },
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
        { text: 'Fotografia ślubna last minute', href: getPermalink('/oferta/fotograf-slubny-last-minute') },
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
    { text: 'Polityka prywatności', href: getPermalink('/polityka-prywatnosci') },
  ],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/ImprezowyFotografpl/' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/imprezowyfotograf/' },
  ],
  footNote: `
    © 2025 ImprezowyFotograf.pl - Wszystkie prawa zastrzeżone
  `,
};
