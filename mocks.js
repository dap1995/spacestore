const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const markers = [
  {
    coordinate: {
      latitude: 45.524548,
      longitude: -122.6749817,
    },
    title: "Loja Daniel",
    description: "Encontre aqui diversos produtos de vestuario",
    image: Images[0],
    isOnline: false,
  },
  {
    coordinate: {
      latitude: 45.524698,
      longitude: -122.6655507,
    },
    title: "Loja do Junior",
    description: "Venha conhecer nossas lindas peças hitech",
    image: Images[1],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.5230786,
      longitude: -122.6701034,
    },
    title: "Loja do Luciano",
    description: "Encontre aqui lindas peças de roupas das mais variadas cores",
    image: Images[2],
    isOnline: false,
  },
  {
    coordinate: {
      latitude: 45.521016,
      longitude: -122.6561917,
    },
    title: "Loja da Karla",
    description: "Vista-se bem, Sinta-se bem",
    image: Images[3],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.521026,
      longitude: -122.6561117,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.821016,
      longitude: -122.1561917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.521016,
      longitude: -122.6561917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.521216,
      longitude: -122.6591917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.525016,
      longitude: -122.6661917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.521116,
      longitude: -122.6569917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.221016,
      longitude: -123.6561917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 44.521016,
      longitude: -122.9561917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.525016,
      longitude: -122.6261917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
  {
    coordinate: {
      latitude: 45.524016,
      longitude: -122.6560917,
    },
    title: "Loja de Teste",
    description: "Teste",
    image: Images[Math.floor(Math.random() * 4)],
    isOnline: true,
  },
];

export { markers };
