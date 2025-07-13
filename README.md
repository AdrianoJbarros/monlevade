# 🗺️ WebGIS - Sistema de Informação Geográfica

Sistema WebGIS desenvolvido com **Leaflet** para visualização de dados geográficos de Monlevade, incluindo imóveis e informações municipais.

## 🌟 Características

- **Mapas interativos** com múltiplas camadas
- **Dados GeoJSON** de ruas, limites municipais e nascentes
- **Múltiplos mapas base** (Street Maps, Satélite, Terreno)
- **Interface responsiva** e moderna
- **Ferramentas de navegação** e busca
- **Sistema de diagnóstico** integrado
- **Legendas aprimoradas** com estatísticas em tempo real
- **Popups informativos** com design moderno

## 🚀 Como Executar

### Pré-requisitos
- Python 3.x ou Node.js
- Navegador web moderno

### Opção 1: Python (Recomendado)
```bash
python -m http.server 8000
```

### Opção 2: Node.js
```bash
npx http-server -p 8000
```

### Opção 3: Arquivo Batch (Windows)
Clique duas vezes em `iniciar-servidor-node.bat`

## 📁 Estrutura do Projeto

```
GISWEB/
├── index.html              # Página principal do WebGIS
├── script.js               # Código JavaScript principal
├── package.json            # Configurações do projeto
├── data/
│   ├── RUAS.geojson        # Dados da malha viária
│   ├── Monlevade.geojson   # Limites municipais
│   └── Nascentes.geojson   # Dados de nascentes
├── diagnostico.html        # Página de diagnóstico
├── teste-mapa-simples.html # Teste simplificado
├── abrir-pagina.html       # Página de ajuda
└── README.md               # Este arquivo
```

## 🌐 Páginas Disponíveis

### Página Principal
- **URL:** http://localhost:8000
- **Descrição:** WebGIS completo com todas as funcionalidades

### Teste de Camadas
- **URL:** http://localhost:8000/teste-camadas.html
- **Descrição:** Verificação do status das camadas e sistema

### Página de Diagnóstico
- **URL:** http://localhost:8000/diagnostico.html
- **Descrição:** Testes de conectividade e componentes

### Teste de Mapa Simples
- **URL:** http://localhost:8000/teste-mapa-simples.html
- **Descrição:** Testes passo a passo dos componentes

### Página de Ajuda
- **URL:** http://localhost:8000/abrir-pagina.html
- **Descrição:** Instruções e links úteis

## 🗺️ Funcionalidades

### Mapas Base
- **Street Maps:** OpenStreetMap
- **Satélite:** Esri World Imagery
- **Terreno:** OpenTopoMap

### Camadas de Dados
- **Ruas:** Dados georreferenciados da malha viária
- **Monlevade:** Limites municipais
- **Nascentes:** Pontos de nascentes com informações de qualidade e vazão

### Ferramentas
- **Navegação:** Zoom, pan, centralizar
- **Busca:** Geocoding com Nominatim
- **Medição:** Distâncias e áreas
- **Exportação:** Dados em GeoJSON
- **Tela cheia:** Modo fullscreen
- **Recarregar:** Recarregamento de camadas (tecla R)

## 🔧 Tecnologias Utilizadas

- **Leaflet 1.9.4** - Biblioteca de mapas
- **Bootstrap 5.3.0** - Framework CSS
- **Font Awesome 6.4.0** - Ícones
- **OpenStreetMap** - Mapas base
- **GeoJSON** - Formato de dados geográficos

## 📊 Dados

### Ruas
- **Arquivo:** `data/RUAS.geojson`
- **Tipo:** Linhas georreferenciadas
- **Estilo:** Laranja com transparência

### Monlevade
- **Arquivo:** `data/Monlevade.geojson`
- **Tipo:** Polígonos de limites
- **Estilo:** Azul com transparência

### Nascentes
- **Arquivo:** `data/Nascentes.geojson`
- **Tipo:** Pontos georreferenciados
- **Estilo:** Verde com círculos

## 🛠️ Desenvolvimento

### Estrutura do Código
- **Modular:** Funções organizadas por funcionalidade
- **Tratamento de erros:** Try/catch em operações críticas
- **Logging:** Console logs para debug
- **Responsivo:** Interface adaptável

### Melhorias Implementadas
- ✅ Tratamento robusto de erros
- ✅ Verificações de inicialização
- ✅ Logging detalhado
- ✅ Mapas base gratuitos
- ✅ Sistema de diagnóstico
- ✅ Páginas de teste
- ✅ Carregamento otimizado de camadas grandes
- ✅ Sistema de verificação de status das camadas
- ✅ Recarregamento de camadas
- ✅ Interface de teste dedicada
- ✅ Legendas aprimoradas com estatísticas
- ✅ Popups informativos modernos
- ✅ Formatação de dados em português
- ✅ Atualização automática de estatísticas

## 🌍 Acesso Online

- **Repositório GitHub:** https://github.com/AdrianoJbarros/monlevade
- **Servidor Local:** http://localhost:8000

## 📝 Licença

MIT License - Projeto de código aberto

## 👨‍💻 Autor

**Adriano Barros**
- GitHub: [@AdrianoJbarros](https://github.com/AdrianoJbarros)
- Projeto: WebGIS Monlevade

---

## 🎯 Status do Projeto

✅ **Servidor:** Funcionando na porta 8000  
✅ **Mapas:** Carregando corretamente  
✅ **Dados:** GeoJSON sendo servidos  
✅ **Interface:** Responsiva e moderna  
✅ **Diagnóstico:** Sistema de testes integrado  

**Última atualização:** Julho 2025 