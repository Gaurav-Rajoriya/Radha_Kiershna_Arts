
export const site = {
  name: "Radha Kirshna Art's",
  tagline: "Sacred Paintings & Handcrafted Bengal Art",
  artistTitle: "Traditional Painter & Devotional Relief Artist",
  location: "Gotai, P.O - samantakhanda, District - Hooghly, State - West Bengal, PIN - 722141",
  phone: "+91 XXXXXX 5613",

  logoUrl:
    import.meta.env.VITE_LOGO_URL ||
    'https://export4tradeindia.com/vendor/company_logo/company_310f131a-b67f-4791-a350-c96d0944b8f1_6afeea64d5e07.jpg',

  // Only for displaying on the website
  email:
    import.meta.env.VITE_CONTACT_EMAIL ||
    'chxxxxxxxanika@gmail.com',
}

export const nav = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/collection', 'Collection'],
  ['/exhibition', 'Exhibition'],
  ['/process', 'Process'],
  ['/contact', 'Contact'],
] as const
