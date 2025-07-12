// Configuração das camadas - FÁCIL DE MODIFICAR!
const camadasConfig = {
    imoveis: {
        arquivo: 'data/imoveis.geojson',
        nome: 'Imóveis',
        cor: '#ff4444',
        corBorda: '#ff0000',
        icone: 'fas fa-home',
        visivel: true
    },
    monlevade: {
        arquivo: 'data/Monlevade.geojson',
        nome: 'Monlevade',
        cor: '#4444ff',
        corBorda: '#0000ff',
        icone: 'fas fa-map',
        visivel: true
    },
    // ADICIONE NOVAS CAMADAS AQUI!
    escolas: {
        arquivo: 'data/escolas.geojson',
        nome: 'Escolas',
        cor: '#44ff44',
        corBorda: '#00ff00',
        icone: 'fas fa-graduation-cap',
        visivel: false
    },
    hospitais: {
        arquivo: 'data/hospitais.geojson',
        nome: 'Hospitais',
        cor: '#ff8844',
        corBorda: '#ff6600',
        icone: 'fas fa-hospital',
        visivel: false
    },
    parques: {
        arquivo: 'data/parques.geojson',
        nome: 'Parques',
        cor: '#44ff88',
        corBorda: '#00ff44',
        icone: 'fas fa-tree',
        visivel: false
    }
};

// Variáveis globais
let map;
let camadas = {};

// Configuração dos mapas base
const baseMaps = {
    streetmap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }),
    satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: '© Esri'
    }),
    terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: '© OpenTopoMap'
    })
};

// Função para criar camada GeoJSON
function criarCamada(config) {
    return L.geoJSON(null, {
        style: function(feature) {
            return {
                fillColor: config.cor,
                weight: 2,
                opacity: 1,
                color: config.corBorda,
                fillOpacity: 0.3
            };
        },
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                let popupContent = '<div style="max-width: 300px;">';
                popupContent += `<h6><i class="${config.icone}"></i> ${config.nome}</h6>`;
                
                for (let prop in feature.properties) {
                    if (feature.properties[prop] !== null && feature.properties[prop] !== undefined) {
                        popupContent += `<p><strong>${prop}:</strong> ${feature.properties[prop]}</p>`;
                    }
                }
                popupContent += '</div>';
                
                layer.bindPopup(popupContent);
            }
        }
    });
}

