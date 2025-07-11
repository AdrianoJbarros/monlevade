# WebGIS - Sistema de Informação Geográfica

Um sistema WebGIS completo desenvolvido com Leaflet que permite visualizar dados geográficos com múltiplas camadas de mapa.

## 🗺️ Funcionalidades

### Mapas Base
- **Google Street Maps**: Mapa de ruas padrão
- **Google Satellite**: Imagens de satélite
- **Google Terrain**: Mapa topográfico com relevo

### Camadas de Dados
- **Imóveis**: Dados de propriedades em formato GeoJSON
- **Monlevade**: Dados geográficos da região de Monlevade

### Ferramentas
- ✅ Troca de mapas base
- ✅ Controle de visibilidade das camadas
- ✅ Popups informativos
- ✅ Centralização automática
- ✅ Modo tela cheia
- ✅ Escala do mapa
- ✅ Coordenadas em tempo real
- ✅ Busca de localização
- ✅ Atalhos de teclado

## 🚀 Como Usar

### 1. Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Navegue para o diretório
cd GISWEB

# Abra o arquivo index.html em um servidor web
```

### 2. Executando Localmente
Para evitar problemas de CORS, execute em um servidor local:

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (se tiver instalado)
npx http-server

# Usando PHP
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

### 3. Controles do Mapa

#### Mapas Base
- Clique nos botões no painel direito para trocar entre:
  - **Street Maps**: Mapa de ruas
  - **Satélite**: Imagens aéreas
  - **Terreno**: Mapa topográfico

#### Camadas de Dados
- Use as caixas de seleção para mostrar/ocultar:
  - **Imóveis**: Dados de propriedades
  - **Monlevade**: Dados da região

#### Ferramentas
- **Centralizar**: Volta para a vista inicial
- **Tela Cheia**: Alterna modo tela cheia

### 4. Atalhos de Teclado
- `H`: Centralizar mapa
- `F`: Alternar tela cheia
- `S`: Buscar localização

## 📁 Estrutura do Projeto

```
GISWEB/
├── index.html          # Interface principal
├── script.js           # Lógica do WebGIS
├── README.md          # Este arquivo
└── data/              # Dados geográficos
    ├── imoveis.geojson
    ├── Monlevade.geojson
    ├── imoveis.qmd
    └── Monlevade.qmd
```

## 🛠️ Tecnologias Utilizadas

- **Leaflet.js**: Biblioteca de mapas interativos
- **Bootstrap 5**: Framework CSS para interface
- **Font Awesome**: Ícones
- **Google Maps API**: Mapas base (via tiles)

## 📊 Dados Suportados

O sistema suporta arquivos GeoJSON com as seguintes características:

### Imóveis (imoveis.geojson)
- Propriedades com informações detalhadas
- Estilo: Polígonos vermelhos
- Popups com informações das propriedades

### Monlevade (Monlevade.geojson)
- Dados geográficos da região
- Estilo: Polígonos azuis
- Popups com informações da área

## 🔧 Personalização

### Adicionando Novos Mapas Base
```javascript
// Em script.js, adicione ao objeto baseMaps:
const baseMaps = {
    // ... mapas existentes
    novoMapa: L.tileLayer('URL_DO_TILE', {
        maxZoom: 20,
        attribution: '© Fonte do Mapa'
    })
};
```

### Adicionando Novas Camadas
```javascript
// Crie uma nova camada GeoJSON
const novaCamada = L.geoJSON(data, {
    style: function(feature) {
        return {
            fillColor: '#cor',
            weight: 2,
            opacity: 1,
            color: '#cor_borda',
            fillOpacity: 0.3
        };
    }
});
```

## 🌐 Compatibilidade

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Dispositivos móveis

## 📝 Notas Importantes

1. **Servidor Local**: O sistema deve ser executado em um servidor web local devido às políticas de CORS
2. **Dados GeoJSON**: Os arquivos devem estar no formato GeoJSON válido
3. **Conectividade**: Requer conexão com internet para carregar os mapas base
4. **Performance**: Para grandes volumes de dados, considere usar clustering ou simplificação

## 🐛 Solução de Problemas

### Mapa não carrega
- Verifique se está executando em um servidor web
- Confirme a conexão com internet
- Verifique o console do navegador para erros

### Dados não aparecem
- Verifique se os arquivos GeoJSON estão na pasta `data/`
- Confirme se os arquivos têm formato válido
- Verifique o console para erros de carregamento

### Mapas base não funcionam
- Verifique a conectividade com internet
- Confirme se as URLs dos tiles estão acessíveis

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte o console do navegador para erros
3. Verifique se todos os arquivos estão presentes

---

**Desenvolvido com ❤️ usando Leaflet.js** 