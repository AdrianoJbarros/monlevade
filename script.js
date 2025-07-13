// Variáveis globais
let map;
let currentBaseMap = 'streetmap';
let imoveisLayer;
let monlevadeLayer;
let nascentesLayer;

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

// Inicialização do mapa
function initMap() {
    try {
        console.log('Iniciando inicialização do mapa...');
        
        // Verificar se o elemento map existe
        const mapElement = document.getElementById('map');
        if (!mapElement) {
            throw new Error('Elemento #map não encontrado');
        }

        // Criar o mapa
        map = L.map('map', {
            center: [-19.8236, -43.1736], // Coordenadas de Belo Horizonte
            zoom: 12,
            zoomControl: true,
            attributionControl: true
        });

        console.log('Mapa criado com sucesso');

        // Adicionar mapa base inicial
        baseMaps.streetmap.addTo(map);
        console.log('Mapa base adicionado');

        // Carregar camadas de dados
        loadDataLayers();

        // Adicionar controles de camada
        setupLayerControls();

        // Esconder loading
        setTimeout(() => {
            const loadingElement = document.getElementById('loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }, 1000);

        console.log('Inicialização do mapa concluída');
    } catch (error) {
        console.error('Erro na inicialização do mapa:', error);
        showError(`Erro na inicialização do mapa: ${error.message}`);
    }
}

// Carregar camadas de dados
function loadDataLayers() {
    // Camada de Imóveis
    imoveisLayer = L.geoJSON(null, {
        style: function(feature) {
            return {
                fillColor: '#ff4444',
                weight: 2,
                opacity: 1,
                color: '#ff0000',
                fillOpacity: 0.3
            };
        },
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                let popupContent = '<div style="max-width: 300px;">';
                popupContent += '<h6><i class="fas fa-home"></i> Imóvel</h6>';
                
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

    // Camada de Monlevade
    monlevadeLayer = L.geoJSON(null, {
        style: function(feature) {
            return {
                fillColor: '#4444ff',
                weight: 2,
                opacity: 1,
                color: '#0000ff',
                fillOpacity: 0.2
            };
        },
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                let popupContent = '<div style="max-width: 300px;">';
                popupContent += '<h6><i class="fas fa-map"></i> Monlevade</h6>';
                
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

    // Camada de Nascentes
    nascentesLayer = L.geoJSON(null, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: '#00ff44',
                color: '#00aa00',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            if (feature.properties) {
                let popupContent = '<div style="max-width: 300px;">';
                popupContent += '<h6><i class="fas fa-tint"></i> Nascente</h6>';
                
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

    // Carregar dados GeoJSON
    loadGeoJSONData();
}

// Carregar dados GeoJSON
function loadGeoJSONData() {
    console.log('Iniciando carregamento das camadas...');
    
    // Carregar dados de imóveis
    fetch('data/imoveis.geojson')
        .then(response => {
            console.log('Resposta do servidor para imóveis:', response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados de imóveis carregados:', data.features ? data.features.length : 0, 'features');
            
            if (!data || !data.features) {
                throw new Error('Formato de dados inválido para imóveis');
            }
            
            imoveisLayer.addData(data);
            imoveisLayer.addTo(map);
            
            // Ajustar view para os dados
            if (data.features && data.features.length > 0) {
                try {
                    map.fitBounds(imoveisLayer.getBounds());
                    console.log('View ajustada para os dados de imóveis');
                } catch (boundsError) {
                    console.warn('Erro ao ajustar bounds:', boundsError);
                }
            }
            
            // Mostrar sucesso
            showSuccess('Camada de Imóveis carregada com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao carregar dados de imóveis:', error);
            showError(`Erro ao carregar dados de imóveis: ${error.message}`);
        });

    // Carregar dados de Monlevade
    fetch('data/Monlevade.geojson')
        .then(response => {
            console.log('Resposta do servidor para Monlevade:', response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados de Monlevade carregados:', data.features ? data.features.length : 0, 'features');
            
            if (!data || !data.features) {
                throw new Error('Formato de dados inválido para Monlevade');
            }
            
            monlevadeLayer.addData(data);
            monlevadeLayer.addTo(map);
            
            // Mostrar sucesso
            showSuccess('Camada de Monlevade carregada com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao carregar dados de Monlevade:', error);
            showError(`Erro ao carregar dados de Monlevade: ${error.message}`);
        });

    // Carregar dados de Nascentes
    fetch('data/Nascentes.geojson')
        .then(response => {
            console.log('Resposta do servidor para nascentes:', response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados de nascentes carregados:', data.features ? data.features.length : 0, 'features');
            
            if (!data || !data.features) {
                throw new Error('Formato de dados inválido para nascentes');
            }
            
            nascentesLayer.addData(data);
            nascentesLayer.addTo(map);
            
            // Mostrar sucesso
            showSuccess('Camada de Nascentes carregada com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao carregar dados de nascentes:', error);
            showError(`Erro ao carregar dados de nascentes: ${error.message}`);
        });
}

// Configurar controles de camada
function setupLayerControls() {
    // Controle de camadas de dados
    document.getElementById('imoveisLayer').addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(imoveisLayer);
        } else {
            map.removeLayer(imoveisLayer);
        }
    });

    document.getElementById('monlevadeLayer').addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(monlevadeLayer);
        } else {
            map.removeLayer(monlevadeLayer);
        }
    });

    document.getElementById('nascentesLayer').addEventListener('change', function() {
        if (this.checked) {
            map.addLayer(nascentesLayer);
        } else {
            map.removeLayer(nascentesLayer);
        }
    });
}

// Função para trocar mapa base
function changeBaseMap(mapType) {
    // Remover mapa base atual
    map.removeLayer(baseMaps[currentBaseMap]);
    
    // Adicionar novo mapa base
    baseMaps[mapType].addTo(map);
    currentBaseMap = mapType;
    
    // Atualizar botões
    updateBaseMapButtons(mapType);
}

// Atualizar estado dos botões de mapa base
function updateBaseMapButtons(activeMap) {
    const buttons = document.querySelectorAll('.btn-map');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(activeMap)) {
            button.classList.add('active');
        }
    });
}

// Resetar view do mapa
function resetView() {
    if (imoveisLayer && imoveisLayer.getBounds) {
        map.fitBounds(imoveisLayer.getBounds());
    } else {
        map.setView([-19.8236, -43.1736], 12);
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Erro ao entrar em tela cheia:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Mostrar erro
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger';
    errorDiv.style.position = 'absolute';
    errorDiv.style.top = '50%';
    errorDiv.style.left = '50%';
    errorDiv.style.transform = 'translate(-50%, -50%)';
    errorDiv.style.zIndex = '3000';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
        <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
    `;
    document.body.appendChild(errorDiv);
    
    // Remover automaticamente após 5 segundos
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
    
    // Remover automaticamente após 3 segundos
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

// Função para exportar dados
function exportData() {
    if (imoveisLayer) {
        const data = imoveisLayer.toGeoJSON();
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'imoveis_export.json';
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Função para medir distância
let measureControl = null;
function toggleMeasure() {
    if (measureControl) {
        map.removeControl(measureControl);
        measureControl = null;
    } else {
        // Implementação simples de medição
        let startPoint = null;
        let polyline = null;
        
        map.on('click', function(e) {
            if (!startPoint) {
                startPoint = e.latlng;
                polyline = L.polyline([startPoint], {color: 'red'}).addTo(map);
            } else {
                const endPoint = e.latlng;
                const distance = startPoint.distanceTo(endPoint);
                
                polyline.setLatLngs([startPoint, endPoint]);
                
                L.popup()
                    .setLatLng(endPoint)
                    .setContent(`Distância: ${(distance/1000).toFixed(2)} km`)
                    .openOn(map);
                
                startPoint = null;
                polyline = null;
            }
        });
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, iniciando aplicação...');
    
    // Verificar se Leaflet está disponível
    if (typeof L === 'undefined') {
        showError('Leaflet não foi carregado. Verifique a conexão com a internet.');
        return;
    }
    
    try {
        initMap();
        addMapFeatures();
        
        // Adicionar listener para fullscreen
        document.addEventListener('fullscreenchange', function() {
            setTimeout(() => {
                if (map) {
                    map.invalidateSize();
                }
            }, 100);
        });
        
        console.log('Aplicação inicializada com sucesso');
    } catch (error) {
        console.error('Erro na inicialização da aplicação:', error);
        showError(`Erro na inicialização: ${error.message}`);
    }
});

// Função para buscar localização
function searchLocation() {
    const query = prompt('Digite o endereço para buscar:');
    if (query) {
        // Usar Nominatim para geocoding
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    map.setView([lat, lon], 15);
                    
                    L.marker([lat, lon])
                        .addTo(map)
                        .bindPopup(`<b>${data[0].display_name}</b>`)
                        .openPopup();
                } else {
                    alert('Localização não encontrada');
                }
            })
            .catch(error => {
                console.error('Erro na busca:', error);
                alert('Erro ao buscar localização');
            });
    }
}

// Função para capturar screenshot do mapa
function captureMap() {
    // Implementação básica - em produção seria necessário usar html2canvas ou similar
    alert('Funcionalidade de captura de tela seria implementada aqui');
}

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
        case 's':
        case 'S':
            searchLocation();
            break;
    }
}); 