// Função para carregar uma camada específica
function carregarCamada(nomeCamada) {
    const config = camadasConfig[nomeCamada];
    if (!config) {
        console.error(`Configuração não encontrada para: ${nomeCamada}`);
        return;
    }

    console.log(`Carregando camada: ${config.nome}`);
    
    fetch(config.arquivo)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Dados de ${config.nome} carregados:`, data.features ? data.features.length : 0, 'features');
            
            if (!data || !data.features) {
                throw new Error(`Formato de dados inválido para ${config.nome}`);
            }
            
            // Criar camada
            camadas[nomeCamada] = criarCamada(config);
            camadas[nomeCamada].addData(data);
            
            // Adicionar ao mapa se estiver visível
            if (config.visivel) {
                camadas[nomeCamada].addTo(map);
            }
            
            // Atualizar controles
            atualizarControlesCamadas();
            
            showSuccess(`Camada ${config.nome} carregada com sucesso!`);
        })
        .catch(error => {
            console.error(`Erro ao carregar ${config.nome}:`, error);
            showError(`Erro ao carregar ${config.nome}: ${error.message}`);
        });
}

// Função para carregar todas as camadas
function carregarTodasCamadas() {
    console.log('Carregando todas as camadas...');
    
    Object.keys(camadasConfig).forEach(nomeCamada => {
        carregarCamada(nomeCamada);
    });
}

// Função para atualizar controles de camadas
function atualizarControlesCamadas() {
    const container = document.getElementById('camadas-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.keys(camadasConfig).forEach(nomeCamada => {
        const config = camadasConfig[nomeCamada];
        const camada = camadas[nomeCamada];
        
        const div = document.createElement('div');
        div.className = 'form-check';
        div.innerHTML = `
            <input class="form-check-input" type="checkbox" id="${nomeCamada}Layer" 
                   ${config.visivel ? 'checked' : ''} 
                   onchange="toggleCamada('${nomeCamada}', this.checked)">
            <label class="form-check-label" for="${nomeCamada}Layer">
                <i class="${config.icone}"></i> ${config.nome}
            </label>
        `;
        
        container.appendChild(div);
    });
}

// Função para alternar visibilidade da camada
function toggleCamada(nomeCamada, visivel) {
    const config = camadasConfig[nomeCamada];
    const camada = camadas[nomeCamada];
    
    if (!camada) {
        console.warn(`Camada ${nomeCamada} não foi carregada ainda`);
        return;
    }
    
    if (visivel) {
        camada.addTo(map);
        config.visivel = true;
    } else {
        map.removeLayer(camada);
        config.visivel = false;
    }
}

// Inicialização do mapa
function initMap() {
    try {
        console.log('Iniciando WebGIS com camadas dinâmicas...');
        
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            throw new Error('Elemento #map não encontrado');
        }

        map = L.map('map', {
            center: [-19.8236, -43.1736],
            zoom: 12,
            zoomControl: true,
            attributionControl: true
        });

        console.log('Mapa criado com sucesso');

        // Adicionar mapa base inicial
        baseMaps.streetmap.addTo(map);
        console.log('Mapa base adicionado');

        // Carregar todas as camadas
        carregarTodasCamadas();

        // Adicionar controles de camada
        setupLayerControls();

        // Esconder loading
        setTimeout(() => {
            const loadingElement = document.getElementById('loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }, 1000);

        console.log('WebGIS inicializado com sucesso');
    } catch (error) {
        console.error('Erro na inicialização do mapa:', error);
        showError(`Erro na inicialização do mapa: ${error.message}`);
    }
}

// Configurar controles de camada
function setupLayerControls() {
    // Os controles são criados dinamicamente pela função atualizarControlesCamadas()
    atualizarControlesCamadas();
}

// Trocar mapa base
function changeBaseMap(mapType) {
    if (currentBaseMap === mapType) return;
    
    if (baseMaps[currentBaseMap]) {
        map.removeLayer(baseMaps[currentBaseMap]);
    }
    
    if (baseMaps[mapType]) {
        baseMaps[mapType].addTo(map);
        currentBaseMap = mapType;
    }
    
    updateBaseMapButtons(mapType);
}

// Atualizar botões de mapa base
function updateBaseMapButtons(activeMap) {
    const buttons = document.querySelectorAll('.btn-map');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    const activeButton = document.querySelector(`[onclick="changeBaseMap('${activeMap}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Centralizar mapa
function resetView() {
    if (map) {
        map.setView([-19.8236, -43.1736], 12);
    }
}

// Alternar tela cheia
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Mostrar erro
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.style.position = 'absolute';
    errorDiv.style.top = '20px';
    errorDiv.style.left = '50%';
    errorDiv.style.transform = 'translate(-50%, -50%)';
    errorDiv.style.zIndex = '3000';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// Mostrar sucesso
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.style.position = 'absolute';
    successDiv.style.top = '20px';
    successDiv.style.right = '20px';
    successDiv.style.zIndex = '3000';
    successDiv.style.minWidth = '300px';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 3000);
}

// Adicionar funcionalidades extras
function addMapFeatures() {
    // Adicionar escala
    L.control.scale({
        metric: true,
        imperial: false,
        position: 'bottomleft'
    }).addTo(map);

    // Adicionar coordenadas do mouse
    const coordinates = L.control({position: 'bottomright'});
    coordinates.onAdd = function() {
        const div = L.DomUtil.create('div', 'info');
        div.innerHTML = '<div style="background: white; padding: 5px; border-radius: 3px; font-size: 12px;">Clique no mapa para ver coordenadas</div>';
        return div;
    };
    coordinates.addTo(map);

    // Mostrar coordenadas no hover
    map.on('mousemove', function(e) {
        const lat = e.latlng.lat.toFixed(6);
        const lng = e.latlng.lng.toFixed(6);
        coordinates.getContainer().innerHTML = `
            <div style="background: white; padding: 5px; border-radius: 3px; font-size: 12px;">
                Lat: ${lat}, Lng: ${lng}
            </div>
        `;
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando WebGIS com camadas dinâmicas...');
    
    if (typeof L === 'undefined') {
        showError('Leaflet não foi carregado. Verifique a conexão com a internet.');
        return;
    }
    
    try {
        initMap();
        addMapFeatures();
        
        document.addEventListener('fullscreenchange', function() {
            setTimeout(() => {
                if (map) {
                    map.invalidateSize();
                }
            }, 100);
        });
        
        console.log('WebGIS com camadas dinâmicas inicializado com sucesso');
    } catch (error) {
        console.error('Erro na inicialização da aplicação:', error);
        showError(`Erro na inicialização: ${error.message}`);
    }
});

// Adicionar teclas de atalho
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'h':
        case 'H':
            resetView();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
    }
}); 