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

export const produtos = [
  {
    name: 'Camisa Manga curta',
    colors: [
      {
        name: 'azul',
        images: ['https://static.hering.com.br//sys_master/images/ha7/h42/9569155612702.jpg?name=H2GD-NPZEJ-D1'],
        sizes: [
          {
            name: 'P',
            price: 120.2,
          },
          {
            name: 'M',
            price: 120.2,
          },
          {
            name: 'G',
            price: 120.2,
          },
        ],
      },
      {
        name: 'amarelo',
        images: ['https://img.lojasrenner.com.br/item/547201877/medium/5.jpg'],
        sizes: [
          {
            name: 'P',
            price: 120.2,
          },
          {
            name: 'M',
            price: 120.2,
          },
          {
            name: 'G',
            price: 120.2,
          },
        ],
      },
      {
        name: 'vermelho',
        images: ['https://img.lojasrenner.com.br/item/546523170/small/5.jpg'],
        sizes: [
          {
            name: 'P',
            price: 120.2,
          },
          {
            name: 'M',
            price: 120.2,
          },
          {
            name: 'G',
            price: 120.2,
          },
        ],
      },
    ],
  },
  {
    name: 'Camisa AAAAA',
    colors: [
      {
        name: 'roxa',
        images: ['https://cdn.shopify.com/s/files/1/0087/2405/4073/products/Camiseta_Roxa_-_MASC_394x.jpg?v=1529006290'],
        sizes: [
          {
            name: 'P',
            price: 110.5,
          },
          {
            name: 'M',
            price: 110.5,
          },
        ],
      },
      {
        name: 'lilas',
        images: ['https://dafitistatic-a.akamaihd.net/p/Tip-Top-Camiseta-Manga-Curta-Tip-Top-Lisa-Infantil-Roxa.-9987-5207032-1-zoom.jpg'],
        sizes: [
          {
            name: 'P',
            price: 125.90,
          },
          {
            name: 'M',
            price: 125.90,
          },
        ],
      },
    ],
  }
]

export { markers };
