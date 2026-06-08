import { db} from "./db.js";
import { vitrine} from "./vitrine.js";
import { carrinho } from "./carrinho.js";
import {carregarCompras} from "./compras.js";
import { usuarioLogado } from "./login.js";
import { carregarDetalhesDoProduto} from "./produto.js";
import {Categoria} from "./categoria.js";
import { carregarPesquisa } from "./busca.js";
const primeirosProdutos = [
  // === FERRAMENTAS E CONSTRUÇÃO (01-11) ===
  { tipo: "produto", titulo: "Furadeira de Impacto", categoria: "ferramentas e construção", descricao: "Furadeira profissional 700W potente.", imagem: "https://http2.mlstatic.com/D_NQ_NP_935921-MLA109274425987_032026-O.webp", preco: 289.90, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Martelo", categoria: "ferramentas e construção", descricao: "Cabo emborrachado e aço polido.", imagem: "https://cdn.awsli.com.br/600x700/1079/1079314/produto/208585664d5b3d12143.jpg", preco: 45.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Jogo de Chaves", categoria: "ferramentas e construção", descricao: "Kit com fenda e philips imantadas.", imagem: "https://m.media-amazon.com/images/I/61RPv-XzI5L.jpg", preco: 59.90, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Trena 5 metros", categoria: "ferramentas e construção", descricao: "Trena com trava de segurança.", imagem: "https://cdn.awsli.com.br/2500x2500/1054/1054957/produto/109731962/3857af99fe.jpg", preco: 19.90, estoque: 50, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Nível a Laser", categoria: "ferramentas e construção", descricao: "Linha cruzada verde alta visibilidade.", imagem: "https://m.media-amazon.com/images/I/71iNBTm3UNL._AC_SY300_SX300_QL70_ML2_.jpg", preco: 185.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Alicate Universal", categoria: "ferramentas e construção", descricao: "Cabo isolado para eletricista.", imagem: "https://m.media-amazon.com/images/I/51MGPcAcbUL._AC_UF894,1000_QL80_.jpg", preco: 35.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Serra Circular", categoria: "ferramentas e construção", descricao: "Corte preciso em chapas de madeira.", imagem: "https://down-br.img.susercontent.com/file/sg-11134201-8260n-mlc3r9fvlxjj91@resize_w450_nl.webp", preco: 420.00, estoque: 8, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Caixa Ferramentas", categoria: "ferramentas e construção", descricao: "Plástico reforçado com bandeja.", imagem: "https://m.media-amazon.com/images/I/715SN1iGplL._AC_SY300_SX300_QL70_ML2_.jpg", preco: 89.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Escada Alumínio", categoria: "ferramentas e construção", descricao: "Leve e resistente 5 degraus.", imagem: "https://m.media-amazon.com/images/I/41e332TcktL._AC_SY300_SX300_QL70_ML2_.jpg", preco: 159.00, estoque: 7, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Lanterna Tática", categoria: "ferramentas e construção", descricao: "LED potente com bateria recarregável.", imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8hs5l9kmne9c9_tn", preco: 68.00, estoque: 35, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Esmerilhadeira", categoria: "ferramentas e construção", descricao: "Para corte em metais e pedras.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACJswkk2taDSVN8k0KxF-ezU5fBpYVELwBg&s", preco: 310.00, estoque: 5, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === ELETRÔNICOS (12-22) ===
  { tipo: "produto", titulo: "Smartphone Motorola 5G", categoria: "eletrônicos", descricao: "Tela OLED e câmera tripla 48MP.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzhnE1OCrq4XQiWIuiO5SF_jCMgNER6GZ_Pw&s", preco: 4500.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Smartwatch Sport", categoria: "eletrônicos", descricao: "Monitor cardíaco e GPS.", imagem: "https://m.media-amazon.com/images/I/51+4V98kzgL._AC_SX342_SY445_QL70_ML2_.jpg", preco: 350.00, estoque: 22, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Fone JBL Bluetooth", categoria: "eletrônicos", descricao: "Cancelamento de ruído ativo.", imagem: "https://m.media-amazon.com/images/I/51olNZRjn+L._AC_SY300_SX300_QL70_ML2_.jpg", preco: 890.00, estoque: 14, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Caixa de Som JBL", categoria: "eletrônicos", descricao: "À prova d'água Bluetooth 5.0.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5eLwA3F3t9cKTtGrV50QDeHOlVPJ3SaNV4A&s", preco: 240.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Tablet 11 Polegadas xiaomi", categoria: "eletrônicos", descricao: "Com caneta para desenho inclusa.", imagem: "https://m.media-amazon.com/images/I/61r18GIzlcL._AC_UF1000,1000_QL80_.jpg", preco: 2100.00, estoque: 8, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Câmera Mirrorless", categoria: "eletrônicos", descricao: "Sensor Full Frame 4K.", imagem: "https://m.media-amazon.com/images/I/81XeVWWyUUL.jpg", preco: 5200.00, estoque: 3, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Projetor Cinema", categoria: "eletrônicos", descricao: "3500 lúmens Android TV.", imagem: "https://m.media-amazon.com/images/I/61-ICVHsrWL._AC_SY300_SX300_QL70_ML2_.jpg", preco: 1200.00, estoque: 5, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Power Bank", categoria: "eletrônicos", descricao: "20.000mAh carregamento rápido.", imagem: "https://m.media-amazon.com/images/I/71IH0XouK1L._AC_UF894,1000_QL80_.jpg", preco: 155.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Smart TV 55", categoria: "eletrônicos", descricao: "4K UHD com comando de voz.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPcYjOZoie3EHmJNH5cxLrN8KNNtgvKBuwww&s", preco: 2800.00, estoque: 6, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Kildle Amazon", categoria: "eletrônicos", descricao: "Luz ajustável para leitura noturna.", imagem: "https://m.media-amazon.com/images/I/718jJRdvDsL._AC_UF1000,1000_QL80_.jpg", preco: 499.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Drone Câmera", categoria: "eletrônicos", descricao: "GPS e retorno automático.", imagem: "https://http2.mlstatic.com/D_NQ_NP_968325-MLA103344804227_012026-O.webp", preco: 1850.00, estoque: 4, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === BRINQUEDOS (23-33) ===
  { tipo: "produto", titulo: "Blocos de Montar", categoria: "brinquedos", descricao: "500 peças coloridas.", imagem: "https://m.media-amazon.com/images/I/81jtm8QaXNL._AC_SY300_SX300_QL70_ML2_.jpg", preco: 145.00, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Urso Pelúcia", categoria: "brinquedos", descricao: "Gigante e antialérgico.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC7gwocnYJWIMfagqnrvx998dvAaCQ_RjdNg&s", preco: 95.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Carro Controle", categoria: "brinquedos", descricao: "Off-road 4x4 veloz.", imagem: "https://http2.mlstatic.com/D_Q_NP_852576-MLA107003962335_022026-F.webp", preco: 168.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Boneca Fashion", categoria: "brinquedos", descricao: "Com roupas e acessórios.", imagem: "https://m.media-amazon.com/images/I/616sfd3nuOL.jpg", preco: 79.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Quebra-Cabeça", categoria: "brinquedos", descricao: "1000 peças paisagem.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNBvNHTn_l7xwtbYMVTgdEhuc2Yr7mBvBtsA&s", preco: 48.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Cozinha Infantil", categoria: "brinquedos", descricao: "Mini fogão com som e luz.", imagem: "https://lojasmel1.vtexassets.com/arquivos/ids/233955/Cozinha_Infantil_Plastico_Faz_de_Conta_Rosa_com_16_Pecas_790347_-_Pais_e_Filhos_0_776.jpg?v=638670196819800000", preco: 130.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Pista Autorama", categoria: "brinquedos", descricao: "Looping duplo com 2 carros.", imagem: "https://http2.mlstatic.com/D_NQ_NP_987534-MLB46247338219_062021-O.webp", preco: 210.00, estoque: 8, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Robô Interativo", categoria: "brinquedos", descricao: "Dança e responde comandos.", imagem: "https://rihappy.vtexassets.com/arquivos/ids/9042290-800-auto?v=638939319684800000&width=800&height=auto&aspect=true", preco: 195.00, estoque: 6, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Barraca Toca", categoria: "brinquedos", descricao: "Com 50 bolinhas inclusas.", imagem: "https://http2.mlstatic.com/D_Q_NP_812467-MLB108264767499_032026-F.webp", preco: 110.00, estoque: 18, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Trem Madeira", categoria: "brinquedos", descricao: "Locomotiva com imã.", imagem: "https://img.elo7.com.br/product/600x380/4F7BD79/escavadeira-de-madeira-escavadeira-de-madeira.jpg", preco: 65.00, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Lousa Mágica", categoria: "brinquedos", descricao: "Tablet LCD para desenhar.", imagem: "https://http2.mlstatic.com/D_NQ_NP_822348-MLA91982161305_092025-O.webp", preco: 35.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === ESPORTE E FITNESS (34-44) ===
  { tipo: "produto", titulo: "Tapete Yoga", categoria: "esporte e fitness", descricao: "Antiderrapante TPE 6mm.", imagem: "https://m.media-amazon.com/images/I/61L4yTpKRNL.jpg", preco: 85.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Kit Halteres", categoria: "esporte e fitness", descricao: "Par de 5kg neoprene.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAMsk6MyAxd3uwRyKkLxAadpmSDVVwqPgthg&s", preco: 120.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Bicicleta Aro 29", categoria: "esporte e fitness", descricao: "MTB 21 marchas freio disco.", imagem: "https://www.virtualbike.com.br/media/catalog/product/cache/707e5c87c6f2c8b52e27d02debab1ba4/g/t/gtsprom5-intense-vermelho-24v.webp", preco: 1450.00, estoque: 5, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Bola Futebol", categoria: "esporte e fitness", descricao: "Tamanho oficial costura forte.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTI3rATDWGYhWFl2n_XUEMiy8SNIPQnfjzdA&s", preco: 89.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Corda de Pular", categoria: "esporte e fitness", descricao: "Aço com rolamento speed.", imagem: "https://m.media-amazon.com/images/I/71yYmWPHSqL._AC_SY300_SX300_QL70_ML2_.jpg", preco: 28.00, estoque: 50, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Tênis Running Nike", categoria: "esporte e fitness", descricao: "Amortecimento gel alto impacto.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8A7ZE9FiGx_U337L9VL0xLVEDXMiWa-VUCA&s", preco: 340.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Garrafa Térmica", categoria: "esporte e fitness", descricao: "Inox 1L gelado 24h.", imagem: "https://m.media-amazon.com/images/I/51d113F-cPL._AC_SY300_SX300_QL70_ML2_.jpg", preco: 78.00, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Elásticos Treino", categoria: "esporte e fitness", descricao: "5 níveis de resistência.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKL6sCEvrpP4cSR_57he-KEkKd5eHMqEiFQ&s", preco: 45.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Rolo Abdominal", categoria: "esporte e fitness", descricao: "Duplo estável com tapete.", imagem: "https://http2.mlstatic.com/D_Q_NP_914602-MLB110165745843_042026-F.webp", preco: 35.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Luvas de Boxe", categoria: "esporte e fitness", descricao: "Couro sintético 12oz.", imagem: "https://cdn.awsli.com.br/1709/1709525/produto/76989298/maximum_prd_b-363-px3s1rixmo.jpg", preco: 145.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Banco Musculação", categoria: "esporte e fitness", descricao: "Regulável 5 posições.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUeROFhWFrLbeEyt2KWyeQg_p3pUUPjm9_KA&s", preco: 390.00, estoque: 4, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === JOGOS (45-55) ===
  { tipo: "produto", titulo: "Console Xbox One Series X", categoria: "jogos", descricao: "Suporte 4K e SSD 1TB.", imagem: "https://cms-assets.xboxservices.com/assets/bc/40/bc40fdf3-85a6-4c36-af92-dca2d36fc7e5.png?n=642227_Hero-Gallery-0_A1_857x676.png", preco: 4200.00, estoque: 5, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Controle PS5", categoria: "jogos", descricao: "Resposta tátil precisa.", imagem: "https://cdn.awsli.com.br/600x1000/53/53761/produto/306708634/01-eyz1asugcb.jpg", preco: 380.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Headset Gamer", categoria: "jogos", descricao: "Som surround 7.1.", imagem: "https://img.kalunga.com.br/fotosdeprodutos/670217z.jpg", preco: 290.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Cadeira Gamer", categoria: "jogos", descricao: "Ergonômica com almofadas.", imagem: "https://img.kalunga.com.br/fotosdeprodutos/315744z.jpg", preco: 850.00, estoque: 8, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Teclado Mecânico", categoria: "jogos", descricao: "RGB Switches Blue.", imagem: "https://cdn.sistemawbuy.com.br/arquivos/a4456ac015133534fb513a1cb95ceb43/produtos/67008d67b40ea/tec-tom-3-6700941d8ca52.jpg", preco: 245.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Mouse Gamer", categoria: "jogos", descricao: "12k DPI personalizável.", imagem: "https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/oficinadosbits/media/uploads/produtos/foto/ejiiumos/file.png", preco: 150.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Monitor 144Hz", categoria: "jogos", descricao: "24 polegadas 1ms.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lj0rei-W5YgmpuD4oa85_hhx7v0dPigieA&s", preco: 1100.00, estoque: 6, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Óculos VR", categoria: "jogos", descricao: "Sistema VR independente.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgQn83VUhnSRhQzJ-x_kHDj93oxTrjQ7d7Zg&s", preco: 2800.00, estoque: 3, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Mousepad XXL", categoria: "jogos", descricao: "90x40cm borda costurada.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxcQtWsOV6vOjxHv43alQ85NAPKCObQwjZHQ&s", preco: 65.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Volante Racing Logitech", categoria: "jogos", descricao: "Force Feedback realístico.", imagem: "https://m.media-amazon.com/images/I/71FpVBlTvyL._AC_SX342_SY445_QL70_ML2_.jpg", preco: 1650.00, estoque: 4, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Cartão PSN 250", categoria: "jogos", descricao: "Crédito loja digital.", imagem: "https://cdn.awsli.com.br/2500x2500/0/810/produto/30663866/21ecdc3aa5.jpg", preco: 100.00, estoque: 100, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === INFORMATICA (56-66) ===
  { tipo: "produto", titulo: "Notebook i7 HP", categoria: "informatica", descricao: "16GB RAM SSD 512GB.", imagem: "https://http2.mlstatic.com/D_NQ_NP_618141-MLU76378990682_052024-F.jpg", preco: 4800.00, estoque: 5, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Roteador WiFi 6", categoria: "informatica", descricao: "Dual Band Gigabit.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmTzUup-B8OoKxrgmN9RQ8tRDTmou9PdcpFA&s", preco: 450.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "SSD NVMe 2TB", categoria: "informatica", descricao: "Leitura até 3500MB/s.", imagem: "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/z/mz-v9p2t0.jpg", preco: 420.00, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Webcam Full HD", categoria: "informatica", descricao: "1080p foco automático.", imagem: "https://m.media-amazon.com/images/I/61-K2lXmHQL.jpg", preco: 180.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Impressora Tanque", categoria: "informatica", descricao: "Multifuncional WiFi.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwQH7fAIGFPcp4p3eXssAbARQ-k3Eoe3gESQ&s", preco: 890.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Memória RAM 8GB", categoria: "informatica", descricao: "DDR4 3200MHz.", imagem: "https://www.kingstonstore.com.br/cdn/shop/files/KFBL2_0ccdb3d2-4470-4064-b2a7-d9c1ad7c96c3.jpg?v=1733170667&width=1946", preco: 210.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Gabinete Gamer", categoria: "informatica", descricao: "Vidro temperado Mid Tower.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPXgy3JOqdjgHW6Vu685tL1ORHr1FKpoaTig&s", preco: 380.00, estoque: 8, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Hub USB-C", categoria: "informatica", descricao: "7 em 1 HDMI e SD.", imagem: "https://http2.mlstatic.com/D_NQ_NP_882992-MLA100994003372_122025-O.webp", preco: 110.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Suporte Monitor", categoria: "informatica", descricao: "Braço pistão a gás.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZm8itNGV4kUQ1FX3kIoMo16n2xaTRwqKoJA&s", preco: 155.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Adaptador WiFi", categoria: "informatica", descricao: "USB Dual Band antena.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIO-azrn077uv5vW17GRbiVWzDbrB-KKZbzQ&s", preco: 45.00, estoque: 50, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Fonte 600W", categoria: "informatica", descricao: "80 Plus Bronze estável.", imagem: "https://http2.mlstatic.com/D_NQ_NP_920489-MLA99459113830_112025-O.webp", preco: 320.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === PETSHOP (67-77) ===
  { tipo: "produto", titulo: "Ração Premium", categoria: "petshop", descricao: "Saco 15kg Cães Adultos.", imagem: "https://cdn.awsli.com.br/600x450/1226/1226108/produto/173188118/e42cb94c9c.jpg", preco: 195.00, estoque: 50, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Torre Gatos", categoria: "petshop", descricao: "Arranhador três níveis.", imagem: "https://m.media-amazon.com/images/I/713nMjlZePL.jpg", preco: 210.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Cama Pet Nuvem", categoria: "petshop", descricao: "Lavável e ultra macia.", imagem: "https://images.petz.com.br/fotos/1638384572772.jpg", preco: 115.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Guia Retrátil", categoria: "petshop", descricao: "5 metros até 25kg.", imagem: "https://cdn.leroymerlin.com.br/products/guia_de_cachorro_rosa_retratil_3_metros_casambiente_1570864026_33dd_600x600.jpg", preco: 55.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Caixa Transporte", categoria: "petshop", descricao: "Viagens aéreas segura.", imagem: "https://http2.mlstatic.com/D_Q_NP_614830-MLB100082046029_122025-F.webp", preco: 165.00, estoque: 8, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Mordedor Pneu", categoria: "petshop", descricao: "Borracha alta durabilidade.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkOwatIyUonQhgn085Pf1dzXpnmFMFKF2Og&s", preco: 25.00, estoque: 100, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Shampoo Pet", categoria: "petshop", descricao: "Hipoalergênico pele sensível.", imagem: "https://cdn.awsli.com.br/2500x2500/806/806328/produto/210330142/zenpet-granado-pet-shampoo-azul-500-s3-yc4eg0t4zp.jpg", preco: 32.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Areia de Gato", categoria: "petshop", descricao: "Biodegradável anti-odor.", imagem: "https://cdn.awsli.com.br/600x450/1226/1226108/produto/158227619/areia-higi-nica-pipicat-classic-para-gatos---4kg-0cuuhxph55.jpg", preco: 28.00, estoque: 60, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Petiscos Frango", categoria: "petshop", descricao: "Naturais desidratados.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3t5VhsconUBGxxSnNmowfbNbL1GV_vz3HGQ&s", preco: 12.90, estoque: 80, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Bebedouro Fonte", categoria: "petshop", descricao: "Água circulante 2 litros.", imagem: "https://m.media-amazon.com/images/I/71NE0pmMUrL.jpg", preco: 135.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Escova de Pelos", categoria: "petshop", descricao: "Removedora automática.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGa5Fz5MruZ6diP9v6Fb1ARPwJmLj-01ztew&s", preco: 38.00, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === ELETRODOMÉSTICOS (78-88) ===
  { tipo: "produto", titulo: "Air Fryer", categoria: "eletrodomésticos", descricao: "Fritadeira Digital 4L.", imagem: "https://t62533.vteximg.com.br/arquivos/ids/945404-1000-1000/160491-800-auto.jpg?v=638610709780400000", preco: 399.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Batedeira", categoria: "eletrodomésticos", descricao: "Planetária com 3 batedores.", imagem: "https://m.media-amazon.com/images/I/51z2gsSIjxL._AC_UF894,1000_QL80_.jpg", preco: 450.00, estoque: 7, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Liquidificador", categoria: "eletrodomésticos", descricao: "Jarra Tritan 2 litros.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZ_AcBjiXN7NGjz2Ne_JbokwFJV2Aw_ClGA&s", preco: 145.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Cafeteira Espresso", categoria: "eletrodomésticos", descricao: "Automática pó ou sachê.", imagem: "https://jcsbrasil.vteximg.com.br/arquivos/ids/215788-1000-1000/BVSTEM7200-0.jpg?v=639040050705770000", preco: 580.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Ferro de Passar", categoria: "eletrodomésticos", descricao: "Base cerâmica jato vapor.", imagem: "https://electrolux.vtexassets.com/arquivos/ids/211927/ferro-de-passar-a-vapor-e-a-seco-electrolux-efficient--esi10--_Frente.jpg?v=638872566180170000", preco: 95.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Geladeira Inox", categoria: "eletrodomésticos", descricao: "Frost Free 400 Litros.", imagem: "https://brastemp.vtexassets.com/arquivos/ids/262163/01-Brastemp_Geladeira_BRM54JK_Imagem_Frontal_1.jpg?v=638949348803330000", preco: 3200.00, estoque: 4, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Micro-ondas", categoria: "eletrodomésticos", descricao: "30 Litros painel digital.", imagem: "https://moveislinhares.vteximg.com.br/arquivos/ids/231613-1000-1000/115456-1.jpg?v=638876834558770000", preco: 550.00, estoque: 6, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Robô Aspirador", categoria: "eletrodomésticos", descricao: "Varre, aspira e passa pano.", imagem: "https://m.media-amazon.com/images/I/71+WCj8tfZL.jpg", preco: 1100.00, estoque: 9, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Chaleira Elétrica", categoria: "eletrodomésticos", descricao: "Inox 1.7L ferve rápido.", imagem: "https://jcsbrasil.vteximg.com.br/arquivos/ids/208431-1000-1000/8.OCEL920.jpg?v=639039978798530000", preco: 110.00, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Torradeira", categoria: "eletrodomésticos", descricao: "7 níveis para 2 fatias.", imagem: "https://precolandia.vtexassets.com/arquivos/ids/232019-800-450?v=638409283702770000&width=800&height=450&aspect=true", preco: 135.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Ventilador Turbo", categoria: "eletrodomésticos", descricao: "Coluna 40cm 6 pás.", imagem: "https://io.convertiez.com.br/m/lojasedmil/shop/products/images/1539/medium/ventilador-de-mesa-2-em-1-turbo-force-vf42-arno-40cm-com-6-pas-127v-preto_12065.jpg", preco: 180.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  // === MODA (89-100) ===
  { tipo: "produto", titulo: "Jaqueta Bomber", categoria: "moda", descricao: "Corta-vento premium forrada.", imagem: "https://acdn-us.mitiendanube.com/stores/002/822/533/products/1_preta-0755e2520fcde918b516780560897023-1024-1024.webp", preco: 189.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Vestido Floral", categoria: "moda", descricao: "Viscose leve midi.", imagem: "https://images.tcdn.com.br/img/img_prod/713055/vestido_floral_camponesa_preto_1427_3_e67940444a4a809a8399d8ecb9959963.jpg", preco: 120.00, estoque: 15, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Camiseta Básica", categoria: "moda", descricao: "Kit 3 Algodão Penteado.", imagem: "https://images.tcdn.com.br/img/img_prod/947450/camiseta_basic_color_preto_1021_1_4a739bf8de5955b412d3e004aa92dd20.jpg", preco: 59.90, estoque: 100, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Calça Jeans Feminina", categoria: "moda", descricao: "Skinny com elastano.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuk3V1SP13g1HkUoc6UTx15P5c2l7AIGiZ5Q&s", preco: 95.00, estoque: 30, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Tênis Casual Feminino", categoria: "moda", descricao: "Couro solado costurado.", imagem: "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhg9py6wge812b", preco: 150.00, estoque: 20, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Bolsa Ombro", categoria: "moda", descricao: "Feminina alça regulável.", imagem: "https://down-br.img.susercontent.com/file/sg-11134201-81ztr-mirfujo9siyqd5@resize_w450_nl.webp", preco: 180.00, estoque: 8, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Relógio Analógico Pulso", categoria: "moda", descricao: "Aço inox prova d'água.", imagem: "https://fluiartejoias.vteximg.com.br/arquivos/ids/173722-550-550/Relogio-Feminino-Lince-Urban-Dourado-Com-Zirconias-Coloridas.jpg?v=638173588554230000", preco: 250.00, estoque: 12, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Óculos de Sol", categoria: "moda", descricao: "Polarizado UV400.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChNS794i28Ij25IaTf9cbPZ5jvQBHO2X9cw&s", preco: 85.00, estoque: 40, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Boné Aba Curva", categoria: "moda", descricao: "Tecido respirável fivela.", imagem: "https://lojaviego.com.br/cdn/shop/files/BoneMasculinoAbaCurvaEdiko_5.webp?v=1706549781", preco: 45.00, estoque: 50, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Moletom Capuz", categoria: "moda", descricao: "Unissex flanelado macio.", imagem: "https://consuladodorock.com.br/cdn/shop/files/LISAS-Moletom-Fechado-preto.webp?v=1740445169", preco: 110.00, estoque: 14, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Cinto de Couro", categoria: "moda", descricao: "Legítimo fivela escovada.", imagem: "https://lojaviego.com.br/cdn/shop/files/CintodeCouroGenuinoMasculinoRustico_3_800x.webp?v=1713979610", preco: 42.00, estoque: 25, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },
  { tipo: "produto", titulo: "Saia Plissada", categoria: "moda", descricao: "Midi caimento fluido.", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT49qT275DbXMW3ljE2jzDwSLF8y0S8HKN4pA&s", preco: 78.00, estoque: 10, classificacao: 0, quantidadeAvaliacao: 0, totalAvaliacao: 0 },

  {
    tipo: "administrador",
    nome: "adm",
    usuario: "adm33233",
    senha: "adm33233",
    cpf: "000.000.000.00",
    carrinho: [],
    compras: [],
  }
];
await inicializarSistema();
//limparBanco();
async function produtosIniciais() {

    const info = await db.allDocs();

    if (info.total_rows == 0) {

        try {
            await db.bulkDocs(primeirosProdutos)
        } catch (error) {
            console.log("Erro ao iniciar produtos!", error);
        }
    }

}

async function limparBanco() {
    try {
        localStorage.removeItem('produtosPendentes');
        localStorage.removeItem('usuarioID');
        await db.destroy();
        console.log("Banco de dados deletado com sucesso!");
    } catch {
        console.error("Erro ao limpar o banco:");
    }
}

async function inicializarSistema() {

    try {
        console.log("INICIANDO");
        await produtosIniciais();
        const vitrineContainer = document.getElementById('vitrine');
        const produtoContainer = document.getElementById('produto');
        const categoriaContainer = document.getElementById('categoria');
        const carrinhoContainer = document.getElementById('carrinho');
        const buscaContainer = document.getElementById('busca');
        const comprasContainer = document.getElementById('compras');
        const resumo = await db.allDocs();
        const listaParaConferir = resumo.rows.map(item => {
            return {
                id_no_banco: item.id,
                tipo_do_id: typeof item.id,
                usuario: item.usuario,
                cpf: item.cpf


            };
        });

        if (localStorage.getItem('isLogged') === 'true') {
            console.log("usuario logado!");
            const idAtual = localStorage.getItem('usuarioID');
            console.log("Sistema liberado para o usuário:", idAtual);
            await usuarioLogado(idAtual);

        }




        console.log("RELATÓRIO DE ESTOQUE");
        console.table(listaParaConferir);
        if (vitrineContainer) {
            
            await vitrine();
        }
        else if (produtoContainer) {
            
            await carregarDetalhesDoProduto();
        }

        else if (categoriaContainer) {
            
            await Categoria();
        }
        else if (carrinhoContainer) {
            
            await carrinho();

        }
        else if (buscaContainer) 
        {
            await carregarPesquisa();    
        }
        else if(comprasContainer)
        {
            console.log("compras");
            await carregarCompras();
        }
        else {
            console.log('nenhum');
        }


    } catch (error) {
            console.log("Erro no fluxo!", error);
        }
} 




